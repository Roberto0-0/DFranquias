import { CattleRepository } from "../../repositories/CattleRepository"
import { CattleGetByCode } from "../Cattle/getByCode"
import { SlaughterCheck } from "./slaughterCheck"

export class Slaughter {
    async execute(code: string) {
        const cattleGetByCodeService = new CattleGetByCode()
        const cattleGetByCodeResponse = await cattleGetByCodeService.execute(code)

        if(cattleGetByCodeResponse instanceof Error) { return new Error(cattleGetByCodeResponse.message) }

        const slaughterCheckService = new SlaughterCheck()
        const slaughterCheckResponse = await slaughterCheckService.execute(cattleGetByCodeResponse.id)

        if(slaughterCheckResponse instanceof Error) { return new Error(slaughterCheckResponse.message) }
        if(slaughterCheckResponse?.success !== undefined && slaughterCheckResponse?.success === false) { 
            return {
                success: false,
                message: slaughterCheckResponse?.message
            }
        }

        await CattleRepository.update({
            where: { id: cattleGetByCodeResponse.id },
            data: { alive: false }
        })

        return
    }
}