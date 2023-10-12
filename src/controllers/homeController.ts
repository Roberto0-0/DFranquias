import { Request, Response } from "express";
import { HomeInformation } from "../services/Cattle/homeInformation";

export class HomeController {
    async handle(req: Request, res: Response) {
        try {
            const homeInformationService = new HomeInformation()
            const homeInformationResponse = await homeInformationService.execute()

            if(homeInformationResponse instanceof Error) { return res.status(400).json({
                statusCode: 400,
                success: false,
                message: homeInformationResponse.message
            }) }

            return res.render("home/index.ejs", {
                data: homeInformationResponse
            })
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Internal server error." })
        }
    }
}