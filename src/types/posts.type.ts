import { ArtType } from '@/constants/post.enum';

export interface ImageUploadedResult {
  uid: number;
  id: string;
  filename: string;
  requireSignedURLs: boolean;
  metadata?: null | { [key: string]: string };
  uploaded: Date | string;
  variants: string[];
}

export interface PostCore {
  title: string;
  drawingDate: Date | string | null;
  artType: ArtType | string;
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
  createAt: Date | string;
  updateAt: Date | string;
  version: number;
}

export interface PostForm extends Omit<PostCore, 'img'> {
  id?: number;
}
