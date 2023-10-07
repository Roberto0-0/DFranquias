import { test, expect } from "vitest";
import { Slaughter } from "../../src/services/Slaughter/slaughter";

test("slaughter of cattle", async () => {
    const slaughterService = new Slaughter()
    const slaughterResponse = await slaughterService.execute("TD20")

    console.log(slaughterResponse)

    expect(slaughterResponse).toBeTruthy()
})