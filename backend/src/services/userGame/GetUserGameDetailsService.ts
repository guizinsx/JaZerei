import prismaClient from "../../prisma";

interface GetUserGameDetailsRequest {
    userId: string;
    gameId: string;
}

class GetUserGameDetailsService {
    async execute({ userId, gameId }: GetUserGameDetailsRequest) {
        const userGame = await prismaClient.userGame.findUnique({
            where: {
                userId_gameId: { userId, gameId }
            },
            include: {
                game: true
            }
        });

        if (!userGame) {
            throw new Error("Game not found in user's profile");
        }

        return userGame;
    }
}

export { GetUserGameDetailsService };
