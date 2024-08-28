import { Request, Response } from 'express';

export default function confirmController(req: Request, res: Response) {
    res.json({
        message: 'Confirm'
    })
}
