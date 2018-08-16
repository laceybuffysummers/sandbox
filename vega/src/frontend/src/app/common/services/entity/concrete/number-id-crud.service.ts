import { CrudService } from './crud.service';
import { NumberIdBusinessModel } from '../../../models/entity/number-id-business-model';
import { INumberIdCrudService } from '../i-number-id-crud.service';

export abstract class NumberIdCrudService<TModel extends NumberIdBusinessModel>
  extends CrudService<TModel, number>
  implements INumberIdCrudService<TModel> { }
