import { CattleAgeCheck } from "../../config/cattleAgeCheck";
import { CattleRepository } from "../../repositories/CattleRepository";

export class HomeInformation {
    private milkPerWeek = 0
    private rationRequiredPerWeek = 0
    private specificLivestock = 0

    async execute() {
        const cattle = await CattleRepository.findMany()

        if(!cattle) { return new Error("The cattle table not found.") }

        cattle.map((value) => {
            this.milkPerWeek += value.amount_milk
            this.rationRequiredPerWeek += value.amount_food
            
            if(CattleAgeCheck(value.birth) <= 1) { if(value.amount_food > 500) { this.specificLivestock += 1 } }
        })

        return {
            milkPerWeek: this.milkPerWeek,
            rationRequiredPerWeek: this.rationRequiredPerWeek,
            specificLivestock: this.specificLivestock
        }
    }
}