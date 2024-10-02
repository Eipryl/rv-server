import { Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { PrismaService } from '../../prisma.service';
import { GroupRepository } from './group.repository';

@Module({
  controllers: [GroupController],
  providers: [GroupService, GroupRepository, PrismaService],
  exports: [GroupService],
})
export class GroupModule {}
