import { Request, Response} from "express";
import {TypeBlogInputModel} from "../../input-output-types/inputOutputTypes";
// import {postsRepository} from "./postsRepository";
import {postsMongoRepository} from "./postMongoRepository";
import {InsertedInfoType,} from "../../input-output-types/inputOutputTypesMongo";

export const postForPostsController = async (req: Request<TypeBlogInputModel, any, any, any>, res: Response<any>) => {

    // const newPost = await postsRepository.create(req.body);
    //
    // res
    //     .status(201)
    //      .send(newPost);
    const insertedInfo: InsertedInfoType |undefined = await postsMongoRepository.create(req.body);

    if(insertedInfo){
        const newPost = await  postsMongoRepository.findForOutput(insertedInfo.insertedId);
        res
            .status(201)
            .send(newPost);
    }



}