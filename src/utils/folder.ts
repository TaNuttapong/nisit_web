const folder = {
  createUniqueFolder: async (): Promise<string> => {
    const currentDate = new Date();
    const folderName = `${currentDate.getDate()}_${
      currentDate.getMonth() + 1
    }_${currentDate.getFullYear()}`;
    const folderPath = `browser_${folderName}`;

    // Check if the folder already exists in localStorage
    if (!localStorage.getItem(folderPath)) {
      localStorage.setItem(folderPath, "created");
    }

    return folderPath;
  },

  saveImageToFolder: async (
    folderPath: string,
    imageName: string,
    imageData: Uint8Array
  ): Promise<string> => {
    // Save the image data to localStorage or another storage mechanism
    const imagePath = `../../public/projects${folderPath}/${imageName}`;
    localStorage.setItem(imagePath, JSON.stringify(Array.from(imageData)));

    return imagePath;
  },
};

export default folder;
