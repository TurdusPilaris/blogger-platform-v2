import {blogsMongoRepository} from "../repositories/blogsMongoRepository";
import {ObjectId} from "mongodb";
import {
    BlogDBMongoType, PostDBMongoTypeWithoutID,
} from "../../../input-output-types/inputOutputTypesMongo";
import {blogCollection} from "../../../db/mongo-db";
import {TypeBlogInputModel} from "../../../input-output-types/blogs/inputTypes";
import {TypeBlogViewModel} from "../../../input-output-types/blogs/outputTypes";
import {TypePostInputModelModel} from "../../../input-output-types/posts/inputTypes";
import {postsMongoRepository} from "../../posts/repositories/postMongoRepository";

export const blogsService = {

    async create(input: TypeBlogInputModel) {

        const newBlog = {
            name: input.name,
            description: input.description,
            websiteUrl: input.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false

        }

        return blogsMongoRepository.create(newBlog);

    },

    async createPostForBlog(input: TypePostInputModelModel, blogId:string) {

        const foundedBlog = await blogsMongoRepository.findForOutput(new ObjectId(blogId));
        const newPost: PostDBMongoTypeWithoutID = {
            title: input.title,
            shortDescription: input.shortDescription,
            content: input.content,
            blogId: foundedBlog?.id,
            blogName: foundedBlog?.name,
            createdAt: new Date().toISOString(),
        }
        return postsMongoRepository.create(newPost);

    },

    async deleteBlog(id: ObjectId) {

        await blogCollection.deleteOne({_id: id});

    },
    async find(id: ObjectId): Promise<BlogDBMongoType|null> {
        return blogCollection.findOne({_id: id});
    },
    findForOutput: async function (id: ObjectId) {

        return blogsMongoRepository.findForOutput(id);

    },
    // getAllBlogs: async function () {
    //
    //     return blogsMongoRepository.getAllBlogs();
    //
    // },

    mapToOutput(blog: BlogDBMongoType): TypeBlogViewModel {
        return {
            id: blog._id.toString(),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: blog.createdAt,
            isMembership: false
        }
    },
    async updateBlog(id: ObjectId, input: TypeBlogInputModel) {

        let blog = await blogsMongoRepository.findForOutput(id);
        if(!blog) {
            return undefined;
        } else {

            await blogsMongoRepository.updateBlog(id, input);

        }

    }
}