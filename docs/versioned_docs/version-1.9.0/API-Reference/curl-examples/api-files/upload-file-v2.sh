curl -X GET \
  "$IDRFLOW_URL/api/v1/users/whoami" \
  -H "accept: application/json" \
  -H "x-api-key: $IDRFLOW_API_KEY"
