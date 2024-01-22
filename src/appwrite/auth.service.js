/* eslint-disable no-useless-catch */
import { Account, Client, ID } from "appwrite";
import config from "../config";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
      );
      if (userAccount) {
        // call another method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      // throw error;
      console.log("Appwrite error :: createAccount :: error ", error);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      // throw error;
      console.log("Appwrite error :: login :: error ", error);
    }
    return null;
  }

  async getCurrentUser() {
    try {
      const user = await this.account.get();
      return user;
    } catch (error) {
      console.error("Appwrite Error :: getCurrentUser :: error ", error);
      return null;
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite Error :: logout :: error ", error);
    }
  }
}

const authService = new AuthService();

export default authService;
