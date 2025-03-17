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
        stage('Build Node 20 docker image for testing step') {
            steps {
                sh 'docker build --no-cache -t node-20-testing-image .'
            }
        }
        stage('Running tests on Node 20 image') {
            agent {
                docker {
                    image 'node-20-testing-image'
                    args '--privileged --volume /var/run/docker.sock:/var/run/docker.sock --volume /var/lib/docker:/var/lib/docker --user root'
                }
            }
            steps {
                sh 'rm -rf node_modules'
                sh 'npm install'
                sh './scripts/run_tests.sh'
            }
        }
    }
}
