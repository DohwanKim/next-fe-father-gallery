export enum ArtType {
  'NONE' = 'NONE',
  'WATERCOLOR' = 'WATERCOLOR',
  'PENCIL_DRAWING' = 'PENCIL_DRAWING',
  'ACRYLIC_PAINTING' = 'ACRYLIC_PAINTING',
  'OIL_PAINTING' = 'OIL_PAINTING',
}

export type Post = {
  id: number;
  title: string;
  artType: ArtType;
  canvasSize: string;
  price: number;
  frameType: string;
  contents: string;
  tags: string[];
  isSold: boolean;
  createAt: Date;
  updateAt: Date;
  img: null | object;
};

export type CreatePostDTO = Exclude<
  Post,
  ['id', 'isSold', 'createAt', 'updateAt']
>;

export type UpdatePostDTO = CreatePostDTO & { id: number };
