const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user; // Attach user info to request
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

const requireRole = (role) => (req, res, next) => {
    console.log('req.user:', req.user);
    if (req.user.role !== role) {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};

module.exports = { verifyToken, requireRole };
