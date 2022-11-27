export const fileToBase64 = async (file: File): Promise<string> => {
  return btoa(unescape(encodeURIComponent(await file.text())))
}
