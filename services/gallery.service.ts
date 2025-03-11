import { conf } from "@/conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class GalleryService {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.APPWRITE_URL)
      .setProject(conf.APPWRITE_PROJECT_ID);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createDocument({
    src,
    alt,
    title,
    category,
  }: Readonly<{ src: string; alt: string; title: string; category: string }>) {
    try {
      return await this.databases.createDocument(
        conf.APPWRITE_DATABASE_ID,
        conf.APPWRITE_GALLERY_COLLECTION_ID,
        ID.unique(),
        {
          src,
          alt,
          title,
          category,
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: createDocument :: error", error);
    }
  }

  async updateDocument(
    id: string,
    {
      src,
      alt,
      title,
      category,
    }: Readonly<{ src: string; alt: string; title: string; category: string }>
  ) {
    try {
      return await this.databases.updateDocument(
        conf.APPWRITE_DATABASE_ID,
        conf.APPWRITE_GALLERY_COLLECTION_ID,
        id,
        {
          src,
          alt,
          title,
          category,
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: updateDocument :: error", error);
    }
  }

  async deleteDocument(id: string) {
    try {
      await this.databases.deleteDocument(
        conf.APPWRITE_DATABASE_ID,
        conf.APPWRITE_GALLERY_COLLECTION_ID,
        id
      );
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deleteDocument :: error", error);
      return false;
    }
  }

  async getDocument(id: string) {
    try {
      return await this.databases.getDocument(
        conf.APPWRITE_DATABASE_ID,
        conf.APPWRITE_GALLERY_COLLECTION_ID,
        id
      );
    } catch (error) {
      console.log("Appwrite serive :: getDocument :: error", error);
      return false;
    }
  }

  async getDocuments(queries = [Query.equal("category", "weding")]) {
    try {
      return await this.databases.listDocuments(
        conf.APPWRITE_DATABASE_ID,
        conf.APPWRITE_GALLERY_COLLECTION_ID,
        queries
      );
    } catch (error) {
      console.log("Appwrite serive :: getDocuments :: error", error);
      return false;
    }
  }
}

const galleryService = new GalleryService();
export { galleryService };
