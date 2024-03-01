import { ArtType } from '@/constants/post.enum';

export interface ImageUploadedResult {
  id: string;
  filename: string;
  requireSignedURLs: boolean;
  metadata?: { [key: string]: string };
  uploaded: Date;
  variants: string[];
}

export interface PostCore {
  title: string;
  drawingDate: Date;
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
  version: number;
}

export interface PostForm extends Omit<PostCore, 'img'> {
  id?: number;
}
