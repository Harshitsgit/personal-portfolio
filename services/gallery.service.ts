import { conf } from "@/conf/conf";
import { Messages, StatusCodes } from "@/constants";
import { Apiresponse } from "@/types";
import { handleApiError } from "@/utils";
import { Client, ID, Databases, Storage, Query, Models } from "appwrite";

export class GalleryService {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.NEXT_PUBLIC_APPWRITE_URL)
      .setProject(conf.NEXT_PUBLIC_APPWRITE_PROJECT_ID);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createDocument({
    id,
    fileId,
    src,
    alt,
    title,
    category,
    description,
  }: Readonly<{
    id: string;
    fileId: string;
    src: string;
    alt: string;
    title: string;
    category: string;
    description: string;
  }>) {
    try {
      await this.databases.createDocument(
        conf.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        conf.NEXT_PUBLIC_APPWRITE_GALLERY_COLLECTION_ID,
        id,
        { fileId, src, alt, title, category }
      );
      return {
        status: StatusCodes.SUCCESS_STATUS,
        data: null,
        message: Messages.SUCCESS_MESSAGE,
      };
    } catch (error) {
      console.log("Appwrite serive :: createDocument :: error", error);
      return handleApiError(error);
    }
  }

  async updateDocument(
    id: string,
    {
      fileId,
      src,
      alt,
      title,
      category,
      description,
    }: Readonly<{
      fileId: string;
      src: string;
      alt: string;
      title: string;
      category: string;
      description: string;
    }>
  ) {
    try {
      return await this.databases.updateDocument(
        conf.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        conf.NEXT_PUBLIC_APPWRITE_GALLERY_COLLECTION_ID,
        id,
        {
          fileId,
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
        conf.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        conf.NEXT_PUBLIC_APPWRITE_GALLERY_COLLECTION_ID,
        id
      );
      return {
        status: StatusCodes.SUCCESS_STATUS,
        data: null,
        message: Messages.SUCCESS_MESSAGE,
      };
    } catch (error) {
      console.log("Appwrite serive :: deleteDocument :: error", error);
      return handleApiError(error);
    }
  }

  async getDocument(id: string) {
    try {
      return await this.databases.getDocument(
        conf.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        conf.NEXT_PUBLIC_APPWRITE_GALLERY_COLLECTION_ID,
        id
      );
    } catch (error) {
      console.log("Appwrite serive :: getDocument :: error", error);
      return false;
    }
  }

  async getDocuments(
    queries = [Query.equal("category", "weding")]
  ): Promise<Apiresponse<Models.Document[] | null>> {
    try {
      const documentsList = await this.databases.listDocuments(
        conf.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        conf.NEXT_PUBLIC_APPWRITE_GALLERY_COLLECTION_ID,
        queries
      );

      return {
        status: StatusCodes.SUCCESS_STATUS,
        data: documentsList.documents,
        message: Messages.SUCCESS_MESSAGE,
      };
    } catch (error) {
      console.log("Appwrite serive :: getDocuments :: error", error);
      return handleApiError(error);
    }
  }
}

const galleryService = new GalleryService();
export { galleryService };
