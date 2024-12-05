import { Injectable, NotFoundException } from "@nestjs/common";
import { AnswerRepository } from './answer.repository';
import { AnswerUserModel } from './answer.model';

@Injectable()
export class AnswerService {
  constructor(private readonly repository: AnswerRepository) {}

  async create(data: AnswerUserModel) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const { user, answers } = data;
    const group = await this.repository.findByGroup({
      id: user.groupId,
      nameGroup: user.nameGroup,
      serialGroup: user.serialGroup,
    });
    if (!group) throw new NotFoundException("Group doesn't exist");
    const newUser = await this.repository.createUser({
      name: user.name,
      lastName: user.lastName,
      grade: user.grade,
      section: user.section,
      groupId: user.groupId,
    });
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
