import {ObjectId} from "mongodb";
import {
    BlogDBMongoType,
} from "../../../input-output-types/inputOutputTypesMongo";
import {blogCollection, postCollection} from "../../../db/mongo-db";
import {blogsMongoRepository} from "./blogsMongoRepository";
import {postsMongoRepository} from "../../posts/repositories/postMongoRepository";
import {PaginatorBlogType, TypeBlogViewModel} from "../../../input-output-types/blogs/outputTypes";
import {PaginatorPostType} from "../../../input-output-types/posts/outputTypes";
import {HelperQueryType} from "../../../input-output-types/inputTypes";

export const blogQueryRepository = {

    findForOutput: async function (id: ObjectId) {
        const foundBlog = await blogsMongoRepository.find(id);
        if (!foundBlog) {
            return undefined
        }
        return this.mapToOutput(foundBlog as BlogDBMongoType);
    },
    async getMany(query:HelperQueryType, blogId: string)  {

        const byID = {blogId: blogId};

        // const search = query.searchNameTerm? {title:{$regex: query.searchNameTerm, $options: 'i'}}: {}

        const items = await postCollection
            .find({
                  ...byID,
                   // ...search
            })
            .sort(query.sortBy, query.sortDirection)
            .skip((query.pageNumber -1)*query.pageSize)
            .limit(query.pageSize)
            .toArray();

        const itemsForPaginator = items.map(postsMongoRepository.mapToOutput);
        const countPosts = await postCollection.countDocuments({...byID,});
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
    getAllBlogs: async function (query:HelperQueryType) {

        const search = query.searchNameTerm? {name:{$regex: query.searchNameTerm, $options: 'i'}}: {}

        const items = await blogCollection
            .find({
                 ...search
            })
            .sort(query.sortBy, query.sortDirection)
            .skip((query.pageNumber -1)*query.pageSize)
            .limit(query.pageSize)
            .toArray();

        const itemsForPaginator = items.map(blogQueryRepository.mapToOutput);
        const countPosts = await blogCollection.countDocuments({...search,});
        const paginatorBlog: PaginatorBlogType =
            {
                pagesCount:	Math.ceil(countPosts/query.pageSize),
                page:	query.pageNumber,
                pageSize:	query.pageSize,
                totalCount: countPosts,
                items: itemsForPaginator
            };
        return paginatorBlog;

    },


}