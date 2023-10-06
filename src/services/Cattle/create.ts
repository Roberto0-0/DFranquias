import { CattleRepository } from "../../repositories/CattleRepository";

type CattleCreateProps = {
    code: string;
    amount_milk: number;
    amount_food: number;
    weight: number;
    birth: Date;
}

export class CattleCreate {
    async execute({ ...props }: CattleCreateProps): Promise<void | Error> {
        const cattle = await CattleRepository.findUnique({ where: { code: props.code } })

        if(cattle) { return new Error("Code already in use.") }

        await CattleRepository.create({ data: props })

        return
    }
}