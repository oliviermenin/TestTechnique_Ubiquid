"use client"
import { Edit, Trash2 } from "lucide-react"

const JobsList = ({ jobs, onEdit, onDelete }) => {
  const getJobTypeLabel = (jobType) => {
    const labels = {
      front: "Dev Frontend",
      back: "Dev Backend",
      fullstack: "Dev Fullstack",
      manager: "Project / Product Management",
    }
    return labels[jobType] || jobType
  }

  const getContractTypeLabel = (contractType) => {
    const labels = {
      cdi: "CDI",
      cdd: "CDD",
      stage: "Stage",
    }
    return labels[contractType] || contractType
  }

  const getRemoteTypeLabel = (remoteType) => {
    const labels = {
      fullRemote: "Télétravail total",
      partial: "Télétravail partiel",
      ponctual: "Télétravail ponctuel",
    }
    return labels[remoteType] || null
  }

  const getRemoteTypeBadge = (remoteType) => {
    if (!remoteType) return null

    const badgeClass = {
      fullRemote: "badge-remote",
      partial: "badge-partial",
      ponctual: "badge-ponctual",
    }

    return <span className={`badge ${badgeClass[remoteType] || ""}`}>{getRemoteTypeLabel(remoteType)}</span>
  }

  const getAvatarColor = (companyName) => {
    const colors = ["#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#6366f1", "#84cc16", "#f97316"]
    const index = companyName.charCodeAt(0) % colors.length
    return colors[index]
  }

  const formatSalary = (salary) => {
    return `${(salary / 1000).toFixed(0)}k`
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "Il y a 1 jour"
    if (diffDays < 30) return `Il y a ${diffDays} jours`

    const diffMonths = Math.floor(diffDays / 30)
    if (diffMonths === 1) return "Il y a 1 mois"
    return `Il y a ${diffMonths} mois`
  }

  if (jobs.length === 0) {
    return <div style={{ textAlign: "center", padding: "2rem", color: "#64748b" }}>Aucune offre d'emploi trouvée</div>
  }

  return (
    <div className="jobs-grid">
      {jobs.map((job) => (
        <div key={job.id} className="job-card">
          <div className="job-header">
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <div className="job-avatar" style={{ backgroundColor: getAvatarColor(job.companyName) }}>
                {job.companyName.charAt(0).toUpperCase()}
              </div>
              <div className="job-info">
                <div className="job-title">{getJobTypeLabel(job.jobType)}</div>
                <div className="job-company">
                  {job.companyName} - {job.location}
                </div>
                <div className="job-details">
                  <span>{getContractTypeLabel(job.contractType)}</span>
                </div>
                {getRemoteTypeBadge(job.remoteType)}
              </div>
            </div>
            <div className="job-actions">
              <button className="btn btn-secondary" onClick={() => onEdit(job)} style={{ padding: "0.5rem" }}>
                <Edit size={16} />
              </button>
              <button className="btn btn-danger" onClick={() => onDelete(job.id)} style={{ padding: "0.5rem" }}>
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div className="job-salary">Salaire {formatSalary(job.salary)}</div>
              <div style={{ fontSize: "0.875rem", color: "#64748b" }}>{formatDate(job.createdAt)}</div>
            </div>
            <button className="btn btn-secondary">Modifier</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default JobsList
