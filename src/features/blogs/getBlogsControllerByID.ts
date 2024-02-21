import { Request, Response} from "express";
import {ObjectId} from "mongodb";
import {blogsService} from "./domain/blogs-service"
import {TypeBlogViewModel} from "../../input-output-types/blogs/outputTypes";

export const getBlogsControllerByID = async( req: Request<any, any, any, any>, res: Response<TypeBlogViewModel>) => {

    const foundBlog = await blogsService.findForOutput(new ObjectId(req.params.id));
    if(!foundBlog) {
        res.sendStatus(404)
    }
    res
        .status(200)
        .send(foundBlog);
}