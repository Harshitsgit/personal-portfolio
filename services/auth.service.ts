import { Client, Account, ID, Models } from "appwrite";

import { conf } from "@/conf/conf";
import { Apiresponse } from "@/types";
import { Messages, StatusCodes } from "@/constants";
import { handleApiError } from "@/utils";
export class AuthService {
  client;
  account;
  constructor() {
    this.client = new Client()
      .setEndpoint(conf.APPWRITE_URL)
      .setProject(conf.APPWRITE_PROJECT_ID);
    this.account = new Account(this.client);
  }

  async signIn(
    email: string,
    password: string
  ): Promise<Apiresponse<Models.Session>> {
    try {
      const response = await this.account.createEmailPasswordSession(
        email,
        password
      );
      return {
        status: StatusCodes.SUCCESS_STATUS,
        data: response,
        message: Messages.SUCCESS_MESSAGE,
      };
    } catch (error) {
      console.log("🚀 ~ AuthService ~ signIn ~ error:", error);
      return handleApiError(error);
    }
  }

  async signOut() {
    try {
      return await this.account.deleteSession("current");
    } catch (error) {
      console.log("🚀 ~ AuthService ~ signOut ~ error:", error);
      return null;
    }
  }

  async getUser(): Promise<Apiresponse<Models.User<Models.Preferences>>> {
    try {
      const userData = await this.account.get();
      return {
        status: StatusCodes.SUCCESS_STATUS,
        data: userData,
        message: Messages.SUCCESS_MESSAGE,
      };
    } catch (error) {
      console.log("🚀 ~ AuthService ~ getUser ~ error:", error);
      return handleApiError(error);
    }
  }
}

const authService = new AuthService();
export { authService };
