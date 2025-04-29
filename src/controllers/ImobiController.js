import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async createImobi(req, res) {
    try {
      const thumb = req.file.filename;
      const { id, tipo, endereco, cidade, uf, valor, descricao } = req.body;
      const user = await prisma.user.findUnique({where: {id: Number(id)}});

      if(!user){
        return res.json({message: "Usuário não encontrado"});
      }

      const imobi = await prisma.imobi.create({
        data:{
          thumb,
          tipo,
          endereco,
          cidade, 
          uf, 
          valor, 
          descricao,
          userId: user.id
        }
      });

      return res.json(imobi);
    } catch (error) {
      return res.json({ message: error.message });
    }
  },
  async findAllImobi(req, res) {
    try {
      const imobi = await prisma.imobi.findMany();

      return res.json(imobi);
    } catch (error) {
      return res.json({ message: error.message });
    }
  },
  async findImobi(req, res) {
    try {
      const {id} = req.params;
      const imobi = await prisma.imobi.findUnique({where: {id: Number(id)}});

      if (!imobi){
        return res.json({message: "Não foi possivel encontrar o imóvel"});
      }

      return res.json(imobi);
    } catch (error) {
      return res.json({ message: error.message });
    }
  }
};
