import React from 'react'
import SupabaseTest from '@/components/test/SupabaseTest'

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Test de Configuration Supabase
          </h1>
          <p className="text-gray-600">
            Vérification de la configuration et test des connexions
          </p>
        </div>
        
        <SupabaseTest />
      </div>
    </div>
  )
}
