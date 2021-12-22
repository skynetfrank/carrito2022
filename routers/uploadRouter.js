import multer from 'multer';
import express from 'express';
import { isAuth } from '../utils.js';
import { cloudinary } from '../mycloud/cloudinary.js';
import expressAsyncHandler from 'express-async-handler';
import streamifier from 'streamifier';

const uploadRouter = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

uploadRouter.post(
  '/',
  isAuth,
  upload.single('image'),
  expressAsyncHandler(async (req, res) => {
    let cld_upload_stream = await cloudinary.uploader.upload_stream(
      {
        folder: 'productos',
        width: 260,
        height: 300,
      },
      function (error, result) {
        res.send({
          url: result.url,
          cloudinaryUrl: result.url,
          errores: error,
        });
      }
    );
    streamifier.createReadStream(req.file.buffer).pipe(cld_upload_stream);
  })
);

export default uploadRouter;
