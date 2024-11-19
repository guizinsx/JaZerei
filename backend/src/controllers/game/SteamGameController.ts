// src/controllers/game/SteamGameController.ts
import { Request, Response } from 'express';
import SteamApiService from '../../services/steam/SteamApiService';

class SteamGameController {
    private popularAppIds: number[] = [10, 570, 440, 304930, 578080];

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
        console.log('Starting fetchPopularGames with popularAppIds:', this.popularAppIds);

        try {
            const games = await SteamApiService.fetchPopularGameDetails(this.popularAppIds);
            return res.json(games);
        } catch (error) {
            console.error('Error fetching popular games:', error.message);
            return res.status(500).json({ error: 'Error fetching popular Steam games.', details: error.message });
        }
    }

    async searchGames(req: Request, res: Response) {
    const { query } = req.query as { query: string }; 
    
    console.log("Query recebida:", query);

    if (!query || query.length < 3) {
        console.error("Erro: termo de busca muito curto.");
        return res.status(400).json({ error: "Search term must be at least 3 characters." });
    }
    
    try {
        console.log("Chamando fetchGameList para buscar jogos...");
        const games = await SteamApiService.fetchGameList();
        console.log(`Total de jogos retornados: ${games.length}`);
        
        const filteredGames = games.filter(game =>
            game.name.toLowerCase().includes(query.toLowerCase())
        );
        console.log(`Total de jogos após filtro: ${filteredGames.length}`);
        
        return res.json(filteredGames);
    } catch (error) {
        console.error("Erro ao buscar jogos:", error.message);
        return res.status(500).json({ error: "Error searching Steam games.", details: error.message });
    }
}

}

export { SteamGameController };
