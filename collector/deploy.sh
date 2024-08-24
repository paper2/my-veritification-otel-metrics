#!/bin/bash

# NOTE: add permission of cloud run deploy to cloud build service account
PROJECT_ID=test-github-actions-otel
gcloud run deploy collector \
--project=${PROJECT_ID} \
--region=asia-northeast1 \
--source . \
--allow-unauthenticated \
--port=4318