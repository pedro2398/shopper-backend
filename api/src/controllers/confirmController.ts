import { Request, response, Response } from 'express';
import { confirmService } from '../services/confirmService';

export default async function confirmController(req: Request, res: Response) {
    const requestBody = req.body;

    try{
        const response = await confirmService(requestBody);
        res.status(200).json(response);
    } catch (err: any) {
        const errorStatusCode = err.status_code? err.status_code: 500;
        res.status(errorStatusCode).json(err.message)
    }
}
