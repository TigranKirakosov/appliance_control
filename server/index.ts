import express from 'express';
import connectDB, { db } from './config/db';
import jwt from 'jsonwebtoken';
import config from './config/default.json';
import authRouter from './api/rest/routers/auth.router';
import userRouter from './api/rest/routers/user.router';
import applianceRouter from './api/rest/routers/appliance.router';
import WebSocket, { Server, Data } from 'ws';
import { IWSMessageConfig } from './api/ws/interfaces';
import { processChannel } from './api/ws/routing';

const expressApp = express();

connectDB();

expressApp.use(express.json());
expressApp.use('/api/auth', authRouter);
expressApp.use('/api/users', userRouter);
expressApp.use('/api/appliances', applianceRouter);

const PORT = process.env.PORT || '4400';

const httpServer = expressApp.listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({
    server: httpServer,
    
    verifyClient(info, done) {
        const token: string = (info.req.headers as any)['sec-websocket-protocol'];
        if (!token) done(false, 401, 'Unauthorized');
        else {
            jwt.verify(token, config['jwtSecret'], (error, decoded) => {
                if (error) {
                    done(false, 401, 'Unauthorized');
                } else {
                    (info.req as any).user = decoded;
                    done(true);
                }
            })
        }
    }
});

wss.on('connection', (socket: WebSocket) => {
    console.log('Client connected');

    try {
        socket.on('message', (message: Data) => {
            const { data: { channel, data } }: IWSMessageConfig = JSON.parse((message as string));
            processChannel(socket, channel, data, { db } );
        });
    } catch (error) {
        console.log(error.message)
    }

    socket.on('close', () => console.log('Client disconnected'));
});

export default httpServer;
