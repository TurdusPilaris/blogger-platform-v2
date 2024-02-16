import { Request, Response} from "express";
import {postsRepository} from "./postsRepository";
import {postsMongoRepository} from "./postMongoRepository";
import {ObjectId} from "mongodb";
import {blogsMongoRepository} from "../blogs/blogsMongoRepository";

export const deletePostsController = async (req: Request<ParamsType, any, any, any >, res: Response<any>) => {

    if (!ObjectId.isValid(req.params.id)) {
        res.sendStatus(404);
    }
    const foundPost = await postsMongoRepository.find(new ObjectId(req.params.id))
    if (!foundPost) {
        res.sendStatus(404);
        return;
    }
    await postsMongoRepository.deletePost(new ObjectId(req.params.id));

    res.sendStatus(204);
    return;


}