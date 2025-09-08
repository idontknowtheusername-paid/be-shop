'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { authService, AuthUser } from '@/lib/services/authService'

interface UserContextType {
  user: AuthUser | null
  loading: boolean
  error: string | null
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signUp: (data: { email: string; password: string; full_name?: string; phone?: string }) => Promise<{ success: boolean; error?: string }>
  signOut: () => Promise<void>
  updateProfile: (data: any) => Promise<{ success: boolean; error?: string }>
  refreshUser: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Initialiser l'utilisateur au chargement
  useEffect(() => {
    initializeUser()
  }, [])

  // Écouter les changements d'authentification
  useEffect(() => {
    const { data: { subscription } } = authService.onAuthStateChange((user) => {
      setUser(user)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const initializeUser = async () => {
    try {
      setLoading(true)
      const { user: currentUser, error: userError } = await authService.getCurrentUser()
      
      if (userError) {
        setError(userError)
      } else {
        setUser(currentUser)
      }
    } catch (err) {
      setError('Erreur lors de l\'initialisation de l\'utilisateur')
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)
      
      const { user: authUser, error: authError } = await authService.signIn({ email, password })
      
      if (authError) {
        setError(authError)
        return { success: false, error: authError }
      }

      if (authUser) {
        setUser(authUser)
        return { success: true }
      }

      return { success: false, error: 'Erreur lors de la connexion' }
    } catch (err) {
      const errorMessage = 'Une erreur inattendue est survenue'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (data: { email: string; password: string; full_name?: string; phone?: string }) => {
    try {
      setLoading(true)
      setError(null)
      
      const { user: authUser, error: authError } = await authService.signUp(data)
      
      if (authError) {
        setError(authError)
        return { success: false, error: authError }
      }

      if (authUser) {
        setUser(authUser)
        return { success: true }
      }

      return { success: false, error: 'Erreur lors de l\'inscription' }
    } catch (err) {
      const errorMessage = 'Une erreur inattendue est survenue'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      const { error: signOutError } = await authService.signOut()
      
      if (signOutError) {
        setError(signOutError)
      } else {
        setUser(null)
        setError(null)
      }
    } catch (err) {
      setError('Erreur lors de la déconnexion')
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (data: any) => {
    if (!user) {
      return { success: false, error: 'Utilisateur non connecté' }
    }

    try {
      setLoading(true)
      const { user: updatedUser, error: updateError } = await authService.updateProfile(user.id, data)
      
      if (updateError) {
        setError(updateError)
        return { success: false, error: updateError }
      }

      if (updatedUser) {
        setUser(updatedUser)
        return { success: true }
      }

      return { success: false, error: 'Erreur lors de la mise à jour du profil' }
    } catch (err) {
      const errorMessage = 'Une erreur inattendue est survenue'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const refreshUser = async () => {
    await initializeUser()
  }

  const value: UserContextType = {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    updateProfile,
    refreshUser
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

