import { ModelItem } from './model-item';
export class ModelsList<TRequest> {
    constructor(
        public request: TRequest,
        public items: ModelItem[]
    ) {
    }
}
