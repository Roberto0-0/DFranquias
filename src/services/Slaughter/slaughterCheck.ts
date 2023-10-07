import { SlaughterCheckSchema } from "../../schemas/SlaughterSchema";
import { CattleGetById } from "../Cattle/getById";
import dayjs from "dayjs";

var errorStorage: string[] = []

export class SlaughterCheck {
    async execute(id: number) {
        const cattleGetByIdService = new CattleGetById()
        const cattleGetByIdResponse = await cattleGetByIdService.execute(Number(id))

        if(cattleGetByIdResponse instanceof Error) { return new Error(cattleGetByIdResponse.message) }

        const currentDate = dayjs(new Date()).format('YYYY')
        const cattleBirthDate = dayjs(cattleGetByIdResponse.birth).format("YYYY")
        const cattleAge = Number(currentDate) - Number(cattleBirthDate)

        const amountMilkPerWeek = cattleGetByIdResponse.amount_milk
        const amountFoodPerDay = cattleGetByIdResponse.amount_food / 7

        const cattleArroba = cattleGetByIdResponse.weight / 30

        const slaughterCheckSchemaResponse = SlaughterCheckSchema.safeParse({
            age: cattleAge,
            amount_milk: amountMilkPerWeek,
            amount_food: amountFoodPerDay,
            arrobas: cattleArroba
        })

        if(!slaughterCheckSchemaResponse.success) {
            const err = slaughterCheckSchemaResponse.error.errors
            err.map((values) => { errorStorage.push(values.message) })

            return {
                success: false,
                message: errorStorage
            }
        }

        return
    }
}