const multer = require("multer");
const { v4: uuidV4 } = require("uuid");

const UPLOAD_DIR = "./uploads";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidV4() + "-" + fileName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    cb(null, true);
  },
});

module.exports = (filed_name, maxSize) => upload.array(filed_name, maxSize);
