
import {db} from "../../main/app";
import {ObjectId} from "mongodb";
import {
    BlogDBMongoType,
    InsertedInfoType,
    TypeBlogViewModel,
    TypeBlogInputModel
} from "../../input-output-types/inputOutputTypesMongo";
import {blogCollection, postCollection} from "../../db/mongo-db";

export const blogsMongoRepository = {
    async create(input: TypeBlogInputModel) {

        const newBlog = {
            name: input.name,
            description: input.description,
            websiteUrl: input.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false

        }
        try {
            const insertedInfo = await blogCollection.insertOne(newBlog);
            return insertedInfo as InsertedInfoType;
        } catch (e) {
            return undefined;
        }

    },

    async deleteBlog(id: ObjectId) {

        await blogCollection.deleteOne({_id: id});

    },
    async find(id: ObjectId): Promise<BlogDBMongoType|null> {
        return blogCollection.findOne({_id: id});
    },
    findForOutput: async function (id: ObjectId) {
        const foundBlog = await this.find(id);
        if (!foundBlog) {
            return undefined
        }
        return this.mapToOutput(foundBlog as BlogDBMongoType);
    },
    getAllBlogs: async function () {

        const allBlogs = await blogCollection.find().toArray() as BlogDBMongoType[]|[];
        const allBlogForReturn:TypeBlogViewModel[] = [];
        for (let i = 0; i < allBlogs.length; i++) {
            allBlogForReturn[i] = this.mapToOutput(allBlogs[i] as BlogDBMongoType);
        }
        return allBlogForReturn;

    },

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

        let blog = await this.findForOutput(id);
        if(!blog) {
            return undefined;
        }
        // let foundedBlog = await blogsMongoRepository.findForOutput(new ObjectId(blog.blogId));
        await blogCollection.updateOne({_id: id}, {
            $set: {
                name: input.name,
                description: input.description,
                websiteUrl: input.websiteUrl
            }
        })

    }
}