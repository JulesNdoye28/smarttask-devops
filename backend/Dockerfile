FROM node:20-alpine

WORKDIR /usr/src/app

# Met à jour npm pour corriger les vulnérabilités embarquées dans sa propre installation
RUN npm install -g npm@latest

COPY package*.json ./
RUN npm install --omit=dev
COPY . .

EXPOSE 5000
ENV NODE_ENV=production
CMD ["npm", "start"]
