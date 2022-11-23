const { User } = require("../../models/user");

const path = require("path");
const fs = require("fs").promises;

const avatarDir = path.join(__dirname, "../../", "public", "avatars");
console.log("__dirname", __dirname)
const Jimp = require("jimp");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const imageName = `${id}_${originalname}`;
 
  
  console.log("tempUpload", tempUpload)
  console.log("path",path)
  try {
    const resultUpload = path.join(avatarDir, imageName);
    Jimp.read(tempUpload, (err, image) => {
      if (err) {
        throw err;
      }
      image.resize(250, 250).write(resultUpload);
    });
    await fs.rename(tempUpload, resultUpload);
    const avatar = path.join("public", "avatars", imageName);
    await User.findByIdAndUpdate(req.user._id, { avatar });
    res.json({
      avatar,
    });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = updateAvatar;
