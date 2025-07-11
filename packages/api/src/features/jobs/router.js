import { Router } from "express"
import { list, create, update, deleteJob, getStats } from "./controllers/list.js"

const JobsRouter = Router()

JobsRouter.get("/list", list)
JobsRouter.post("/", create)
JobsRouter.put("/:id", update)
JobsRouter.delete("/:id", deleteJob)
JobsRouter.get("/stats", getStats)

export default JobsRouter