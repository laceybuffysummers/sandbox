import { BusinessModel } from './business-model';

export class StringIdBusinessModel extends BusinessModel<string>  {
    constructor(public id: string) {
        super(id);
    }

    public get isNew(): boolean {
        return !this.id || this.id === '';
    }
}
