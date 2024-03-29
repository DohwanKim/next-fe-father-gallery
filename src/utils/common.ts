import * as process from 'process';

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

export const numberPadding = (
  number: number | string,
  width: number,
  customPad?: string,
): string => {
  if (typeof number === 'number') {
    number = number.toString();
  }
  customPad = customPad || '0';

  return number.length >= width
    ? number
    : new Array(width - number.length + 1).join(customPad) + number;
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
  if (process.env.NEXT_PUBLIC_USE_MSW === 'true') {
    let imageWidth = 200;
    let imageHeight = 300;

    switch (variants) {
      case ImagesVariants.USER_POST:
        imageWidth = 370;
        imageHeight = 370;
        break;
      case ImagesVariants.USER_POST_BLUR:
        imageWidth = 48;
        imageHeight = 48;
        break;
      case ImagesVariants.USER_POST_DETAIL:
        imageWidth = 900;
        imageHeight = 500;
        break;
      case ImagesVariants.USER_POST_DETAIL_BLUR:
        imageWidth = 128;
        imageHeight = 128;
        break;
      case ImagesVariants.USER_POST_DETAIL_OG:
        imageWidth = 1200;
        imageHeight = 630;
        break;
    }
    return `https://picsum.photos/${imageWidth}/${imageHeight}`;
  }

  const accountId = process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGE_ACCOUNT_ID;

  return `https://imagedelivery.net/${accountId}/${cloudflareImgId}/${variants}`;
};

export const artTypeToReadableText = (artType: ArtType) => {
  let artTypeKorean = '';

  if (artType === 'NONE') {
    artTypeKorean = 'Etc';
  } else if (artType === 'WATERCOLOR') {
    artTypeKorean = 'WaterColor';
  } else if (artType === 'PENCIL_DRAWING') {
    artTypeKorean = 'Pencil';
  } else if (artType === 'ACRYLIC_PAINTING') {
    artTypeKorean = 'Acrylic';
  } else if (artType === 'OIL_PAINTING') {
    artTypeKorean = 'Oil';
  }

  return artTypeKorean;
};
