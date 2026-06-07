import requests
import json

def get_project_details(project_id):
    """
    Получение полной информации о проекте.
    Fetch full project details.
    """
    url = f"https://api.modrinth.com/v2/project/{project_id}"
    
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        print(json.dumps(data, indent=4, ensure_ascii=False))
    else:
        print(f"Failed to fetch project: {response.status_code}")

if __name__ == "__main__":
    # Example: Sodium Project ID
    get_project_details("AAN9GoNs")
