// Mock Data for CMT Portal

export interface Contract {
  id: string
  vendorName: string
  title: string
  area: string
  value: number
  startDate: string
  endDate: string
  status: string
}

export interface ContractTemplate {
  id: string
  code: string
  category: string
  workName?: string
  fileName: string
  uploadDate: string
}

export interface Document {
  id: string
  fileName?: string
  linkUrl?: string
  description: string
  category: string
  area: string
  workspace: string
  uploadDate: string
  contractId?: string
  metadata?: Record<string, any>
  status?: 'pending_review' | 'approved' | 'rejected'
  reviewedBy?: string
  reviewedDate?: string
  reviewNotes?: string
}

export const AREAS = ['Morowali', 'Pomalaa', 'Sorowako', 'Bahodopi']

export const CONTRACTS: Contract[] = [
  {
    id: 'C-2024-001',
    vendorName: 'PT Mining Solutions Indonesia',
    title: 'Heavy Equipment Rental & Maintenance',
    area: 'Morowali',
    value: 2500000,
    startDate: '2024-01-15',
    endDate: '2025-12-31',
    status: 'Active'
  },
  {
    id: 'C-2024-002',
    vendorName: 'PT Consultancy Services',
    title: 'Environmental Impact Assessment',
    area: 'Pomalaa',
    value: 850000,
    startDate: '2024-03-01',
    endDate: '2025-02-28',
    status: 'Active'
  },
  {
    id: 'C-2023-045',
    vendorName: 'PT Construction Experts',
    title: 'Infrastructure Development Project',
    area: 'Sorowako',
    value: 5200000,
    startDate: '2023-06-01',
    endDate: '2025-05-31',
    status: 'Active'
  },
  {
    id: 'C-2024-003',
    vendorName: 'PT Transportation Logistics',
    title: 'Material Transport Services',
    area: 'Bahodopi',
    value: 1200000,
    startDate: '2024-02-01',
    endDate: '2025-08-15',
    status: 'Expiring Soon'
  },
  {
    id: 'C-2023-078',
    vendorName: 'PT Engineering Works',
    title: 'Geotechnical Survey & Analysis',
    area: 'Morowali',
    value: 680000,
    startDate: '2023-09-15',
    endDate: '2025-03-31',
    status: 'Active'
  },
  {
    id: 'C-2024-004',
    vendorName: 'PT Safety Systems',
    title: 'Occupational Health & Safety Management',
    area: 'Pomalaa',
    value: 450000,
    startDate: '2024-04-01',
    endDate: '2026-03-31',
    status: 'Active'
  },
  {
    id: 'C-2023-092',
    vendorName: 'PT Equipment Supplies',
    title: 'Drilling Equipment Supply',
    area: 'Sorowako',
    value: 3100000,
    startDate: '2023-11-01',
    endDate: '2025-10-31',
    status: 'Active'
  },
  {
    id: 'C-2024-005',
    vendorName: 'PT IT Solutions',
    title: 'Mining Software & System Integration',
    area: 'Bahodopi',
    value: 920000,
    startDate: '2024-05-15',
    endDate: '2026-05-14',
    status: 'Active'
  },
  {
    id: 'C-2023-034',
    vendorName: 'PT Maintenance Services',
    title: 'Facility Maintenance & Upkeep',
    area: 'Morowali',
    value: 780000,
    startDate: '2023-07-01',
    endDate: '2025-06-30',
    status: 'Active'
  },
  {
    id: 'C-2024-006',
    vendorName: 'PT Security Solutions',
    title: 'Site Security & Surveillance',
    area: 'Pomalaa',
    value: 1500000,
    startDate: '2024-01-01',
    endDate: '2025-12-31',
    status: 'Active'
  }
]

export const CONTRACT_TEMPLATES = {
  pricingCatalogue: [
    // Latest versions
    {
      id: 'CP003-001',
      code: 'CP-003',
      category: 'Mining',
      workName: 'Heavy Equipment Rental',
      fileName: 'CP-003_Cost_Structure_Mining_Heavy_Equipment.pdf',
      uploadDate: '2024-02-20T10:00:00Z'
    },
    {
      id: 'CP003-002',
      code: 'CP-003',
      category: 'Construction',
      workName: 'Infrastructure Development',
      fileName: 'CP-003_Cost_Structure_Construction_Infrastructure.pdf',
      uploadDate: '2024-02-22T14:30:00Z'
    },
    {
      id: 'CP003-003',
      code: 'CP-003',
      category: 'Transportation',
      workName: 'Material Logistics',
      fileName: 'CP-003_Cost_Structure_Transportation_Logistics.pdf',
      uploadDate: '2024-02-18T09:15:00Z'
    },
    {
      id: 'CP003-004',
      code: 'CP-003',
      category: 'Engineering',
      workName: 'Consultancy Services',
      fileName: 'CP-003_Cost_Structure_Engineering_Consultancy.pdf',
      uploadDate: '2024-02-25T11:45:00Z'
    }
  ],
  scopeOfWorks: [
    // Latest versions
    {
      id: 'CP002-001',
      code: 'CP-002',
      category: 'Consultancy',
      fileName: 'CP-002_Reference_Scope_Consultancy.pdf',
      uploadDate: '2024-02-21T13:00:00Z'
    },
    {
      id: 'CP002-002',
      code: 'CP-002',
      category: 'Study',
      fileName: 'CP-002_Reference_Scope_Study.pdf',
      uploadDate: '2024-02-19T16:20:00Z'
    },
    {
      id: 'CP002-003',
      code: 'CP-002',
      category: 'Mining and Earth Work',
      fileName: 'CP-002_Reference_Scope_Mining_Earth_Work.pdf',
      uploadDate: '2024-02-24T08:45:00Z'
    },
    {
      id: 'CP002-004',
      code: 'CP-002',
      category: 'Construction Work',
      fileName: 'CP-002_Reference_Scope_Construction.pdf',
      uploadDate: '2024-02-17T12:10:00Z'
    },
    {
      id: 'CP002-005',
      code: 'CP-002',
      category: 'Medium Term Services',
      fileName: 'CP-002_Reference_Scope_Medium_Term.pdf',
      uploadDate: '2024-02-23T15:30:00Z'
    }
  ]
} as const

// Library of older documents (archived)
export const WORK_PACKAGE_LIBRARY = [
  // Old CP-003 versions
  {
    id: 'CP003-001-V1',
    code: 'CP-003',
    category: 'Mining',
    workName: 'Heavy Equipment Rental',
    fileName: 'CP-003_Cost_Structure_Mining_Heavy_Equipment_V1.pdf',
    uploadDate: '2023-12-15T10:00:00Z',
    isLatest: false
  },
  {
    id: 'CP003-002-V1',
    code: 'CP-003',
    category: 'Construction',
    workName: 'Infrastructure Development',
    fileName: 'CP-003_Cost_Structure_Construction_Infrastructure_V1.pdf',
    uploadDate: '2024-01-10T14:30:00Z',
    isLatest: false
  },
  // Old CP-002 versions
  {
    id: 'CP002-001-V1',
    code: 'CP-002',
    category: 'Consultancy',
    fileName: 'CP-002_Reference_Scope_Consultancy_V1.pdf',
    uploadDate: '2023-11-20T13:00:00Z',
    isLatest: false
  },
  {
    id: 'CP002-002-V1',
    code: 'CP-002',
    category: 'Study',
    fileName: 'CP-002_Reference_Scope_Study_V1.pdf',
    uploadDate: '2024-01-05T16:20:00Z',
    isLatest: false
  },
  {
    id: 'CP002-004-V1',
    code: 'CP-002',
    category: 'Construction Work',
    fileName: 'CP-002_Reference_Scope_Construction_V1.pdf',
    uploadDate: '2023-10-12T12:10:00Z',
    isLatest: false
  }
]

export const DOCUMENT_CATEGORIES = [
  'Cost Structure',
  'Reference',
  'Scope of Works',
  'Work Instructions',
  'Safety Procedures',
  'Minutes of Meeting',
  'Deviation Form',
  'Procurement Request',
  'Contract Request Form',
  'Administration Document',
  'Technical Specification',
  'Compliance Report'
]

// Helper function to calculate contract expiry status
export const getContractExpiryStatus = (endDate: string): 'normal' | 'warning' | 'critical' => {
  const end = new Date(endDate)
  const now = new Date()
  const diffTime = end.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  const diffMonths = diffDays / 30

  if (diffMonths < 3) return 'critical'
  if (diffMonths < 6) return 'warning'
  return 'normal'
}

// Helper function to get documents from localStorage
export const getDocumentsFromStorage = (): Document[] => {
  if (typeof window === 'undefined') return []
  const docs = localStorage.getItem('cmt_documents')

  // Return sample documents if no saved documents exist
  if (!docs) {
    return getSampleDocuments()
  }

  const parsedDocs = JSON.parse(docs)

  // If stored documents don't have metadata, migrate them
  const migratedDocs = parsedDocs.map((doc: any) => {
    if (!doc.metadata) {
      return addSampleMetadata(doc)
    }
    return doc
  })

  return migratedDocs
}

// Sample documents with metadata for testing
const getSampleDocuments = (): Document[] => [
  {
    id: 'DOC-001',
    fileName: 'contract_mining_services.pdf',
    description: 'Mining equipment rental and maintenance contract for Q1 2024',
    category: 'Contract Request Form',
    area: 'Morowali',
    workspace: 'planning',
    uploadDate: '2024-01-15T10:30:00Z',
    contractId: 'C-2024-001',
    status: 'approved',
    reviewedBy: 'CMT Admin',
    reviewedDate: '2024-01-16T09:00:00Z',
    metadata: {
      contractRequestId: 'CRQ-2024-001',
      contractType: 'Service Contract',
      expectedStartDate: '2024-02-01',
      duration: 12,
      estimatedValue: 2500000,
      requester: 'John Doe - Operations Manager'
    }
  },
  {
    id: 'DOC-002',
    fileName: 'safety_procedure_heavy_equipment.pdf',
    description: 'Standard operating procedures for heavy equipment operation',
    category: 'Safety Procedures',
    area: 'Sorowako',
    workspace: 'planning',
    uploadDate: '2024-01-20T14:15:00Z',
    status: 'approved',
    reviewedBy: 'CMT Admin',
    reviewedDate: '2024-01-21T10:30:00Z',
    metadata: {
      procedureNumber: 'SP-2024-001',
      procedureType: 'Standard Operating Procedure',
      riskLevel: 'High Risk',
      effectiveDate: '2024-01-15',
      reviewDate: '2024-07-15'
    }
  },
  {
    id: 'DOC-003',
    linkUrl: 'https://example.com/monthly-report',
    description: 'Monthly compliance report for environmental regulations',
    category: 'Compliance Report',
    area: 'Bahodopi',
    workspace: 'execution',
    uploadDate: '2024-01-25T09:00:00Z',
    status: 'approved',
    reviewedBy: 'CMT Manager',
    reviewedDate: '2024-01-26T14:00:00Z',
    metadata: {
      reportPeriod: 'Monthly',
      reportDate: '2024-01-25',
      complianceType: 'Environmental Compliance',
      auditor: 'PT Environmental Audit Services',
      overallRating: 'Good'
    }
  },
  {
    id: 'DOC-004',
    fileName: 'cost_structure_q1_2024.xlsx',
    description: 'Detailed cost breakdown for Q1 2024 operations',
    category: 'Cost Structure',
    area: 'Pomalaa',
    workspace: 'planning',
    uploadDate: '2024-01-30T16:45:00Z',
    status: 'pending_review',
    metadata: {
      totalAmount: 5000000,
      currency: 'IDR',
      fiscalYear: '2024',
      costCenter: 'CC-OPER-001'
    }
  },
  {
    id: 'DOC-005',
    fileName: 'meeting_minutes_project_review.pdf',
    description: 'Weekly project review meeting minutes',
    category: 'Minutes of Meeting',
    area: 'Morowali',
    workspace: 'planning',
    uploadDate: '2024-02-05T11:30:00Z',
    status: 'pending_review',
    metadata: {
      meetingDate: '2024-02-05',
      meetingType: 'Project Review',
      attendees: 12,
      facilitator: 'Jane Smith - Project Manager',
      location: 'Main Conference Room'
    }
  },
  {
    id: 'DOC-006',
    fileName: 'procurement_request_equipment.pdf',
    description: 'Heavy equipment procurement request for construction phase',
    category: 'Procurement Request',
    area: 'Pomalaa',
    workspace: 'planning',
    uploadDate: '2024-02-08T13:20:00Z',
    status: 'pending_review',
    metadata: {
      requestNumber: 'PRQ-2024-006',
      requestDate: '2024-02-08',
      requester: 'Mike Johnson - Procurement Manager',
      requesterEmail: 'mike.johnson@company.com',
      budgetAmount: 3000000,
      urgency: 'Urgent'
    }
  },
  {
    id: 'DOC-007',
    fileName: 'technical_specification_machinery.pdf',
    description: 'Technical specifications for mining machinery installation',
    category: 'Technical Specification',
    area: 'Sorowako',
    workspace: 'planning',
    uploadDate: '2024-02-10T15:45:00Z',
    status: 'approved',
    reviewedBy: 'Engineering Lead',
    reviewedDate: '2024-02-11T08:00:00Z',
    metadata: {
      specificationNumber: 'TS-2024-007',
      equipmentType: 'Mining Equipment',
      version: '2.1',
      issueDate: '2024-02-10',
      technicalOwner: 'Engineering Department'
    }
  },
  {
    id: 'DOC-008',
    fileName: 'administration_policy_2024.pdf',
    description: 'Updated company administration policies for 2024',
    category: 'Administration Document',
    area: 'Bahodopi',
    workspace: 'planning',
    uploadDate: '2024-02-12T09:15:00Z',
    status: 'approved',
    reviewedBy: 'HR Manager',
    reviewedDate: '2024-02-13T11:00:00Z',
    metadata: {
      documentType: 'Policy',
      effectiveDate: '2024-02-15',
      department: 'Human Resources',
      approvedBy: 'HR Director',
      reviewFrequency: 'Annually'
    }
  },
  {
    id: 'DOC-009',
    fileName: 'work_order_construction.pdf',
    description: 'Construction work order for facility expansion',
    category: 'Scope of Works',
    area: 'Morowali',
    workspace: 'planning',
    uploadDate: '2024-02-14T10:30:00Z',
    status: 'pending_review',
    metadata: {
      workOrderNumber: 'WO-2024-009',
      startDate: '2024-03-01',
      endDate: '2024-06-30',
      estimatedValue: 15000000,
      workLocation: 'Morowali'
    }
  },
  {
    id: 'DOC-010',
    fileName: 'deviation_form_material.pdf',
    description: 'Material specification deviation request',
    category: 'Deviation Form',
    area: 'Pomalaa',
    workspace: 'planning',
    uploadDate: '2024-02-16T14:20:00Z',
    status: 'approved',
    reviewedBy: 'Quality Assurance Lead',
    reviewedDate: '2024-02-17T09:30:00Z',
    metadata: {
      deviationNumber: 'DF-2024-010',
      deviationType: 'Technical Deviation',
      severity: 'Major',
      reportedDate: '2024-02-16',
      reportedBy: 'Tom Wilson - QA Engineer'
    }
  }
]

// Helper function to add sample metadata to existing documents
const addSampleMetadata = (doc: Document): Document => {
  const metadataMap: Record<string, any> = {
    'Contract Request Form': {
      contractRequestId: 'CRQ-LEGACY',
      contractType: 'Service Contract',
      expectedStartDate: '2024-01-01',
      duration: 6,
      estimatedValue: 1000000,
      requester: 'Legacy User'
    },
    'Cost Structure': {
      totalAmount: 1000000,
      currency: 'IDR',
      fiscalYear: '2024',
      costCenter: 'CC-DEFAULT'
    }
  }

  return {
    ...doc,
    // Only add metadata if document doesn't already have it
    metadata: Object.keys(doc.metadata || {}).length > 0 ? doc.metadata : metadataMap[doc.category] || {},
    // Ensure status exists, default to approved for legacy documents
    status: doc.status || 'approved'
  }
}

// Helper function to save documents to localStorage
export const saveDocumentsToStorage = (documents: Document[]): void => {
  if (typeof window === 'undefined') return
  localStorage.setItem('cmt_documents', JSON.stringify(documents))
}

// Helper function to add a document
export const addDocument = (document: Omit<Document, 'id' | 'uploadDate'>): Document => {
  const documents = getDocumentsFromStorage()
  const newDoc: Document = {
    ...document,
    id: `DOC-${Date.now()}`,
    uploadDate: new Date().toISOString(),
    status: document.status || 'pending_review' // Default to pending review
  }
  documents.push(newDoc)
  saveDocumentsToStorage(documents)
  return newDoc
}

// Approval functions
export const approveDocument = (documentId: string, reviewedBy: string, reviewNotes?: string): boolean => {
  const documents = getDocumentsFromStorage()
  const docIndex = documents.findIndex(doc => doc.id === documentId)

  if (docIndex !== -1) {
    documents[docIndex] = {
      ...documents[docIndex],
      status: 'approved',
      reviewedBy,
      reviewedDate: new Date().toISOString(),
      reviewNotes: reviewNotes || ''
    }
    saveDocumentsToStorage(documents)
    return true
  }
  return false
}

export const rejectDocument = (documentId: string, reviewedBy: string, reviewNotes?: string): boolean => {
  const documents = getDocumentsFromStorage()
  const docIndex = documents.findIndex(doc => doc.id === documentId)

  if (docIndex !== -1) {
    documents[docIndex] = {
      ...documents[docIndex],
      status: 'rejected',
      reviewedBy,
      reviewedDate: new Date().toISOString(),
      reviewNotes: reviewNotes || ''
    }
    saveDocumentsToStorage(documents)
    return true
  }
  return false
}