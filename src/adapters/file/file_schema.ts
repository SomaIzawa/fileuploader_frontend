import { User } from "../user/user_schema"

export type FileContent = {
  id: number
  file_name: string
  type: string
  user: User
  created_at: Date
  updated_at: Date
}

export type GetSignedURLReq = {
  url: string
}

export type FileDownloadRes = {
  download_link: string
	file_name: string
}