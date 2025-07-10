"use client"

import { useState, useEffect } from "react"
import { Plus } from "lucide-react"
import JobsList from "./components/jobs/JobsList"
import JobFilters from "./components/filters/JobFilters"
import JobModal from "./components/modals/JobModal"
import { jobsApi } from "./services/api"

function App() {
  const [jobs, setJobs] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [editingJob, setEditingJob] = useState(null)
  const [filters, setFilters] = useState({
    jobType: "",
    contractType: "",
    remoteType: "",
    sortBy: "date",
  })

  useEffect(() => {
    loadJobs()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [jobs, filters])

  const loadJobs = async () => {
    try {
      setLoading(true)
      const data = await jobsApi.getAll()
      setJobs(data)
      setError(null)
    } catch (err) {
      setError("Erreur lors du chargement des offres")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...jobs]

    if (filters.jobType) {
      filtered = filtered.filter((job) => job.jobType === filters.jobType)
    }
    if (filters.contractType) {
      filtered = filtered.filter((job) => job.contractType === filters.contractType)
    }
    if (filters.remoteType) {
      filtered = filtered.filter((job) => job.remoteType === filters.remoteType)
    }

    filtered.sort((a, b) => {
      if (filters.sortBy === "date") {
        return new Date(b.createdAt) - new Date(a.createdAt)
      } else if (filters.sortBy === "salary") {
        return b.salary - a.salary
      }
      return 0
    })

    setFilteredJobs(filtered)
  }

  const handleCreateJob = () => {
    setEditingJob(null)
    setShowModal(true)
  }

  const handleEditJob = (job) => {
    setEditingJob(job)
    setShowModal(true)
  }

  const handleDeleteJob = async (jobId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette offre ?")) {
      try {
        await jobsApi.delete(jobId)
        await loadJobs()
      } catch (err) {
        setError("Erreur lors de la suppression")
      }
    }
  }

  const handleSaveJob = async (jobData) => {
    try {
      if (editingJob) {
        await jobsApi.update(editingJob.id, jobData)
      } else {
        await jobsApi.create(jobData)
      }
      setShowModal(false)
      await loadJobs()
    } catch (err) {
      setError("Erreur lors de la sauvegarde")
    }
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-8 py-8">
        <div className="flex justify-center items-center py-12">
          <div className="text-gray-500">Chargement...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Les jobs</h1>
        <button
          onClick={handleCreateJob}
          className="inline-flex items-center px-4 py-2 bg-violet-500 text-white font-medium rounded-lg hover:bg-violet-600 transition-colors"
        >
          <Plus size={20} className="mr-2" />
          Ajouter une offre
        </button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">{error}</div>}

      <JobFilters filters={filters} onFiltersChange={setFilters} jobs={jobs} />

      <JobsList jobs={filteredJobs} onEdit={handleEditJob} onDelete={handleDeleteJob} />

      {showModal && <JobModal job={editingJob} onSave={handleSaveJob} onClose={() => setShowModal(false)} />}
    </div>
  )
}

export default App
