"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class APIAI {
    /**
     * Initialize the HeroRouter
     */
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    /*
    Main entry point for APIAI post request.
    */
    webhookHander(req, res, next) {
        res.send("OK");
    }
    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.post('/', this.webhookHander);
    }
}
exports.APIAI = APIAI;
// Create the HeroRouter, and export its configured Express.Router
const apiaiRoutes = new APIAI();
heroRoutes.init();
exports.default = heroRoutes.router;
