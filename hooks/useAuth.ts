import { useUser } from '@/contexts/UserContext'

export function useAuth() {
  const { user, loading, error, signIn, signUp, signOut, updateProfile, refreshUser } = useUser()

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isVendor: user?.role === 'vendor',
    isCustomer: user?.role === 'customer',
    signIn,
    signUp,
    signOut,
    updateProfile,
    refreshUser
  }
}

