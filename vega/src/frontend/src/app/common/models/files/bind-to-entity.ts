import { BindItem } from './bind-item';

export class BindToEntity {
    constructor(
        public entity: string,
        public entityId: string,
        public items: BindItem[]
    ) {
    }
}
