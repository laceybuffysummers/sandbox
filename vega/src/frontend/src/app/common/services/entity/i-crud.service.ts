import { Task } from './../../tasks/task';
import { BusinessModel } from '../../models/entity/business-model';

export interface ICrudService<TModel extends BusinessModel<TId>, TId> {

    read(id: TId): Task<TModel>;

    createOrUpdate(model: TModel): Task<TModel>;

    delete(id: TId): Task<TId>;
}
