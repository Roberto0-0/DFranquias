import { test, expect } from "vitest"
import { CattleDelete } from "../../src/services/Cattle/delete"

test("Get the cattle by id", async () => {
    const cattleDeleteService = new CattleDelete()
    const cattleDeleteResponse = await cattleDeleteService.execute(1)

    expect(cattleDeleteResponse).toBeUndefined()
})