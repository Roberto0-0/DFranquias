import { test, expect } from "vitest"
import { CattleDelete } from "../../src/services/Cattle/delete"

test("Delete the cattle", async () => {
    const cattleDeleteService = new CattleDelete()
    const cattleDeleteResponse = await cattleDeleteService.execute(1)

    expect(cattleDeleteResponse).toBeUndefined()
})