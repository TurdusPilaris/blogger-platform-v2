import { Request, Response} from "express";

import {blogsService} from "./domain/blogs-service"
import {SortDirection} from "mongodb";
import {HelperQueryType} from "../../input-output-types/inputTypes";
import {blogQueryRepository} from "./repositories/blogQueryRepository";
export const getBlogsController = async (req: Request, res: Response) => {

    const helper = (query:any) => {
        const queryHelper: HelperQueryType = {
            searchNameTerm: query.searchNameTerm? query.searchNameTerm: null,
            pageNumber: query.pageNumber ? +query.pageNumber : 1,
            pageSize: query.pageSize ? +query.pageSize : 10,
            sortBy: query.sortBy ? query.sortBy : 'createdAt',
            sortDirection: query.sortDirection ? query.sortDirection : 'desc',

        }
        return queryHelper;
    }

    res
        .status(200)
         .send(await blogQueryRepository.getAllBlogs(helper(req.query)));

}