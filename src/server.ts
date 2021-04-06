import express from 'express'
import path from 'path'
import hbs from "express-handlebars"

import {config} from "../conf/config"
import * as model from "./model"
import * as controller from "./controller"

const app = express()

/**
 * Configure templating engine
 */
app.engine("handlebars", hbs({
    helpers: {
        userAge: (birthyear: number) => (new Date()).getFullYear() - birthyear,
        equals: (a: string, b: string) => a == b
    }
}))
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname, "..", "views"))

/**
 * Static routes
 */
app.use('/static', express.static(path.join(__dirname, '..', 'static')));
app.use('/lib/bootstrap', express.static(
    path.join(__dirname, '..', 'node_modules', 'bootstrap', 'dist')));
app.use('/lib/jquery', express.static(
    path.join(__dirname, '..', 'node_modules', 'jquery', 'dist')));

/**
 * Dynamic routes
 */
app.get("/", (req, res) => {
    res.redirect("/list")
})
app.get("/list", controller.list)
app.get("/profile/:id", controller.details)

/**
 * Server startup and shutdown
 */

app.listen(config["server-port"], () => {
    console.log(`Server listening at ${config["server-port"]}`)
    model.load()
});

process.on('exit', (code) => {
    console.log(`Server exiting with code ${code}`)
    model.save()
});
process.once('SIGINT', () => process.exit())
process.once('SIGUSR2', () => process.exit())