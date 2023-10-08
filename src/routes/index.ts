import express, { Request, Response, Router } from "express";
import { CattleController } from "../controllers/cattleController";
import { HomeController } from "../controllers/homeController";

export class AppRoutes {
    router: express.IRouter

    constructor() {
        this.router = Router()

        this.home()
        this.cattle()
    }

    home() { this.router.get("/", new HomeController().handle) }

    cattle() {
        this.router.post("/cattle/register", new CattleController().create)
        this.router.get("/cattle/:id", new CattleController().getById)
        this.router.put("/cattle/update/:id", new CattleController().update)
        this.router.delete("/cattle/delete/:id", new CattleController().delete)
    }
}