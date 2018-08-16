import { BusinessModel } from './business-model';

export abstract class NumberIdBusinessModel extends BusinessModel<number> {
  constructor(public id: number) {
    super(id);
  }

  public get isNew(): boolean {
    return !this.id || this.id === 0;
  }
}
