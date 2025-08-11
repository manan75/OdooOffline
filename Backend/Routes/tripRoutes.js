import { Router } from "express";
import { createTrip,createTripDestination,createTripActivity,getUserTrips } from "../Controllers/tripController.js";


const tripRouter = Router();

tripRouter.post('/createTrip', createTrip);
tripRouter.post('/tripDestinations', createTripDestination);
tripRouter.post('/tripActivities', createTripActivity);
tripRouter.get('/getTrips/:user_id', getUserTrips);


export default tripRouter;