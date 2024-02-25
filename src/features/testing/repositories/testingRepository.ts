import {blogCollection, postCollection} from "../../../db/mongo-db";

export const testingRepository ={


    deleteAll: function () {
        postCollection.deleteMany({});
        blogCollection.deleteMany({});

    }
}