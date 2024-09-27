const express = require("express")
const app = express()

app.use(express.json()); //recibir datos en formato JSON

//Clients de prueba (personas que requiere el requerimiento)
const Clients = [
    { id: 1, name: "Juan" , rut:"1234", rut_company: "aaa111", email: "juan@gmail.com", pasword: "a1"},
    { id: 2, name: "Maria" , rut:"2345", rut_company: "bbb222", email: "matia@gmail.com", pasword: "b2"},];
//Users de prueba  (Tecnicos)
const Users = [
    { id: 1, name: "tec_name A", rut: "11111", email: "company1@gmail.com", pasword:"tec1"},
    { id: 2, name: "tec_name b", rut: "22222", email: "company2@gmail.com", pasword:"tec2"},
];

app.get('/', (req, res) => {
    res.send ('Node JS api');
});

////////Trabajar con Clients////////

// GET LISTA
app.get('/Clients', (req, res) => {
    res.json(Clients);
});

//Buscar
app.get('/Clients/:id', (req, res) => {
    const client = Clients.find(c => c.id === parseInt(req.params.id));
    
    if (!client) return res.status(404).send('client no encontrado');
    else res.send(client);
});

// POST
app.post('/Clients', (req, res) => {
    const new_client = {
        id: Clients.length+1,
        name: req.body.name,
        rut: req.body.rut,
        rut_company: req.body.rut_company,
        email: req.body.email,
        pasword: req.body.pasword
    };
    Clients.push(new_client);
    res.send(new_client);
});

// PUT
app.put('/Clients/:id', (req, res) => {
    const client = Clients.find(c => c.id === parseInt(req.params.id));
    
    if (!client) return res.status(404).send('client not found');
    client.name = req.body.name;
    client.rut = req.body.rut;
    client.rut_company = req.body.rut_company;
    client.email = req.body.email;
    client.pasword = req.body.pasword;
    res.send(client); 
});

// DELETE
app.delete('/Clients/:id', (req, res) => {
    const client = Clients.find(c => c.id === parseInt(req.params.id));
    if (!client) return res.status(404).send('client not found');

    const index = Clients.indexOf(client);
    Clients.splice(index,1);
    res.send(client);
});


////////Trabajar con Users////////

// GET LISTA
app.get('/Users', (req, res) => {
    res.json(Users);
});

//Buscar
app.get('/Users/:id', (req, res) => {
    const User = Users.find(c => c.id === parseInt(req.params.id));
    
    if (!User) return res.status(404).send('User not found');
    else res.send(User);
});

// POST
app.post('/Users', (req, res) => {
    const new_user = {
        id: Users.length+1,
        name: req.body.name,
        rut: req.body.rut,
        email: req.body.email,
        pasword: req.body.pasword
    };
    Users.push(new_user);
    res.send(new_user);
});

// PUT
app.put('/Users/:id', (req, res) => {
    const User = Users.find(c => c.id === parseInt(req.params.id));
    
    if (!User) return res.status(404).send('User not found');
    user.name = req.body.name;
    user.rut = req.body.rut ;
    user.email = req.body.email ;
    user.pasword = req.body.pasword ;
    res.send(User); 
});

// DELETE
app.delete('/Users/:id', (req, res) => {
    const User = Users.find(c => c.id === parseInt(req.params.id));
    if (!User) return res.status(404).send('User not found');

    const index = Users.indexOf(User);
    Users.splice(index,1);
    res.send(User);
});

//////// PUERTO A ESCUCHAR /////////

/*app.get('/', (req, res) => {
    res.status(200).send('<h1>Hola Mundo</h1>')
})
*/
app.listen(3000, () => {
    console.log('Listening on port 3000')
})