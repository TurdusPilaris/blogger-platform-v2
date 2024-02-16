import { Request, Response} from "express";
import {postsRepository} from "./postsRepository";
import {blogsRepository} from "../blogs/blogsRepository";
import {postsMongoRepository} from "./postMongoRepository";
import {ObjectId} from "mongodb";

export const getPostsControllerByID = async (req: Request<any, any, any, any>, res: Response<any>) => {

    // const foundPost = await postsRepository.findPost(req.params.id);
    const foundPost = await postsMongoRepository.findForOutput(new ObjectId(req.params.id));
    if(!foundPost) {
        res.sendStatus(404)
    }
    res
        .status(200)
        .send(foundPost);

}