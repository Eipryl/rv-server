import { Module } from '@nestjs/common';
import { AnswerModule } from './features/answer/answer.module';
import { ConfigModule } from '@nestjs/config';
import { GroupModule } from './features/group/group.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './features/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({}),
    AnswerModule,
    GroupModule,
    AuthModule,
  ],
})
export class AppModule {}
