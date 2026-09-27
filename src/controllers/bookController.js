const { PrismaClient } = require("@prisma/client");
const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");

const adapter = new PrismaBetterSqlite3({
  url: "file:./dev.db",
});

const prisma = new PrismaClient({ adapter });

const createBook = async (req, res) => {
  try {
    const { title, release_year, author_id } = req.body;

    const book = await prisma.books.create({
      data: {
        title,
        release_year,
        author: {
          connect: {
            id: author_id,
          },
        },
      },
    });

    return res.status(201).json(book);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Erro ao criar livro.",
    });
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await prisma.books.findMany({
      include: {
        author: true,
      },
    });

    return res.status(200).json(books);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Erro ao listar livros.",
    });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, release_year, author_id } = req.body;

    const book = await prisma.books.update({
      where: {
        id: id,
      },
      data: {
        title,
        release_year,
        author_id,
      },
    });

    return res.status(200).json(book);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Erro ao atualizar livro.",
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await prisma.books.delete({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      message: "Livro excluído com sucesso.",
      book: book,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Erro ao excluir livro.",
    });
  }
};

module.exports = {
  createBook,
  getBooks,
  updateBook,
  deleteBook,
};