// src/controllers/game/SteamGameController.ts
import { Request, Response } from 'express';
import SteamApiService from '../../services/steam/SteamApiService';

class SteamGameController {
    private popularAppIds: number[] = [10, 570940, 440, 304930, 578080];

    async fetchGames(req: Request, res: Response) {
        try {
            const games = await SteamApiService.fetchGameList();
            return res.json(games);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error fetching Steam game list.", details: error.message });
        }
    }

    async fetchGameDetails(req: Request, res: Response) {
        const { appid } = req.params;
        try {
            const gameDetails = await SteamApiService.fetchGameDetails(Number(appid));

            const filteredDetails = {
                name: gameDetails.name,
                description: gameDetails.short_description,
                price: gameDetails.price_overview ? gameDetails.price_overview.final_formatted : 'Free',
                categories: gameDetails.categories?.map((category: any) => category.description) || [],
                header_image: gameDetails.header_image,
                release_date: gameDetails.release_date.date
            };

            return res.json(filteredDetails);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: `Error fetching details for game ${appid}.`, details: error.message });
        }
    }

    async fetchPopularGames(req: Request, res: Response) {
        try {
            const games = await SteamApiService.fetchPopularGameDetails(this.popularAppIds);
            return res.json(games);
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error fetching popular Steam games.', details: error.message });
        }
    }
}

export { SteamGameController };
