import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Res,
  Param,
  Req,
  Body,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import path = require('path');
import { join } from 'path';
import { of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { UserService } from '../User/user.service';
import { Get, HttpException, HttpStatus } from '@nestjs/common';
import { Public } from '../auth/route.protection';
import { UploadSingleImageDto } from './Dto/uploadfile.dto';
import fs = require('fs');

export const FILEPATH = {
  PROFILE_PICTURE: './Uploads/ProfilePictures/',
};

export function storage(filePath: string) {
  return {
    storage: diskStorage({
      destination: filePath,
      filename: (req, file, cb) => {
        const filename: string =
          path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
        const extension: string = path.parse(file.originalname).ext;
        cb(null, `${filename}${extension}`);
      },
    }),
  };
}

@Controller('/file/upload')
export default class FileController {
  constructor(private readonly userService: UserService) {}

  @Post('/ProfilePicture/:id')
  @UseInterceptors(FileInterceptor('file', storage(FILEPATH.PROFILE_PICTURE)))
  uploadSinglePicture(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id,
    @Req() req,
  ) {
    const image_url: string =
      req.protocol +
      '://' +
      req.get('host') +
      `/file/upload/getProfilePicture/${file.filename}`;
    return this.userService
      .updateProfilePicture(
        id,
        image_url,
        FILEPATH.PROFILE_PICTURE,
        file.filename,
      )
      .catch((err) => {
        return {
          message: 'User Not Found!',
          status: false,
          error: err.message,
        };
      });
  }

  @Public()
  @Get('/getProfilePicture/:filename')
  async getProfilePicture(@Res() res, @Param('filename') filename) {
    return of(
      res.sendFile(join(process.cwd(), FILEPATH.PROFILE_PICTURE + filename)),
    );
  }

  // @Public()
  @Get('/deleteFile/:filename')
  async deleteFile(@Param('filename') filename) {
    try {
      fs.unlinkSync(FILEPATH.PROFILE_PICTURE + filename);
      return 'Delete Successfully';
    } catch (error) {
      return error.message;
    }
  }
}
