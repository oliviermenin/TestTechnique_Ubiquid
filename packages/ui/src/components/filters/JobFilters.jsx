"use client"

import { useState } from "react"
import { X, ChevronDown } from "lucide-react"

const JobFilters = ({ filters, onFiltersChange, jobs }) => {
  const [openDropdown, setOpenDropdown] = useState(null)

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    })
    setOpenDropdown(null)
  }

  const clearFilter = (key) => {
    onFiltersChange({
      ...filters,
      [key]: "",
    })
  }

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName)
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

  const CustomDropdown = ({ label, value, options, onChange, dropdownKey, isSort = false }) => (
    <div className="relative">
      <button
        type="button"
        onClick={() => toggleDropdown(dropdownKey)}
        className={`bg-gray-100 border-0 rounded-lg px-4 py-2.5 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white cursor-pointer min-w-[100px] flex items-center justify-between ${
          isSort ? "text-violet-500" : "text-gray-800"
        }`}
      >
        <span>{value ? options.find((opt) => opt.value === value)?.label : label}</span>
        <div className="w-6 h-6 bg-violet-100 rounded-full flex items-center justify-center ml-2">
          <ChevronDown className="h-3 w-3 text-violet-500" />
        </div>
      </button>

      {openDropdown === dropdownKey && (
        <div className="absolute top-full left-0 mt-1 min-w-[200px] bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-2">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 whitespace-nowrap"
            >
              <div className="w-4 h-4 border border-gray-300 rounded flex items-center justify-center flex-shrink-0">
                {value === option.value && <div className="w-2 h-2 bg-violet-500 rounded"></div>}
              </div>
              <span className="truncate">{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )

  // Ordre fixe pour les postes selon l'image
  const jobTypeOptions = [
    { value: "", label: "Tous" },
    { value: "back", label: "Dev Backend" },
    { value: "fullstack", label: "Dev Fullstack" },
    { value: "front", label: "Dev Frontend" },
    { value: "manager", label: "Projet / Product Management" },
  ]

  // Contrat sans "Tous"
  const contractTypeOptions = uniqueContractTypes.map((type) => ({
    value: type,
    label: getContractTypeLabel(type),
  }))

  // Télétravail avec "Non spécifié" en dernier
  const remoteTypeOptions = [
    ...uniqueRemoteTypes.map((type) => ({ value: type, label: getRemoteTypeLabel(type) })),
    { value: "", label: "Non spécifié" },
  ]

  const sortOptions = [
    { value: "date", label: "Par Date" },
    { value: "salary", label: "Par Salaire" },
  ]

  return (
    <div className="mb-6">
      {/* Filters Row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <CustomDropdown
            label="Poste"
            value={filters.jobType}
            options={jobTypeOptions}
            onChange={(value) => handleFilterChange("jobType", value)}
            dropdownKey="jobType"
          />

          <CustomDropdown
            label="Contrat"
            value={filters.contractType}
            options={contractTypeOptions}
            onChange={(value) => handleFilterChange("contractType", value)}
            dropdownKey="contractType"
          />

          <CustomDropdown
            label="Télétravail"
            value={filters.remoteType}
            options={remoteTypeOptions}
            onChange={(value) => handleFilterChange("remoteType", value)}
            dropdownKey="remoteType"
          />
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-900 font-medium">Trier par :</span>
          <CustomDropdown
            label="Date"
            value={filters.sortBy}
            options={sortOptions}
            onChange={(value) => handleFilterChange("sortBy", value)}
            dropdownKey="sortBy"
            isSort={true}
          />
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
