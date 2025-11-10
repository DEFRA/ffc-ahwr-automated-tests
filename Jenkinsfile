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
            when { branch "$GIT_BRANCH_ALERTS" }
            options { timeout(time: 1, unit: 'MINUTES') }
            steps {
                sh './scripts/remove_alert.sh "$AZURE_STORAGE_CONNECTION_STRING_JENKINS_FAILURES" "main"'
            }
        }

        stage('Remove Allure report artifacts') {
            options { timeout(time: 3, unit: 'MINUTES') }
            steps {
                sh './scripts/cleanup_allure-results.sh'
            }
        }

        stage('Pull Service Images (ACR)') {
            options {
                timeout(time: 3, unit: 'MINUTES')
                retry(3)
            }
            steps {
                sh './scripts/pull_latest_acr_images.sh'
            }
        }

        stage('Build WDIO (testing) Image') {
            options { timeout(time: 3, unit: 'MINUTES') }
            steps {
                sh './scripts/build_wdio_test_image.sh'
            }
        }

        stage('Run mainSuite Tests') {
            options { timeout(time: 12, unit: 'MINUTES') }
            steps {
                script {
                    if (!binding.hasVariable('testFailures')) { testFailures = [] }
                    runTestStage('mainSuite', './scripts/run_tests.sh mainSuite', testFailures)
                }
            }
        }

        stage('Run compliance Tests') {
            options { timeout(time: 7, unit: 'MINUTES') }
            steps {
                script {
                    if (!binding.hasVariable('testFailures')) { testFailures = [] }
                    runTestStage('compliance', './scripts/run_tests.sh comp 5', testFailures)
                }
            }
        }

        stage('Run compliance feature assurance Tests') {
            options { timeout(time: 7, unit: 'MINUTES') }
            steps {
                echo 'ℹ️ Skipped until the feature assurance is required again'
                // script {
                //     if (!binding.hasVariable('testFailures')) { testFailures = [] }
                //     runTestStage('complianceFA', './scripts/run_tests.sh compFA 5', testFailures)
                // }
            }
        }

        stage('Generate Allure test report') {
            options { timeout(time: 3, unit: 'MINUTES') }
            steps {
                sh './scripts/generate_allure_results.sh'
            }
        }
    }

    post {
        always {
            script {
                if (!binding.hasVariable('testFailures')) { testFailures = [] }
                echo 'ℹ️ Evaluating overall test results...'
                if (testFailures.size() > 0) {
                    echo "❌ One or more test stages failed: ${testFailures.join(', ')}"
                    currentBuild.result = 'FAILURE'
                } else {
                    echo '✅ All test stages passed successfully.'
                }
            }
        }

        failure {
            script {
                if (env.GIT_BRANCH == "$GIT_BRANCH_ALERTS") {
                    echo '⚠️ Sending alert as tests failed...'
                    sh './scripts/send_alert.sh "$AZURE_STORAGE_CONNECTION_STRING_JENKINS_FAILURES" "main" "$RUN_NUMBER"'
                } else {
                    echo "ℹ️ Only send alert for branch: $GIT_BRANCH_ALERTS"
                }
            }
        }
    }
}

def runTestStage(stageName, command, testFailures) {
    catchError(stageResult: 'FAILURE', buildResult: 'SUCCESS') {
        def status = sh(script: command, returnStatus: true)
        if (status != 0) {
            echo "❌ ${stageName} failed (exit code: ${status})"
            testFailures << stageName
            error("${stageName} failed")
        } else {
            echo "✅ ${stageName} passed"
        }
    }
}
