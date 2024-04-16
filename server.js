const express = require('express');
const app = express();
const PORT = 3000;

// Middleware pour vérifier le token
function checkToken(req, res, next) {
    const token = req.headers['token'];
    if (token && token === '42') {
        next(); // Si le token est valide, passe au middleware suivant
    } else {
        res.status(403).json({ message: 'Accès non autorisé' });
    }
}

// Route GET /hello
app.get('/hello', (req, res) => {
    res.send('<h1>hello</h1>');
});

// Route GET /restricted1 avec vérification du token
app.get('/restricted1', checkToken, (req, res) => {
    res.status(200).json({ message: 'topsecret' });
});

// Route GET /restricted2 avec vérification du token
app.get('/restricted2', checkToken, (req, res) => {
    res.send('<h1>Admin space</h1>');
});

// Lancement du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
