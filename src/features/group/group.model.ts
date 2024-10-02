import { IsDateString, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GroupModel {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  nameGroup: string;

  @ApiProperty()
  @IsString()
  serialGroup: string;

  @ApiProperty()
  @IsString()
  refreshToken: string;

  @ApiProperty()
  @IsDateString()
  createAt: Date;
}
