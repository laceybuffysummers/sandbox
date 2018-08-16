import { BindedItem } from './binded-item';

export class BindedToEntity {
    constructor(
        public entity: string,
        public entityId: string,
        public items: BindedItem[]
    ) {
    }
}
