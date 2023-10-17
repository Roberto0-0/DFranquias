import express, { Request, Response, Router } from "express";
import { CattleController } from "../controllers/cattleController";
import { HomeController } from "../controllers/homeController";
import { SlaughterController } from "../controllers/slaughterController";

export class AppRoutes {
    router: express.IRouter

    constructor() {
        this.router = Router()

        this.home()
        this.cattle()
        this.slaughter()
    }

    home() { this.router.get("/", new HomeController().handle) }

    cattle() {
        this.router.post("/cattle/register", new CattleController().create)
        this.router.get("/cattle/register", new CattleController().createIndex)
        // this.router.get("/cattle/:id", new CattleController().getById)
        this.router.post("/cattle/update/:id", new CattleController().update)
        this.router.get("/cattle/update/:id", new CattleController().updateIndex)
        this.router.get("/cattle/delete/:id", new CattleController().delete)
        this.router.get("/cattle/search", new CattleController().getbyCodeIndex)
        this.router.post("/cattle/search", new CattleController().getbyCode)
    }

    slaughter() {
        this.router.get("/slaughtered", new SlaughterController().slaughtered)
        this.router.post("/slaughter/:code", new SlaughterController().slaughter)
        this.router.get("/slaughter/check", new SlaughterController().slaughterCheckIndex)
        this.router.post("/slaughterCheck", new SlaughterController().slaughterCheck)
        this.router.get("/slaughtered/settings/:id", new SlaughterController().slaughteredSettingsIndex)
        this.router.get("/slaughtered/settings/update/:id", new SlaughterController().updateIndex)
        this.router.post("/slaughtered/settings/update/:id", new SlaughterController().update)
        this.router.get("/slaughtered/settings/delete/:id", new SlaughterController().delete)
    }
}