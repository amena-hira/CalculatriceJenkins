pipeline {
    agent any

    stages {
        stage('Cloner le code') {
            steps {
                // On clone le repo Github
                git url: 'https://github.com/amena-hira/CalculatriceJenkins.git', branch: 'main'
            }
        }

        stage('Construire et tester') {
            steps {
                // Construire l'image
                bat """
                docker build --no-cache -t calculatrice:${BUILD_NUMBER} .
                """

                // Lancer le container → il démarre http-server + exécute test_calculatrice.js
                bat """
                docker run --rm -p 8081:8080 calculatrice:${BUILD_NUMBER}
                """
            }
        }

        stage('Déployer en production') {
            steps {
                // Poser la question : Voulez-vous déployer ? Oui/Non
                input message: 'Déployer en production ?', ok: 'Oui'

                // Supprimer un ancien container prod s’il existe
                bat "docker rm -f calculatrice-prod || echo ok"

                // Lancer l’appli en prod (pas les tests, juste le serveur statique)
                bat """
                docker run -d --name calculatrice-prod -p 8081:8080 calculatrice:latest npx http-server
                """
            }
        }
    }
}
