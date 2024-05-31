export type CategoryCreateReq = {
  name: string
}

export type Category = {
  id: number
  name: string
  created_at: string
  updated_at: string
}

export const initCategory = (): Category => {
  return {
    id: 0,
    name: '',
    created_at: new Date(0).toISOString(),
    updated_at: new Date(0).toISOString(),
  };
}