import { Router } from "express";
import { createTrip } from "../Controllers/tripController.js";


const tripRouter = Router();

tripRouter.post('/createTrip', createTrip);


export default tripRouter;