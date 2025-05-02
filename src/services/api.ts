import { api } from "../lib/api";

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export class ApiService {
  private static instance: ApiService;
  private token: string | null = null;

  private constructor() {}

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  public setToken(token: string) {
    this.token = token;
  }

  public async getUsers() {
    if (!this.token) throw new Error("No token available");
    return api.getUsers(this.token);
  }

  public async getFiles() {
    if (!this.token) throw new Error("No token available");
    return api.getFiles(this.token);
  }

  public async getClients() {
    if (!this.token) throw new Error("No token available");
    return api.getClients(this.token);
  }

  public async getFAQs() {
    if (!this.token) throw new Error("No token available");
    return api.getFAQs(this.token);
  }

  public async getTeamMembers() {
    if (!this.token) throw new Error("No token available");
    return api.getTeamMembers(this.token);
  }

  public async getServices() {
    if (!this.token) throw new Error("No token available");
    return api.getServices(this.token);
  }

  public async getBlogPosts() {
    if (!this.token) throw new Error("No token available");
    return api.getBlogPosts(this.token);
  }
}

export const apiService = ApiService.getInstance();
