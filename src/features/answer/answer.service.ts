import { Injectable } from '@nestjs/common';
import { AnswerRepository } from './answer.repository';
import { AnswerUserModel } from './answer.model';

@Injectable()
export class AnswerService {
  constructor(private readonly repository: AnswerRepository) {}

  async create(data: AnswerUserModel) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const { user, answers } = data;
    const newUser = await this.repository.createUser(user);
    const results = answers.map((x) => ({
      ...x,
      userId: newUser.id,
    }));

    return this.repository.createAnswer(results);
  }

  async createQuestion(data) {
    return this.repository.createQuestion(data);
  }

  async findMany(groupId: number) {
    return this.repository.findMany({ where: { id: groupId } });
  }
}
