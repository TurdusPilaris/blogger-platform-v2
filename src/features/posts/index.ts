import {Router} from "express";
import {getPostsController} from "./getPostsController";
import {deletePostsController} from "./deletePostsController";
import {
    authMiddleware, customBlogIdMiddleware,
    inputValidationMiddleware,
    postInputValidatorPost
} from "../../middlewares/input-validation-middleware";
import {getPostsControllerByID} from "./getPostsControllerByID";
import {postForPostsController} from "./postForPostsController";
import {putPostsController} from "./putPostsController";

export const postsRouter = Router();

postsRouter.get('/', getPostsController);
postsRouter.get('/:id', getPostsControllerByID);
// postsRouter.post('/', authMiddleware, postInputValidatorPost,  customBlogIdMiddleware, inputValidationMiddleware, postForPostsController);
postsRouter.post('/', authMiddleware, postInputValidatorPost,   inputValidationMiddleware, postForPostsController);
 // postsRouter.put('/:id', authMiddleware, postInputValidatorPost, customBlogIdMiddleware, inputValidationMiddleware,  putPostsController);
 postsRouter.put('/:id', authMiddleware, postInputValidatorPost, inputValidationMiddleware,  putPostsController);
postsRouter.delete('/:id', authMiddleware, deletePostsController);
