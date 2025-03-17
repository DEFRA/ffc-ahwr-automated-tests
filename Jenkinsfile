pipeline {
    agent any
    environment {
        MESSAGE_QUEUE_PASSWORD = credentials('MESSAGE_QUEUE_PASSWORD')
        APPLICATIONINSIGHTS_CONNECTION_STRING = credentials('APPLICATIONINSIGHTS_CONNECTION_STRING')
        MESSAGE_QUEUE_SUFFIX = credentials('MESSAGE_QUEUE_SUFFIX')
        AZURE_STORAGE_CONNECTION_STRING = credentials('AZURE_STORAGE_CONNECTION_STRING')
    }
    stages {
        stage('Build') {
            steps {
                sh './scripts/pull_latest_acr_images.sh'
            }
        }
        stage('Test') {
            agent {
                dockerfile {
                    filename 'Dockerfile'
                    args '--volume /var/run/docker.sock:/var/run/docker.sock --volume /var/lib/docker:/var/lib/docker'
                }
            }
            steps {
                sh 'npm install'
                sh './scripts/run_tests.sh'
            }
        }
    }
}