import axios from 'axios';

const STEAM_API_URL = 'http://api.steampowered.com';
const STEAM_STORE_API_URL = 'https://store.steampowered.com/api';

class SteamApiService {
    static async fetchGameList() {
        try {
            const response = await axios.get(`${STEAM_API_URL}/ISteamApps/GetAppList/v0002/`, {
                params: { format: 'json' }
            });

            const validGames = response.data.applist.apps.filter((game: any) => game.name);
            return validGames;
        } catch (error) {
            console.error('Error fetching Steam game list:', error);
            throw new Error('Error fetching Steam game list');
        }
    }

    static async fetchGameDetails(appid: number) {
        try {
            const response = await axios.get(`${STEAM_STORE_API_URL}/appdetails`, {
                params: { appids: appid }
            });

            if (response.data[appid]?.success) {
                return response.data[appid].data;
            } else {
                console.warn(`No valid details found for appid: ${appid}`);
                return null;
            }
        } catch (error) {
            console.error(`Error fetching details for game ${appid}:`, error);
            return null;
        }
    }

    static async fetchPopularGameDetails(appIds: number[] = []) {
        if (!appIds.length) {
            console.error('No appIds provided for fetching popular game details.');
            return [];
        }
    
        console.log('Starting fetchPopularGameDetails with appIds:', appIds);
    
        try {
            const gameDetails = await Promise.all(appIds.map(async (appid) => {
                try {
                    const response = await axios.get(`${STEAM_STORE_API_URL}/appdetails`, {
                        params: { appids: appid }
                    });
                    return response.data[appid].success ? response.data[appid].data : null;
                } catch (error) {
                    console.error(`Error fetching details for game ${appid}:`, error.message);
                    return null;
                }
            }));
            return gameDetails.filter((game) => game !== null);
        } catch (error) {
            console.error('Error fetching details of popular games:', error.message);
            throw new Error(`Error fetching details of popular games: ${error.message}`);
        }
    }
}

export default SteamApiService;
