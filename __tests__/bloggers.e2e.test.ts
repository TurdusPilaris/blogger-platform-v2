import {agent as supertest} from 'supertest';
import {app} from "../src/main/app";
import {blogCollection, postCollection} from "../src/db/mongo-db";
import {
    BlogDBMongoType,
    PostDBMongoType
} from "../src/input-output-types/inputOutputTypesMongo";
import {WithId} from "mongodb";
const CORRECT_ADMIN_AUTH_BASE64 = 'Basic YWRtaW46cXdlcnR5';
const UNCORRECT_ADMIN_AUTH_BASE64 = 'Basic YWRtaW46cXdlcnR9';
// import {describe} from "node:test";


const req = supertest(app);

describe('/blogs', () =>{
    beforeAll(async () => {

    })

    afterAll(async () =>{

    })

    it('GET blogs = []', async () => {

        const res = await req
            .get('/blogs')
            .expect(200);

        const allBlogs = await blogCollection.find().toArray() as BlogDBMongoType[]|[];

         expect(res.body.length).toBe(allBlogs.length);
    })

     it('GET posts = []', async () => {

         const res = await req
             .get('/posts')
             .expect(200);
         const allPosts:WithId<PostDBMongoType>[] = await postCollection.find().toArray();
         expect(res.body.length).toBe(allPosts.length);
     })
    //
    it('DELETE blogs not auth Unauthorized= []', async () => {

        const res = await req
            .delete('/blogs/65cf55eb3f98922fe6d8ef94')
            .expect(401);

    })

    it('DELETE blogs invalid auth Unauthorized= []', async () => {

        const res = await req
            .delete('/blogs/65cf55eb3f98922fe6d8ef94')
            .set({authorization: UNCORRECT_ADMIN_AUTH_BASE64})
            .expect(401);

    })

    it('GET posts for blogID endpoint = /blogs/:blogId/posts ', async () => {

        const newBlog = {
            name: "name for test",
            description: "description for test",
            websiteUrl: "websiteUrl.com",
            createdAt: new Date().toISOString(),
            isMembership: false
        }

        const info = await blogCollection.insertOne(newBlog);

        const newPost= {
            title: "post test 1",
            shortDescription: "shortDescription test 1",
            content: "input.content test 1",
            blogId: info.insertedId.toString(),
            blogName: newBlog.name,
            createdAt: new Date().toISOString(),
        }

        const newPost2= {
            title: "post test 2",
            shortDescription: "shortDescription test 2",
            content: "input.content test 2",
            blogId: info.insertedId.toString(),
            blogName: newBlog.name,
            createdAt: new Date().toISOString(),
        }

         await postCollection.insertOne(newPost);
         await postCollection.insertOne(newPost2);

        const res = await req
            .get(`/blogs/${info.insertedId.toString()}/posts?pageNumber=1&pageSize=10&sortBy=createdAt&sortDirection=asc&searchNameTerm=2`)
            .expect(200);


    })


})