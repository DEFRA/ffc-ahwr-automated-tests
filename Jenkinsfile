pipeline {
    agent { dockerfile true }
    environment {
        MESSAGE_QUEUE_PASSWORD = credentials('Message queue password')
        APPLICATIONINSIGHTS_CONNECTION_STRING = credentials('App insights connection')
        MESSAGE_QUEUE_SUFFIX = '-pipe'
        AZURE_STORAGE_CONNECTION_STRING = credentials('Azure Storage conn string')
    }
    stages {
        stage('Test') {
            steps {
                sh 'node --version'
                sh './scripts/pull_latest_acr_images.sh'
                sh 'npm install'
                sh './scripts/run_tests.sh'
            }
        }
    }
}