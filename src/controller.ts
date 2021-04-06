import e from "express"
import * as model from "./model"

export function list(req: e.Request, res: e.Response) {
    res.render("list", {profiles: model.ProfileDAO.listAll()})
}

export function details(req: e.Request, res: e.Response) {
    const id = parseInt(req.params.id) || 0

    try {
        res.render("profile", {
            profile: model.ProfileDAO.findById(id)
        })
    } catch(err) {
        res.render("error", {
            type: "unknown_user", 
            params: {
                id: req.params.id
            }
        })
    }
 }