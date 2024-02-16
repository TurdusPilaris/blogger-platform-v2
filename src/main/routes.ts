import {Express} from "express";
import {testingRouter} from "../features/testing";
import {postsRouter} from "../features/posts";
import {blogsRouter} from "../features/blogs";
import {Request, Response} from "express";

export const PATH = {
    BLOGS: '/blogs',
    POSTS: '/posts',
    TESTING: '/testing'
}
export const addRoutes = (app: Express) => {
    app.use(PATH.TESTING, testingRouter);
    app.use(PATH.POSTS, postsRouter);
    app.use(PATH.BLOGS, blogsRouter);
    app.get('/', (req: Request, res: Response) => {
        res.send('Hello Samurai')
    })

}