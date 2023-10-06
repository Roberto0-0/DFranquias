import { Request, Response } from "express";
import { CattleCreateSchema } from "../schemas/CattleSchema";
import { CattleCreate } from "../services/Cattle/create";

var errorStorage: string[] = []

export class CattleController {
    async create(req: Request, res: Response) {
        const { ...data } = req.body

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
}