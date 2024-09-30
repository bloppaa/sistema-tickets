import express from "express";

const usersRouter = express.Router();

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

// Obtener users
usersRouter.get("/", (req, res) => {
  res.status(200).json(users);
});

// Buscar user por id
usersRouter.get("/:id", (req, res) => {
  const user = users.find((c) => c.id === parseInt(req.params.id));

  if (!user) {
    return res.status(404).send("User not found");
  }
  res.status(200).send(user);
});

// Crear user
usersRouter.post("/", (req, res) => {
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
usersRouter.put("/:id", (req, res) => {
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
usersRouter.delete("/:id", (req, res) => {
  const user = users.find((c) => c.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).send("User not found");
  }
  const index = users.indexOf(user);
  users.splice(index, 1);
  res.status(200).send(user);
});

export default usersRouter;
