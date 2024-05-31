import axios from "axios"
import { CategoryCreateReq, Category } from "./category_schema"

export const useCategoryAPI = {
  list: async () : Promise<Category[]> => {
    const res = await axios.get<Category[]>(`${process.env.REACT_APP_API_URL}/categories`, {
      withCredentials: true,
    })
    return res.data
  },
  getById: async (id :number) : Promise<Category> => {
    const res = await axios.get<Category>(`${process.env.REACT_APP_API_URL}/categories/${id}`,{
      withCredentials: true,
    })
    return res.data
  },
  create: async (req :CategoryCreateReq) => {
    const res = await axios.post<Category>(`${process.env.REACT_APP_API_URL}/categories`, req,{
      withCredentials: true,
    })
    return res.data
  }
}