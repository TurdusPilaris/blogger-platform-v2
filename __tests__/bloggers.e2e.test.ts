import {agent as supertest} from 'supertest';
import {app, db} from "../src/main/app";
import {postsRepository} from "../src/features/posts/postsRepository";
import {blogsRepository} from "../src/features/blogs/blogsRepository";
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

          expect(res.body.length).toBe(db.blogs.length);
    })

    it('GET posts = []', async () => {

        const res = await req
            .get('/posts')
            .expect(200);
        expect(res.body.length).toBe(db.posts.length);
    })

    it('DELETE blogs not auth Unauthorized= []', async () => {

        const res = await req
            .delete('/blogs/2')
            .expect(401);

    })

    it('DELETE blogs invalid auth Unauthorized= []', async () => {

        const res = await req
            .delete('/blogs/2')
            .set({authorization: UNCORRECT_ADMIN_AUTH_BASE64})
            .expect(401);

    })

    it('DELETE blogs not found = []', async () => {

        const res = await req
            .delete('/blogs/9')
            .set({authorization: CORRECT_ADMIN_AUTH_BASE64})
            .expect(404);

    })

    it('DELETE blogs OK = []', async () => {

        const res = await req
            .delete('/blogs/02')
            .set({authorization: CORRECT_ADMIN_AUTH_BASE64})
            .expect(204);

    })

    it('DELETE posts not auth Unauthorized= []', async () => {

        const res = await req
            .delete('/posts/2')
            .expect(401);

    })

    it('DELETE posts invalid auth Unauthorized= []', async () => {

        const res = await req
            .delete('/posts/2')
            .set({authorization: UNCORRECT_ADMIN_AUTH_BASE64})
            .expect(401);

    })

    it('DELETE posts not found = []', async () => {

        const res = await req
            .delete('/posts/9')
            .set({authorization: CORRECT_ADMIN_AUTH_BASE64})
            .expect(404);

    })

    it('DELETE posts OK = []', async () => {

        const res = await req
            .delete('/posts/1')
            .set({authorization: CORRECT_ADMIN_AUTH_BASE64})
            .expect(204);

    })

    it('GET posts with id OK = []', async () => {

        const res = await req
            .get('/posts/4')
            .expect(200);
            expect(res.body).toStrictEqual(postsRepository.findPost('4'));
    })

    it('GET posts with id not found = []', async () => {

        const res = await req
            .get('/posts/4341')
            .expect(404);

    })

    it('GET blogs with id OK = []', async () => {

        const res = await req
            .get('/blogs/01')
            .expect(200);
        expect(res.body).toStrictEqual(blogsRepository.findBlog('01'));
    })

    it('GET blogs with id not found = []', async () => {

        const res = await req
            .get('/blogs/4341')
            .expect(404);

    })

})