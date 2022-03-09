import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { uuid } from 'uuidv4';
import path = require('path');

export const FILEPATH = {
  PROFILE_PICTURE: './Uploads/ProfilePictures',
};

export function storage(filePath: string) {
  return {
    storage: diskStorage({
      destination: filePath,
      filename: (req, file, cb) => {
        const filename: string =
          path.parse(file.originalname).name.replace(/\s/g, '') + '_' + uuid();
        const extension: string = path.parse(file.originalname).ext;
        cb(null, `${filename}${extension}`);
      },
    }),
  };
}

@Controller('/file')
export default class FileController {
  // constructor(private readonly followService: FollowService) {}

  @Post('uploadSinglePicture')
  @UseInterceptors(FileInterceptor('file', storage(FILEPATH.PROFILE_PICTURE)))
  async uploadSinglePicture(@UploadedFile() file: Express.Multer.File) {
    return (
      'https://nest-api-socail-media.herokuapp.com/Uploads/ProfilePictures/' +
      file.filename
    );
  }
}
