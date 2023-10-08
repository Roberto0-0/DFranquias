import { Request, Response } from "express";
import { Slaughter } from "../services/Slaughter/slaughter";

export class slaughterController {
    async slaughter(req: Request, res: Response) {
        const { code } = req.body
        
        try {
            const slaughterService = new Slaughter()
            const slaughterResponse = await slaughterService.execute(code)

            if(slaughterResponse instanceof Error) { return res.status(400).json({
                statusCode: 400,
                success: false,
                message: slaughterResponse.message
            }) }
            if(!slaughterResponse?.success) { return res.status(400).json({
                statusCode: 400,
                success: false,
                message: slaughterResponse?.message
            }) }

            return res.status(200).json({
                statusCode: 200,
                success: true,
                message: "The cattle were recorded as slaughtered."
            })
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Internal server error." })
        }
    }
}