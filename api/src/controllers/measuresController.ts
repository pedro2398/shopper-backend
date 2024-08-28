import { Request, Response } from 'express';

export function measuresController(req: Request, res: Response) {
    res.json({
        message: 'Measures'
    })
}
