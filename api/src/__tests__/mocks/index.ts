import { IMeasure, IUploadRequest, IUploadResponse } from "../../interfaces";

export const invalidUploadRequestMock = {
    image: new Blob(),
    customer_code: "13454224",
    measure_datetime: new Date('2019-10-15T00:00:00.000Z'),
    measure_type: "WATER"
}

export const measureMock: IMeasure = {
    measure_uuid: "ef47e023-05d5-456f-83f4-3f56ad09fb7f",
    measure_datetime: new Date('2019-10-15T00:00:00.000Z'),
    measure_type: "GAS",
    has_confirmed: false,
    image_url: "https://generativelanguage.googleapis.com/v1beta/files/13454224",
    customer_code: "42432423",
    measure_value: 15
}

export const confirmRequestMock = {
    measure_uuid: "ef47e023-05d5-456f-83f4-3f56ad09fb7f",
    confirmed_value: 15
}

export const invalidConfirmRequestMock = {
    measure_uuid: "83f4-3f56ad09fb7f",
    confirmed_value: 15
}
