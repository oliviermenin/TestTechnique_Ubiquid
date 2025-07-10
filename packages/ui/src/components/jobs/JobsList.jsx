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

    const badgeStyles = {
      fullRemote: "bg-blue-100 text-blue-800",
      partial: "bg-yellow-100 text-yellow-800",
      ponctual: "bg-purple-100 text-purple-800",
    }

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeStyles[remoteType] || ""}`}
      >
        {getRemoteTypeLabel(remoteType)}
      </span>
    )
  }

  const getAvatarColor = (companyName) => {
    const colors = [
      "bg-purple-500",
      "bg-cyan-500",
      "bg-emerald-500",
      "bg-amber-500",
      "bg-red-500",
      "bg-indigo-500",
      "bg-lime-500",
      "bg-orange-500",
    ]
    const index = companyName.charCodeAt(0) % colors.length
    return colors[index]
  }

  const formatSalary = (salary) => {
    return `${(salary / 1000).toFixed(1)}k`
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
    return <div className="text-center py-8 text-gray-500">Aucune offre d'emploi trouvée</div>
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-semibold text-lg ${getAvatarColor(job.companyName)}`}
              >
                {job.companyName.charAt(0).toUpperCase()}
              </div>

              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-1">
                  <h3 className="text-lg font-semibold text-gray-900">{getJobTypeLabel(job.jobType)}</h3>
                  {getRemoteTypeBadge(job.remoteType)}
                </div>

                <p className="text-gray-600 mb-2">
                  {job.companyName} - {job.location}
                </p>

                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{getContractTypeLabel(job.contractType)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onEdit(job)}
              className="px-4 py-2 bg-violet-500 text-white text-sm font-medium rounded-lg hover:bg-violet-600 transition-colors"
            >
              Modifier
            </button>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <div>
              <p className="text-lg font-semibold text-emerald-600">Salaire {formatSalary(job.salary)}</p>
              <p className="text-sm text-gray-500">{formatDate(job.createdAt)}</p>
            </div>

            <div className="flex items-center space-x-2">
              <button onClick={() => onEdit(job)} className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Edit size={16} />
              </button>
              <button
                onClick={() => onDelete(job.id)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default JobsList
