BASE_URL="${IDRFLOW_SERVER_URL:-$IDRFLOW_URL}"

curl -X POST \
  "$BASE_URL/api/v1/responses" \
  -H "x-api-key: $IDRFLOW_API_KEY" \
  -H "Content-Type: application/json" \
  -d @- <<EOF
{
  "model": "$FLOW_ID",
  "input": "Hello, my name is Alice"
}
EOF
