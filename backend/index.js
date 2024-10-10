import express from "express";
import "dotenv/config";
import sequelize from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/users", userRoutes);

// Middleware para manejar errores 404
app.use((req, res, next) => {
  return res.status(404).send({ message: "not found" });
})

// Middleware para manejar errores de servidor
app.use((err, req, res, next) => {
  console.error(err.stack);
  return res.status(500).send({ message: "internal server error" });
});


// Sincronizar tablas
await sequelize.sync();

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
