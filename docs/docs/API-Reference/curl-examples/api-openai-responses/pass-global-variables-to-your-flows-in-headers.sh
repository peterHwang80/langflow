curl -X POST \
  "$IDRFLOW_SERVER_URL/api/v1/responses" \
  -H "x-api-key: $IDRFLOW_API_KEY" \
  -H "Content-Type: application/json" \
  -H "X-IDRFLOW-GLOBAL-VAR-OPENAI_API_KEY: sk-..." \
  -H "X-IDRFLOW-GLOBAL-VAR-USER_ID: user123" \
  -H "X-IDRFLOW-GLOBAL-VAR-ENVIRONMENT: production" \
  -d '{
    "model": "your-flow-id",
    "input": "Hello"
  }'
