import { Request, Response} from "express";
import {postsMongoRepository} from "./repositories/postMongoRepository";
import {InsertedInfoType,} from "../../input-output-types/inputOutputTypesMongo";
import {TypeBlogInputModel} from "../../input-output-types/blogs/inputTypes";
import {postsService} from "./domain/posts-service";

export const postForPostsController = async (req: Request<TypeBlogInputModel, any, any, any>, res: Response<any>) => {


    const insertedInfo: InsertedInfoType |undefined = await postsService.create(req.body);

    if(insertedInfo){
        const newPost = await  postsService.findForOutput(insertedInfo.insertedId);
        res
            .status(201)
            .send(newPost);
    }



}