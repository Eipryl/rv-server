import { IsNumber, IsString } from 'class-validator';

export class AnswerUserModel {
  user: userModel;
  answers: AnswerModel[];
}

export class AnswerModel {
  @IsNumber()
  questionId: number;

  @IsNumber()
  answerTF: number;
}

export class userModel {
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsNumber()
  grade: number;

  @IsString()
  section: string;

  @IsNumber()
  groupId?: number;
}
