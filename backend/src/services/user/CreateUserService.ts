import prismaClient from '../../prisma'
import { hash } from 'bcryptjs';


interface UserRequest{
    name: string;
    email: string;
    password: string;
}


class CreateUserService{
    async execute({name, email, password}: UserRequest){

        //verificar se ele enviou um email
        if(!email){
            throw new Error("Email incorrect")
        }

        //verificar se esse email ja está cadastrado na plataforma
        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(userAlreadyExists){
            throw new Error("User already exists (email already in use)")
        }

        const passwordHash = await hash(password, 8)

        const user = await prismaClient.user.create({
            data:{
                username: name, //username no meu caso
                email: email,
                password: passwordHash
            },
            select:{
                id: true,
                username:true,
                email:true,
            }
        })

        

        return user;
    }
}

export { CreateUserService}