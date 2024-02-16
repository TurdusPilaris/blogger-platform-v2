import { Request, Response} from "express";
import {blogsRepository} from "./blogsRepository";
import {TypeBlogInputModel} from "../../input-output-types/inputOutputTypes";
import {InsertedInfoType} from "../../input-output-types/inputOutputTypesMongo";
import {postsMongoRepository} from "../posts/postMongoRepository";
import {blogsMongoRepository} from "./blogsMongoRepository";

export const postBlogsController = async (req: Request<ParamsType, TypeBlogInputModel, any, any>, res: Response<any>) => {

    // const newBlog = await blogsRepository.create(req.body);
    //
    // res
    //     .status(201)
    //     .json(newBlog);

    const insertedInfo: InsertedInfoType |undefined = await blogsMongoRepository.create(req.body);

    if(insertedInfo){
        const newBlog = await  blogsMongoRepository.findForOutput(insertedInfo.insertedId);
        res
            .status(201)
            .send(newBlog);
    }


}