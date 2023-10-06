import { test, expect } from "vitest"
import { CattleGetById } from "../../src/services/Cattle/getById"

test("Get the cattle by id", async () => {
    const cattleGetByIdService = new CattleGetById()
    const cattleGetByIdResponse = await cattleGetByIdService.execute(1)

    expect(cattleGetByIdResponse).toBeTruthy()
})