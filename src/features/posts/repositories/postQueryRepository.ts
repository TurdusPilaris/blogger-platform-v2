import {
    InsertedInfoType,
    PostDBMongoType, PostDBMongoTypeWithoutID,
} from "../../../input-output-types/inputOutputTypesMongo";
import {blogsMongoRepository} from "../../blogs/repositories/blogsMongoRepository";
import {blogCollection, postCollection} from "../../../db/mongo-db";
import {ObjectId, WithId} from "mongodb";
import {TypePostInputModelModel} from "../../../input-output-types/posts/inputTypes";
import {PaginatorPostType, TypePostViewModel} from "../../../input-output-types/posts/outputTypes";
import {HelperQueryType} from "../../../input-output-types/inputTypes";
import {PaginatorBlogType} from "../../../input-output-types/blogs/outputTypes";
import {postsMongoRepository} from "./postMongoRepository";

export const postQueryRepository ={
    // async create(input: PostDBMongoTypeWithoutID) {
    //
    //     try {
    //         const insertedInfo = await postCollection.insertOne(input);
    //         return insertedInfo as InsertedInfoType;
    //     } catch (e) {
    //         return undefined;
    //     }
    //
    //
    // },
    // async find(id: ObjectId) {
    //     // const foundPost = db.posts.find(p => p.id === id);
    //     const foundPost = (await postCollection.findOne({_id: id})) as PostDBMongoType;
    //
    //     return foundPost;
    // },
    async findForOutput(id: ObjectId) {
       return  await postsMongoRepository.findForOutput(id);
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
    getAllPosts: async function (query:HelperQueryType) {

        const items = await postCollection
            .find({})
            .sort(query.sortBy, query.sortDirection)
            .skip((query.pageNumber -1)*query.pageSize)
            .limit(query.pageSize)
            .toArray();

        const itemsForPaginator = items.map(this.mapToOutput);
        const countPosts = await postCollection.countDocuments({});
        const paginatorPost: PaginatorPostType =
            {
                pagesCount:	Math.ceil(countPosts/query.pageSize),
                page:	query.pageNumber,
                pageSize:	query.pageSize,
                totalCount: countPosts,
                items: itemsForPaginator
            };
        return paginatorPost;


    },
    // async deletePost(id: ObjectId) {
    //
    //     await postCollection.deleteOne({_id: id});
    //
    // },
    // async updatePost(id: ObjectId, input: TypePostInputModelModel) {
    //
    //     let post = await postsMongoRepository.findForOutput(id);
    //     if(!post) {
    //         return undefined;
    //     }
    //     let foundedBlog = await blogsMongoRepository.findForOutput(new ObjectId(post.blogId));
    //     await postCollection.updateOne({_id: id}, {
    //         $set: {
    //             title: input.title,
    //             shortDescription: input.shortDescription,
    //             content: input.content,
    //             blogId: input.blogId??post.blogId,
    //             blogName: foundedBlog?.name
    //         }
    //     })
    //
    // }

}