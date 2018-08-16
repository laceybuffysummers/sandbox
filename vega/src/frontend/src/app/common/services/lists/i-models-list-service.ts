import { ModelsList } from './../../models/lists/models-list';
import { Task } from '../../tasks/task';

export interface IModelsListService<TRequest> {
    getList(request?: TRequest): Task<ModelsList<TRequest>>;
}
