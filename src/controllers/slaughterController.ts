import { Request, Response } from "express";
import { Slaughter } from "../services/Slaughter/slaughter";
import { SlaughterCheck } from "../services/Slaughter/slaughterCheck";
import { SlaughteredCattle } from "../services/Slaughter/slaughtered";
import { CattleGetAllCode } from "../services/Cattle/gatAllCode";

var errorStorage: string[] = []

export class SlaughterController {
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

    async slaughterCheckIndex(req: Request, res: Response) { 
        try {
            const cattleGetAllCodeService = new CattleGetAllCode()
            const cattleGetAllCodeResponse = await cattleGetAllCodeService.execute()

            if(cattleGetAllCodeResponse instanceof Error) { 
                req.flash("error_message", cattleGetAllCodeResponse.message)
                return res.redirect("/slaughter/check")
            }

            return res.render("slaughter/slaughterCheck/index.ejs", {
                codes: cattleGetAllCodeResponse,
                data: undefined
            })
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Internal server error." })
        }
    }

    async slaughterCheck(req: Request, res: Response) {
        const { code } = req.body

        if(!code) { return }

        try {
            const slaughterCheckService = new SlaughterCheck()
            const slaughterCheckResponse = await slaughterCheckService.execute(code)

            if(slaughterCheckResponse instanceof Error) { 
                errorStorage.push(slaughterCheckResponse.message)
                req.flash("error_message", slaughterCheckResponse.message)
                return res.redirect("/slaughter/check")
            }
            if(slaughterCheckResponse?.success !== undefined && slaughterCheckResponse?.success === false) {    
                req.flash("error_message", [slaughterCheckResponse?.message , code])
                return res.redirect("/slaughter/check")
            }

            if(!slaughterCheckResponse.data) { return }

            req.flash("error_message", ["0", slaughterCheckResponse.data])
            return res.redirect("/slaughter/check")
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