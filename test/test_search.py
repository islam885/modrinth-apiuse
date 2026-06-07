import requests

def search_mods(query, limit=5):
    """
    Простой поиск модов по названию.
    Simple mod search by title.
    """
    url = "https://api.modrinth.com/v2/search"
    params = {
        "query": query,
        "limit": limit,
        "facets": '[["project_type:mod"]]'
    }
    
    response = requests.get(url, params=params)
    if response.status_code == 200:
        results = response.json()
        print(f"--- Результаты поиска для '{query}' ---")
        for hit in results['hits']:
            print(f"[{hit['author']}] {hit['title']} - {hit['downloads']} downloads")
    else:
        print(f"Error: {response.status_code}")

if __name__ == "__main__":
    search_mods("Sodium")
