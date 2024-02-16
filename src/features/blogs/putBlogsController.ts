import { Request, Response} from "express";
import {blogsRepository} from "./blogsRepository";
import {TypeBlogInputModel} from "../../input-output-types/inputOutputTypes";
import {postsMongoRepository} from "../posts/postMongoRepository";
import {ObjectId} from "mongodb";
import {blogsMongoRepository} from "./blogsMongoRepository";

export const putBlogsController = async (req: Request<ParamsType, TypeBlogInputModel,  any, any>, res: Response<any>) => {

    // const foundBlog =  await blogsRepository.findBlog(req.params.id);
    // if(!foundBlog) {
    //     res.sendStatus(404);
    //     return;
    // }
    //
    // await blogsRepository.updateBlog(foundBlog, req.body);
    // res
    //     .status(204)
    //     .send(foundBlog);

    if (!ObjectId.isValid(req.params.id)) {
        res.sendStatus(404);
    }
    const foundedBlog = await blogsMongoRepository.find(new ObjectId(req.params.id))
    if (!foundedBlog) {
        res.sendStatus(404);
        return;
    }
    await blogsMongoRepository.updateBlog(new ObjectId(req.params.id), req.body);
    const foundBlog = await blogsMongoRepository.find(new ObjectId(req.params.id));
    res
        .status(204)
        .send(foundBlog);
}