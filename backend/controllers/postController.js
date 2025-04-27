import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "No se puede obtener los posts" });
  }
};
export const createPost = async (req, res) => {
  const { nombre, descripcion } = req.body;
  try {
    const newPost = await prisma.post.create({
      data: {
        nombre,
        descripcion,
      },
    });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "No se pudo crear el posts" });
  }
};
export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPost = await prisma.post.delete({
      where: { id: Number(id) },
    });
    res.status(200).json(deletedPost);
  } catch (error) {
    res.status(500).json({ error: "No se pudo eliminar el post" });
  }
};
