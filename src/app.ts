import express, { NextFunction, Request, Response } from "express";
import ejs from "ejs";
import session from "express-session";
import flash from "connect-flash";
import { AppRoutes } from "./routes"
import path from "path";

import "dotenv/config"
import bodyParser from "body-parser";

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

        this.app.use(express.static(path.join(__dirname, "public")))
        this.app.set("views", path.join(__dirname, "views"))
        this.app.engine("ejs", ejs.renderFile)
        this.app.set("views engine", "ejs")

        this.app.use(session({
            secret: process.env.SESSION_KEY as string | string[],
            resave: false,
            saveUninitialized: true,
            cookie: { maxAge: 24 * 60 * 1000 }
        }))
        this.app.use(flash())
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.locals.success_message = req.flash("success_message")
            res.locals.error_message = req.flash("error_message")
            res.locals.error = req.flash("error")
            next()
        })
    }

    routes() { this.app.use(new AppRoutes().router) }
}