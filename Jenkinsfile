pipeline {
    agent any
    options {
        disableConcurrentBuilds()
    }
    environment {
        BRANCH_NAME = "${env.GIT_BRANCH}"
        RUN_NUMBER  = "${env.BUILD_NUMBER}"
        MESSAGE_QUEUE_PASSWORD = credentials('MESSAGE_QUEUE_PASSWORD')
        APPLICATIONINSIGHTS_CONNECTION_STRING = credentials('APPLICATIONINSIGHTS_CONNECTION_STRING')
        MESSAGE_QUEUE_SUFFIX = credentials('MESSAGE_QUEUE_SUFFIX')
        AZURE_STORAGE_CONNECTION_STRING = credentials('AZURE_STORAGE_CONNECTION_STRING')
        AZURE_STORAGE_CONNECTION_STRING_JENKINS_FAILURES = credentials('AZURE_STORAGE_CONNECTION_STRING_JENKINS_FAILURES')
        GIT_BRANCH_ALERTS = 'origin/main'
    }
    stages {
        stage('Pre-run Cleanup: Remove Alert') {
            when {
                branch origin/AHWR-832
//                 branch "$GIT_BRANCH_ALERTS"
            }
            steps {
                sh './scripts/remove_alert.sh "$AZURE_STORAGE_CONNECTION_STRING_JENKINS_FAILURES" "main"'
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
                sh './scripts/run_tests.sh'
            }
        }
    }
    post {
        failure {
            script {
                if (env.GIT_BRANCH == "$GIT_BRANCH_ALERTS") {
                    // Removing due to pipeline bug where Jenkins cant talk to Azure in SND
                    // sh './scripts/send_alert.sh "$AZURE_STORAGE_CONNECTION_STRING_JENKINS_FAILURES" "main" "$RUN_NUMBER"'
                    echo "ℹ️ Not sending alert as disabled"
                } else {
                    echo "ℹ️ Only send alert for branch: $GIT_BRANCH_ALERTS"
                }
            }
        }
    }
}
