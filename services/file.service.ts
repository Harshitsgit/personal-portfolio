import { Client, Storage, ID } from "appwrite";
import { conf } from "@/conf/conf";
import { Apiresponse } from "@/types";
import { Messages, StatusCodes } from "@/constants";
import { handleApiError } from "@/utils";
export class FileService {
  client;
  storage;
  constructor() {
    this.client = new Client()
      .setEndpoint(conf.APPWRITE_URL)
      .setProject(conf.APPWRITE_PROJECT_ID);
    this.storage = new Storage(this.client);
  }

  async createFile(file: File): Promise<Apiresponse<null>> {
    try {
      await this.storage.createFile(conf.APPWRITE_BUCKET_ID, ID.unique(), file);
      return {
        status: StatusCodes.SUCCESS_STATUS,
        data: null,
        message: Messages.SUCCESS_MESSAGE,
      };
    } catch (error) {
      return handleApiError(error);
    }
  }

  async deleteFile(fileId: string): Promise<Apiresponse<null>> {
    try {
      await this.storage.deleteFile(conf.APPWRITE_BUCKET_ID, fileId);
      return {
        status: StatusCodes.SUCCESS_STATUS,
        data: null,
        message: Messages.SUCCESS_MESSAGE,
      };
    } catch (error) {
      return handleApiError(error);
    }
  }

  getFilePreview(fileId: string): Apiresponse<string | null> {
    try {
      const result: string = this.storage.getFilePreview(
        conf.APPWRITE_BUCKET_ID,
        fileId
      );

      return {
        status: StatusCodes.SUCCESS_STATUS,
        data: result,
        message: Messages.SUCCESS_MESSAGE,
      };
    } catch (error) {
      return handleApiError(error);
    }
  }
}

const fileService = new FileService();
export { fileService };
