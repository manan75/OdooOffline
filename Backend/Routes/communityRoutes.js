import { Router } from "express";
import { createPost,getCommunityPosts } from "../Controllers/communityController.js";

const communityRouter = Router();

communityRouter.post('/createPost', createPost);
communityRouter.get('/getPosts', getCommunityPosts);


export default communityRouter;