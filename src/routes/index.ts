import express, { Request, Response, Router } from "express";
import { CattleController } from "../controllers/cattleController";
import { HomeController } from "../controllers/homeController";
import { slaughterController } from "../controllers/slaughterController";

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
        this.router.get("/slaughtered", new slaughterController().slaughtered)
        this.router.put("/slaughter/:code", new slaughterController().slaughter)
        this.router.put("/slaughter/check", new slaughterController().slaughterCheck)
    }
}