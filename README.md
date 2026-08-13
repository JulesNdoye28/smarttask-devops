# SmartTask — Projet DevOps/Cloud

Application de gestion de tâches développée dans le cadre de l'examen
**Microservices, Docker, Jenkins** (Master 1 ISI 2025-2026).

## Contexte

SmartTech souhaite moderniser son processus de développement et de déploiement.
SmartTask est une application composée de 3 services :

- **Frontend** — interface utilisateur (React)
- **Backend** — API REST (Node.js / Express)
- **Base de données** — PostgreSQL

## Architecture
smarttask-devops/
├── frontend/ # Application React (build servi par Nginx)
├── backend/ # API REST Express (CRUD tâches)
├── db/ # Image PostgreSQL + script d'initialisation
├── docker-compose.yml
├── Jenkinsfile
└── .env # Variables d'environnement (non versionné)
## Prérequis

- Docker & Docker Compose
- Git

## Lancer le projet en local

```bash
git clone https://github.com/JulesNdoye28/smarttask-devops.git
cd smarttask-devops
docker compose up -d --build
```

- Frontend : http://localhost:3000
- Backend (API) : http://localhost:5000/api/tasks

## Branches

- `Dev` — branche de développement
- `Prod` — branche de production, stable

## CI/CD

Un pipeline Jenkins (`Jenkinsfile`) automatise :
- la récupération du code depuis GitHub,
- la construction des images Docker,
- le tag des images,
- la publication sur Docker Hub.

## Auteur

Projet réalisé par Souleymane — Master 1 ISI, filière Ingénieur DevOps/Cloud.
