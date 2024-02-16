import { Request, Response} from "express";
import {blogsRepository} from "./blogsRepository";
import {postsMongoRepository} from "../posts/postMongoRepository";
import {ObjectId} from "mongodb";
import {blogsMongoRepository} from "./blogsMongoRepository";

export const getBlogsControllerByID = async( req: Request<any, any, any, any>, res: Response<any>) => {

    // const foundBlog = await blogsRepository.findBlog(req.params.id);
    // if(!foundBlog) {
    //     res.sendStatus(404)
    // }
    // res
    //     .status(200)
    //      .send(foundBlog);

    const foundBlog = await blogsMongoRepository.findForOutput(new ObjectId(req.params.id));
    if(!foundBlog) {
        res.sendStatus(404)
    }
    res
        .status(200)
        .send(foundBlog);
}