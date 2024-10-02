import { Module } from '@nestjs/common';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
import { PrismaService } from '../../prisma.service';
import { AnswerRepository } from './answer.repository';

@Module({
  controllers: [AnswerController],
  providers: [AnswerService, AnswerRepository, PrismaService],
})
export class AnswerModule {}
