pipeline {
    agent any

    stages {
        stage('Clone Code') {
            steps {
                git 'https://github.com/yourusername/devops-interview-app.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker-compose down'
                sh 'docker-compose up -d --build'
            }
        }

        stage('Push to DockerHub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    sh 'docker login -u $USER -p $PASS'
                    sh 'docker-compose build'
                    sh 'docker tag devops-interview-app_backend $USER/devops-interview-app_backend:latest'
                    sh 'docker push $USER/devops-interview-app_backend:latest'
                }
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker-compose down'
                sh 'docker-compose up -d'
            }
        }
    }
}
