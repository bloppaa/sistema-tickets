import express from "express";

const usersRouter = express.Router();

// users de prueba (técnicos)
const users = [
  {
    id: 1,
    name: "tec_name A",
    rut: "11111",
    email: "company1@gmail.com",
    password: "tec1",
  },
  {
    id: 2,
    name: "tec_name b",
    rut: "22222",
    email: "company2@gmail.com",
    password: "tec2",
  },
];
// Campos requeridos para métodos POST y PUT
const requiredFields = ["name", "rut", "email", "password"];

// Obtener users
usersRouter.get("/", (req, res) => {
  return res.status(200).send(users);
});

// Buscar user por id
usersRouter.get("/:id", (req, res) => {
  const user = users.find((c) => c.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).send({ message: "user not found" });
  }
  return res.status(200).send(user);
});

// Crear user
usersRouter.post("/", (req, res) => {
  try {
    if (!requiredFields.every((field) => req.body[field])) {
      return res.status(400).send({ message: "missing required fields" });
    }
    const newUser = {
      id: users.length + 1,
      name: req.body.name,
      rut: req.body.rut,
      email: req.body.email,
      password: req.body.password,
    };
    users.push(newUser);
    return res.status(201).send({ message: "user created", user: newUser });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
});

// Actualizar user
usersRouter.put("/:id", (req, res) => {
  try {
    if (!requiredFields.every((field) => req.body[field])) {
      return res.status(400).send({ message: "missing required fields" });
    }
    const user = users.find((c) => c.id === parseInt(req.params.id));
    if (!user) {
      return res.status(404).send({ message: "user not found" });
    }
    user.name = req.body.name;
    user.rut = req.body.rut;
    user.email = req.body.email;
    user.password = req.body.password;
    return res.status(200).send({ message: "user updated", user: user });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
});

// Eliminar user
usersRouter.delete("/:id", (req, res) => {
  const user = users.find((c) => c.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).send({ message: "user not found" });
  }
  const index = users.indexOf(user);
  users.splice(index, 1);
  res.status(200).send({ message: "user deleted", user: user });
});

export default usersRouter;
