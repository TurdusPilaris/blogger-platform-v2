import { Request, Response} from "express";
import {InsertedInfoType} from "../../input-output-types/inputOutputTypesMongo";
import {blogsService} from "./domain/blogs-service"
import {TypeBlogInputModel} from "../../input-output-types/blogs/inputTypes";
import {TypeBlogViewModel} from "../../input-output-types/blogs/outputTypes";
export const postBlogsController = async (req: Request<ParamsType, TypeBlogInputModel, any, any>, res: Response<TypeBlogViewModel>) => {

    const insertedInfo: InsertedInfoType |undefined = await blogsService.create(req.body);

    if(insertedInfo){
        const newBlog = await  blogsService.findForOutput(insertedInfo.insertedId);
        res
            .status(201)
            .send(newBlog);
    }


}