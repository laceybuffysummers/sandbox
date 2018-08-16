import { ActivatedRoute } from '@angular/router';
import { IProcessServiceToken, IProcessService } from './../../services/process/i-process-service';
import { Inject } from '@angular/core';
import { CrudComponent } from './crud.component';
import { BusinessModel } from '../../models/entity/business-model';
import { ICrudService } from '../../services/entity/i-crud.service';

export abstract class NumberIdCrudComponent
  <TCrudService extends ICrudService<TModel, number>, TModel extends BusinessModel<number>>
  extends CrudComponent<TCrudService, TModel, number> {
    constructor(
        @Inject(IProcessServiceToken) protected processService: IProcessService,
        protected crudService: TCrudService,
        protected route: any) {
        super(processService, crudService, route);
    }
  }
