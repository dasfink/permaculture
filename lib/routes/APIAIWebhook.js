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
    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.get('/', this.getAll);
    }
}
exports.APIAI = APIAI;
