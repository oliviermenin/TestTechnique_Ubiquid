"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

const JobModal = ({ job, onSave, onClose }) => {
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

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {job ? "Modifier une offre d'emploi" : "Ajouter une offre d'emploi"}
          </h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-1">
              Nom du poste
            </label>
            <select
              id="jobType"
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            >
              <option value="front">Dev Frontend</option>
              <option value="back">Dev Backend</option>
              <option value="fullstack">Dev Fullstack</option>
              <option value="manager">Project / Product Management</option>
            </select>
          </div>

          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
              Entreprise
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              placeholder="Nom de l'entreprise"
            />
            {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Ville
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              placeholder="Ville"
            />
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
          </div>

          <div>
            <label htmlFor="contractType" className="block text-sm font-medium text-gray-700 mb-1">
              Type de contrat
            </label>
            <select
              id="contractType"
              name="contractType"
              value={formData.contractType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            >
              <option value="cdi">CDI</option>
              <option value="cdd">CDD</option>
              <option value="stage">Stage</option>
            </select>
          </div>

          <div>
            <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
              Salaire
            </label>
            <input
              type="number"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              placeholder="Salaire annuel en €"
              min="0"
            />
            {errors.salary && <p className="text-red-500 text-sm mt-1">{errors.salary}</p>}
          </div>

          <div>
            <label htmlFor="remoteType" className="block text-sm font-medium text-gray-700 mb-1">
              Télétravail
            </label>
            <select
              id="remoteType"
              name="remoteType"
              value={formData.remoteType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            >
              <option value="">Non spécifié</option>
              <option value="fullRemote">Télétravail total</option>
              <option value="partial">Télétravail partiel</option>
              <option value="ponctual">Télétravail ponctuel</option>
            </select>
          </div>

          <div className="flex justify-between pt-4">
            {job && (
              <button
                type="button"
                className="px-4 py-2 text-red-500 font-medium hover:text-red-600 transition-colors"
                onClick={() => {
                  if (window.confirm("Êtes-vous sûr de vouloir supprimer cette offre ?")) {
                    onClose()
                  }
                }}
              >
                Supprimer
              </button>
            )}
            <div className="flex space-x-3 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 font-medium hover:text-gray-800 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-violet-500 text-white font-medium rounded-lg hover:bg-violet-600 transition-colors"
              >
                {job ? "Enregistrer l'annonce" : "Créer l'annonce"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default JobModal
