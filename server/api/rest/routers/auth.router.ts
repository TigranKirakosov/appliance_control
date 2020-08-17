import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import authMiddleware from '../middleware/auth.middleware';
import { db } from '../../../config/db';
import config from '../../../config/default.json';


const authRouter = express.Router();

/*  @route   GET api/auth
    @desc    Authenticate user
    @access  Public
*/
authRouter.get('/', authMiddleware, async (req, res) => {
    try {
        const user = await db.User.findById((req as any).user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
});

/*  @route   POST api/auth
    @desc    Login
    @access  Public
*/
authRouter.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await db.User.findOne({ email });

        if (!user) {
            return res
                .status(400)
                .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res
                .status(400)
                .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            config['jwtSecret'],
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

export default authRouter;
