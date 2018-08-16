export class BusinessModel<TId> {
  constructor(public id: TId) {
  }

  public get isNew(): boolean {
    return !this.id;
  }
}
