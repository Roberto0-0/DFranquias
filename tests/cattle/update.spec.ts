import { test, expect } from "vitest"
import { CattleUpdate } from "../../src/services/Cattle/update"

test("Update the cattle", async () => {
    const cattleUpdateService = new CattleUpdate()
    const cattleUpdateResponse = await cattleUpdateService.execute({
        id: 1,
        code: "TE29"
    })

    expect(cattleUpdateResponse).toBeUndefined()
})