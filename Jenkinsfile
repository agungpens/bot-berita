pipeline {
    agent {
        node {
            label 'dsp'
        }
    }

    triggers {
        pollSCM('* * * * *')
    }

    options {
        disableConcurrentBuilds()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                sh 'sudo docker build -t bot-berita:latest .'
            }
        }

        stage('Run') {
            steps {
                // sh 'sudo docker stop bot-berita'
                sh 'sudo docker rm bot-berita'
                sh 'sudo docker run -d --name bot-berita bot-berita:latest'
            }
        }
    }
}
