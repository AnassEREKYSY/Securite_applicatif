const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const uuid = require('uuid');
const { getRegisteredUsers } = require('./inMemoryUserRepository');

app.use(bodyParser.json());

//exo5 
const logHeaders = (req, res, next) => {
    console.log('Request Headers:', req.headers);
    next();
};

const firewall = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log('Authorization Header:', authHeader);
    if (!authHeader || !global.authenticatedUsers[authHeader]) {
        console.log('Token invalide ou manquant');
        return res.status(403).send('Accès interdit. Token manquant ou invalide.');
    }
    console.log('Token valide');
    next();
};

// Liste des URL autorisées (à adapter selon vos besoins)
const allowedUrls = ['/hello'];

// Activation sélective du middleware firewall
app.use(logHeaders);
app.use((req, res, next) => {
    if (allowedUrls.includes(req.path)) {
        return next();
    }
    firewall(req, res, next);
});









// exo 4 
app.get('/hello', (req, res) => {
    res.send('<h1>hello</h1>');
});

app.get('/restricted1', (req, res) => {
    const token = req.headers.token;
    if (!token || token !== '42') {
        return res.status(403).json({ message: 'Accès interdit. Token manquant ou invalide.' });
    }
    res.json({ message: 'topsecret' });
});

app.get('/restricted2', (req, res) => {
    const token = req.headers.token;
    if (!token || token !== '42') {
        return res.status(403).send('Accès interdit. Token manquant ou invalide.');
    }
    res.send('<h1>Admin space</h1>');
});





//exo6

// const generateRandomToken = () => {
//     return Math.random().toString(36).substr(2);
// };
app.post('/authenticate', (req, res) => {
    const { email, password } = req.body;
    const user = checkCredentials(email, password);
    if (!user) {
        return res.status(403).send('Accès interdit. Identifiants invalides.');
    }
    const token = uuid.v4();
    global.authenticatedUsers[token] = { email: user.email };
    res.json({ token });
});


//exo7
const checkCredentials = (email, password) => {
    const users = getRegisteredUsers();
    return users.find(user => user.email === email && user.password === password);
};

global.authenticatedUsers = {};










// Port d'écoute
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
