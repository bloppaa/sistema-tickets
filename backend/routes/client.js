import express from "express";

const router = express.Router();

// TODO: Datos de prueba. Eliminar una vez conectada la base de datos
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
// Campos requeridos para métodos POST y PUT
const requiredFields = ["name", "rut", "companyRut", "email", "password"];

// Obtener todos los clientes
router.get("/", (req, res) => {
  return res.status(200).send(clients);
});

// Buscar cliente por id
router.get("/:id", (req, res) => {
  const client = clients.find((c) => c.id === parseInt(req.params.id));

  if (!client) {
    return res.status(404).send({ message: "client not found" });
  }

  return res.status(200).send(client);
});

// Crear cliente
router.post("/", (req, res) => {
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

  return res.status(201).send({ message: "client created", client: newClient });
});

// Actualizar cliente
router.put("/:id", (req, res) => {
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

  return res.status(200).send({ message: "client updated", client: client });
});

// Eliminar client
router.delete("/:id", (req, res) => {
  const client = clients.find((c) => c.id === parseInt(req.params.id));

  if (!client) {
    return res.status(404).send({ message: "client not found" });
  }

  const index = clients.indexOf(client);
  clients.splice(index, 1);

  return res.status(200).send({ message: "client deleted", client: client });
});

export default router;
