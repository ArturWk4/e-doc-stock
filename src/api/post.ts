import { PostType } from '../types/posts';
import { CommentType } from '../types/comment';

import { axiosInstance } from './axios';

export const postApi = {
    async getPosts(): Promise<PostType[]> {
      const { data } = await axiosInstance.get<PostType[]>('posts');
      console.log(data)
      return data;
    },
    async getCommentsByPostId(postId: number): Promise<CommentType[]> {
    const {data} = await axiosInstance.get<CommentType[]>(
      `comments`,
      {
        params: { postId }, // ?postId=1
      }
    );
    return data
  }
}; 


