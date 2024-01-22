import { Client, Databases, ID, Query, Storage } from "appwrite";
import config from "../config";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        },
      );
    } catch (error) {
      console.log("Appwrite Error :: createPost :: error ", error);
      return false;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        },
      );
    } catch (error) {
      console.log("Appwrite Error :: updatePost :: error ", error);
      return false;
    }
  }

  async deletePost(slug) {
    try {
      // here slug = document_id
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
      );
      return true;
    } catch (error) {
      console.log("Appwrite Error :: deletePost :: error ", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
      );
    } catch (error) {
      console.log("Appwrite Error :: getPost :: error ", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries,
      );
    } catch (error) {
      console.log("Appwrite Error :: getPosts :: error ", error);
      return false;
    }
  }

  // file upload services
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file,
      );
    } catch (error) {
      console.log("Appwrite Error :: uploadFile :: error ", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(config.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite Error :: deleteFile :: error ", error);
      return false;
    }
  }

  // async getFilePreview(fileId) {
  // 	// console.log("fileId: ", fileId);

  // 	const file = this.bucket.getFilePreview(config.appwriteBucketId, fileId);
  // 	return file;

  // 	// 	try {
  // 	// 		const filePreview = this.bucket.getFilePreview(
  // 	// 			config.appwriteBucketId,
  // 	// 			fileId
  // 	// 		);
  // 	// 		return filePreview;
  // 	// 	} catch (error) {
  // 	// 		throw new Error("Error getting file preview: " + error.message);
  // 	// 	}
  // }
  async getFilePreview(fileId) {
    try {
      const filePreview = await this.bucket.getFilePreview(
        config.appwriteBucketId,
        fileId,
      );
      return filePreview;
    } catch (error) {
      console.log("Appwrite Error :: getFilePreview :: error ", error);
      return null; // or throw an error if you want to handle it differently
    }
  }
}

// const service = new Service();
// export default service;

const service = new Service();
export default service;
