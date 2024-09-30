import express from "express";

const router = express.Router();

// clients de prueba
const clients = [
  {
    id: 1,
    name: "Juan",
    rut: "1234",
    rut_company: "aaa111",
    email: "juan@gmail.com",
    pasword: "a1",
  },
  {
    id: 2,
    name: "Maria",
    rut: "2345",
    rut_company: "bbb222",
    email: "maria@gmail.com",
    pasword: "b2",
  },
];

// Obtener clients
router.get("/", (req, res) => {
  res.status(200).json(clients);
});

// Buscar client por id
router.get("/:id", (req, res) => {
  const client = clients.find((c) => c.id === parseInt(req.params.id));

  if (!client) {
    return res.status(404).send("client no encontrado");
  } else {
    res.status(200).send(client);
  }
});

// Crear client
router.post("/", (req, res) => {
  const new_client = {
    id: clients.length + 1,
    name: req.body.name,
    rut: req.body.rut,
    rut_company: req.body.rut_company,
    email: req.body.email,
    pasword: req.body.pasword,
  };
  clients.push(new_client);
  res.status(201).send(new_client);
});

// Actualizar client
router.put("/:id", (req, res) => {
  const client = clients.find((c) => c.id === parseInt(req.params.id));

  if (!client) {
    return res.status(404).send("client no encontrado");
  }
  client.name = req.body.name;
  client.rut = req.body.rut;
  client.rut_company = req.body.rut_company;
  client.email = req.body.email;
  client.pasword = req.body.pasword;
  res.status(200).send(client);
});

// Eliminar client
router.delete("/:id", (req, res) => {
  const client = clients.find((c) => c.id === parseInt(req.params.id));
  if (!client) {
    return res.status(404).send("client no encontrado");
  }
  const index = clients.indexOf(client);
  clients.splice(index, 1);
  res.status(200).send(client);
});

export default router;
