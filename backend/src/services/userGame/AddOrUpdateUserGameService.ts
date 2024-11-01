import prismaClient from "../../prisma";
import { GameStatus } from "@prisma/client"; // Importe o enum se necessário

interface UserGameRequest {
    userId: string;
    gameId: string;
    status: GameStatus;
}

class AddOrUpdateUserGameService {
    async execute({ userId, gameId, status }: UserGameRequest) {
        const userGame = await prismaClient.userGame.upsert({
            where: {
                userId_gameId: { userId, gameId }
            },
            update: { status }, // Atualiza o status se já existir
            create: { userId, gameId, status }, // Cria se não existir
        });

        return userGame;
    }
}

export { AddOrUpdateUserGameService };
