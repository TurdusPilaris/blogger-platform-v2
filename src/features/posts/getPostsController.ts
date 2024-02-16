import { Request, Response} from "express";
import {postsRepository} from "./postsRepository";
import {postsMongoRepository} from "./postMongoRepository";

export const getPostsController = async (req: Request<any, any, any, any>, res: Response<any>) => {

    const allPosts = await postsMongoRepository.getAllPosts();
    res
        .status(200)
        // .send(await postsRepository.getAllPosts());

        .send(allPosts);

}