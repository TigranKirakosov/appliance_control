import jwt from 'jsonwebtoken';
import { IHttpMiddleware } from '../interfaces';
import config from '../../../config/default.json';

const authMiddleware: IHttpMiddleware = (req, res, next) => {
    const token = req.header('auth-token');

    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, config['jwtSecret']);

        req.user = (decoded as { user: string }).user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

export default authMiddleware;
