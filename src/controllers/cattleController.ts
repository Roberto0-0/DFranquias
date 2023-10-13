import { Request, Response } from "express";
import { CattleCreateSchema, CattleUpdateSchema } from "../schemas/CattleSchema";
import { CattleCreate } from "../services/Cattle/create";
// import { CattleGetById } from "../services/Cattle/getById";
import { CattleUpdate } from "../services/Cattle/update";
import { CattleDelete } from "../services/Cattle/delete";
import { CattleGetAllCode } from "../services/Cattle/gatAllCode";
import { CattleGetByCode } from "../services/Cattle/getByCode";
import { CattleGetById } from "../services/Cattle/getById";
import dayjs from "dayjs";

var errorStorage: string[] = []

export class CattleController {
    async createIndex(req: Request, res: Response) { return res.render("cattle/register/index.ejs") }

    async create(req: Request, res: Response) {
        const { ...data } = req.body

        try {
            const cattleSchemaCreateResponse = CattleCreateSchema.safeParse({
                code: data.code.toUpperCase(),
                amount_milk: Number(data.milk),
                amount_food: Number(data.food),
                weight: Number(data.weight),
                birth: new Date(data.birth)
            })

            if(cattleSchemaCreateResponse.success) {
                const cattleCreateService = new CattleCreate()
                const cattleCreateResponse = await cattleCreateService.execute(cattleSchemaCreateResponse.data)

                if(cattleCreateResponse instanceof Error) {
                    errorStorage.push(cattleCreateResponse.message)
                    req.flash("error_message", cattleCreateResponse.message)
                    return res.redirect("/cattle/register")
                }

                req.flash("success_message", "Successfully registered cattle.")
                return res.redirect("/cattle/register")
            } else {
                const err = cattleSchemaCreateResponse.error.errors
                err.map((values) => { errorStorage.push(values.message) })
                
                req.flash("error_message", errorStorage)
                res.redirect("/cattle/register")
                errorStorage = []
                return
            }
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Internal server error." })
        }
    }

    // async getById(req: Request, res: Response) {
    //     const { id } = req.params

    //     try {
    //         const cattleGetByIdService = new CattleGetById()
    //         const cattleGetByIdResponse = await cattleGetByIdService.execute(Number(id))

    //         if(cattleGetByIdResponse instanceof Error) { return res.status(400).json({
    //             statusCode: 400,
    //             success: false,
    //             message: cattleGetByIdResponse.message
    //         }) }

    //         return res.status(200).json({
    //             statusCode: 200,
    //             success: true,
    //             data: cattleGetByIdResponse
    //         })

    //     } catch (error) {
    //         console.error(error)
    //         return res.status(500).json({ message: "Internal server error." })
    //     }
    // }

    async getbyCodeIndex(req: Request, res: Response) {
        try {
            const cattleGetAllCodeService = new CattleGetAllCode()
            const cattleGetAllCodeResponse = await cattleGetAllCodeService.execute()

            if(cattleGetAllCodeResponse instanceof Error) { return res.status(400).json({
                statusCode: 400,
                success: false,
                messsage: cattleGetAllCodeResponse.message
            }) }

            return res.render("cattle/consult/index.ejs", {
                codes: cattleGetAllCodeResponse,
                data: undefined
            })
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Internal server error." })
        }
    }

    async getbyCode(req: Request, res: Response) {
        const { code } = req.body

        try {
            const cattleGetByCodeService = new CattleGetByCode()
            const cattleGetByCodeResponse = await cattleGetByCodeService.execute(code)
            const cattleGetAllCodeService = new CattleGetAllCode()
            const cattleGetAllCodeResponse = await cattleGetAllCodeService.execute()

            if(cattleGetByCodeResponse instanceof Error) { return res.status(400).json({
                statusCode: 400,
                success: false,
                message: cattleGetByCodeResponse.message
            }) }

            if(cattleGetAllCodeResponse instanceof Error) { return res.status(400).json({
                statusCode: 400,
                success: false,
                messsage: cattleGetAllCodeResponse.message
            }) }

            return res.render("cattle/consult/index.ejs", {
                data: cattleGetByCodeResponse,
                codes: cattleGetAllCodeResponse
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

            return res.render("cattle/update/index.ejs", {
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
                    return res.redirect("/cattle/update/" + id)
                }

                req.flash("success_message", "Updated successfully.")
                return res.redirect("/cattle/update/" + id)
            } else {
                const err = cattleUpdateSchemaResponse.error.errors
                err.map((values) => { errorStorage.push(values.message) })

                req.flash("error_message", [errorStorage, data])
                res.redirect("/cattle/update/" + id)
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
                return res.redirect("/cattle/search")
            }

            req.flash("success_message", "Cattle successfully deleted.")
            return res.redirect("/cattle/search")
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Internal server error." })
        }
    }
}