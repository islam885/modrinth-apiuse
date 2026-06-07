import requests

def get_user_projects(username):
    """
    Получение всех проектов конкретного автора.
    Fetch all projects of a specific author.
    """
    url = f"https://api.modrinth.com/v2/user/{username}/projects"
    
    response = requests.get(url)
    if response.status_code == 200:
        projects = response.json()
        print(f"--- Проекты пользователя {username} ---")
        for p in projects:
            print(f"- {p['title']} ({p['project_type']})")
    else:
        print(f"Error: {response.status_code}")

if __name__ == "__main__":
    get_user_projects("jellysquid3")
