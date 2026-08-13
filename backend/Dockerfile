# --- Étape unique : image légère basée sur Node ---
FROM node:20-alpine

# Répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier uniquement les fichiers de dépendances d'abord (meilleure utilisation du cache Docker)
COPY package*.json ./

# Installer les dépendances en mode production
RUN npm install --omit=dev

# Copier le reste du code source
COPY . .

# Le backend écoute sur le port 5000
EXPOSE 5000

# Variable d'environnement par défaut
ENV NODE_ENV=production

# Démarrer le serveur
CMD ["npm", "start"]
