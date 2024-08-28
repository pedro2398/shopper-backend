export interface IUploadRequest {
    image : string;
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
}

export interface IError {
    error_code: string;
    error_description: string;
}
