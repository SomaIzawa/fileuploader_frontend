import axios from "axios"
import { LoginReq, SignUpReq } from "./user_schema"

export const useUserAPI = {
  login: async (req: LoginReq) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/login`, req)
    return res
  },
  signup: async (req: SignUpReq) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/signup`, req)
    return res
  },
  logout: async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/logout`)
  }
}