pipeline {
    agent any
    environment {
        BRANCH_NAME = "${env.BRANCH_NAME}"
        RUN_NUMBER  = "${env.BUILD_NUMBER}"
        MESSAGE_QUEUE_PASSWORD = credentials('MESSAGE_QUEUE_PASSWORD')
        APPLICATIONINSIGHTS_CONNECTION_STRING = credentials('APPLICATIONINSIGHTS_CONNECTION_STRING')
        MESSAGE_QUEUE_SUFFIX = credentials('MESSAGE_QUEUE_SUFFIX')
        AZURE_STORAGE_CONNECTION_STRING = credentials('AZURE_STORAGE_CONNECTION_STRING')
        AZURE_STORAGE_CONNECTION_STRING_JENKINS_FAILURES = credentials('AZURE_STORAGE_CONNECTION_STRING_JENKINS_FAILURES')
    }
    stages {
        stage('Pre-run Cleanup: Remove Alert') {
            steps {
                sh './scripts/remove_alert.sh "$AZURE_STORAGE_CONNECTION_STRING_JENKINS_FAILURES" "$BRANCH_NAME"'
            }
        }
        stage('Pull Service Images (ACR)') {
            steps {
                sh './scripts/pull_latest_acr_images.sh'
            }
        }
        stage('Build WDIO (testing) Image') {
            steps {
                sh './scripts/build_wdio_test_image.sh'
            }
        }
        stage('Run Tests') {
            steps {
                sh './scripts/run_tests.sh "$AZURE_STORAGE_CONNECTION_STRING_JENKINS_FAILURES" "$BRANCH_NAME" "$RUN_NUMBER"'
            }
        }
    }
    post {
        failure {
            sh './scripts/send_alert.sh'
        }
    }
}
