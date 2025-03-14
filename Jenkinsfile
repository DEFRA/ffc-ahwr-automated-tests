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
                sh 'ls -ltr'
                sh 'rm -rf node_modules'
            }
        }
        stage('Test') {
            agent { dockerfile { reuseNode true } }
            steps {
                sh 'npm install --force'
                sh './scripts/run_tests.sh'
            }
        }
    }
}