import { Category, initCategory } from "../category/category_schema";
import { FileContent } from "../file/file_schema";
import { initUser, User } from "../user/user_schema";

export type Post = {
	id: number;
	title: string;
	comment: string;
	thumbnail_type: string;
	user: User;
	category: Category;
	files: FileContent[];
  signed_url: string;
	created_at: Date;
	updated_at: Date;
}

export const initPost = (): Post => {
  return {
    id: 0,
    title: '',
    comment: '',
    thumbnail_type: '',
    user: initUser(),
    category: initCategory(),
    files: [],
    signed_url: "",
    created_at: new Date(0),
    updated_at: new Date(0),
  };
}