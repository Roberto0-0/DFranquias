import { Request, Response } from "express";
import { Slaughter } from "../services/Slaughter/slaughter";
import { SlaughterCheck } from "../services/Slaughter/slaughterCheck";
import { SlaughteredCattle } from "../services/Slaughter/slaughtered";

export class slaughterController {
    async slaughter(req: Request, res: Response) {
        const { code } = req.params
        
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

    async slaughterCheck(req: Request, res: Response) {
        const { code } = req.body

        try {
            const slaughterCheckService = new SlaughterCheck()
            const slaughterCheckResponse = await slaughterCheckService.execute(code)

            if(slaughterCheckResponse instanceof Error) { return res.status(400).json({
                statusCode: 400,
                success: false,
                message: slaughterCheckResponse.message
            }) }
            if(slaughterCheckResponse?.success !== undefined && slaughterCheckResponse?.success === false) { 
                return {
                    success: false,
                    message: slaughterCheckResponse?.message
                }
            }

            return res.status(200).json({
                statusCode: 200,
                data: slaughterCheckResponse.data
            })
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Internal server error." })
        }
    }

    async slaughtered(req: Request, res: Response) {
        try {
            const slaughteredService = new SlaughteredCattle()
            const slaughteredResponse = await slaughteredService.execute()

            if(slaughteredResponse instanceof Error) { res.status(400).json({
                statusCode: 400,
                success: false,
                message: slaughteredResponse.message
            }) }

            return res.render("slaughter/slaughtered/index.ejs", {
                data: slaughteredResponse
            })
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Internal server error." })
        }
    }
}