import {
    BlogDBMongoType,
    InsertedInfoType,
    PostDBMongoType,
    TypePostInputModelModel,
    TypePostViewModel
} from "../../input-output-types/inputOutputTypesMongo";
import {blogsMongoRepository} from "../blogs/blogsMongoRepository";
import {postCollection} from "../../db/mongo-db";
import {ObjectId, WithId} from "mongodb";

export const postsMongoRepository ={
    async create(input: TypePostInputModelModel) {

        const foundedBlog = await blogsMongoRepository.findForOutput(new ObjectId(input.blogId));
        const newPost= {
             title: input.title,
             shortDescription: input.shortDescription,
             content: input.content,
             blogId: input.blogId,
             blogName: foundedBlog?.name,
            createdAt: new Date().toISOString(),
        }
        try{
            const insertedInfo = await postCollection.insertOne(newPost);
            return insertedInfo as InsertedInfoType;
        } catch (e){
            return undefined;
        }

    },
    async find(id: ObjectId) {
        // const foundPost = db.posts.find(p => p.id === id);
        const foundPost = (await postCollection.findOne({_id: id})) as PostDBMongoType;

        return foundPost;
    },
    async findForOutput(id: ObjectId) {
        const foundPost =  await this.find(id);
        if(!foundPost) {return undefined}
        return this.mapToOutput(foundPost as PostDBMongoType);
    },
    mapToOutput(post: PostDBMongoType):TypePostViewModel {
        return {
            id: post._id.toString(),
            title: post.title,
            shortDescription: post.shortDescription||'',
            content: post.content||'',
            blogId: post.blogId||'',
            blogName: post.blogName||'',
            createdAt: post.createdAt||'',

        }
    },
    getAllPosts: async function () {

        const allPosts:WithId<PostDBMongoType>[] = await postCollection.find().toArray();
        return allPosts.map((p) =>{
           return this.mapToOutput(p);
        })

    },
    async deletePost(id: ObjectId) {

        await postCollection.deleteOne({_id: id});

    },
    async updatePost(id: ObjectId, input: TypePostInputModelModel) {

        let post = await postsMongoRepository.findForOutput(id);
        if(!post) {
            return undefined;
        }
        let foundedBlog = await blogsMongoRepository.findForOutput(new ObjectId(post.blogId));
       await postCollection.updateOne({_id: id}, {
           $set: {
               title: input.title,
               shortDescription: input.shortDescription,
               content: input.content,
               blogId: input.blogId??post.blogId,
               blogName: foundedBlog?.name
           }
       })

    }

}