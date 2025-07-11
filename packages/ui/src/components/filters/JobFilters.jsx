"use client"

import { X } from "lucide-react"

const JobFilters = ({ filters, onFiltersChange, jobs }) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    })
  }

  const clearFilter = (key) => {
    onFiltersChange({
      ...filters,
      [key]: "",
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
    return labels[remoteType] || remoteType
  }

  return (
    <div className="mb-6">
      {/* Filters Row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <select
              className="bg-gray-100 border-0 rounded-lg px-4 py-2.5 pr-10 text-sm text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white cursor-pointer min-w-[100px]"
              style={{ backgroundImage: "none", appearance: "none" }}
              value={filters.jobType}
              onChange={(e) => handleFilterChange("jobType", e.target.value)}
            >
              <option value="">Poste</option>
              {uniqueJobTypes.map((jobType) => (
                <option key={jobType} value={jobType}>
                  {getJobTypeLabel(jobType)}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
              <div className="w-6 h-6 bg-violet-100 rounded-full flex items-center justify-center">
                <svg className="h-3 w-3 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="relative">
            <select
              className="bg-gray-100 border-0 rounded-lg px-4 py-2.5 pr-10 text-sm text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white cursor-pointer min-w-[100px]"
              style={{ backgroundImage: "none", appearance: "none" }}
              value={filters.contractType}
              onChange={(e) => handleFilterChange("contractType", e.target.value)}
            >
              <option value="">Contrat</option>
              {uniqueContractTypes.map((contractType) => (
                <option key={contractType} value={contractType}>
                  {getContractTypeLabel(contractType)}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
              <div className="w-6 h-6 bg-violet-100 rounded-full flex items-center justify-center">
                <svg className="h-3 w-3 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="relative">
            <select
              className="bg-gray-100 border-0 rounded-lg px-4 py-2.5 pr-10 text-sm text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white cursor-pointer min-w-[120px]"
              style={{ backgroundImage: "none", appearance: "none" }}
              value={filters.remoteType}
              onChange={(e) => handleFilterChange("remoteType", e.target.value)}
            >
              <option value="">Télétravail</option>
              {uniqueRemoteTypes.map((remoteType) => (
                <option key={remoteType} value={remoteType}>
                  {getRemoteTypeLabel(remoteType)}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
              <div className="w-6 h-6 bg-violet-100 rounded-full flex items-center justify-center">
                <svg className="h-3 w-3 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-900 font-medium">Trier par :</span>
          <div className="relative">
            <select
              className="bg-gray-100 border-0 rounded-lg px-4 py-2.5 pr-10 text-sm text-violet-500 font-medium focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white cursor-pointer"
              style={{ backgroundImage: "none", appearance: "none" }}
              value={filters.sortBy}
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            >
              <option value="date">Date</option>
              <option value="salary">Salaire</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
              <div className="w-6 h-6 bg-violet-100 rounded-full flex items-center justify-center">
                <svg className="h-3 w-3 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {(filters.jobType || filters.contractType || filters.remoteType) && (
        <div className="flex flex-wrap items-center gap-2">
          {filters.jobType && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-transparent border border-violet-500 text-gray-900 text-sm rounded-full font-medium">
              {getJobTypeLabel(filters.jobType)}
              <button
                onClick={() => clearFilter("jobType")}
                className="w-4 h-4 bg-violet-500 hover:bg-violet-600 text-white rounded-full flex items-center justify-center transition-colors"
              >
                <X size={10} />
              </button>
            </div>
          )}
          {filters.contractType && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-transparent border border-violet-500 text-gray-900 text-sm rounded-full font-medium">
              {getContractTypeLabel(filters.contractType)}
              <button
                onClick={() => clearFilter("contractType")}
                className="w-4 h-4 bg-violet-500 hover:bg-violet-600 text-white rounded-full flex items-center justify-center transition-colors"
              >
                <X size={10} />
              </button>
            </div>
          )}
          {filters.remoteType && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-transparent border border-violet-500 text-gray-900 text-sm rounded-full font-medium">
              {getRemoteTypeLabel(filters.remoteType)}
              <button
                onClick={() => clearFilter("remoteType")}
                className="w-4 h-4 bg-violet-500 hover:bg-violet-600 text-white rounded-full flex items-center justify-center transition-colors"
              >
                <X size={10} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default JobFilters
