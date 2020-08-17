export enum EAppliance {
    WASHER = 'WASHER',
    OVEN = 'OVEN',
    REFRIGERATOR = 'REFRIGERATOR'
};

export interface IAppliance {
    type: EAppliance;
    state: {
        isOn: boolean;
        startDelay: number;
        workDuration: number;
    };
    owner: string | null;
    ownerName: string | null;
    _id: string;
};
