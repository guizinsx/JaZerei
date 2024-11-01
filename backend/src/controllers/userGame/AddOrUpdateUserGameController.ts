import { Request, Response } from "express";
import { AddOrUpdateUserGameService } from "../../services/userGame/AddOrUpdateUserGameService";

class AddOrUpdateUserGameController {
    async handle(req: Request, res: Response) {
        const { userId, gameId, status } = req.body;

        const addOrUpdateUserGameService = new AddOrUpdateUserGameService();

        const userGame = await addOrUpdateUserGameService.execute({
            userId,
            gameId,
            status
        });

        return res.json(userGame);
    }
}

export { AddOrUpdateUserGameController };
