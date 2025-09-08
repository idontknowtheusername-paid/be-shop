'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Mail, ArrowLeft, Loader2 } from 'lucide-react'
import { authService } from '@/lib/services/authService'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<{[key: string]: string}>({})

  const validateForm = () => {
    const errors: {[key: string]: string} = {}
    
    if (!email) {
      errors.email = 'L\'email est requis'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Format d\'email invalide'
    }
    
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)
    setFieldErrors({})

    if (!validateForm()) {
      setLoading(false)
      return
    }

    try {
      const { error: resetError } = await authService.resetPassword(email)
      
      if (resetError) {
        setError(resetError)
        return
      }

      setSuccess('Un email de réinitialisation a été envoyé à votre adresse email.')
      setEmail('')
    } catch (err) {
      setError('Une erreur inattendue est survenue')
    } finally {
      setLoading(false)
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    
    // Clear field error when user starts typing
    if (fieldErrors.email) {
      setFieldErrors(prev => ({
        ...prev,
        email: ''
      }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Link href="/auth/login" className="text-gray-500 hover:text-gray-700 transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div className="flex-1">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] rounded-full mb-4">
                    <span className="text-2xl font-bold text-white">Be</span>
                  </div>
                  <CardTitle className="text-3xl font-bold text-gray-900 mb-2">Mot de passe oublié</CardTitle>
                  <CardDescription className="text-gray-600 text-base">
                    Entrez votre email pour recevoir un lien de réinitialisation
                  </CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert>
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={handleEmailChange}
                    className={`pl-10 h-12 transition-all duration-200 ${
                      fieldErrors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-[#1E40AF]'
                    }`}
                    required
                  />
                </div>
                {fieldErrors.email && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-medium text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                disabled={loading}
                style={{ 
                  minHeight: '48px',
                  backgroundColor: loading ? '#9CA3AF' : '#1E40AF',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: loading ? 'none' : '0 4px 14px 0 rgba(30, 64, 175, 0.3)'
                }}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Envoi...</span>
                  </div>
                ) : (
                  'Envoyer le lien de réinitialisation'
                )}
              </Button>

              <div className="text-center text-sm pt-4">
                <span className="text-gray-600">Vous vous souvenez de votre mot de passe ? </span>
                <Link
                  href="/auth/login"
                  className="text-[#1E40AF] hover:text-[#1D4ED8] font-medium underline transition-colors"
                >
                  Se connecter
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

