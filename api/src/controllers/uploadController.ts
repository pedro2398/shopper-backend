import { Request, Response } from "express";
import { IUploadRequest } from '../interfaces';
import { uploadService } from '../services/uploadService';

export default async function uploadController(req: Request, res: Response) {
    const requestBody: IUploadRequest = req.body;
    
    try {
        const response = await uploadService(requestBody);
        res.status(200).json(response);
    } catch (err: any) {
        const errorStatusCode = err.status_code? err.status_code: 500;
        res.status(errorStatusCode).json(err.message)
    }
}
