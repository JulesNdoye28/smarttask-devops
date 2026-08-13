# --- Étape 1 : build de l'application React ---
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Génère les fichiers statiques optimisés dans /app/build
RUN npm run build

# --- Étape 2 : servir les fichiers statiques avec Nginx ---
FROM nginx:alpine

# Copier le build React dans le dossier servi par Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Config Nginx personnalisée (support du routing SPA)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
