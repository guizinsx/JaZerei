import { Request, Response } from "express";
import { RemoveUserGameService } from "../../services/userGame/RemoveUserGameService";

class RemoveUserGameController {
    async handle(req: Request, res: Response) {
        const { userId, gameId } = req.body;

        const removeUserGameService = new RemoveUserGameService();

        const result = await removeUserGameService.execute({
            userId,
            gameId
        });

        return res.json(result);
    }
}

export { RemoveUserGameController };
