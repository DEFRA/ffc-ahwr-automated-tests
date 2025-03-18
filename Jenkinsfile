pipeline {
    agent any
    environment {
        MESSAGE_QUEUE_PASSWORD = credentials('MESSAGE_QUEUE_PASSWORD')
        APPLICATIONINSIGHTS_CONNECTION_STRING = credentials('APPLICATIONINSIGHTS_CONNECTION_STRING')
        MESSAGE_QUEUE_SUFFIX = credentials('MESSAGE_QUEUE_SUFFIX')
        AZURE_STORAGE_CONNECTION_STRING = credentials('AZURE_STORAGE_CONNECTION_STRING')
    }
    stages {
        stage('Pull ACR images') {
            steps {
                sh './scripts/pull_latest_acr_images.sh'
            }
        }
        stage('Build WDIO testing image') {
            steps {
                sh './scripts/build_wdio_test_image.sh'
            }
        }
        stage('Running tests') {
            steps {
                sh 'ls -lart'
                sh 'ls -lart ..'
                sh 'ls -lart ../..'
                sh 'docker image ls'
                sh './scripts/run_tests.sh'
            }
        }
    }
}
