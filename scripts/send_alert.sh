#!/bin/bash

AZURE_STORAGE_CONNECTION_STRING_JENKINS_FAILURES="$1"
AHWR_BRANCH="$2"
AHWR_RUN=$3

echo "🚨 Trigger Alert..."

az storage entity insert \
 --connection-string $AZURE_STORAGE_CONNECTION_STRING_JENKINS_FAILURES \
 --table-name ffcahwrjenkinsfailures \
 --if-exists replace \
 --entity PartitionKey="service_build_tests_failed" RowKey="service_build_tests_failed_$AHWR_BRANCH" Payload="{ \"branch\": \"main\", \"build\": $AHWR_RUN }"
