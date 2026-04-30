import conf from "../config/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client.setEndpoint(conf.appwriteurl).setProject(conf.projectid);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.databaseid,
        conf.collectionid,
        ID.unique(),
        {
          Title: title,
          slug,
          content,
          featuredImage,
          status,
          User_id: userId,
        },
      );
    } catch (error) {
      console.log("Appwrite serive :: createPost :: error", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteurl,
        conf.collectionid,
        slug,
        {
         Title: title,
          slug,
          content,
          featuredImage,
          status,
        },
      );
    } catch (error) {
      console.log("Appwrite serive :: updatePost :: error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.databaseid,
        conf.collectionid,
        slug,
      );
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deletePost :: error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.databaseid,
        conf.collectionid,
        slug,
      );
    } catch (error) {
      console.log("Appwrite serive :: getPost :: error", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.databaseid,
        conf.collectionid,
        queries,
      );
    } catch (error) {
      console.log("Appwrite serive :: getPosts :: error", error);
      return false;
    }
  }

  // file upload service

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(conf.bucketid, ID.unique(), file);
    } catch (error) {
      console.log("Appwrite serive :: uploadFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.bucketid, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deleteFile :: error", error);
      return false;
    }
  }

getFileView(fileId) {
  if (!fileId) return "";

  try {
    return this.bucket.getFileView(conf.bucketid, fileId).toString();
  } catch (error) {
    console.error("File view error:", error);
    return "";
  }
}
}

const service = new Service();
export default service;

