curl -X GET \
  "$IDRFLOW_URL/logs-stream" \
  -H "accept: text/event-stream" \
  -H "x-api-key: $IDRFLOW_API_KEY"
