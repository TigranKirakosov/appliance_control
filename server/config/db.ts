import mongoose from 'mongoose';
import config from './default.json';
import userModel from '../models/user.model';
import applianceModel from '../models/appliance.model';

const link = config['mongoURI'];

const connectDB = async () => {
    try {
        await mongoose.connect(link, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('MongoDB Atlas Connected...');
    } catch (error) {
        console.error(error);

        process.exit(1);
    }
};

export const db = {
    User: userModel,
    Appliance: applianceModel
};

export default connectDB;
