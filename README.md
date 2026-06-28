# Campus Challenges
Mini-plateforme où des étudiants peuvent créer un profil, publier des défis, participer et voir les participations.

## Stack technique

- **Next.js 14** (App Router)
- **TypeScript**
- **Prisma** (ORM)
- **PostgreSQL** (base de données)
- **Tailwind CSS** (styling)
- **Vercel** (déploiement)

## Installation locale

### 1. Cloner le projet

```bash
git clone https://github.com/Sekaly6666/campus-challenges-perso.git
cd campus-challenges
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer l'environnement

```bash
cp .env.example .env
```

Remplis `DATABASE_URL` avec ta connexion PostgreSQL.  
> Recommandé : crée une base gratuite sur [neon.tech](https://neon.tech)

### 4. Initialiser la base de données

```bash
npx prisma migrate dev --name init
```

### 5. Lancer le serveur de développement

```bash
npm run dev
```

## Fonctionnalités

- Créer un profil étudiant
- Afficher la liste des défis
- Créer un défi (avec catégorie)
- Voir le détail d'un défi
- Participer à un défi (texte + lien)
- Afficher les participations d'un défi

## Déploiement sur Vercel

1. Push le code sur GitHub
2. Importer le projet sur [vercel.com](https://vercel.com)
3. Ajouter la variable `DATABASE_URL` dans Settings > Environment Variables
4. Déployer

## Difficultés rencontrées

- Configuration de Prisma avec Next.js App Router
- Gestion du singleton PrismaClient en développement
- Dynamic routes avec TypeScript strict

---

