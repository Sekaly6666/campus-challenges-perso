Campus Challenges
Mini-plateforme où des étudiants peuvent créer un profil, publier des défis, participer et voir les participations

Stack technique utiliser

- Next.js 14 (App Router)
- TypeScript
- Prisma (ORM)
- PostgreSQL (base de données)
- CSS (Pure)
- Vercel (déploiement)



Installation locale

1. Cloner le projet


git clone https://github.com/Sekaly6666/campus-challenges-perso.git
cd campus-challenges-perso


2. Installer les dépendances
npm install


3. Configurer l'environnement
cp .env.example .env


4. Initialiser la base de données
npx prisma migrate dev --name init


5. Lancer le serveur de développement
npm run dev

6. voir le contenu de la base de données prisma
npx prisma studio

Fonctionnalités

- Créer un profil étudiant
- Afficher la liste des défis
- Créer un défi 
- Voir le détail d'un défi
- Participer à un défi (texte ou lien)
- Afficher les participations d'un défi


Difficultés rencontrées

- Configuration de Prisma avec Next.js App Router
- A creer les modeles prisma
- Configuration des API routes
- Gestion des erreurs