import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AnswerUserModel } from './answer.model';
import { AnswerService } from './answer.service';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from '../../common/guards/access-token.guard';

@ApiTags('answer')
@Controller('answer')
export class AnswerController {
  constructor(private readonly service: AnswerService) {}
  @Post()
  async create(@Body(new ValidationPipe()) data: AnswerUserModel) {
    return this.service.create(data);
  }

  @Post('question')
  async createQuestion(@Body(new ValidationPipe()) data) {
    return this.service.createQuestion(data);
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Get()
  async getAll(@Req() req: Request) {
    return this.service.findMany(req.user['groupId']);
  }
}
