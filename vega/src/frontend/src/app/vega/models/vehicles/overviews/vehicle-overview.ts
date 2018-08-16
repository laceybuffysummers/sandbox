import { NumberIdBusinessModel } from '../../../../common/models/entity/number-id-business-model';

export class VehicleOverview extends NumberIdBusinessModel {
    constructor(
        public id: number,
        public vehicleId: number,
        public maker: string,
        public model: string,
        public contactName: string
    ) {
        super(id);
    }
}
