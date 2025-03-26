#!/bin/bash

AZURE_STORAGE_CONNECTION_STRING_JENKINS_FAILURES="$1"
AHWR_BRANCH="$2"

echo "🧽 Pre-run Cleanup: Remove Alert..."

az storage entity delete \
 --connection-string $AZURE_STORAGE_CONNECTION_STRING_JENKINS_FAILURES \
 --table-name ffcahwrjenkinsfailures \
 --partition-key "service_build_tests_failed" \
 --row-key "service_build_tests_failed_$AHWR_BRANCH"
