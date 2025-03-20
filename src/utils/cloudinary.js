  import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
// import dotenv from "dotenv"


// dotenv.config()

cloudinary.config({
  cloud_name:`dv9noi4np`,
  api_key:`637978918976489`,
  api_secret:`cbqAj_qrnWl0aZkYMdeyyys9Vuk`

})

export const uploadoncloudinary = async(avatarlocal)=> {
  try {
    if (!avatarlocal) {
      throw new Error("File path is required");
    }

    const uploadlink = await cloudinary.uploader.upload(avatarlocal, {
      transformation: [{ quality: "auto", fetch_format: "auto" }],
      resource_type: "auto",
    });

    if (fs.existsSync(avatarlocal)) {
      fs.unlinkSync(avatarlocal);
    }

    return uploadlink;
  } catch (error) {
    console.error("Cloudinary Upload Error: ", error.message);

    if (fs.existsSync(avatarlocal)) {
      fs.unlinkSync(avatarlocal); // Delete the file if upload fails
      console.log("File Deleted");    
    }

    return null;
  }
};

// export { uploadoncloudinary };