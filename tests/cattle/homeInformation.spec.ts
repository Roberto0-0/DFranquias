import { test, expect } from "vitest";
import { HomeInformation } from "../../src/services/Cattle/homeInformation";

test("Home screen information", async () => {
    const homeInformationService = new HomeInformation()
    const homeInformationResponse = await homeInformationService.execute()

    expect(homeInformationResponse).toBeTruthy()
})