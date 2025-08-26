pipeline {
    agent any

    environment {
        IMAGE_NAME = 'calculatrice-e2e'
        PORT = '8081'  // Jenkins uses 8080, so we use 8081
    }

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
                docker build -t %IMAGE_NAME%:latest .
                """

                // Lancer le container → il démarre http-server + exécute test_calculatrice.js
                bat """
                docker run --rm --shm-size=2g ^
                    -e MODE=test -e PORT=%PORT% ^
                    -p %PORT%:%PORT% ^
                    %IMAGE_NAME%:latest
                """
            }
        }

        stage('Déployer en production') {
            steps {
                // Poser la question : Voulez-vous déployer ? Oui/Non
                input message: 'Déployer en production ?', ok: 'Oui'

                // Supprimer un ancien container prod s’il existe
                bat "docker rm -f %IMAGE_NAME%-prod || echo ok"

                // Lancer l’appli en prod (pas les tests, juste le serveur statique)
                bat """
                docker run -d --name %IMAGE_NAME%-prod --shm-size=2g ^
                    -e MODE=serve -e PORT=%PORT% ^
                    -p %PORT%:%PORT% ^
                    %IMAGE_NAME%:latest
                """
            }
        }
    }
}
