import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import * as config from '../../../config/default.json';
import { db } from '../../../config/db';

const userRouter = express.Router();

/*  @route   POST api/users
    @desc    Registration
    @access  Public
*/
userRouter.post('/', async (req, res) => {
    const { nickName, email, password } = req.body;

    try {
        let user = await db.User.findOne({ email });

        if (user) {
            return res
                .status(400)
                .json({ errors: [{ msg: 'User already exists' }] });
        }

        user = new db.User({
            nickName,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

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

export default userRouter;