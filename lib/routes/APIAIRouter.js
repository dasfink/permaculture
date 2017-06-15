"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const actions_on_google_1 = require("actions-on-google");
const GardenGuideService_1 = require("../service/GardenGuideService");
class APIAIRouter {
    /**
     * Initialize the APIAIRouter
     */
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    /*
    Main entry point for APIAI post request.
    */
    webhookHandler(req, res, next) {
        const apiaiApp = new actions_on_google_1.ApiAiApp(req, res);
        let service = new GardenGuideService_1.GardenGuideService();
        let plant = service.getPlantByName("Petroselinum crispum").then((plant) => {
            res.send({ message: plant });
        }).catch(error => {
            console.log(error);
            res.send({ message: error });
        });
    }
    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.post('/', this.webhookHandler);
    }
}
exports.APIAIRouter = APIAIRouter;
// Create the HeroRouter, and export its configured Express.Router
const apiaiRouter = new APIAIRouter();
apiaiRouter.init();
exports.default = apiaiRouter.router;
//# sourceMappingURL=APIAIRouter.js.map