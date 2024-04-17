const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

//exo5 
const logHeaders = (req, res, next) => {
    console.log('Request Headers:', req.headers);
    next();
};

const firewall = () => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader || authHeader !== `Bearer ${global.token}`) {
            return res.status(403).send('Accès interdit. Token manquant ou invalide.');
        }
        next();
    };
};

//const allowedUrls = ['/hello'];
app.use(logHeaders); 
app.use(firewall);









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

const generateRandomToken = () => {
    return Math.random().toString(36).substr(2); // Génère un token aléatoire
};

app.post('/authenticate', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send('Email et mot de passe requis');
    }
    const token = generateRandomToken();
    global.token = token;
    res.json({ token });
});










// Port d'écoute
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
