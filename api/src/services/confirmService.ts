import { IsNumber, IsUUID, validate } from "class-validator";
import { IConfirmRequest, IError  } from "../interfaces";
import { getMeasureByUuid, saveMeasure } from "../repository"
import { plainToClass } from "class-transformer";

async function verifyData(data: IConfirmRequest) {
    
    class dataClass {
        @IsUUID()
        measure_uuid: string;

        @IsNumber({},{ message: 'confirmed_value deve ser um numero' })
        confirmed_value: number;
      }

    const validateData = plainToClass(dataClass, data);

    await validate(validateData).then(err => {
        if (err.length > 0) {

            const errors: string[] = [];
            err.map(e => {
            errors.push(e.property);
            }
        )
        throw new Error(`parâmetros inválidos: ${errors}`);
        }
    });

    const uuidType = data.measure_uuid.valueOf();
}

export async function confirmService(data: IConfirmRequest) {

    try {
        await verifyData(data);
    } catch(err: any) {

     const invalidData: IError = {
        message: {
            error_code: "INVALID_DATA",
            error_description: err.message
        },
        status_code: 400
     }
    
     throw invalidData;
    }

    const measure = await getMeasureByUuid(data.measure_uuid);


    if(!measure){
        const notFoundMeasure: IError = {
            message: {
                error_code: "MEASURE_NOT_FOUND",
                error_description: "Leitura do mês já realizada"
            },
            status_code: 404
        }

       throw notFoundMeasure;
    }

    if(measure.has_confirmed) {
        const duplicateMeasure: IError = {
            message: {
                error_code: "CONFIRMATION_DUPLICATE",
                error_description: "Leitura do mês já realizada"
            },
            status_code: 409
        }

       throw duplicateMeasure;
    }

    measure.has_confirmed = true; 
    measure.measure_value = data.confirmed_value

    await saveMeasure(measure);

    return { succes: true }
}