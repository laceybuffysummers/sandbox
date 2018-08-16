import { HttpTask } from './../../../tasks/http-task';
import { Task } from './../../../tasks/task';
import { IEntityFilesService } from './../i-entity-files.service';
import { Injectable, Inject } from '@angular/core';
import { BindedToEntity } from '../../../models/files/binded-to-entity';
import { BindToEntity } from '../../../models/files/bind-to-entity';
import { IConfigServiceToken, IConfigService } from '../../config/i-config-service';


@Injectable()
export class EntityFilesService
    implements IEntityFilesService {

    constructor(
        @Inject(IConfigServiceToken) private configService: IConfigService) {
    }

    protected getBaseUrl(): string {
        return this.configService.getApiBaseUrl() + 'files';
    }

    public bind(bindToEntity: BindToEntity): Task<BindedToEntity> {
        return HttpTask.create(`${this.getBaseUrl()}/bind`).post(bindToEntity);
    }

}

