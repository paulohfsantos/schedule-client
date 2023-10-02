import { AxiosAdapter } from '../api/axiosAdapter';
import type { IAuthResponse } from '../types';

export class AuthService {
  private http = new AxiosAdapter();

  async login(email: string, password: string) {
    const response = await this.http
      .auth<IAuthResponse>('/public/login', { email, password });

    return response;
  }

  async register(username: string, email: string, password: string) {
    const response = await this.http
      .register<IAuthResponse>('/public/register', { username, email, password });

    return response;
  }
}