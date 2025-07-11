import { db } from "../../../../db/db"

export const list = (req, res) => {
  res.json(db.data.jobs)
}

export const create = (req, res) => {
  try {
    const newJob = {
      id: Date.now(),
      ...req.body,
      createdAt: new Date().toISOString().split("T")[0],
    }

    db.data.jobs.push(newJob)
    db.write()

    res.status(201).json(newJob)
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la création du job" })
  }
}

export const update = (req, res) => {
  try {
    const id = Number.parseInt(req.params.id)
    const jobIndex = db.data.jobs.findIndex((job) => job.id === id)

    if (jobIndex === -1) {
      return res.status(404).json({ error: "Job non trouvé" })
    }

    db.data.jobs[jobIndex] = {
      ...db.data.jobs[jobIndex],
      ...req.body,
      id: id,
    }

    db.write()

    res.json(db.data.jobs[jobIndex])
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la mise à jour du job" })
  }
}

export const deleteJob = (req, res) => {
  try {
    const id = Number.parseInt(req.params.id)
    const jobIndex = db.data.jobs.findIndex((job) => job.id === id)

    if (jobIndex === -1) {
      return res.status(404).json({ error: "Job non trouvé" })
    }

    db.data.jobs.splice(jobIndex, 1)
    db.write()

    res.json({ message: "Job supprimé avec succès" })
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la suppression du job" })
  }
}

export const getStats = (req, res) => {
  try {
    const jobs = db.data.jobs
    const stats = {
      total: jobs.length,
      byType: jobs.reduce((acc, job) => {
        acc[job.jobType] = (acc[job.jobType] || 0) + 1
        return acc
      }, {}),
      byContract: jobs.reduce((acc, job) => {
        acc[job.contractType] = (acc[job.contractType] || 0) + 1
        return acc
      }, {}),
    }

    res.json(stats)
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des stats" })
  }
}
