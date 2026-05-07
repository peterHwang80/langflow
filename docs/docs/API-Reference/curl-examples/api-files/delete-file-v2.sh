curl -X DELETE \
  "$IDRFLOW_URL/api/v2/files/$FILE_ID" \
  -H "accept: application/json" \
  -H "x-api-key: $IDRFLOW_API_KEY"
