import { test, expect } from "vitest";
import { SlaughterCheck } from "../../src/services/Slaughter/slaughterCheck";

test("check whether cattle to be slaughtered", async () => {
    const slaughterCheckSerService = new SlaughterCheck()
    const slaughterCheckSerResponse = await slaughterCheckSerService.execute("TD20")

    console.log(slaughterCheckSerResponse)

    expect(slaughterCheckSerResponse).toBeUndefined()
})