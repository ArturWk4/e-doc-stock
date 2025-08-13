// import { Notification, NotificationRequest, NotificationsResponse } from '';
import { UserType } from '../types/users';
import { axiosInstance } from './axios';

export const userApi = {
    async getUsers(): Promise<UserType[]> {
      const { data } = await axiosInstance.get<UserType[]>('users');
      console.log(data)
      return data;
    },
    async getUserById(id: string): Promise<UserType> {
      const { data } = await axiosInstance.get<UserType>(`users/${id}`);
      console.log(data)
      return data;
    },
    async updateUser(id: string, body: {name: string, email: string, phone: string}): Promise<UserType> {
      const { data } = await axiosInstance.patch<UserType>(`users/${id}`, body);
      console.log(data)
      return data;
    },
}; 

