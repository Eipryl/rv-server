import { Injectable, NotFoundException } from '@nestjs/common';
import { GroupRepository } from './group.repository';
import { GroupModel } from './group.model';
import { AuthDto } from '../auth/auth.dto';

@Injectable()
export class GroupService {
  constructor(private readonly repository: GroupRepository) {}
  async create(data: AuthDto) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return this.repository.create(data);
  }

  async findByGroup(nameGroup: string, serialGroup: string) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const data = await this.repository.findGroup({ nameGroup, serialGroup });
    if (!data) throw new NotFoundException("Group doesn't exist");
    return data;
  }

  async updateRefreshToken(
    id: number,
    refreshToken: string,
  ): Promise<GroupModel> {
    return this.repository.update({
      data: { refreshToken },
      where: { id },
    });
  }

  async findBySerialGroup(nameGroup: string, serialGroup: string) {
    return this.repository.findUniqueForSerialGroup({
      nameGroup,
      serialGroup,
    });
  }
}
