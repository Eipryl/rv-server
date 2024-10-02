import { OmitType } from '@nestjs/swagger';
import { GroupModel } from './group.model';

export class GroupDto extends OmitType(GroupModel, [
  'id',
  'createAt',
  'refreshToken',
  'serialGroup',
]) {}
