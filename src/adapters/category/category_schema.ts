export type CategoryCreateReq = {
  name: string
}

export type Category = {
  id: number
  name: string
  created_at: Date
  updated_at: Date
}

export const initCategory = (): Category => {
  return {
    id: 0,
    name: '',
    created_at: new Date(0),
    updated_at: new Date(0),
  };
}