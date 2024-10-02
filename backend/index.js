import express from "express";
import "dotenv/config";
import clientRoutes from "./routes/clientRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use("/clients", clientRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  return res
    .status(200)
    .send("<img src='https://i.imgflip.com/7llvbo.jpg' width='250'>");
});

app.use((req, res, next) => {
  return res.status(404).send({ message: "Page not found" });
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  return res.status(500).send({ message: "Oops, something went wrong" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
