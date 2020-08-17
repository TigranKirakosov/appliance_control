import { IWSChannelHandler, IWSNotification } from "../../interfaces";
import { IWSApplianceResponse } from "./interfaces";

export const defaultHandler: IWSChannelHandler = async (socket, { applianceId }, ctx) => {
    try {
        const appliance = await ctx.db.Appliance.findOne({ _id: applianceId });

        if (!appliance) {
            return socket.send(JSON.stringify({
                reqState: IWSNotification.ERROR,
                reason: 'Not found'
            }));
        }
        
        const result: IWSApplianceResponse = {
            reqState: IWSNotification.SUCCESS,
            appliance
        };
        socket.send(JSON.stringify(result));
    } catch (error) {
        socket.send(JSON.stringify({ reqState: IWSNotification.ERROR }));
    }
};

export const powerHandler: IWSChannelHandler = async (socket, { applianceId, isOn }, ctx) => {
    socket.send(JSON.stringify({ reqState: IWSNotification.PROCESSING }));

    try {
        const appliance = await ctx.db.Appliance.findOne({ _id: applianceId });

        if (!appliance) {
            return socket.send(JSON.stringify({
                reqState: IWSNotification.ERROR,
                reason: 'Not found'
            }));
        }

        appliance.state.isOn = isOn;

        await appliance.save();
        
        const result: IWSApplianceResponse = {
            reqState: IWSNotification.SUCCESS,
            appliance
        };
        socket.send(JSON.stringify(result));
    } catch (error) {
        socket.send(JSON.stringify({ reqState: IWSNotification.ERROR }));
    }
};

export const programmHandler: IWSChannelHandler = async (socket, { userId, payload }, ctx) => {
    socket.send(JSON.stringify({ reqState: IWSNotification.PROCESSING }));

    try {
        const appliance = await ctx.db.Appliance.findOne({ owner: userId });

        if (!appliance) {
            return socket.send(JSON.stringify({
                reqState: IWSNotification.ERROR,
                reason: 'Not found'
            }));
        }

        appliance.state = {
            isOn: true,
            startDelay: payload.startDelay,
            workDuration: payload.workDuration
        };

        // some time requiring operation -- just for testing purpose
        const workDuration = appliance.state.workDuration;
        const delay = 1000;

        const interval = setInterval(() => {
            appliance.state.workDuration = appliance.state.workDuration - delay;
            const result: IWSApplianceResponse = {
                reqState: IWSNotification.PROCESSING,
                appliance
            };
            if (appliance.state.workDuration >= 0) socket.send(JSON.stringify(result));
        }, delay);

        setTimeout(async () => {
            appliance.state = {
                isOn: false,
                startDelay: 0,
                workDuration: 0
            };

            await appliance.save();

            const result: IWSApplianceResponse = { reqState: IWSNotification.SUCCESS, appliance };
            socket.send(JSON.stringify(result));
            clearInterval(interval);
        }, workDuration);
    } catch (error) {
        socket.send(JSON.stringify({ reqState: IWSNotification.ERROR, reason: 'Server error' }));
    }
};
