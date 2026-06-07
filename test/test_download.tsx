import axios from 'axios';

interface ModrinthVersion {
    version_number: string;
    files: { url: string; filename: string }[];
}

async function getLatestDownload(projectId: string) {
    /**
     * Получение прямой ссылки на скачивание последней версии.
     * Get direct download link for the latest version.
     */
    const url = `https://api.modrinth.com/v2/project/${projectId}/version`;

    try {
        const response = await axios.get<ModrinthVersion[]>(url);
        if (response.data.length > 0) {
            const latest = response.data[0];
            const file = latest.files[0];
            console.log(`Latest Version: ${latest.version_number}`);
            console.log(`Download URL: ${file.url}`);
            console.log(`Filename: ${file.filename}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

getLatestDownload('AAN9GoNs');
