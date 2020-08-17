import mongoose, { Schema, Document } from 'mongoose';
import userModel, { IUser } from './user.model';

export enum EAppliance {
    WASHER = 'WASHER',
    OVEN = 'OVEN',
    REFRIGERATOR = 'REFRIGERATOR'
};

const ApplianceSchema = new Schema({
    type: { type: String, required: true },
    state: {
        isOn: { type: Boolean, default: false },
        startDelay: { type: Number, default: 0 },
        workDuration: { type: Number, required: true }
    },
    owner: { type: Schema.Types.ObjectId, default: null },
    ownerName: { type: String, default: null }
});

export interface IAppliance extends Document {
    type: EAppliance;
    state: {
        isOn: boolean;
        startDelay: number;
        workDuration: number;
    };
    owner: IUser['_id'] | null;
    ownerName: IUser['nickName'] | null;
};

export default mongoose.model<IAppliance>('Appliance', ApplianceSchema);
