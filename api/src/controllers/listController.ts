import { Request, Response } from 'express';
import { listService } from '../services/listService';

export default async function listController(req: Request, res: Response) {
    try{
        const measureType =  req.query.measure_type as string | undefined;
        const customerCode = req.params.customer_code;
        const response = await listService(customerCode, measureType);

        res.status(200).json(response);
    } catch(err: any) {
        const errorStatusCode = err.status_code? err.status_code: 500;
        res.status(errorStatusCode).json(err.message)
    }
}
