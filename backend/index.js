import express from "express";
import "dotenv/config";
import clientsRoute from "./routes/clientsRoute.js";
import usersRoute from "./routes/usersRoute.js";

const app = express();
const port = process.env.PORT;

app.use(express.json());

// Página principal
app.get("/", (req, res) => {
  return res.status(200).send("Node JS api");
});

app.use("/clients", clientsRoute);
app.use("/users", usersRoute);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
