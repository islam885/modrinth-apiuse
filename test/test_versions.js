const axios = require('axios');

async function listVersions(projectId) {
    /**
     * Список всех версий мода.
     * List all versions of a mod.
     */
    const url = `https://api.modrinth.com/v2/project/${projectId}/version`;

    try {
        const response = await axios.get(url);
        console.log(`--- Versions for ${projectId} ---`);
        response.data.forEach(v => {
            console.log(`v${v.version_number} (${v.loaders.join(', ')}) - Published: ${v.date_published}`);
        });
    } catch (error) {
        console.error('Error fetching versions:', error.message);
    }
}

listVersions('AAN9GoNs');
