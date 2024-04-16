const jose = require('jose'); 
const secret = new TextEncoder().encode('Marianaaaaaaa');



const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'Token is required' });
    try {
        const decoded = jose.jwtVerify(token, secret);
        req.user = decoded.username;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};
module.exports = { verifyToken };