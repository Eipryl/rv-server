import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenStrategy } from './strategies/access-token-strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token-strategy';
import { GroupModule } from '../group/group.module';

@Module({
  imports: [ConfigModule, JwtModule, GroupModule],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
