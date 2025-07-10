"use client"

const JobFilters = ({ filters, onFiltersChange, jobs }) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    })
  }

  const uniqueJobTypes = [...new Set(jobs.map((job) => job.jobType))].filter(Boolean)
  const uniqueContractTypes = [...new Set(jobs.map((job) => job.contractType))].filter(Boolean)
  const uniqueRemoteTypes = [...new Set(jobs.map((job) => job.remoteType))].filter(Boolean)

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
    return labels[remoteType] || remoteType
  }

  return (
    <div className="flex flex-wrap items-center gap-4 mb-8">
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-600 mb-1">Poste</label>
        <select
          className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm min-w-[140px] focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          value={filters.jobType}
          onChange={(e) => handleFilterChange("jobType", e.target.value)}
        >
          <option value="">Tous les postes</option>
          {uniqueJobTypes.map((jobType) => (
            <option key={jobType} value={jobType}>
              {getJobTypeLabel(jobType)}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-600 mb-1">Contrat</label>
        <select
          className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm min-w-[120px] focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          value={filters.contractType}
          onChange={(e) => handleFilterChange("contractType", e.target.value)}
        >
          <option value="">Tous les contrats</option>
          {uniqueContractTypes.map((contractType) => (
            <option key={contractType} value={contractType}>
              {getContractTypeLabel(contractType)}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-600 mb-1">Télétravail</label>
        <select
          className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm min-w-[140px] focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          value={filters.remoteType}
          onChange={(e) => handleFilterChange("remoteType", e.target.value)}
        >
          <option value="">Tous les types</option>
          {uniqueRemoteTypes.map((remoteType) => (
            <option key={remoteType} value={remoteType}>
              {getRemoteTypeLabel(remoteType)}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col ml-auto">
        <label className="text-sm font-medium text-gray-600 mb-1">Trier par :</label>
        <select
          className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm min-w-[100px] focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          value={filters.sortBy}
          onChange={(e) => handleFilterChange("sortBy", e.target.value)}
        >
          <option value="date">Date</option>
          <option value="salary">Salaire</option>
        </select>
      </div>
    </div>
  )
}

export default JobFilters
