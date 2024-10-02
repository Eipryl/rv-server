import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Group, Prisma } from '@prisma/client';

@Injectable()
export class GroupRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.GroupUncheckedCreateInput) {
    return this.prisma.group.create({
      data,
    });
  }

  async findGroup(data: Prisma.GroupWhereUniqueInput) {
    const { nameGroup, serialGroup } = data;
    return this.prisma.group.findUnique({
      where: {
        nameGroup,
        serialGroup,
      },
      select: {
        id: true,
        nameGroup: true,
      },
    });
  }

  async update(params: {
    where: Prisma.GroupWhereUniqueInput;
    data: Prisma.GroupUpdateInput;
  }): Promise<Group> {
    const { where, data } = params;
    return this.prisma.group.update({
      data,
      where,
    });
  }

  async findUniqueForSerialGroup(
    where: Prisma.GroupWhereUniqueInput,
  ): Promise<Group | null> {
    return this.prisma.group.findUnique({
      where,
    });
  }
}
