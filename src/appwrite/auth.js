import conf from "../config/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteurl)
      .setProject(conf.projectid);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        return this.login({ email, password }); // ✅ FIXED
      } else {
        return userAccount;
      }
    } catch (error) {
      throw new Error(error.message); // ✅ FIXED
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password); // ✅ correct
    } catch (error) {
      throw error;
    }
  }

  async getCurrentuser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("getCurrentUser error", error);
      return null;
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("logout error", error);
    }
  }
}

const authservice = new AuthService();
export default authservice;