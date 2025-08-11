import { Router } from "express";
import { getCitiesWithActivities, getTopCities, searchCities, getActivitiesByCity } from "../Controllers/searchController.js";


const searchRouter = Router();

searchRouter.get('/search', getCitiesWithActivities);
searchRouter.get('/top-cities', getTopCities);
searchRouter.get('/cities', searchCities);
searchRouter.get('/getactivities/:cityId', getActivitiesByCity);

export default searchRouter;