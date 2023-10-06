import { test, expect } from "vitest"
import { CattleCreate } from "../../src/services/Cattle/create"

test("Cattle registration", async () => {
    const cattleCreateService = new CattleCreate()
    const cattleCreateResponse = await cattleCreateService.execute({
        code: "TE30",
        amount_milk: 35,
        amount_food: 98,
        weight: 270,
        birth: new Date('2010-01-01')
    })

    expect(cattleCreateResponse).toBeUndefined()
})