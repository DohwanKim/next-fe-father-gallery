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
