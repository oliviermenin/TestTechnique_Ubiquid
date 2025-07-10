import { db } from "../../../../db/db.js"

export const deleteJob = (req, res) => {
  try {
    const jobId = Number.parseInt(req.params.id)

    const jobIndex = db.data.jobs.findIndex((job) => job.id === jobId)

    if (jobIndex === -1) {
      return res.status(404).json({ error: "Offre non trouvée" })
    }

    const deletedJob = db.data.jobs.splice(jobIndex, 1)[0]

    db.write()

    res.json({ message: "Offre supprimée avec succès", job: deletedJob })
  } catch (error) {
    console.error("Erreur lors de la suppression:", error)
    res.status(500).json({ error: "Erreur lors de la suppression de l'offre" })
  }
}
