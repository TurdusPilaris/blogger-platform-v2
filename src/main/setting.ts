import dotenv from 'dotenv'
dotenv.config()

export const SETTING = {
    PORT : 3008,

    MONGO_URL: process.env.MONGO_URL || '',
    DB_NAME: process.env.DB_NAME || '',
    BLOG_COLLECTION_NAME:process.env.BLOG_COLLECTION_NAME|| '',
    POST_COLLECTION_NAME:process.env.POST_COLLECTION_NAME|| '',
}