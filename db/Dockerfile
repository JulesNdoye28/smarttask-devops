# Image officielle PostgreSQL comme base
FROM postgres:16-alpine

# Les identifiants (POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD) sont fournis
# au runtime via docker-compose.yml / .env, jamais en dur dans l'image.

# Copier le script d'initialisation : exécuté automatiquement au 1er démarrage
# (le conteneur postgres officiel lance tout .sql présent dans /docker-entrypoint-initdb.d/)
COPY init.sql /docker-entrypoint-initdb.d/init.sql

EXPOSE 5432
