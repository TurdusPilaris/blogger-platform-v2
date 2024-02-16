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
}

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
}

export type TypeFieldError = {
    message: string;
    field: string
}
export type TypeErrorResult = {
    errorsMessages: TypeFieldError[]
}