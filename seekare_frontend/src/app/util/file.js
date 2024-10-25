export const fileExt = (filename) => {
  return filename.split('.').pop();
};

export const isImage = (filename) => {
  return filename
    .split('.')
    .pop()
    .match(/(jpg|jpeg|png|gif)$/i);
};
