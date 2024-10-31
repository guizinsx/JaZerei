import prismaClient from "../../prisma";

class ListCategoryService{
    async execute(){


        const category = await prismaClient.gameCategory.findMany({
            select:{
                id: true,
                name: true,
            }
        })

        return category;

    }
}

export { ListCategoryService }