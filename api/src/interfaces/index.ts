export interface IUploadRequest {
    image : Blob | string;
    customer_code :string;
    measure_datetime : Date;
    measure_type: string;
}

export interface IUploadResponse {
    image_url: string;
    measure_value: number;
    measure_uuid: string
}

export interface IMeasure {
    measure_uuid: string;
    measure_datetime: Date;
    measure_type: string;
    has_confirmed: boolean;
    image_url: string;
    customer_code: string;
    measure_value: number;
}

export interface IError {
    message: {
        error_code: string;
        error_description: string;
    }
    status_code?: number;
} 

export interface IConfirmRequest {
    measure_uuid: string;
    confirmed_value: number;
}

export interface IMeasureListed {
    measure_uuid: string;
    measure_datetime: Date;
    measure_type: string;
    has_confirmed:boolean;
    image_url: string;
} 

export interface IResposeList{
    customer_code: string;
    measures: IMeasureListed[]
}
