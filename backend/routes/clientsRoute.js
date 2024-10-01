import express from "express";

const clientsRouter = express.Router();

// clients de prueba
const clients = [
  {
    id: 1,
    name: "Juan",
    rut: "1234",
    companyRut: "aaa111",
    email: "juan@gmail.com",
    password: "a1",
  },
  {
    id: 2,
    name: "Maria",
    rut: "2345",
    companyRut: "bbb222",
    email: "maria@gmail.com",
    password: "b2",
  },
];
// Campos requeridos
const requiredFields = ["name", "rut", "companyRut", "email", "password"];

// Obtener clients
clientsRouter.get("/", (req, res) => {
  return res.status(200).send(clients);
});

// Buscar client por id
clientsRouter.get("/:id", (req, res) => {
  const client = clients.find((c) => c.id === parseInt(req.params.id));
  if (!client) {
    return res.status(404).send({ message: "client not found" });
  }
  return res.status(200).send(client);
});

// Crear client
clientsRouter.post("/", (req, res) => {
  try {
    if (!requiredFields.every((field) => req.body[field])) {
      return res.status(400).send({ message: "missing required fields" });
    }
    const newClient = {
      id: clients.length + 1,
      name: req.body.name,
      rut: req.body.rut,
      companyRut: req.body.companyRut,
      email: req.body.email,
      password: req.body.password,
    };
    clients.push(newClient);
    return res.status(201).send(newClient);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send({ message: err.message });
  }
});

// Actualizar client
clientsRouter.put("/:id", (req, res) => {
  try {
    if (!requiredFields.every((field) => req.body[field])) {
      return res.status(400).send({ message: "missing required fields" });
    }
    const client = clients.find((c) => c.id === parseInt(req.params.id));

    if (!client) {
      return res.status(404).send({ message: "client not found" });
    }
    client.name = req.body.name;
    client.rut = req.body.rut;
    client.companyRut = req.body.companyRut;
    client.email = req.body.email;
    client.password = req.body.password;
    return res.status(200).send(client);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
});

// Eliminar client
clientsRouter.delete("/:id", (req, res) => {
  const client = clients.find((c) => c.id === parseInt(req.params.id));
  if (!client) {
    return res.status(404).send({ message: "client not found" });
  }
  const index = clients.indexOf(client);
  clients.splice(index, 1);
  return res.status(200).send({ message: "client deleted", client: client });
});

export default clientsRouter;
