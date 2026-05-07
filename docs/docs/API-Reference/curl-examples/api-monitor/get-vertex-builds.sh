curl -X GET \
  "$IDRFLOW_URL/api/v1/monitor/builds?flow_id=$FLOW_ID" \
  -H "accept: application/json" \
  -H "x-api-key: $IDRFLOW_API_KEY"
