import multer from "multer";
import path from "path";
import fs from "fs";

// Temporary upload folder
const uploadDir = path.join(process.cwd(), "temp");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

export const upload = multer({ storage });
