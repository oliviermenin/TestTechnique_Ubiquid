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
    <div className="filters">
      <div className="filter-group">
        <label>Poste</label>
        <select
          className="select"
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

      <div className="filter-group">
        <label>Contrat</label>
        <select
          className="select"
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

      <div className="filter-group">
        <label>Télétravail</label>
        <select
          className="select"
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

      <div className="filter-group">
        <label>Trier par</label>
        <select
          className="select"
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
