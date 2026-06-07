import requests

def get_statistics():
    """
    Статистика всей платформы Modrinth.
    Global Modrinth platform statistics.
    """
    url = "https://api.modrinth.com/v2/statistics"
    
    response = requests.get(url)
    if response.status_code == 200:
        stats = response.json()
        print("--- Modrinth Global Stats ---")
        print(f"Projects: {stats['project_count']}")
        print(f"Versions: {stats['version_count']}")
        print(f"Files: {stats['files_count']}")
        print(f"Authors: {stats['author_count']}")
    else:
        print("Failed to fetch stats")

if __name__ == "__main__":
    get_statistics()
