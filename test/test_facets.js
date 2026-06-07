const axios = require('axios');

async function searchWithFacets() {
    /**
     * Сложный поиск с использованием фильтров (фасетов).
     * Complex search using facets/filters.
     */
    const url = "https://api.modrinth.com/v2/search";
    const params = {
        query: "Performance",
        facets: JSON.stringify([
            ["versions:1.20.1"],
            ["categories:optimization"],
            ["project_type:mod"]
        ])
    };

    try {
        const response = await axios.get(url, { params });
        console.log(`Found ${response.data.total_hits} mods matching criteria`);
        response.data.hits.forEach(h => console.log(`- ${h.title}`));
    } catch (e) {
        console.error(e.message);
    }
}

searchWithFacets();
