import { ArtType } from '@/constants/post.enum';

export interface ImageUploadedResult {
  id: string;
  filename: string;
  requireSignedURLs: boolean;
  metadata?: { [key: string]: string };
  uploaded: Date;
  variants: string[];
}

interface PostCore {
  title: string;
  artType: ArtType;
  canvasSize: string;
  price: number;
  frameType: string;
  contents: string;
  tags: string[];
  isSold: boolean;
  img: null | ImageUploadedResult;
}

export interface Post extends PostCore {
  id: number;
  createAt: Date;
  updateAt: Date;
}

export interface PostForm extends Omit<PostCore, 'img'> {
  id?: number;
  img: null | FileList | ImageUploadedResult;
}

export interface CreatePostDTO extends PostCore {}

export interface UpdatePostDTO extends PostCore {
  id: number;
}
