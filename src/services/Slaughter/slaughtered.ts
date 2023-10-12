import { CattleRepository } from "../../repositories/CattleRepository";

export class SlaughteredCattle {
    async execute() {
        const cattle = await CattleRepository.findMany({ where: { alive: false } })

        if(!cattle) { return new Error("The cattle table not found.") }

        return cattle
    }
}