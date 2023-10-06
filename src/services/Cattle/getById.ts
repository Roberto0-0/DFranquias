import { CattleRepository } from "../../repositories/CattleRepository";

export class CattleGetById {
    async execute(id: number) {
        const cattle = await CattleRepository.findUnique({ where: { id: id }})

        if(!cattle) { return new Error("Cattle not found.") }

        return cattle
    }
}