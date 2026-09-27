const { PrismaClient } = require("@prisma/client");
const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");

const adapter = new PrismaBetterSqlite3({
  url: "file:./dev.db",
});

const prisma = new PrismaClient({ adapter });

const createAuthor = async (req, res) => {
  try {
    const { name, biography } = req.body;

    const author = await prisma.authors.create({
      data: {
        name,
        biography,
      },
    });

    return res.status(201).json(author);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Erro ao criar autor.",
    });
  }
};

module.exports = {
  createAuthor,
};