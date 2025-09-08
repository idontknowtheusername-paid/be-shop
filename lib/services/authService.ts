import { supabase } from '@/lib/supabase'
import type { Database } from '@/lib/supabase'

type Profile = Database['public']['Tables']['profiles']['Row']
type ProfileInsert = Database['public']['Tables']['profiles']['Insert']
type ProfileUpdate = Database['public']['Tables']['profiles']['Update']

export interface AuthUser {
  id: string
  email: string
  full_name?: string
  phone?: string
  avatar_url?: string
  role: 'customer' | 'vendor' | 'admin'
  is_verified: boolean
  language: string
  currency: string
}

export interface SignUpData {
  email: string
  password: string
  full_name?: string
  phone?: string
}

export interface SignInData {
  email: string
  password: string
}

export interface UpdateProfileData {
  full_name?: string
  phone?: string
  avatar_url?: string
  date_of_birth?: string
  gender?: string
  language?: string
  currency?: string
}

class AuthService {
  // Inscription d'un nouvel utilisateur
  async signUp(data: SignUpData): Promise<{ user: AuthUser | null; error: string | null }> {
    try {
      // Vérifier si Supabase est configuré
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      
      if (!supabaseUrl || !supabaseKey || 
          supabaseUrl === 'your_supabase_project_url' || 
          supabaseKey === 'your-anon-key-here') {
        console.warn('⚠️ Supabase non configuré - Mode développement')
        return {
          user: null,
          error: 'Supabase n\'est pas configuré. Veuillez créer un fichier .env.local avec vos clés Supabase. Voir SUPABASE_SETUP.md pour plus d\'informations.'
        }
      }

      // 1. Créer l'utilisateur dans Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      })

      if (authError) throw authError

      if (authData.user) {
        // 2. Créer le profil utilisateur
        const profileData: ProfileInsert = {
          id: authData.user.id,
          email: data.email,
          full_name: data.full_name,
          phone: data.phone,
          role: 'customer',
          language: 'fr',
          currency: 'XOF',
        }

        const { data: profile, error: profileError } = await (supabase as any)
          .from('profiles')
          .insert(profileData)
          .select()
          .single()

        if (profileError) throw profileError

        return {
          user: this.transformProfileToAuthUser(profile),
          error: null
        }
      }

      return { user: null, error: 'Erreur lors de la création du compte' }
    } catch (error) {
      return {
        user: null,
        error: error instanceof Error ? error.message : 'Erreur lors de l\'inscription'
      }
    }
  }

  // Connexion utilisateur
  async signIn(data: SignInData): Promise<{ user: AuthUser | null; error: string | null }> {
    try {
      // Vérifier si Supabase est configuré
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      
      if (!supabaseUrl || !supabaseKey || 
          supabaseUrl === 'your_supabase_project_url' || 
          supabaseKey === 'your-anon-key-here') {
        console.warn('⚠️ Supabase non configuré - Mode développement')
        return {
          user: null,
          error: 'Supabase n\'est pas configuré. Veuillez créer un fichier .env.local avec vos clés Supabase. Voir SUPABASE_SETUP.md pour plus d\'informations.'
        }
      }

      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      if (error) throw error

      if (authData.user) {
        // Récupérer le profil utilisateur
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authData.user.id)
          .single()

        if (profileError) throw profileError

        return {
          user: this.transformProfileToAuthUser(profile),
          error: null
        }
      }

      return { user: null, error: 'Utilisateur non trouvé' }
    } catch (error) {
      return {
        user: null,
        error: error instanceof Error ? error.message : 'Erreur lors de la connexion'
      }
    }
  }

  // Déconnexion
  async signOut(): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      return { error: null }
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Erreur lors de la déconnexion'
      }
    }
  }

  // Récupérer l'utilisateur actuel
  async getCurrentUser(): Promise<{ user: AuthUser | null; error: string | null }> {
    try {
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser()
      
      if (authError) throw authError

      if (!authUser) {
        return { user: null, error: null }
      }

      // Récupérer le profil utilisateur
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single()

      if (profileError) throw profileError

      return {
        user: this.transformProfileToAuthUser(profile),
        error: null
      }
    } catch (error) {
      return {
        user: null,
        error: error instanceof Error ? error.message : 'Erreur lors de la récupération de l\'utilisateur'
      }
    }
  }

  // Mettre à jour le profil utilisateur
  async updateProfile(userId: string, data: UpdateProfileData): Promise<{ user: AuthUser | null; error: string | null }> {
    try {
      const { data: profile, error } = await (supabase as any)
        .from('profiles')
        .update(data)
        .eq('id', userId)
        .select()
        .single()

      if (error) throw error

      return {
        user: this.transformProfileToAuthUser(profile),
        error: null
      }
    } catch (error) {
      return {
        user: null,
        error: error instanceof Error ? error.message : 'Erreur lors de la mise à jour du profil'
      }
    }
  }

  // Réinitialiser le mot de passe
  async resetPassword(email: string): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`,
      })

      if (error) throw error

      return { error: null }
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Erreur lors de la réinitialisation du mot de passe'
      }
    }
  }

  // Changer le mot de passe
  async changePassword(newPassword: string): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      })

      if (error) throw error

      return { error: null }
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Erreur lors du changement de mot de passe'
      }
    }
  }

  // Vérifier si l'utilisateur est connecté
  async isAuthenticated(): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      return !!user
    } catch {
      return false
    }
  }

  // Écouter les changements d'authentification
  onAuthStateChange(callback: (user: AuthUser | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        // Récupérer le profil utilisateur
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()

        if (profile) {
          callback(this.transformProfileToAuthUser(profile))
        }
      } else if (event === 'SIGNED_OUT') {
        callback(null)
      }
    })
  }

  // Transformer le profil en utilisateur d'authentification
  private transformProfileToAuthUser(profile: Profile): AuthUser {
    return {
      id: profile.id,
      email: profile.email,
      full_name: profile.full_name || undefined,
      phone: profile.phone || undefined,
      avatar_url: profile.avatar_url || undefined,
      role: profile.role,
      is_verified: profile.is_verified,
      language: profile.language,
      currency: profile.currency,
    }
  }
}

export const authService = new AuthService()
