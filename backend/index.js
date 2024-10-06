import express from "express";
import "dotenv/config";
import clientRoutes from "./routes/clientRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/clients", clientRoutes);
app.use("/users", userRoutes);

// Página de inicio
app.get("/", (req, res) => {
  return res.status(200).send("<h1>Hola</h1>");
});

// Middleware para manejar errores 404
app.use((req, res, next) => {
  return res.status(404).send({ message: "Page not found" });
})

// Middleware para manejar errores de servidor
app.use((err, req, res, next) => {
  console.error(err.stack);
  return res.status(500).send({ message: "Oops, something went wrong" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
