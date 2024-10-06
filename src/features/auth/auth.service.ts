import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { AuthDto } from './auth.dto';
import { GroupDto } from '../group/group.dto';
import { GroupService } from '../group/group.service';
import { GroupModel } from '../group/group.model';

@Injectable()
export class AuthService {
  constructor(
    private groupService: GroupService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(createGroup: GroupDto) {
    const serialGroup = this.serialRandom(10);
    const newGroup = await this.groupService.create({
      ...createGroup,
      serialGroup,
    });
    const tokens = await this.getTokens(newGroup.id);
    await this.updateRefreshToken(newGroup.id, tokens.refresh);
    return { serialGroup, tokens };
  }

  async signIn(data: AuthDto) {
    const group: GroupModel = await this.groupService.findBySerialGroup(
      data.nameGroup,
      data.serialGroup,
    );
    if (!group)
      throw new BadRequestException(
        'SerialGroup is incorrect or Group does not exist',
      );
    const tokens = await this.getTokens(group.id);
    await this.updateRefreshToken(group.id, tokens.refresh);
    return tokens;
  }

  async refreshToken(groupId: number) {
    const tokens = await this.getTokens(groupId);
    await this.updateRefreshToken(groupId, tokens.refresh);
    return tokens;
  }

  private async updateRefreshToken(groupId: number, refreshToken: string) {
    const hashedRefreshToken = await argon2.hash(refreshToken);
    await this.groupService.updateRefreshToken(groupId, hashedRefreshToken);
  }

  private async getTokens(groupId: number) {
    const [access, refresh] = await Promise.all([
      this.jwtService.signAsync(
        {
          groupId,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: this.configService.get<string>(
            'JWT_ACCESS_SECRET_EXPIRED_IN',
          ),
        },
      ),
      this.jwtService.signAsync(
        {
          groupId,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: this.configService.get<string>(
            'JWT_REFRESH_SECRET_EXPIRED_IN',
          ),
        },
      ),
    ]);
    return { access, refresh };
  }

  serialRandom(length: number): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }

    return result;
  }
}
