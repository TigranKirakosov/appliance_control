export enum IWSChannels {
    DEFAULT = 'DEFAULT',
    SET_POWER = 'SET_POWER',
    SET_PROGRAMM = 'SET_PROGRAMM',
    THIRD = 'THIRD'
};

export enum IWSNotification {
    PROCESSING = 'PROCESSING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
};

export interface IWSMessageConfig {
    channel: string;
    data: any;
};
