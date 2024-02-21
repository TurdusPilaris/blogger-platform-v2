import {Router} from "express";
import {getBlogsController} from "./getBlogsController";
import {deleteBlogsController} from "./deleteBlogsController";
import {
    authMiddleware,
    inputValidationMiddleware,
    inputValidationMiddlewareBlogID,
    postInputValidatorBlog,
    postInputValidatorBlogID,
    postInputValidatorPost,
    postInputValidatorPostWithoutBlogID,
    validBlogIdMiddleware
} from "../../middlewares/input-validation-middleware";
import {getBlogsControllerByID} from "./getBlogsControllerByID";
import {postBlogsController} from "./postBlogsController";
import {putBlogsController} from "./putBlogsController";
import {getPostsForBlogID} from "./getPostsForBlogIDController";
import {postPostsForBlogsController} from "./postPostsForBlogsController";


export const blogsRouter = Router();

blogsRouter.get('/', getBlogsController);
blogsRouter.get('/:id', getBlogsControllerByID);
blogsRouter.post('/', authMiddleware, postInputValidatorBlog, inputValidationMiddleware, postBlogsController);
blogsRouter.put('/:id', authMiddleware, postInputValidatorBlog, inputValidationMiddleware,  putBlogsController);
blogsRouter.delete('/:id', authMiddleware,  deleteBlogsController);
blogsRouter.get('/:blogId/posts',postInputValidatorBlogID,inputValidationMiddlewareBlogID, getPostsForBlogID);
blogsRouter.post('/:blogId/posts',authMiddleware, postInputValidatorBlogID, inputValidationMiddlewareBlogID, postInputValidatorPostWithoutBlogID, inputValidationMiddleware, postPostsForBlogsController);
