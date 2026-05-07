import os

import requests

url = f"{os.getenv('IDRFLOW_URL', '')}/api/v2/files"

headers = {
    "accept": "application/json",
    "x-api-key": f"{os.getenv('IDRFLOW_API_KEY', '')}",
}

response = requests.request("GET", url, headers=headers)
response.raise_for_status()

print(response.text)
