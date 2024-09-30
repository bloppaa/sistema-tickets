import express from "express";

const app = express();

app.use(express.json());

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

// Obtener clients
app.get("/clients", (req, res) => {
  res.status(200).json(clients);
});

// Buscar client por id
app.get("/clients/:id", (req, res) => {
  const client = clients.find((c) => c.id === parseInt(req.params.id));

  if (!client) {
    return res.status(404).send("client no encontrado");
  }
  else {
    res.status(200).send(client);
  }
});

// Crear client
app.post("/clients", (req, res) => {
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
app.put("/clients/:id", (req, res) => {
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
app.delete("/clients/:id", (req, res) => {
  const client = clients.find((c) => c.id === parseInt(req.params.id));
  if (!client) {
    return res.status(404).send("client no encontrado");
  }
  const index = clients.indexOf(client);
  clients.splice(index, 1);
  res.status(200).send(client);
});

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

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
