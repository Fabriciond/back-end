const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const jose = require('jose');
const { verifyToken } = require('./Config/jwt');
app.use(cors());
app.use(bodyParser.json());


const productRoutes = require('./Routes/Product');
app.use('/products', verifyToken ,productRoutes())

app.get('/', verifyToken, (req, res) => {
    res.send('Hello World');
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (username !== 'admin' || password !== 'admin') {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const jwt = await new jose.SignJWT({ username: 'admin' })
        .setProtectedHeader({ alg })
        .setExpirationTime('2h')
        .sign(secret);
    res.json({ token: jwt });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
