import { Body, Controller, Post } from '@nestjs/common';
import { GroupService } from './group.service';
import { AuthDto } from '../auth/auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('group')
@Controller('group')
export class GroupController {
  constructor(private readonly service: GroupService) {}

  @Post('consultBySerialGroup')
  signIn(@Body() data: AuthDto) {
    return this.service.findByGroup(data.nameGroup, data.serialGroup);
  }
}
