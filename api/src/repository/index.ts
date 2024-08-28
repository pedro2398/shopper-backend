import { Measure } from '../db/entities';
import { AppDataSource } from '../db/data-source';

export async function saveMeasure(data: Measure) {
    const response = await AppDataSource.manager.save(data);
    return response;
}

export async function getMeasureByCustomerCode(customer_code: string) {
    const response = await AppDataSource.manager.getRepository(Measure).find({
        where: {
            customer_code
        }
    })

    return response;
}

export async function getMeasureByUuid(measure_uuid: string) {
    const response = await AppDataSource.manager.getRepository(Measure).findOne({
        where: {
            measure_uuid
        }
    })

    return response;
}
