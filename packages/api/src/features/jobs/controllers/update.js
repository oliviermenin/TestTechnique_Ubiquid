import { db } from "../../../../db/db.js"

export const update = (req, res) => {
  try {
    const jobId = Number.parseInt(req.params.id)
    const jobData = req.body

    const jobIndex = db.data.jobs.findIndex((job) => job.id === jobId)

    if (jobIndex === -1) {
      return res.status(404).json({ error: "Offre non trouvée" })
    }

    db.data.jobs[jobIndex] = {
      ...db.data.jobs[jobIndex],
      ...jobData,
      id: jobId,
    }

    db.write()

    res.json(db.data.jobs[jobIndex])
  } catch (error) {
    console.error("Erreur lors de la mise à jour:", error)
    res.status(500).json({ error: "Erreur lors de la mise à jour de l'offre" })
  }
}
