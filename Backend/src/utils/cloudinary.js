import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

import dotenv from "dotenv";
dotenv.config(); // load env variables first

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const path = localFilePath.replace(/\\/g, "/"); // fix Windows paths

        const response = await cloudinary.uploader.upload(path, {
            resource_type: "auto",
        });

        console.log("File uploaded successfully:", response.url);

        fs.unlink(path, (err) => {
            if (err) console.error("Failed to delete temp file:", err);
        });

        return response;

    } catch (error) {
        console.error("Cloudinary upload error:", error);

        fs.unlink(localFilePath, (err) => {
            if (err) console.error("Failed to delete temp file:", err);
        });

        return null;
    }
};

export { uploadOnCloudinary };
