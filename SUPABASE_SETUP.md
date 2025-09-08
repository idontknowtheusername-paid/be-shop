# Configuration Supabase

## Problèmes Identifiés et Solutions

### ❌ Erreurs Actuelles
1. **Multiple GoTrueClient instances** - Résolu ✅
2. **Erreurs 400/429** - Configuration manquante
3. **Variables d'environnement manquantes**

### 🔧 Solutions Implémentées

#### 1. Correction du Multiple GoTrueClient
- Supprimé la duplication du client Supabase
- Ajouté une clé de stockage unique (`storageKey: 'be-shop-auth'`)
- Un seul client exporté avec deux noms pour la compatibilité

#### 2. Configuration des Variables d'Environnement

Créez un fichier `.env.local` à la racine du projet avec :

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-clé-anon-ici

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 📋 Instructions pour Obtenir vos Clés Supabase

1. **Allez sur [Supabase Dashboard](https://supabase.com/dashboard)**
2. **Sélectionnez votre projet**
3. **Allez dans Settings > API**
4. **Copiez :**
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 🚀 Après Configuration

1. **Redémarrez votre serveur de développement :**
   ```bash
   npm run dev
   ```

2. **Vérifiez que les erreurs ont disparu dans la console**

3. **Testez l'authentification :**
   - Inscription
   - Connexion
   - Déconnexion

### 🔍 Vérification

Les erreurs suivantes devraient disparaître :
- ❌ `Multiple GoTrueClient instances detected`
- ❌ `Failed to load resource: 400`
- ❌ `Failed to load resource: 429`

### 📝 Notes Importantes

- Le fichier `.env.local` est dans `.gitignore` (sécurité)
- Ne jamais commiter vos vraies clés Supabase
- Utilisez des clés différentes pour dev/prod

