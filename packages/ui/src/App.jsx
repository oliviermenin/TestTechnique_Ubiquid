"use client"

import { useState, useEffect } from "react"
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
    try {
      await jobsApi.delete(jobId)
      await loadJobs()
    } catch (err) {
      setError("Erreur lors de la suppression")
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500"></div>
          <p className="text-gray-600 text-sm">Chargement des offres...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Les jobs</h1>
          <button
            onClick={handleCreateJob}
            className="px-4 py-2 bg-violet-500 hover:bg-violet-600 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Ajouter une offre
          </button>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-red-800 font-medium">{error}</p>
              </div>
            </div>
          </div>
        )}

        <JobFilters filters={filters} onFiltersChange={setFilters} jobs={jobs} />
        <JobsList jobs={filteredJobs} onEdit={handleEditJob} onDelete={handleDeleteJob} />
      </div>

      {showModal && (
        <JobModal
          job={editingJob}
          onSave={handleSaveJob}
          onClose={() => setShowModal(false)}
          onDelete={handleDeleteJob}
        />
      )}
    </div>
  )
}

export default App
