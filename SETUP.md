# 🚀 Configuration de l'Environnement

## Variables d'Environnement Requises

Pour que l'application fonctionne correctement, vous devez créer un fichier `.env.local` à la racine du projet avec les variables suivantes :

### 1. Créer le fichier `.env.local`

```bash
# À la racine du projet
touch .env.local
```

### 2. Ajouter les variables Supabase

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🔧 Comment obtenir vos clés Supabase

### Étape 1 : Créer un projet Supabase
1. Allez sur [https://supabase.com](https://supabase.com)
2. Créez un compte ou connectez-vous
3. Créez un nouveau projet

### Étape 2 : Récupérer les clés API
1. Dans votre dashboard Supabase, allez dans **Settings** > **API**
2. Copiez les valeurs suivantes :
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** → `SUPABASE_SERVICE_ROLE_KEY`

### Étape 3 : Configurer la base de données
1. Allez dans **SQL Editor**
2. Exécutez les migrations dans le dossier `supabase/migrations/`

## 🚀 Démarrer l'application

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

## 🔍 Vérifier la configuration

1. Ouvrez [http://localhost:3000/test-auth](http://localhost:3000/test-auth)
2. Vérifiez que l'authentification fonctionne
3. Testez l'inscription et la connexion

## ⚠️ Mode Développement

Si les variables d'environnement ne sont pas configurées, l'application utilisera un client Supabase mock pour éviter les erreurs. Vous verrez des avertissements dans la console.

## 📝 Notes importantes

- Le fichier `.env.local` ne doit **PAS** être commité dans Git
- Les variables `NEXT_PUBLIC_*` sont accessibles côté client
- Les autres variables sont uniquement côté serveur


