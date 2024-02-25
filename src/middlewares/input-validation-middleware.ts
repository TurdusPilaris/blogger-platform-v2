import {body, param, validationResult} from "express-validator";
import {NextFunction, Response, Request} from "express";
import {blogsMongoRepository} from "../features/blogs/repositories/blogsMongoRepository";
import {ObjectId} from "mongodb";

export const inputValidationMiddleware = (req:Request, res: Response, next: NextFunction): any => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({errorsMessages: errors.array().map((e: any) => {return {field: e.path, message: e.msg}})});
        return;
    } else {
        next();
    }
}

export const inputValidationMiddlewareBlogID = (req:Request, res: Response, next: NextFunction): any => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(404).json({errorsMessages: errors.array().map((e: any) => {return {field: e.path, message: e.msg}})});
        return;
    } else {
        next();
    }
}

export const postInputValidatorBlogID =
    [
        param('blogId').custom(async (blogId) => {

            if (!ObjectId.isValid(blogId)) {
                throw new Error('Blog ID is not valid')
            }
            if (blogId) {
                const foundBlog = await blogsMongoRepository.find(new ObjectId(blogId))
                if (!foundBlog) {
                    throw new Error('Blog not found')
                }
            }
        }),
    ]

export const postInputValidatorBlog =
    [
        body('name').trim().isLength({min: 3, max: 15}).withMessage('Name should be from 3 to 15'),
        body('description').trim().isLength({min: 1, max: 500}).withMessage('Name should be from 1 to 500'),
        body('websiteUrl').isURL().withMessage('Is not URL'),

    ]

export const validBlogIdMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    console.log('blogId ' + req.params.blogId);
    if (!ObjectId.isValid(req.params.blogId)) {
        throw new Error('Blog ID is not valid')
    }
    const foundBlog = await blogsMongoRepository.find(new ObjectId(req.params.blogId))
    console.log('foundedBlog ' + foundBlog);
    if (!foundBlog) {
        throw new Error('Blog not found')
    }
    next();
}

export const postInputValidatorPost =

    [
         body('title').trim().isLength({min: 3, max: 30}).withMessage('Field should be from 3 to 30'),
        body('shortDescription').trim().isLength({min: 1, max: 100}).withMessage('Field should be from 1 to 100'),
        body('content').trim().isLength({min: 1, max: 1000}).withMessage('Field should be from 1 to 1000'),
        body('blogId').custom(async value => {
            if (!ObjectId.isValid(value)) {
                throw new Error('Blog ID is not valid')
            }
            if(value) {
            const foundBlog = await blogsMongoRepository.find(new ObjectId(value))
            if(!foundBlog) {
                throw new Error('Blog not found')
            }}
        })

    ]

export const postInputValidatorPostWithoutBlogID =

    [
        body('title').trim().isLength({min: 3, max: 30}).withMessage('Field should be from 3 to 30'),
        // titleValidation,
        body('shortDescription').trim().isLength({min: 1, max: 100}).withMessage('Field should be from 1 to 100'),
        body('content').trim().isLength({min: 1, max: 1000}).withMessage('Field should be from 1 to 1000'),

    ]
const ADMIN_AUTH_BASE64 = 'Basic YWRtaW46cXdlcnR5';
export const authMiddleware = (req:Request, res: Response, next: NextFunction) => {

    if(!req.headers['authorization']) {
        res.sendStatus(401);
        return;
    } else {
        const auth: string = req.headers['authorization'];
        if(auth !== ADMIN_AUTH_BASE64){
            res.sendStatus(401);
            return;
        }

        next();
    }
}