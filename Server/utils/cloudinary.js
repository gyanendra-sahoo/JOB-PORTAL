import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

console.log(process.env.CLOUDINARY_CLOUD_NAME);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      throw new Error("Local file path is missing");
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "uploads",
    });

    // Delete file after upload
    fs.unlinkSync(localFilePath);

    return result;
  } catch (err) {
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    throw err;
  }
};

export { uploadOnCloudinary };
