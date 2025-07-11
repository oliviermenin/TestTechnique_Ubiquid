"use client"

const JobsList = ({ jobs, onEdit, onDelete }) => {
  const getJobTypeLabel = (jobType) => {
    const labels = {
      front: "Dev Frontend",
      back: "Dev Backend",
      fullstack: "Dev Fullstack",
      manager: "Projet / Product Management",
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
      fullRemote: "bg-blue-100 text-blue-700",
      partial: "bg-violet-100 text-violet-700",
      ponctual: "bg-amber-100 text-amber-700",
    }

    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${badgeStyles[remoteType] || ""}`}>
        {getRemoteTypeLabel(remoteType)}
      </span>
    )
  }

  const getAvatarColor = (companyName) => {
    const colors = ["bg-violet-500", "bg-blue-500", "bg-emerald-500", "bg-amber-500", "bg-rose-500", "bg-indigo-500"]
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
    return (
      <div className="text-center py-16">
        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 002 2M8 6V4m0 2v2a2 2 0 002 2m0 0h4m-4 0a2 2 0 01-2-2V8a2 2 0 012-2h4a2 2 0 012 2v2a2 2 0 01-2 2"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune offre trouvée</h3>
        <p className="text-gray-500">Essayez de modifier vos filtres ou ajoutez une nouvelle offre.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <div key={job.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold text-lg ${getAvatarColor(job.companyName)}`}
              >
                {job.companyName.charAt(0).toUpperCase()}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-medium text-gray-900">{getJobTypeLabel(job.jobType)}</h3>
                  {getRemoteTypeBadge(job.remoteType)}
                </div>

                <div className="flex items-center text-sm text-gray-600 space-x-4">
                  <span>
                    {job.companyName} - {job.location}
                  </span>
                  <span>{getContractTypeLabel(job.contractType)}</span>
                </div>
              </div>
            </div>

            <div className="text-right flex items-center space-x-6">
              <div>
                <div className="text-sm font-medium text-gray-900">Salaire {formatSalary(job.salary)}</div>
                <div className="text-xs text-gray-500">{formatDate(job.createdAt)}</div>
              </div>

              <button
                onClick={() => onEdit(job)}
                className="px-3 py-1.5 bg-violet-500 hover:bg-violet-600 text-white text-sm rounded-lg transition-colors"
              >
                Modifier
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default JobsList
