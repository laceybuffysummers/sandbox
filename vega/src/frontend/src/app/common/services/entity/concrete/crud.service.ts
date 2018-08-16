import { HttpTask } from './../../../tasks/http-task';
import { Injectable } from '@angular/core';
import { ICrudService } from '../i-crud.service';
import { BusinessModel } from '../../../models/entity/business-model';
import { Task } from '../../../tasks/task';

@Injectable()
export abstract class CrudService<TModel extends BusinessModel<TId>, TId>
  implements ICrudService<TModel, TId> {

    protected abstract getBaseUrl(): string;

    public read(id: TId): Task<TModel> {
      return HttpTask.create(`${this.getBaseUrl()}/${id}`).get();
    }

    public createOrUpdate(model: TModel): Task<TModel> {
      if (model.isNew) {
        return HttpTask.create(this.getBaseUrl()).post(model);
      } else {
        return HttpTask.create(`${this.getBaseUrl()}/${model.id}`).put(model);
      }
    }

    public delete(id: TId): Task<TId> {
      return HttpTask.create(`${this.getBaseUrl()}/${id}`).delete();
    }
}
