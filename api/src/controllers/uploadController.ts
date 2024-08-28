import { Request, Response } from "express";
import { IUploadRequest } from '../interfaces';
import { uploadService } from '../services/uploadService';

export default async function uploadController(req: any, res: any) {
    const requestBody: IUploadRequest = req.body;
    const response = await uploadService(requestBody);

    return res.json(response);
}
