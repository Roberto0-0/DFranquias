import express from "express";
import { AppRoutes } from "./routes"

export class App {
    app: express.Application

    constructor() {
        this.app = express()

        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.app.use(express.json())
    }

    routes() { this.app.use(new AppRoutes().router) }
}