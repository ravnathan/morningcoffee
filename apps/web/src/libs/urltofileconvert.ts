export function dataURLtoFile(dataUrl: string, fileName: string): File {
    const [header, base64Data] = dataUrl.split(',');
    const mimeType = header.match(/:(.*?);/)![1];
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new File([byteArray], fileName, { type: mimeType });
  }