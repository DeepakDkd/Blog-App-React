import conf from "../conf/conf.js";

import {Client , Storage , ID , Databases , Query } from "appwrite"

export class Service{

        client = new Client();
        database;
        bucket;

        constructor(){
            this.client
                .setEndpoint(conf.appwriteurl)
                .setProject(conf.appwriteprojectId)

            this.database = new Databases(this.client);
            
            this.bucket = new Storage(this.client);
        }

        async createPost({title , slug , content , featuredimage , postedby, status , userId}){
            try {
                return await this.database.createDocument(
                    conf.appwritedatabaseId,  // Database ID
                    conf.appwritecollectionId,
                    slug,
                    {
                        title,
                        content,
                        featuredimage,
                        postedby,
                        status,
                        userId
                    }
                )
            } catch (error) {
                console.log("Appwrite service :: createPost :: error ",error);
            }
        }

        async updatePost(slug , {title , content , featuredimage , status}){
            try {
                return await this.database.updateDocument(
                    conf.appwritedatabaseId,
                    conf.appwritecollectionId,
                    slug,
                    {
                        title,
                        content,
                        status,
                        featuredimage
                    }
                )
            } catch (error) {
                console.log("Appwrite service :: updatePost :: error ",error)
            }
        }

        async deletePost(slug){
            try {
                await this.database.deleteDocument(
                    conf.appwritedatabaseId,
                    conf.appwritecollectionId,
                    slug
                )
                return true;
            } catch (error) {
                console.log("Appwrite service :: deletePost :: error ",error)
                return false;
            }
        }

        async getPost(slug){
            try {
                return await this.database.getDocument(
                    conf.appwritedatabaseId,
                    conf.appwritecollectionId,
                    slug
                )
            } catch (error) {
                console.log("Appwrite service :: getPost :: error ",error)
            }
        }

        async getPosts(queries = [Query.equal('status' , 'active')]){
            try {
                return await this.database.listDocuments(
                    conf.appwritedatabaseId,
                    conf.appwritecollectionId,
                    queries 
                )
            } catch (error) {
                console.log("Appwrite service :: getPosts :: error ",error)
                return false;
            }
        }

        /// upload files

        async uploadFile(file){
            try {
                return await this.bucket.createFile(
                    conf.appwritebucketId,
                    ID.unique(),
                    file
                )
            } catch (error) {
                console.log("Appwrite service :: uploadFile :: error ",error)
            }
        }
        
        async deleteFile(fileId){
            try {

                await this.bucket.deleteFile(
                    conf.appwritebucketId,
                    fileId
                )
                return true;
            } catch (error) {
                console.log("Appwrite service :: deleteFile :: error ",error)
                return false;
            }
        }

        getFilePreview(fileId){
            try {
                return this.bucket.getFilePreview(
                    conf.appwritebucketId,
                    fileId
                )
            } catch (error) {
                console.log("Appwrite service :: getFilePreview :: error ",error)
            }
        }
}

const service = new Service();
export default service;