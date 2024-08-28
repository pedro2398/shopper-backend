import { IError, IMeasureListed, IResposeList } from '../interfaces';
import { getMeasureByCustomerCode } from '../repository';

function verifyData(measure_type: string) {
    if(measure_type != "WATER" && measure_type != "GAS") {
        throw new Error("Tipo de medição não permitida");
    }
}

export async function listService(customer_code: string, measure_type?: string) {

    if(measure_type) {

        try{
            verifyData(measure_type);
        } catch (err: any) {

            const invalidType: IError = {
                message: {
                    error_code: "INVALID_TYPE",
                    error_description:  err.message
                },
                status_code: 400
            } 

            throw invalidType;
        }
    }

    const measuresList = await getMeasureByCustomerCode(customer_code, measure_type);
    const measures: IMeasureListed[] = [];

    measuresList.map(measure => {

        const measureListed: IMeasureListed = {
            measure_uuid: measure.measure_uuid,
            measure_datetime: measure.measure_datetime,
            measure_type: measure.measure_type,
            has_confirmed: measure.has_confirmed,
            image_url: measure.image_url
        }

        measures.push(measureListed);
    })

    if(measures.length === 0) {
        const notFound: IError = {
            message: {
                error_code: "MEASURES_NOT_FOUND",
                error_description: "Nenhuma leitura encontrada"
            },
            status_code: 404
        }

        throw notFound;
    }

    const response: IResposeList = {
        customer_code,
        measures
    }

    return response;
}
