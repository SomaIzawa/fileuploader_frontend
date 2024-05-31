import { User } from "../user/user_schema"

export type FileContent = {
  id: number
  file_name: string
  type: string
  user: User
  created_at: string
  updated_at: string
}

export type GetSignedURLReq = {
  url: string
}

export type FileDownloadRes = {
  download_link: string
	file_name: string
}