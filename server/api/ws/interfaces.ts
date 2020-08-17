import WebSocket from "ws";
import { db } from '../../config/db';

interface IWSContext {
    db: typeof db;
};

export interface IWSProcessChannel {
    (socket: WebSocket, channel: string, data: any, ctx: IWSContext): void;
};

export interface IWSChannelHandler {
    (socket: WebSocket, data: any, ctx: IWSContext): void;
};

export interface IWSChannelHandlers {
    [key: string]: IWSChannelHandler[];
};

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
