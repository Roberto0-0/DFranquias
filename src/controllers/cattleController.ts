import { Request, Response } from "express";
import { CattleCreateSchema, CattleUpdateSchema } from "../schemas/CattleSchema";
import { CattleCreate } from "../services/Cattle/create";
import { CattleGetById } from "../services/Cattle/getById";
import { CattleUpdate } from "../services/Cattle/update";
import { CattleDelete } from "../services/Cattle/delete";

var errorStorage: string[] = []

export class CattleController {
    async create(req: Request, res: Response) {
        const { ...data } = req.body

        data.birth = new Date(data.birth)

        try {
            const cattleSchemaCreateResponse = CattleCreateSchema.safeParse(data)

            if(cattleSchemaCreateResponse.success) {
                const cattleCreateService = new CattleCreate()
                const cattleCreateResponse = await cattleCreateService.execute(cattleSchemaCreateResponse.data)

                if(cattleCreateResponse instanceof Error) { return res.status(400).json({
                    statusCode: 400,
                    success: false,
                    message: cattleCreateResponse.message
                }) }

                return res.status(201).json({
                    statusCode: 201,
                    success: true,
                    message: "Successfully registered cattle."
                })
            } else {
                const err = cattleSchemaCreateResponse.error.errors

                err.map((values) => { errorStorage.push(values.message) })
                
                res.status(400).json({
                    statusCode: 400,
                    sucess: false,
                    message: errorStorage
                })
                errorStorage = []
            }
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Internal server error." })
        }
    }

    async getById(req: Request, res: Response) {
        const { id } = req.params

        try {
            const cattleGetByIdService = new CattleGetById()
            const cattleGetByIdResponse = await cattleGetByIdService.execute(Number(id))

            if(cattleGetByIdResponse instanceof Error) { return res.status(400).json({
                statusCode: 400,
                success: false,
                message: cattleGetByIdResponse.message
            }) }

            return res.status(200).json({
                statusCode: 200,
                success: true,
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
                code: data.code,
                amount_milk: data.amount_milk,
                amount_food: data.amount_food,
                weight: data.weight,
                birth: new Date(data.birth)
            })

            if(cattleUpdateSchemaResponse.success) {
                const cattleUpdateService = new CattleUpdate()
                const cattleUpdateResponse = await cattleUpdateService.execute(cattleUpdateSchemaResponse.data)

                if(cattleUpdateResponse instanceof Error) { return res.status(400).json({
                    statusCode: 400,
                    success: false,
                    message: cattleUpdateResponse.message
                }) }

                return res.status(201).json({
                    statusCode: 201,
                    success: true,
                    message: "Updated successfully."
                })
            } else {
                const err = cattleUpdateSchemaResponse.error.errors

                err.map((values) => { errorStorage.push(values.message) })
                
                res.status(400).json({
                    statusCode: 400,
                    sucess: false,
                    message: errorStorage
                })
                errorStorage = []
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

            if(cattleDeleteResponse instanceof Error) { return res.status(400).json({
                statusCode: 400,
                success: false,
                message: cattleDeleteResponse.message
            }) }

            return res.status(200).json({
                statusCode: 200,
                success: true,
                message: "Cattle successfully deleted."
            })
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Internal server error." })
        }
    }
}