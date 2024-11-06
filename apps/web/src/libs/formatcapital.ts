export const capitalizeFirstLetter = (string: string | undefined): string | undefined => {
  if (string) {
    return string.charAt(0).toUpperCase() + string?.slice(1);
  }
};
