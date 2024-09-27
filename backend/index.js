const express = require("express")
const app = express()

app.use(express.json()); //recibir datos en formato JSON

//usuarios de prueba 
const usuarios = [
    { id: 1, name: "Juan" },
    { id: 2, name: "Maria" }
];
//clientes de prueba 
const clientes = [
    { id: 1, name: "Cliente A" },
    { id: 2, name: "Cliente B" }
];

app.get('/', (req, res) => {
    res.send ('Node JS api');
});

////////Trabajar con usuarios////////

// GET LISTA
app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

//Buscar
app.get('/usuarios/:id', (req, res) => {
    const usuario = usuarios.find(c => c.id === parseInt(req.params.id));
    
    if (!usuario) return res.status(404).send('Usuario no encontrado');
    else res.send(usuario);
});

// POST
app.post('/usuarios', (req, res) => {
    const nuevoUsuario = {
        id: usuarios.length+1,
        name: req.body.name
    };
    usuarios.push(nuevoUsuario);
    res.send(nuevoUsuario);
});

// PUT
app.put('/usuarios/:id', (req, res) => {
    const usuario = usuarios.find(c => c.id === parseInt(req.params.id));
    
    if (!usuario) return res.status(404).send('Usuario no encontrado');
    usuario.name = req.body.name;

    res.send(usuario); 
});

// DELETE
app.delete('/usuarios/:id', (req, res) => {
    const usuario = usuarios.find(c => c.id === parseInt(req.params.id));
    if (!usuario) return res.status(404).send('Estudiante no encontrado');

    const index = usuarios.indexOf(usuario);
    usuarios.splice(index,1);
    res.send(usuario);
});


////////Trabajar con clientes////////

// GET LISTA
app.get('/clientes', (req, res) => {
    res.json(clientes);
});

//Buscar
app.get('/clientes/:id', (req, res) => {
    const cliente = clientes.find(c => c.id === parseInt(req.params.id));
    
    if (!cliente) return res.status(404).send('Cliente no encontrado');
    else res.send(cliente);
});

// POST
app.post('/clientes', (req, res) => {
    const nuevoCliente = {
        id: clientes.length+1,
        name: req.body.name
    };
    clientes.push(nuevoCliente);
    res.send(nuevoCliente);
});

// PUT
app.put('/clientes/:id', (req, res) => {
    const cliente = clientes.find(c => c.id === parseInt(req.params.id));
    
    if (!cliente) return res.status(404).send('Cliente no encontrado');
    cliente.name = req.body.name;

    res.send(cliente); 
});

// DELETE
app.delete('/clientes/:id', (req, res) => {
    const cliente = clientes.find(c => c.id === parseInt(req.params.id));
    if (!cliente) return res.status(404).send('Cliente no encontrado');

    const index = clientes.indexOf(cliente);
    clientes.splice(index,1);
    res.send(cliente);
});

//////// PUERTO A ESCUCHAR /////////

/*app.get('/', (req, res) => {
    res.status(200).send('<h1>Hola Mundo</h1>')
})
*/
app.listen(3000, () => {
    console.log('Listening on port 3000')
})