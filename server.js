const express = require("express");
const authorRoutes = require("./src/routes/authorRoutes");
const bookRoutes = require("./src/routes/bookRoutes");

const app = express();

console.log("SERVIDOR NOVO CARREGADO");

app.use(express.json());

app.use("/authors", authorRoutes);
app.use("/books", bookRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API DevBooks funcionando!" });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});