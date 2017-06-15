/// <reference types="express" />
import * as express from 'express';
export declare class App {
    express: express.Application;
    constructor();
    private middleware();
    private routes();
}
declare const _default: express.Application;
export default _default;
