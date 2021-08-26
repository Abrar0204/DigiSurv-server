export class CreateExamDto {
  name: string;
  proctors: string[];
  students: string[];
  questions: {
    question: string;
    option: {
      option: string;
      isCorrect: boolean;
    }[];
  }[];
  startTime: Date;
  endTime: Date;
}
