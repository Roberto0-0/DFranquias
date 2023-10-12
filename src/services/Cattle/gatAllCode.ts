import { CattleRepository } from "../../repositories/CattleRepository";

export class CattleGetAllCode {
    private allCode: string[] = []

    async execute() {
        const cattle = await CattleRepository.findMany({ where: { alive: true } })

        if(!cattle) { return new Error("The cattle table not found.") }

        cattle.map((value) => { this.allCode.push(value.code) })

        return this.allCode
    }
}