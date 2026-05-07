import os

import requests

url = f"{os.getenv('IDRFLOW_URL', '')}/api/v1/build/{os.getenv('JOB_ID', '')}/events"

headers = {
    "accept": "application/json",
    "x-api-key": f"{os.getenv('IDRFLOW_API_KEY', '')}",
}

response = requests.request("GET", url, headers=headers)
response.raise_for_status()

print(response.text)
