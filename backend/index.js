import express from "express";
import "dotenv/config";
import clientRoutes from "./routes/clientRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT | 3000;

app.use(express.json());

app.use("/clients", clientRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  return res
    .status(200)
    .send("<img src='https://i.imgflip.com/7llvbo.jpg' width='250'>");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
