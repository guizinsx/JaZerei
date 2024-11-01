import prismaClient from "../../prisma";

interface RemoveUserGameRequest {
    userId: string;
    gameId: string;
}

class RemoveUserGameService {
    async execute({ userId, gameId }: RemoveUserGameRequest) {
        await prismaClient.userGame.delete({
            where: {
                userId_gameId: { userId, gameId }
            }
        });

        return { message: "game removed from user account with success" };
    }
}

export { RemoveUserGameService };
