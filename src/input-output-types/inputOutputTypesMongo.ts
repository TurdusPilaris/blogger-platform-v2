import {ObjectId} from "mongodb";

export type TypePostInputModelModel = {
    id: string;
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
    blogName: string;
}
export type TypePostViewModel = {
    id: string;
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
    blogName: string|undefined;
    createdAt: string;
}

export type TypeBlogInputModel = {
    name: string;
    description: string;
    websiteUrl: string;
}
export type TypeBlogViewModel = {
    id: string;
    name: string;
    description: string;
    websiteUrl: string;
    createdAt: string;
    isMembership: boolean;
}
export type PostDBMongoType = {
    _id: ObjectId;
    title: string;
    shortDescription: string;
    content: string;
    blogId: string|undefined;
    blogName: string|undefined;
    createdAt: string;
}
export type PostDBMongoTypeWithoutID = {
    title: string;
    shortDescription: string;
    content: string;
    blogId: string|undefined;
    blogName: string|undefined;
    createdAt: string;
}

export type BlogDBMongoType = {
    _id: ObjectId;
    name: string;
    description: string;
    websiteUrl: string;
    createdAt: string;
    isMembership: boolean;

}

export type BlogDBMongoTypeWithoutID = {
    name: string;
    description: string;
    websiteUrl: string;
    createdAt: string;
    isMembership: boolean;
}


export type InsertedInfoType = {
    "acknowledged": boolean,
    "insertedId": ObjectId
}