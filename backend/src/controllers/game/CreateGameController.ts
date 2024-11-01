import { Request, Response } from "express";
import { CreateGameService } from "../../services/game/CreateGameService";

class CreateGameController {
    async handle(req: Request, res: Response) {
        const { title, description, releaseDate, category_id } = req.body;

        const createGameService = new CreateGameService();

        // chama o service sem passar o imageUrl, pois ele já usa a URL padrão
        const game = await createGameService.execute({
            title,
            description,
            releaseDate,
            category_id
        });

        return res.json(game);
    }
}

export { CreateGameController };
