import { CattleRepository } from "../../repositories/CattleRepository";

export class CattleGetByCode {
    async execute(code: string) {
        const cattle = await CattleRepository.findUnique({ where: { code: code }})

        if(!cattle) { return new Error("Cattle not found.") }

        return cattle
    }
}