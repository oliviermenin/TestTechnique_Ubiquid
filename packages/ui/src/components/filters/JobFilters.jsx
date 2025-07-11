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
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <select
              className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 cursor-pointer min-w-[100px]"
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
              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <div className="relative">
            <select
              className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 cursor-pointer min-w-[100px]"
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
              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <div className="relative">
            <select
              className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 cursor-pointer min-w-[120px]"
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
              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Trier par :</span>
          <div className="relative">
            <select
              className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 cursor-pointer"
              value={filters.sortBy}
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            >
              <option value="date">Date</option>
              <option value="salary">Salaire</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {(filters.jobType || filters.contractType || filters.remoteType) && (
        <div className="flex flex-wrap items-center gap-2">
          {filters.jobType && (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-100 text-violet-800 text-sm rounded-full">
              {getJobTypeLabel(filters.jobType)}
              <button
                onClick={() => clearFilter("jobType")}
                className="hover:bg-violet-200 rounded-full p-0.5 transition-colors"
              >
                <X size={12} />
              </button>
            </div>
          )}
          {filters.contractType && (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-100 text-violet-800 text-sm rounded-full">
              {getContractTypeLabel(filters.contractType)}
              <button
                onClick={() => clearFilter("contractType")}
                className="hover:bg-violet-200 rounded-full p-0.5 transition-colors"
              >
                <X size={12} />
              </button>
            </div>
          )}
          {filters.remoteType && (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-100 text-violet-800 text-sm rounded-full">
              {getRemoteTypeLabel(filters.remoteType)}
              <button
                onClick={() => clearFilter("remoteType")}
                className="hover:bg-violet-200 rounded-full p-0.5 transition-colors"
              >
                <X size={12} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default JobFilters
