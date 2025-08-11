import { Router } from "express";
import { getCitiesWithActivities } from "../Controllers/searchController.js";


const searchRouter = Router();

searchRouter.get('/searchall', getCitiesWithActivities);

export default searchRouter;