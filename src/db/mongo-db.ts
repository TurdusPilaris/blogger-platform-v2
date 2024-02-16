import {MongoClient, ObjectId} from "mongodb";
import {SETTING} from "../main/setting";
import {BlogDBMongoTypeWithoutID, PostDBMongoTypeWithoutID} from "../input-output-types/inputOutputTypesMongo";
// const MONGO_URL="mongodb+srv://drozdovaElena:WIMUTynaAxzPoowP@cluster0.qxhqyca.mongodb.net/?retryWrites=true&w=majority"

export type BlogDBType = {
    _id: ObjectId;
    title: string
}

console.log("URL HERE "+ SETTING.MONGO_URL)
console.log("DB_NAME HERE "+ SETTING.DB_NAME)
const client: MongoClient = new MongoClient(SETTING.MONGO_URL);
export const db = client.db(SETTING.DB_NAME)
export const blogCollection = db.collection<BlogDBMongoTypeWithoutID>(SETTING.BLOG_COLLECTION_NAME);
export const postCollection = db.collection<PostDBMongoTypeWithoutID>(SETTING.POST_COLLECTION_NAME);

export const connectionToDB = async () => {
    try{
        await client.connect();
        await  db.command({ping:1});
        console.log("Connection sucessfully");
        return true;
    } catch (e) {
        console.log(e);
        await client.close()
        return false
    }
}