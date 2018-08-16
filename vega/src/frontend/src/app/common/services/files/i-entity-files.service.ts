import { BindToEntity } from './../../models/files/bind-to-entity';
import { BindedToEntity } from '../../models/files/binded-to-entity';
import { Task } from '../../tasks/task';
import { InjectionToken } from '@angular/core';

export interface IEntityFilesService {

    bind(bindToEntity: BindToEntity): Task<BindedToEntity>;
}

export const IEntityFilesServiceToken = new InjectionToken<IEntityFilesService>('IEntityFilesService');
