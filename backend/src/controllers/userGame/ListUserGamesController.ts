import { Request, Response } from "express";
import { ListUserGamesService } from "../../services/userGame/ListUserGamesService";

class ListUserGamesController {
    async handle(req: Request, res: Response) {
        const { userId } = req.body;  

        const listUserGamesService = new ListUserGamesService();
        const userGames = await listUserGamesService.execute({ userId });  

        return res.json(userGames);
    }
}

export { ListUserGamesController };
