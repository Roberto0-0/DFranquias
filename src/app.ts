import express from "express";
import bodyParser from "body-parser";
import { AppRoutes } from "./routes"

export class App {
    app: express.Application

    constructor() {
        this.app = express()

        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(bodyParser.json())
    }

    routes() {
        this.app.use(new AppRoutes().router)
    }
}