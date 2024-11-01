import prismaClient from "../../prisma";

interface GameRequest{
    category_id: string;
}

class ListByCategoryService{
    async execute({ category_id }: GameRequest){

        const findByCategory = await prismaClient.game.findMany({
            where:{
                categoryId: category_id
            }
        })

        return findByCategory;
        
    }
}

export { ListByCategoryService }