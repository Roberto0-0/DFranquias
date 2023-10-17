import { Request, Response } from "express";
import { Slaughter } from "../services/Slaughter/slaughter";
import { SlaughterCheck } from "../services/Slaughter/slaughterCheck";
import { SlaughteredCattle } from "../services/Slaughter/slaughtered";
import { CattleGetAllCode } from "../services/Cattle/gatAllCode";
import { CattleGetByCode } from "../services/Cattle/getByCode";
import { CattleUpdateSchema } from "../schemas/CattleSchema";
import { CattleUpdate } from "../services/Cattle/update";
import { CattleDelete } from "../services/Cattle/delete";
import { CattleGetById } from "../services/Cattle/getById";

var errorStorage: string[] = []

export class SlaughterController {
    async slaughter(req: Request, res: Response) {
        const { code } = req.params

        try {
            const slaughterService = new Slaughter()
            const slaughterResponse = await slaughterService.execute(code)

            if(slaughterResponse instanceof Error) {
                errorStorage.push(slaughterResponse.message)
                req.flash("success_message", slaughterResponse.message)
                return res.redirect("/slaughter/check")
            }
            if(!slaughterResponse?.success) {
                return res.redirect("/slaughter/check")
            }

            req.flash("success_message", "The cattle were recorded as slaughtered.")
            return res.redirect("/slaughter/check")
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

    async slaughteredSettingsIndex(req: Request, res: Response) {
        const { id } = req.params

        try {
            const cattleGetbyIdService = new CattleGetById()
            const cattleGetbyIdResponse = await cattleGetbyIdService.execute(Number(id))

            if(cattleGetbyIdResponse instanceof Error) { 
                req.flash("error_message", cattleGetbyIdResponse.message)
                return res.redirect("/slaughtered")
            }

            return res.render("slaughter/slaughtered/settings/index.ejs", {
                data: cattleGetbyIdResponse
            })
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Internal server error." })
        }
    }

    async updateIndex(req: Request, res: Response) {
        const { id } = req.params

        try {
            const cattleGetByIdService = new CattleGetById()
            const cattleGetByIdResponse = await cattleGetByIdService.execute(Number(id))

            if(cattleGetByIdResponse instanceof Error) { return res.status(400).json({
                statusCode: 400,
                success: false,
                message: cattleGetByIdResponse.message
            }) }

            return res.render("slaughter/slaughtered/settings/update/index.ejs", {
                data: cattleGetByIdResponse
            })
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Internal server error." })
        }
    }

    async update(req: Request, res: Response) {
        const { id } = req.params
        const { ...data } = req.body

        try {
            const cattleUpdateSchemaResponse = CattleUpdateSchema.safeParse({
                id: Number(id),
                code: data.code.toUpperCase(),
                amount_milk:  Number(data.milk),
                amount_food: Number(data.food),
                weight: Number(data.weight),
                birth: new Date(data.birth)
            })

            if(cattleUpdateSchemaResponse.success) {
                const cattleUpdateService = new CattleUpdate()
                const cattleUpdateResponse = await cattleUpdateService.execute(cattleUpdateSchemaResponse.data)

                if(cattleUpdateResponse instanceof Error) {
                    errorStorage.push(cattleUpdateResponse.message)
                    req.flash("error_message", [cattleUpdateResponse.message, data])
                    return res.redirect("/slaughtered/settings/" + id)
                }

                req.flash("success_message", "Updated successfully.")
                return res.redirect("/slaughtered/settings/" + id)
            } else {
                const err = cattleUpdateSchemaResponse.error.errors
                err.map((values) => { errorStorage.push(values.message) })

                req.flash("error_message", [errorStorage, data])
                res.redirect("/slaughtered/settings/" + id)
                errorStorage = []
                return
            }
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Internal server error." })
        }
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params

        try {
            const cattleDeleteService = new CattleDelete()
            const cattleDeleteResponse = await cattleDeleteService.execute(Number(id))

            if(cattleDeleteResponse instanceof Error) { 
                req.flash("success_message", cattleDeleteResponse.message)
                return res.redirect("/slaughtered")
            }

            req.flash("success_message", "Cattle successfully deleted.")
            return res.redirect("/slaughtered")
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Internal server error." })
        }
    }
}