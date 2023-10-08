import { CattleRepository } from "../../repositories/CattleRepository";

type CattleUpdateProps = {
    id: number,
    code?: string;
    amount_milk?: number;
    amount_food?: number;
    weight?: number;
    birth?: Date;
}

export class CattleUpdate {
    async execute({ ...props }: CattleUpdateProps): Promise<void | Error> {
        const [ cattle, cattleCodeExsist ] = await Promise.all([
            CattleRepository.findUnique({ where: { id: props.id } }),
            CattleRepository.findUnique({ where: { code: props.code } })
        ])

        if(!cattle) { return new Error("Cattle not found.") }
        if(!cattleCodeExsist) { return new Error("Code not found.") }
        if(cattleCodeExsist.id !== cattle.id) { return new Error("Code already in use.") }
 
        const { id: _, ...data } = props

        await CattleRepository.update({
            where: { id: props.id },
            data: data
        })

        return
    }
}