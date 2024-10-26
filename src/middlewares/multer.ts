import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { Request } from 'express';

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const ext = path.extname(file.originalname).toLowerCase();

    if (
      ext !== '.jpg' &&
      ext !== '.jpeg' &&
      ext !== '.png' &&
      ext !== '.mp3' &&
      ext !== '.wav' &&
      ext !== '.m4a'
    ) {
      return cb(new Error('Only images and audio files are allowed'));
    }
    
    cb(null, true);
  },
});

export default upload;
