import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken'

interface AuthRequest {
    email: string;
    password: string;
}

class AuthUserService {
    async execute({ email, password }: AuthRequest) {
        // verificar se o email existe.
        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });

        if (!user) {
            throw new Error("User/password incorrect");
        }

        // Verificar se a senha está correta, considerando que `password` pode ser null
        if (user.password && password) {
            const passwordMatch = await compare(password, user.password);
            if (!passwordMatch) {
                throw new Error("User/password incorrect");
            }
        } else {
            // Lidar com caso de usuário sem senha (talvez logado com Steam)
            throw new Error("User has no password set");
        }

        // Se deu tudo certo vamos gerar o token do usuario
        const token = sign(
            {
                name: user.username,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '30d'
            }
        )

        return {
            id: user.id,
            name: user.username,
            email: user.email,
            token: token
        };
    }
}

export { AuthUserService };
