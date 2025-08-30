import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

import { v2 as cloudinary } from 'cloudinary';


// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

// upload file to cloudinary
const uploadOnCloudinary = async (localFilePath) =>{
    try {
        if(!localFilePath) return null
        // Upload the image to Cloudinary
        const response = await cloudinary.uploader
            .upload(localFilePath, {
                response_type: "auto"
            })
        // file has been uploaded suceessfully
        console.log("file uploaded to cloudinary successfully: ", response.url);
        
        // remove the file from local uploads folder
        fs.unlinkSync(localFilePath)
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the file from local uploads folder
        console.log("error in uploadOnCloudinary util", error);
        return null;
    }
}

export { uploadOnCloudinary }