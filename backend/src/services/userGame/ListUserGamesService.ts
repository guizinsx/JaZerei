import prismaClient from "../../prisma";

interface ListUserGamesRequest {
    userId: string;
}

class ListUserGamesService {
    async execute({ userId }: ListUserGamesRequest) {
        const userGames = await prismaClient.userGame.findMany({
            where: { userId },
            select: {
                id: true,
                status: true,
                game: {
                    select: {
                        title: true,
                        imageUrl: true
                    }
                }
            }
        });

        return userGames;
    }
}

export { ListUserGamesService };
