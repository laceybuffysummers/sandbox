import { NumberIdBusinessModel } from '../../models/entity/number-id-business-model';
import { ICrudService } from './i-crud.service';

// tslint:disable-next-line:no-empty-interface
export interface INumberIdCrudService<TModel extends NumberIdBusinessModel>
            extends ICrudService<TModel, number> { }
