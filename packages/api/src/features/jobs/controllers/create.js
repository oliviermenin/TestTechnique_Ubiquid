import { db } from "../../../../db/db.js"

export const create = (req, res) => {
  try {
    const jobData = req.body

    const newId = Math.max(...db.data.jobs.map((job) => job.id), 0) + 1

    const newJob = {
      id: newId,
      ...jobData,
      createdAt: jobData.createdAt || new Date().toISOString().split("T")[0],
    }

    db.data.jobs.push(newJob)
    db.write()

    res.status(201).json(newJob)
  } catch (error) {
    console.error("Erreur lors de la création:", error)
    res.status(500).json({ error: "Erreur lors de la création de l'offre" })
  }
}
