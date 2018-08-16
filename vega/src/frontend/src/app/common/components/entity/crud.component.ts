import { Subscription } from 'rxjs/Subscription';
import { IProcessServiceToken, IProcessService } from './../../services/process/i-process-service';
import { Inject, OnInit, OnDestroy } from '@angular/core';
import { BusinessModel } from '../../models/entity/business-model';
import { BaseComponent } from '../common/base.component';
import { ICrudService } from '../../services/entity/i-crud.service';
import { ActivatedRoute } from '@angular/router';

export abstract class CrudComponent
  <TCrudService extends ICrudService<TModel, TId>, TModel extends BusinessModel<TId>, TId>
  extends BaseComponent
  implements OnInit, OnDestroy {

    private subscription: Subscription;

    protected model: TModel;
    protected isNew: boolean;

    constructor(
        @Inject(IProcessServiceToken) protected processService: IProcessService,
        protected crudService: TCrudService,
        protected route: any) {
        super(processService);
    }

    public ngOnInit(): void {
      this.init();
    }

    protected init(onComplete?: (model: TModel) => void): void {
      this.subscription = this.route.params
        .map(params => params['id'])
        .subscribe((id) => {
          if (id) {
            this.isNew = false;
            this.crudService.read(id)
              .exec(model => {
                this.model = model;
                if (onComplete) {
                  onComplete(model);
                }
              });
          } else {
            this.isNew = true;
            this.model = <TModel>new BusinessModel<TId>(id);
            if (onComplete) {
              onComplete(this.model);
            }
          }
        });
    }

    protected save(onCompleted?: (model: TModel) => void): void {
      this.crudService.createOrUpdate(this.model)
        .confirm(model => {
           this.model = model;
           if (onCompleted) {
              onCompleted(model);
           }
        });
    }

    protected delete(onCompleted?: (id: TId) => void): void {
      this.crudService.delete(this.model.id)
        .confirm(id => {
           if (onCompleted) {
              onCompleted(id);
           }
        });
    }

    public ngOnDestroy(): void {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }
  }
