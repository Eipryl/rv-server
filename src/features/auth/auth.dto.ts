import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty()
  @IsString()
  nameGroup: string;

  @ApiProperty()
  @IsString()
  serialGroup: string;
}
