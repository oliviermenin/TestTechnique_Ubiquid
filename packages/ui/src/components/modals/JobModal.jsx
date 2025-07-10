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
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">{job ? "Modifier une offre d'emploi" : "Ajouter une offre d'emploi"}</h2>
          <button onClick={onClose} className="btn btn-secondary" style={{ padding: "0.5rem", minWidth: "auto" }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="jobType">Nom du poste</label>
            <select id="jobType" name="jobType" value={formData.jobType} onChange={handleChange} className="form-input">
              <option value="front">Dev Frontend</option>
              <option value="back">Dev Backend</option>
              <option value="fullstack">Dev Fullstack</option>
              <option value="manager">Project / Product Management</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="companyName">Entreprise</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="form-input"
              placeholder="Nom de l'entreprise"
            />
            {errors.companyName && (
              <div style={{ color: "#ef4444", fontSize: "0.875rem", marginTop: "0.25rem" }}>{errors.companyName}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="location">Ville</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="form-input"
              placeholder="Ville"
            />
            {errors.location && (
              <div style={{ color: "#ef4444", fontSize: "0.875rem", marginTop: "0.25rem" }}>{errors.location}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="contractType">Type de contrat</label>
            <select
              id="contractType"
              name="contractType"
              value={formData.contractType}
              onChange={handleChange}
              className="form-input"
            >
              <option value="cdi">CDI</option>
              <option value="cdd">CDD</option>
              <option value="stage">Stage</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="salary">Salaire</label>
            <input
              type="number"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="form-input"
              placeholder="Salaire annuel en €"
              min="0"
            />
            {errors.salary && (
              <div style={{ color: "#ef4444", fontSize: "0.875rem", marginTop: "0.25rem" }}>{errors.salary}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="remoteType">Télétravail</label>
            <select
              id="remoteType"
              name="remoteType"
              value={formData.remoteType}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Non spécifié</option>
              <option value="fullRemote">Télétravail total</option>
              <option value="partial">Télétravail partiel</option>
              <option value="ponctual">Télétravail ponctuel</option>
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Annuler
            </button>
            <button type="submit" className="btn btn-primary">
              {job ? "Enregistrer l'annonce" : "Créer l'annonce"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default JobModal;
