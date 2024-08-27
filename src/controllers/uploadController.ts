import { Request, Response } from "express";

export default function uploadController(req: Request, res: Response) {
   return res.json({
        message: 'Upload'
    })
}
