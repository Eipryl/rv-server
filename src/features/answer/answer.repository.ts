import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AnswerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: Prisma.UserUncheckedCreateInput) {
    return this.prisma.user.create({
      data,
    });
  }

  async createAnswer(data: Prisma.AnswerCreateManyInput[]) {
    return this.prisma.answer.createMany({
      data,
    });
  }

  async createQuestion(data) {
    return this.prisma.question.create({
      data,
    });
  }

  async findMany(params: { where: Prisma.GroupWhereInput }) {
    const { where } = params;
    return this.prisma.group.findMany({
      where,
      select: {
        nameGroup: true,
        createAt: true,
        users: {
          select: {
            name: true,
            lastName: true,
            grade: true,
            section: true,
            createAt: true,
            answer: {
              select: {
                answerTF: true,
                question: {
                  select: {
                    questionText: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }
}
