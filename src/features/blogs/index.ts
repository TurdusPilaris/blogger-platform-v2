import {Router} from "express";
import {getBlogsController} from "./getBlogsController";
import {deleteBlogsController} from "./deleteBlogsController";
import {getPostsController} from "../posts/getPostsController";
import {postsRouter} from "../posts";
import {
    authMiddleware, customBlogIdMiddleware,
    inputValidationMiddleware,
    postInputValidator, postInputValidatorBlog
} from "../../middlewares/input-validation-middleware";
import {body} from "express-validator";
import {getBlogsControllerByID} from "./getBlogsControllerByID";
import {postBlogsController} from "./postBlogsController";
import {putBlogsController} from "./putBlogsController";


export const blogsRouter = Router();

blogsRouter.get('/', getBlogsController);
blogsRouter.get('/:id', getBlogsControllerByID);
blogsRouter.post('/', authMiddleware, postInputValidatorBlog, inputValidationMiddleware, postBlogsController);
blogsRouter.put('/:id', authMiddleware, postInputValidatorBlog, inputValidationMiddleware,  putBlogsController);
blogsRouter.delete('/:id', authMiddleware,  deleteBlogsController);
