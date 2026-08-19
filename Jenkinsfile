pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        DOCKERHUB_USER = 'leebou01'
        IMAGE_TAG = "${env.BRANCH_NAME}-${env.BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                echo "Récupération du code depuis GitHub (branche ${env.BRANCH_NAME})"
                checkout scm
            }
        }

        stage('Build Images') {
            steps {
                echo 'Construction des images Docker...'
                sh "docker build -t ${DOCKERHUB_USER}/smarttask-backend:${IMAGE_TAG} ./backend"
                sh "docker build -t ${DOCKERHUB_USER}/smarttask-frontend:${IMAGE_TAG} ./frontend"
                sh "docker build --pull -t ${DOCKERHUB_USER}/smarttask-db:${IMAGE_TAG} ./db"
            }
        }

        stage('Security Scan - Trivy') {
            steps {
                echo 'Analyse des vulnérabilités avec Trivy...'
                sh "trivy image --severity CRITICAL --exit-code 1 --no-progress ${DOCKERHUB_USER}/smarttask-backend:${IMAGE_TAG}"
                sh "trivy image --severity CRITICAL --exit-code 1 --no-progress ${DOCKERHUB_USER}/smarttask-frontend:${IMAGE_TAG}"
                sh "trivy image --severity CRITICAL --exit-code 1 --no-progress --ignorefile .trivyignore ${DOCKERHUB_USER}/smarttask-db:${IMAGE_TAG}"
            }
        }
        stage('Tag Latest') {
            steps {
                echo 'Attribution du tag latest en complément du tag versionné...'
                sh "docker tag ${DOCKERHUB_USER}/smarttask-backend:${IMAGE_TAG} ${DOCKERHUB_USER}/smarttask-backend:latest"
                sh "docker tag ${DOCKERHUB_USER}/smarttask-frontend:${IMAGE_TAG} ${DOCKERHUB_USER}/smarttask-frontend:latest"
                sh "docker tag ${DOCKERHUB_USER}/smarttask-db:${IMAGE_TAG} ${DOCKERHUB_USER}/smarttask-db:latest"
            }
        }

        stage('Login Docker Hub') {
            steps {
                echo 'Connexion au registre Docker Hub...'
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }

        stage('Push Images') {
            steps {
                echo 'Publication des images sur Docker Hub...'
                sh "docker push ${DOCKERHUB_USER}/smarttask-backend:${IMAGE_TAG}"
                sh "docker push ${DOCKERHUB_USER}/smarttask-backend:latest"
                sh "docker push ${DOCKERHUB_USER}/smarttask-frontend:${IMAGE_TAG}"
                sh "docker push ${DOCKERHUB_USER}/smarttask-frontend:latest"
                sh "docker push ${DOCKERHUB_USER}/smarttask-db:${IMAGE_TAG}"
                sh "docker push ${DOCKERHUB_USER}/smarttask-db:latest"
            }
        }
    }

    post {
        success {
            echo "Pipeline terminé avec succès pour la branche ${env.BRANCH_NAME}."
        }
        failure {
            echo "Le pipeline a échoué. Consultez les journaux d'exécution ci-dessus pour identifier l'étape en erreur."
        }
        always {
            sh 'docker logout'
        }
    }
}
