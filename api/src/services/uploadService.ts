import { saveMeasure } from '../repository';
import { IUploadRequest, IUploadResponse } from "../interfaces";
import {v4 as uuidv4} from 'uuid';
import { Measure } from '../db/entities/measure';

export async function uploadService(data: IUploadRequest ) {

  const measure = new Measure();
  measure.measure_uuid = uuidv4().toString();
  measure.has_confirmed = false;
  measure.measure_datetime = data.measure_datetime,
  measure.image_url = data.image,
  measure.measure_type = data.measure_type,
  measure.customer_code = data.customer_code

  const measureResponse = await saveMeasure(measure);
  const response: IUploadResponse = {
    image_url: measureResponse.image_url,
    measure_value: 123,
    measure_uuid: measureResponse.measure_uuid,
  } 

  return response;
}
