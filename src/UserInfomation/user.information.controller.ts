import { Body, Controller, Get, Injectable, Post } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserInformationService } from './user.information.service';

@Controller('user_information')
export class UserInformationController {
  constructor(
    private readonly userInformationService: UserInformationService,
  ) {}
}
