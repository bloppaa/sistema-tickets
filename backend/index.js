import express from "express";
import "dotenv/config";
import clientsRoute from './routes/clientsRoute.js';

const app = express();
const port = process.env.PORT;

app.use(express.json());

// users de prueba (técnicos)
const users = [
  {
    id: 1,
    name: "tec_name A",
    rut: "11111",
    email: "company1@gmail.com",
    pasword: "tec1",
  },
  {
    id: 2,
    name: "tec_name b",
    rut: "22222",
    email: "company2@gmail.com",
    pasword: "tec2",
  },
];

// Página principal
app.get("/", (req, res) => {
  res.status(200).send("Node JS api");
});

app.use('/clients', clientsRoute);

// Obtener users
app.get("/users", (req, res) => {
  res.status(200).json(users);
});

// Buscar user por id
app.get("/users/:id", (req, res) => {
  const user = users.find((c) => c.id === parseInt(req.params.id));

  if (!user) {
    return res.status(404).send("User not found");
  }
  res.status(200).send(user);
});

// Crear user
app.post("/users", (req, res) => {
  const new_user = {
    id: users.length + 1,
    name: req.body.name,
    rut: req.body.rut,
    email: req.body.email,
    pasword: req.body.pasword,
  };
  users.push(new_user);
  res.status(201).send(new_user);
});

// Actualizar user
app.put("/users/:id", (req, res) => {
  const user = users.find((c) => c.id === parseInt(req.params.id));

  if (!user) {
    return res.status(404).send("User not found");
  }
  user.name = req.body.name;
  user.rut = req.body.rut;
  user.email = req.body.email;
  user.pasword = req.body.pasword;
  res.status(200).send(user);
});

// Eliminar user
app.delete("/users/:id", (req, res) => {
  const user = users.find((c) => c.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).send("User not found");
  }
  const index = users.indexOf(user);
  users.splice(index, 1);
  res.status(200).send(user);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
