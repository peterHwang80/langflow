curl -X GET \
  "$IDRFLOW_URL/api/v1/projects/download/$PROJECT_ID" \
  -H "accept: application/json" \
  -H "x-api-key: $IDRFLOW_API_KEY" \
  --output langflow-project.zip
