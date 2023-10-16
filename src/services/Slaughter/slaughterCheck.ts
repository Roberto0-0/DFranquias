import { CattleAgeCheck } from "../../config/cattleAgeCheck";
import { SlaughterCheckSchema } from "../../schemas/SlaughterSchema";
import { CattleGetByCode } from "../Cattle/getByCode";

var errorStorage: string[] = []

export class SlaughterCheck {
    async execute(code: string) {
        errorStorage = []

        const cattleGetByCodeService = new CattleGetByCode()
        const cattleGetByCodeResponse = await cattleGetByCodeService.execute(code)

        if(cattleGetByCodeResponse instanceof Error) { return new Error(cattleGetByCodeResponse.message) }

        const cattleAge = CattleAgeCheck(cattleGetByCodeResponse.birth)

        const amountMilkPerWeek = cattleGetByCodeResponse.amount_milk
        const amountFoodPerDay = cattleGetByCodeResponse.amount_food / 7

        const cattleArroba = cattleGetByCodeResponse.weight / 30

        const slaughterCheckSchemaResponse = SlaughterCheckSchema.safeParse({
            alive: cattleGetByCodeResponse.alive,
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

        return {
            success: true,
            data: cattleGetByCodeResponse.code
        }
    }
}