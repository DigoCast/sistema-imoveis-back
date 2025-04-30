import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
    async createMessage(req, res){
        const {client_name, client_email, client_mensagem, userId} = req.body;

        try {
            let messagem = await prisma.messages.findFirst({ where: { client_email } });

            if(messagem){
                return res.json({
                    error: true,
                    message: "OPS! sua mensagem ja foi enviada, aguarde uma resposta do anunciante!"
                });
            }

            messagem = await prisma.messages.create({
                data:{
                    client_name,
                    client_email,
                    client_mensagem,
                    userId
                }
            });

            return res.json({
                error: false,
                message: "Sua mensagem foi enviada para o anunciante com sucesso!",
                messagem
            })
        } catch (error) {
            return res.json({message: error.message})        
        }
    },
    async findMessage(req, res) {
        try {
            const {id} = req.params;

            const messagem = await prisma.messages.findMany({
                where: {userId: Number(id)}
            })

            return res.json({messagem})
        } catch (error) {
            return res.json({message: error.message})
        }
    }
}