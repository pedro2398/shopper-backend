import { Request, Response } from "express";


export default function uploadController(req: Request, res: Response) {
    const requestBody = req.body;


   return res.json().status(200)
}
