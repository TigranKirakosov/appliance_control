import express from 'express';
import { db } from '../../../config/db';
import authMiddleware from '../middleware/auth.middleware';

const applianceRouter = express.Router();

/*  @route   POST api/appliances
    @desc    Register appliance
    @access  Private
*/
applianceRouter.post('/', authMiddleware, async (req, res) => {
    const { id: userId } = (req as any).user;
    
    const { type: applianceType } = req.body;

    try {
        const user = await db.User.findById(userId);

        if (!user) {
            return res
                .status(404)
                .json({ errors: [{ msg: 'User does not exist' }] });
        }

        const appliance = new db.Appliance({
            type: applianceType,
            state: {
                isOn: false,
                startDelay: 0,
                workDuration: 50000
            },
            owner: userId,
            ownerName: user.nickName
        });

        await appliance.save();

        res.json(appliance);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

/*  @route   GET api/appliances
    @desc    Get appliances
    @access  Public
*/
applianceRouter.get('/', async (req, res) => {
    try {
        const appliances = await db.Appliance.find();

        if (!appliances) {
            return res
                .status(404)
                .json({ errors: [{ msg: 'Not found' }] });
        }

        res.json(appliances);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

/*  @route   PUT api/appliances/:id
    @desc    Register appliance for user
    @access  Private
*/
applianceRouter.put('/:id', authMiddleware, async (req, res) => {
    const { id: userId } = (req as any).user;

    const { id: applianceId } = req.params;

    try {
        const user = await db.User.findById(userId);

        if (!user) {
            return res
                .status(404)
                .json({ errors: [{ msg: 'User does not exist' }] });
        }

        let appliance = await db.Appliance.findOne({ _id: applianceId, owner: null });

        if (!appliance) {
            return res
                .status(404)
                .json({ errors: [{ msg: 'Not found an available appliance for the provided type' }] });
        }

        appliance.owner = userId;
        appliance.ownerName = user.nickName;

        await appliance.save();

        res.json(appliance);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

/*  @route   DELETE api/appliances/:id
    @desc    Unregister appliance from user
    @access  Private
*/
applianceRouter.delete('/:id', authMiddleware, async (req, res) => {
    const { id: userId } = (req as any).user;
    
    const { id: applianceId } = req.params;

    try {
        let appliance = await db.Appliance.findOne({ _id: applianceId, owner: userId });

        if (!appliance) {
            return res
                .status(404)
                .json({ errors: [{ msg: 'Not Found' }] });
        }

        appliance.owner = null;
        appliance.ownerName = null;

        await appliance.save();

        res.status(200).send('Success');
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

export default applianceRouter;
