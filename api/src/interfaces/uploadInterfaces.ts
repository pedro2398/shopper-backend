export interface IUploadRequest {
    image : string;
    customer_code :string;
    measure_datetime : Date;
    measure_type: string;
}

export interface IMeasure {
    uuid: string;
    datetime: Date;
    type: string;
    confirmed: boolean;
    image: string;
    customerCode: string;
    customer: ICustomer;
}

export interface ICustomer {
    code: string;
    measures: IMeasure[];
}
