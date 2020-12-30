import axios from 'axios';

import {
  RefreshTokenResponse,
  LoginTokenResponse,
  SubmittedRecordsResponse,
  CountyRecord,
  UserRecord,
} from './types';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export default {
  initAxios: (token: string | null): void => {
    if (token) {
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${token.replace(
        /"/g,
        ''
      )}`;
    } else {
      delete axiosInstance.defaults.headers.common.Authorization;
    }
  },
  refreshAccessToken: async (): Promise<RefreshTokenResponse | null> => {
    try {
      const { data } = await axiosInstance.post<RefreshTokenResponse>(
        '/api/users/refresh/'
      );
      return data;
    } catch (e) {
      console.error(e);
      return null;
    }
  },
  login: async (
    email: string,
    password: string
  ): Promise<LoginTokenResponse | null> => {
    try {
      const { data } = await axiosInstance.post<LoginTokenResponse>(
        '/api/users/login/',
        {
          email,
          password,
        }
      );
      return data;
    } catch (e) {
      console.error(e);
      return null;
    }
  },
  getSubmittedData: async (): Promise<SubmittedRecordsResponse | null> => {
    try {
      const { data } = await axiosInstance.get<SubmittedRecordsResponse>(
        '/api/records/submitted/'
      );
      return data;
    } catch (e) {
      console.error(e);
      return null;
    }
  },
  getUsers: async (countyId: string): Promise<UserRecord[] | null> => {
    try {
      const { data } = await axiosInstance.get<UserRecord[]>(
        `/api/admin/users/?id=${countyId}`
      );
      return data;
    } catch (e) {
      console.error(e);
      return null;
    }
  },
  getCounties: async (): Promise<CountyRecord[] | null> => {
    try {
      const { data } = await axiosInstance.get(`/api/counties/`);
      return data;
    } catch (e) {
      console.error(e);
      return null;
    }
  },
  deleteUser: async (userId: number): Promise<boolean> => {
    try {
      await axiosInstance.delete(`/api/admin/users/delete/?id=${userId}`);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  },
};
