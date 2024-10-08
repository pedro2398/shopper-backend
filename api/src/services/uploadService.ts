import { getMeasureByCustomerCode, saveMeasure } from '../repository';
import { IError, IUploadRequest, IUploadResponse } from "../interfaces";
import { Measure } from '../db/entities';
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from 'fs';
import * as path from 'path';
import { IsDateString, IsString, validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import 'dotenv/config';

export async function verifyMonth(data: Date, customer_code: string) {

  const measures: Measure[] = await getMeasureByCustomerCode(customer_code);
  data = new Date(data);
  const month = data.getMonth();
  const year = data.getFullYear();
  
  measures.map(measure => {
    const measureMonth = measure.measure_datetime.getMonth();
    const measureYear = measure.measure_datetime.getFullYear();

    if(measureMonth === month && measureYear === year){
      throw new Error("Leitura do mês já realizada");
    }
  })
}

export async function verifyData(data: IUploadRequest) {

  class dataClass {
    @IsString()
    image: Blob;

    @IsString()
    customer_code: string;

    @IsDateString()
    measure_datetime: string; 

    @IsString()
    measure_type: string;
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

  if(data.measure_type != "WATER" && data.measure_type != "GAS") {
    throw new Error("Tipo de medição não permitida");
}

  if (!data.image || data.image.toString().length % 4 !== 0) {
    throw new Error("base64 inválido!");
  }

  const base64 = /^[A-Za-z0-9+/]+[=]{0,2}$/;

  if(!base64.test(data.image.toString())) {
      throw new Error("base64 inválido!");
  };
}

export async function uploadService(data: IUploadRequest ) {

  try{
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

  try{
    await verifyMonth(data.measure_datetime, data.customer_code);
  } catch(err: any) {

    const invalidMonth: IError ={
      message: {
        error_code: "DOUBLE_REPORT",
        error_description: err.message
      },
      status_code: 409
    }

    throw invalidMonth;
  }

  const imagePath = path.join(__dirname, '../img/img.jpeg');
  const imageBuffer = Buffer.from(data.image.toString(), 'base64')  
  const api_key = process.env.GEMINI_API_KEY as string;
  const fileManager = new GoogleAIFileManager(api_key);
  const genAI = new GoogleGenerativeAI(api_key);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
  });
  
  fs.writeFileSync(imagePath, imageBuffer);

  const uploadResponse = await fileManager.uploadFile(imagePath, {
    mimeType: "image/jpeg",
  });

  fs.unlink(imagePath, (err) => `erro ao apagar imagem: ${err}`)
 
  const result = await model.generateContent([
    {
      fileData: {
        mimeType: "image/jpeg",
        fileUri: uploadResponse.file.uri
      }
    },
    { text: "I want you to read the number that this water meter is displaying, and return a JSON with that value, for example: {measure: **value**} (no use ```json```)" },
  ]);
  
  const measureNumber = JSON.parse(result.response.text()).measure as number;

  const measure = new Measure();
  measure.has_confirmed = false;
  measure.measure_datetime = data.measure_datetime;
  measure.image_url = uploadResponse.file.uri;
  measure.measure_type = data.measure_type;
  measure.customer_code = data.customer_code;
  measure.measure_value = measureNumber;
  
  const measureResponse = await saveMeasure(measure);
  
  const response: IUploadResponse = {
    image_url: uploadResponse.file.uri,
    measure_value: measureNumber,
    measure_uuid: measureResponse.measure_uuid,
  }
  
  return response;
}
