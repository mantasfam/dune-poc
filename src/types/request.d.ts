declare namespace Express {
    export interface Request {
        objects: { [key: string]: any };
    }
}
