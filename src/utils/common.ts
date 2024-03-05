import { ImagesVariants } from '@/constants/images.enum';
import { ArtType } from '@/constants/post.enum';

export const threeCommaNum = (numString: string | number) => {
  numString = `${numString}`;

  if (!numString) {
    return '0';
  } else {
    return numString.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
  }
};

export const getFileSize = (bytes: number, dp = 0) => {
  const thresh = 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }

  const units = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units.length - 1
  );

  return bytes.toFixed(dp) + units[u];
};

export const getCFUrl = (
  cloudflareImgId: string,
  variants: ImagesVariants = ImagesVariants.PUBLIC,
) => {
  const accountId = process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGE_ACCOUNT_ID;

  return `https://imagedelivery.net/${accountId}/${cloudflareImgId}/${variants}`;
};

export const artTypeToKorean = (artType: ArtType) => {
  let artTypeKorean = '';

  if (artType === 'NONE') {
    artTypeKorean = '기타';
  } else if (artType === 'WATERCOLOR') {
    artTypeKorean = '수채화';
  } else if (artType === 'PENCIL_DRAWING') {
    artTypeKorean = '연필화';
  } else if (artType === 'ACRYLIC_PAINTING') {
    artTypeKorean = '아크릴화';
  } else if (artType === 'OIL_PAINTING') {
    artTypeKorean = '유화';
  }

  return artTypeKorean;
};
