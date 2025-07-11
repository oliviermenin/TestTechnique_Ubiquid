"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

const JobModal = ({ job, onSave, onClose, onDelete }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    jobType: "fullstack",
    contractType: "cdi",
    location: "",
    salary: "",
    remoteType: "",
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (job) {
      setFormData({
        companyName: job.companyName || "",
        jobType: job.jobType || "fullstack",
        contractType: job.contractType || "cdi",
        location: job.location || "",
        salary: job.salary || "",
        remoteType: job.remoteType || "",
      })
    }
  }, [job])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Le nom de l'entreprise est requis"
    }
    if (!formData.location.trim()) {
      newErrors.location = "La ville est requise"
    }
    if (!formData.salary || formData.salary <= 0) {
      newErrors.salary = "Le salaire doit être supérieur à 0"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      const jobData = {
        ...formData,
        salary: Number.parseInt(formData.salary),
        createdAt: job ? job.createdAt : new Date().toISOString().split("T")[0],
      }
      onSave(jobData)
    }
  }

  const handleDelete = () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette offre ?")) {
      onDelete(job.id)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">

      <div className="modal-container bg-white shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-8 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 flex-1 text-center">
            {job ? "Modifier une offre d'emploi" : "Nouvelle offre d'emploi"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-white bg-violet-500 hover:bg-violet-600 rounded-full transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nom du poste</label>
            <div className="relative">
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-sm"
              >
                <option value="front">Dev Frontend</option>
                <option value="back">Dev Backend</option>
                <option value="fullstack">Dev Fullstack</option>
                <option value="manager">Projet / Product Management</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                <svg className="h-4 w-4 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Entreprise</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-sm"
              placeholder="Nom de l'entreprise"
            />
            {errors.companyName && <p className="text-red-500 text-sm mt-2">{errors.companyName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ville</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-sm"
              placeholder="Ville"
            />
            {errors.location && <p className="text-red-500 text-sm mt-2">{errors.location}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type de contrat</label>
            <div className="relative">
              <select
                name="contractType"
                value={formData.contractType}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-sm"
              >
                <option value="cdi">CDI</option>
                <option value="cdd">CDD</option>
                <option value="stage">Stage</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                <svg className="h-4 w-4 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Salaire</label>
            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-sm"
              placeholder="137k"
            />
            {errors.salary && <p className="text-red-500 text-sm mt-2">{errors.salary}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Télétravail</label>
            <div className="relative">
              <select
                name="remoteType"
                value={formData.remoteType}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-sm"
              >
                <option value="">Non spécifié</option>
                <option value="fullRemote">Télétravail total</option>
                <option value="partial">Télétravail partiel</option>
                <option value="ponctual">Télétravail ponctuel</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                <svg className="h-4 w-4 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center pt-6 relative">
            {job && (
              <button
                type="button"
                onClick={handleDelete}
                className="absolute left-0 text-red-500 hover:text-red-600 font-medium transition-colors text-sm"
              >
                Supprimer
              </button>
            )}
            <button
              type="submit"
              className="px-8 py-3 bg-violet-500 hover:bg-violet-600 text-white font-medium rounded-lg transition-colors text-sm min-w-[200px]"
            >
              {job ? "Enregistrer l'annonce" : "Créer l'annonce"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default JobModal
