import { Router } from "express";
import { createTrip,createTripDestination,createTripActivity,getUserTrips,getTripDestinations, getTripActivities,getDestinationsWithActivities } from "../Controllers/tripController.js";


const tripRouter = Router();

tripRouter.post('/createTrip', createTrip);
tripRouter.post('/tripDestinations', createTripDestination);
tripRouter.post('/tripActivities', createTripActivity);
tripRouter.get('/getTrips/:user_id', getUserTrips);
tripRouter.get('/getTripDest/:tripId', getTripDestinations);
tripRouter.get('/getTripAct/:tripDestId', getTripActivities);

tripRouter.get('/:tripId/destination-activities', getDestinationsWithActivities);


export default tripRouter;