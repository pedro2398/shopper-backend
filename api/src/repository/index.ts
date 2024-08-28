import { Measure } from '../db/entities/measure';
import { AppDataSource } from '../db/data-source';

export async function saveMeasure(data: Measure) {
    const response = await AppDataSource.manager.save(data);
    return response;
}
