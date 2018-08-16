import { VehiclePhoto } from './vehicle-photo';
import { NumberIdBusinessModel } from '../../../../common/models/entity/number-id-business-model';

export class Vehicle extends NumberIdBusinessModel {
    constructor(
        public id: number,
        public makerId: number,
        public modelId: number,
        public ownerId: number,
        public isRegistered: boolean,
        public description: string,
        public photos: VehiclePhoto[]
    ) {
        super(id);
    }
}
