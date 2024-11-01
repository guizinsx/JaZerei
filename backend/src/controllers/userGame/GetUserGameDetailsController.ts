import { Request, Response } from "express";
import { GetUserGameDetailsService } from "../../services/userGame/GetUserGameDetailsService";

class GetUserGameDetailsController {
    async handle(req: Request, res: Response) {
        const userId = req.user_id;  
        const { gameId } = req.params;

        const getUserGameDetailsService = new GetUserGameDetailsService();

        try {
            const userGame = await getUserGameDetailsService.execute({
                userId,
                gameId
            });
            return res.json(userGame);
        } catch (error) {
            return res.status(404).json({ error: error.message });
        }
    }
}

export { GetUserGameDetailsController };
