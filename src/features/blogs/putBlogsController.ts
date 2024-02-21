import { Request, Response} from "express";
import {ObjectId} from "mongodb";
import {blogsService} from "./domain/blogs-service"
import {TypeBlogInputModel} from "../../input-output-types/blogs/inputTypes";
import {TypeBlogViewModel} from "../../input-output-types/blogs/outputTypes";
import {ParamsType} from "../../input-output-types/inputTypes";

export const putBlogsController = async (req: Request<ParamsType, TypeBlogInputModel>, res: Response<TypeBlogViewModel>) => {

    if (!ObjectId.isValid(req.params.id)) {
        res.sendStatus(404);
    }
    const foundedBlog = await blogsService.find(new ObjectId(req.params.id))
    if (!foundedBlog) {
        res.sendStatus(404);
        return;
    }
    await blogsService.updateBlog(new ObjectId(req.params.id), req.body);
    const foundBlog = await blogsService.findForOutput(new ObjectId(req.params.id));
    res
        .status(204)
        .send(foundBlog);
}