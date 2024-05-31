import axios from "axios"
import { FileDownloadRes, GetSignedURLReq } from "./file_schema"

export const useFileAPI = {
  getSignedUrl: async (req: GetSignedURLReq) : Promise<string> => {
    const res = await axios.post<string>(`${process.env.REACT_APP_API_URL}/files/get-signed-url`, req, {
      withCredentials: true,
    })
    return res.data
  },
  getDownloadUrl: async (id :number) :Promise<FileDownloadRes> => {
    const res = await axios.get<FileDownloadRes>(`${process.env.REACT_APP_API_URL}/files/download/${id}`, {
      withCredentials: true,
    })
    return res.data
  },
  delete: async (id: number) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/files/${id}`, {
      withCredentials: true,
    })
  }
}