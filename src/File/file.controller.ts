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
import {
  Get,
  HttpException,
  HttpStatus,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { Public } from '../auth/route.protection';
import { UploadSingleImageDto } from './Dto/uploadfile.dto';
import fs = require('fs');
import { StoryService } from '../Story/story.service';
import { getUserLoggedIn } from '../Decorator/user.decorator';
import { User } from '../User/user.interface';

export const FILEPATH = {
  PROFILE_PICTURE: './Uploads/ProfilePictures/',
  STORY_PICTURE: './Uploads/StoryPictures/',
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
  constructor(
    private readonly userService: UserService,
    private readonly storyService: StoryService,
  ) {}

  @Post('/ProfilePicture/:id')
  @UseInterceptors(FileInterceptor('file', storage(FILEPATH.PROFILE_PICTURE)))
  uploadSinglePicture(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
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
  async getProfilePicture(@Res() res, @Param('filename') filename: string) {
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

  @Post('/addStoryImage')
  @UseInterceptors(FileInterceptor('file', storage(FILEPATH.STORY_PICTURE)))
  addStoryImage(
    @UploadedFile() file: Express.Multer.File,
    @Req() req,
    @getUserLoggedIn() user: User,
  ) {
    const image_url: string =
      req.protocol +
      '://' +
      req.get('host') +
      `/file/upload/getStoryImage/${file.filename}`;
    return this.storyService
      .addStory(user, image_url, file.filename)
      .catch((err) => {
        return {
          message: err.message,
          status: false,
          error: err.message,
        };
      });
  }

  @Public()
  @Get('/getStoryImage/:filename')
  async getStoryImage(@Res() res, @Param('filename') filename: string) {
    return of(
      res.sendFile(join(process.cwd(), FILEPATH.STORY_PICTURE + filename)),
    );
  }

  @Delete('/deleteStoryFile/:id')
  async deleteStoryFile(
    @Param('id') id: string,
    @getUserLoggedIn() user: User,
  ) {
    const story = await this.storyService.getStoryById(id);
    if (story === null) {
      throw new BadRequestException({
        message: 'Story Not Found!',
        status: false,
      });
    }
    this.storyService.deleteStory(id, user).catch((err) => {
      return {
        message: err.message,
        status: false,
      };
    });
    try {
      fs.unlinkSync(FILEPATH.STORY_PICTURE + story.image_name);
      return { message: 'Delete Sucessfully', status: true };
    } catch (error) {
      return error.message;
    }
  }
}
