import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GroupDto } from '../group/group.dto';
import { RefreshTokenGuard } from '../../common/guards/refresh-token.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() createGroup: GroupDto) {
    return this.authService.signUp(createGroup);
  }

  @Post('sign-in')
  signIn(@Body() data: AuthDto) {
    return this.authService.signIn(data);
  }

  @ApiBearerAuth()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh/token')
  refreshToken(@Req() req: Request) {
    return this.authService.refreshToken(req.user['id']);
  }
}
