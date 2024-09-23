import config from "../config/config";

import { Client, ID ,Databases,Storage,Query} from "appwrite";

class StorageService {
    client =  new Client() ;
    databases;
    storage;

    constructor(){
      this.client.setEndpoint(config.appwriteurl ).setProject(config.projectid );
      this.databases = new Databases(this.client);
      this.storage = new Storage(this.client)
    }
    async createPost({title,content,slug,featuredImage,status,userId}){
      try {
        return await this.databases.createDocument(
            config.databaseid,
            config.collectionid,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userId
            }
        )
      } 
      catch (error) {
       console.log(error);
      }
    }

    async updatePost (slug,{title,content,featuredImage,status}){
     try {
      return await this.databases.updateDocument(
        config.databaseid,
        config.collectionid,
        slug,
        {
            title,
            content,
            featuredImage,
            status
        }
      )
     } 
     catch (error) {
      console.log(error);
      
     }
    }

    async deletePost(slug){
     try {
      await this.databases.deleteDocument(
        config.databaseid,
        config.collectionid,
        slug
      )
      return true
     }
      catch (error) {
      console.log(error);
      return false
      
     }
     return null ;
    }

    async getPost(slug){
     try {
       return await this.databases.getDocument(
            config.databaseid,
            config.collectionid,
            slug
        )
     } 
     catch (error) {
      console.log(error);
      return false
      
     }
    }

    async getAllPosts(queries = [Query.equal("status","active")]){
       try {
        return this.databases.listDocuments(
            config.databaseid,
            config.collectionid,
            queries
        )
       } catch (error) {
        console.log(error);
        
       }
    }

    //file uplaod services 
    async uploadFile(file){
        try {
           return await this.storage.createFile(
                config.bucketid,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log(error);
            return false
            
        }
    }

    async deleteFile(fileId){
        try {
           await this.storage.deleteFile(
                config.bucketid,
                fileId
            )
            return true
        } catch (error) {
            console.log(error);
            return false
            
        }
    }

     filePreview(fileId){
        try {
           return this.storage.getFilePreview(
            config.bucketid,
            fileId
           )
        } catch (error) {
            console.log(error);
            
        }
    }

}

const storageService = new StorageService();

export default storageService ;