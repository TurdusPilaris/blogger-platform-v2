import { Request, Response} from "express";
import {blogsRepository} from "./blogsRepository";
import {blogsMongoRepository} from "./blogsMongoRepository";

export const getBlogsController = async (req: Request<any, any, any, any>, res: Response<any>) => {

    res
        .status(200)
         .send(await blogsMongoRepository.getAllBlogs());

}