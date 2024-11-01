import prismaClient from "../../prisma";

interface GameRequest {
    title: string;
    description: string;
    releaseDate: string;
    category_id: string;
}

class CreateGameService {
    async execute({ title, description, releaseDate, category_id }: GameRequest) {
        const releaseDateParsed = new Date(releaseDate);

        const defaultImageUrl = "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/10/header.jpg?t=1729702322";

        const game = await prismaClient.game.create({
            data: {
                title,
                description,
                imageUrl: defaultImageUrl,  // Usa a URL padrão
                releaseDate: releaseDateParsed,
                categoryId: category_id,
            },
        });

        return game;
    }
}

export { CreateGameService };
