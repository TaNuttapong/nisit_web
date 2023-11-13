import * as fs from "fs";
import sharp from "sharp";
import crypto from "crypto";

const folder = {
  createProjectFolder(projectName: string) {
    const folderPath = `path/to/your/project/folder/${projectName}`;

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    return folderPath;
  },
  saveImageInFolder(folderPath: string, imageData: any) {
    const hash = crypto.createHash("md5").update(imageData).digest("hex");
    const imageFileName = `${hash}.png`;
    const imagePath = `${folderPath}/${imageFileName}`;

    const imageBuffer = Buffer.from(imageData, "base64");

    sharp(imageBuffer)
      .toFormat("png")
      .png({ quality: 80 })
      .toFile(imagePath, (err, info) => {
        if (err) {
          console.error("Error saving image:", err);
        } else {
          console.log("Image saved successfully:", info);
        }
      });
    return imagePath;
  },
};

export default folder;
