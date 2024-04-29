import conf from "../conf.js";
// step   1 importing all appwrite  envirment variabl form file  name conf
import { Client, ID, Databases, Storage, Query } from "appwrite";
// step 2   importing all
export class Service {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectId);
    this.bucket = new Storage(this.client);
    this.databases = new Databases(this.client);
  }
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite service:: createPost::error", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite service:: updatePost::error", error);
    }
  }

  async deletePost({ slug }) {
    try {
      return await this.databases.deleteDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite service:: deletePost::error", error);
    }
    return false;
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite service:: getPost::error", error);
      return false;
    }
  }
  async getPost(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite service:: getPost::error", error);
      return false;
    }
  }
  // file upload service
  async uploadFile(file) {
    try {
      return await this.databases.createFile(
        conf.appWriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite service:: getPost::error", error);
      return false;
    }
  }
  async deleteFile(fileId) {
    try {
      return await this.databases.createFile(
        conf.appWriteBucketId,

        fileId
      );
      return true;
    } catch (error) {
      console.log("Appwrite service:: getPost::error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(
        conf.appWriteBucketId,
        FileId
    )
}
}
const service = new Service();
export default service;
