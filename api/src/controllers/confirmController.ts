import { Request, Response } from 'express';
import { confirmService } from '../services/confirmService';
import { IConfirmRequest } from '../interfaces';

export default async function confirmController(req: Request, res: Response) {
    
    try{
        const requestBody: IConfirmRequest = req.body;
        const response = await confirmService(requestBody);
        
        res.status(200).json(response);
    } catch (err: any) {
        const errorStatusCode = err.status_code? err.status_code: 500;
        res.status(errorStatusCode).json(err.message)
    }
}
