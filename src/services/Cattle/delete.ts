import { CattleRepository } from "../../repositories/CattleRepository"

export class CattleDelete {
    async execute(id: number): Promise<void | Error> {
        const cattle = await CattleRepository.findUnique({ where: { id: id } })

        if(!cattle) { return new Error("Cattle not found.") }

        await CattleRepository.delete({ where: { id: id } })
        
        return
    }
}