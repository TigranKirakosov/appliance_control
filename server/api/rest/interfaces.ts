import { Request, Response, NextFunction } from "express";

export interface IHttpRequest extends Request {
    user?: string | object;
};

export interface IHttpMiddleware {
    (req: IHttpRequest, res: Response, next: NextFunction): void;
};
