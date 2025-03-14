pipeline {
    agent { dockerfile true }
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