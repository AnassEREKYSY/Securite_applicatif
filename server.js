const express = require('express');
const app = express();

//exo5 
const logHeaders = (req, res, next) => {
    console.log('Request Headers:', req.headers);
    next();
};
const firewall = (allowedUrls) => {
    return (req, res, next) => {
        const requestedUrl = req.originalUrl;
        if (allowedUrls.includes(requestedUrl)) {
            next();
        } else {
            const token = req.headers.token;
            if (!token || token !== '42') {
                return res.status(403).send('Accès interdit. Token manquant ou invalide.');
            }
            next();
        }
    };
};

const allowedUrls = ['/hello'];
app.use(logHeaders); 
app.use(firewall(allowedUrls));









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









// Port d'écoute
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
