import { StringIdBusinessModel } from '../../../../common/models/entity/string-id-business-model';

export class VehiclePhoto extends StringIdBusinessModel {
    constructor(
        public id: string,
        public fileName: string,
        public originalFileName: string,
        public mimeType: string,
        public vehicleId: number
    ) {
        super(id);
    }
}
