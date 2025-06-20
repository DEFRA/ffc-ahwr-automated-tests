def preMHFailed = false

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
                branch "$GIT_BRANCH_ALERTS"
            }
            options {
                timeout(time: 1, unit: 'MINUTES')
            }
            steps {
                sh './scripts/remove_alert.sh "$AZURE_STORAGE_CONNECTION_STRING_JENKINS_FAILURES" "main"'
            }
        }
        stage('Pull Service Images (ACR)') {
            options {
                timeout(time: 3, unit: 'MINUTES')
            }
            steps {
                sh './scripts/pull_latest_acr_images.sh'
            }
        }
        stage('Build WDIO (testing) Image') {
            options {
                timeout(time: 3, unit: 'MINUTES')
            }
            steps {
                sh './scripts/build_wdio_test_image.sh'
            }
        }
        stage('Run pre-MH Tests') {
            options {
                timeout(time: 7, unit: 'MINUTES')
            }
            steps {
                script {
                    try {
                        sh './scripts/run_tests.sh preMH'
                    } catch (err) {
                        echo "⚠️ preMH tests failed"
                        preMHFailed = true
                    }
                }
            }
        }
        stage('Run post-MH Tests') {
            options {
                timeout(time: 7, unit: 'MINUTES')
            }
            steps {
                sh './scripts/run_tests.sh postMH'
            }
        }

         stage('Run compliance Tests') {
            options {
                timeout(time: 7, unit: 'MINUTES')
            }
            steps {
                sh './scripts/run_tests.sh preMH 4'
            }
        }
    }
    post {
        always {
            script {
                if (preMHFailed) {
                    error("❌ Failing pipeline because preMH tests failed")
                }
            }
        }
        failure {
            script {
                if (env.GIT_BRANCH == "$GIT_BRANCH_ALERTS") {
                    sh './scripts/send_alert.sh "$AZURE_STORAGE_CONNECTION_STRING_JENKINS_FAILURES" "main" "$RUN_NUMBER"'
                    echo "ℹ️ Sending alert as tests failed"
                } else {
                    echo "ℹ️ Only send alert for branch: $GIT_BRANCH_ALERTS"
                }
            }
        }
    }
}
