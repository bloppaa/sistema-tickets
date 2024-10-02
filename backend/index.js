import express from "express";
import "dotenv/config";
import clientRouter from "./routes/client.js";
import userRouter from "./routes/user.js";

const app = express();
const port = process.env.PORT | 3000;

app.use(express.json());

app.use("/clients", clientRouter);
app.use("/users", userRouter);

app.get("/", (req, res) => {
  return res
    .status(200)
    .send("<img src='https://i.imgflip.com/7llvbo.jpg' width='250'>");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
