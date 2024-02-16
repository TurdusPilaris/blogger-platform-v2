import {
    TypePostViewModel
} from "../../input-output-types/inputOutputTypes";
import {db} from "../../main/app";
import {blogCollection, postCollection} from "../../db/mongo-db";

export const testingRepository ={

    // deleteAll() {
    //    db.posts.splice(0, db.posts.length);
    //    db.blogs.splice(0, db.blogs.length);
    // }
    deleteAll: function () {
        postCollection.deleteMany({});
        blogCollection.deleteMany({});

    }
}