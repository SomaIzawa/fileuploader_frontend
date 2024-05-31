import axios from "axios"
import { Post } from "./post_schema";

export const usePostAPI = {
  list: async () : Promise<Post[]> => {
    const res = await axios.get<Post[]>(`${process.env.REACT_APP_API_URL}/posts`, {
      withCredentials: true,
    })
    return res.data
  },
  getById: async (id :number) : Promise<Post> => {
    const res = await axios.get<Post>(`${process.env.REACT_APP_API_URL}/posts/${id}`,{
      withCredentials: true,
    })
    return res.data
  },
  create: async (formData :FormData) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/posts`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      console.log(response);
    } catch (error) {
      console.error('There was an error uploading the file!', error);
    }
  }
}