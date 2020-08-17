import { IWSChannelHandlers, IWSChannels, IWSChannelHandler, IWSProcessChannel } from "./interfaces";
import { defaultHandler, powerHandler, programmHandler } from "./controllers/appliance/appliance.handlers";

export const channelHandlers: IWSChannelHandlers = {
    [IWSChannels.DEFAULT]: [defaultHandler],
    [IWSChannels.SET_POWER]: [powerHandler],
    [IWSChannels.SET_PROGRAMM]: [programmHandler]
};

export const processChannel: IWSProcessChannel = (socket, channel, data, ctx) => {
    const handlers: IWSChannelHandler[] = channelHandlers[channel] || channelHandlers[IWSChannels.DEFAULT];
    handlers.forEach(handler => handler(socket, data, ctx));
};
