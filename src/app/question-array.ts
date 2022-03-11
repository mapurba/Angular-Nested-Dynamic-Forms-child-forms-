import { QuestionBase } from './question-base';

export class ArrayQuestion extends QuestionBase<string> {
  controlType = 'array';
  type: any;

  constructor(options: {} = {}) {
    super(options);
  }
}
