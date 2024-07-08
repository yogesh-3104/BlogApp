import { Client, ID, Storage } from "appwrite";
import config from "../config";

export class StorageService{
    client=new Client();
    storage;
    
  constructor() {
    this.client
      .setEndpoint(config.appwriteEndPoint)
      .setProject(config.appwriteProjectId);
    this.storage=new Storage(this.client);
  }

  async uploadFile(file){
    try {
      return await this.storage.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      )
    } catch (error) {
      console.log("Appwrite :: uploadFile ::error ", error);
      return false;
    }
  }
  
  async deleteFile(fileId){
    try {
      await this.storage.deleteFile(
        config.appwriteBucketId,
        fileId
      );
    } catch (error) {
      console.log("Appwrite :: deleteFile ::error ", error);
      return false;
      
    }
  }

  getFilePreview(fileId){
    return this.storage.getFilePreview(
      config.appwriteBucketId,
      fileId
    )
  }

}

const storageService=new StorageService();
export default storageService;