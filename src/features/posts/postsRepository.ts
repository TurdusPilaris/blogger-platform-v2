import {
    TypePostInputModelModel,
    TypePostViewModel
} from "../../input-output-types/inputOutputTypes";
import {db} from "../../main/app";
import {blogsRepository} from "../blogs/blogsRepository";
import {TypeBD} from "../../db/db";

export const postsRepository ={
    async create(input: TypePostInputModelModel) {

        const foundedBlog = await blogsRepository.findBlog(input.blogId);
        const newPost: TypePostViewModel = {

             id: (Date.now() + Math.random()).toString(),
            title: input.title,
            shortDescription: input.shortDescription,
            content: input.content,
            blogId: input.blogId,
            blogName: await foundedBlog?.name,

        }
        db.posts.push(newPost);
        return newPost;
    },
    async find(id: string) {
        const foundPost = db.posts.find(p => p.id === id);
        return foundPost;
    },
    async findForOutput(id: string) {
        const foundPost =await db.posts.find(p => p.id === id);
        if(!foundPost) {return undefined}
        return this.mapToOutput(foundPost);
    },
    mapToOutput(post: TypePostViewModel) {
        return {
            id: post.id,
            title: post.title

        }
    },
    async getAllPosts()  {
        return db.posts;
    },
    async deletePost(id:string) {

        for(let i=0; i < db.posts.length; i++) {
            if (db.posts[i].id === id) {
                db.posts.splice(i, 1);
                return id;
            }
        }

        return Promise<undefined>;

    },
    async findPost(id: string)  {
        const foundPost = await db.posts.find(a => a.id === id);
        return foundPost;
    },
    async updatePost(post: TypePostViewModel, input: TypePostInputModelModel) {
        let foundedBlog = await blogsRepository.findBlog(post.blogId);
        post.title = input.title;
        post.shortDescription = input.shortDescription;
        post.content = input.content;
        post.blogId = input.blogId??post.blogId;
        post.blogName = foundedBlog?.name;

    }

}