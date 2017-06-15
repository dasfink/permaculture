import { Router, Request, Response, NextFunction } from "express";
import * as debug from "debug";
import { ApiAiApp } from "actions-on-google" 
import { GardenGuideService } from "../service/GardenGuideService"
import { Plant } from "../entity/Plant"


export class APIAIRouter {
  router: Router

  /**
   * Initialize the APIAIRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /*
  Main entry point for APIAI post request.
  */
  public webhookHandler(req: Request, res: Response, next: NextFunction) {
    
    const apiaiApp = new ApiAiApp(req, res)
    let service = new GardenGuideService()
    let plant = service.getPlantByName("Petroselinum crispum").then((plant) => {
      res.send({ message: plant })
    }).catch(error => {
      console.log(error);
      res.send({message: error})
    })
  }
  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.post('/', this.webhookHandler);
  }
}

// Create the HeroRouter, and export its configured Express.Router
const apiaiRouter = new APIAIRouter();
apiaiRouter.init();

export default apiaiRouter.router;