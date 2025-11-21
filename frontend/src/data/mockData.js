// Mock Data for CMT Portal

export const AREAS = ['Morowali', 'Pomalaa', 'Sorowako', 'Bahodopi'];

export const CONTRACTS = [
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
];

export const CONTRACT_TEMPLATES = {
  pricingCatalogue: [
    {
      id: 'CP003-001',
      code: 'CP-003',
      category: 'Mining',
      workName: 'Heavy Equipment Rental',
      fileName: 'CP-003_Cost_Structure_Mining_Heavy_Equipment.pdf'
    },
    {
      id: 'CP003-002',
      code: 'CP-003',
      category: 'Construction',
      workName: 'Infrastructure Development',
      fileName: 'CP-003_Cost_Structure_Construction_Infrastructure.pdf'
    },
    {
      id: 'CP003-003',
      code: 'CP-003',
      category: 'Transportation',
      workName: 'Material Logistics',
      fileName: 'CP-003_Cost_Structure_Transportation_Logistics.pdf'
    },
    {
      id: 'CP003-004',
      code: 'CP-003',
      category: 'Engineering',
      workName: 'Consultancy Services',
      fileName: 'CP-003_Cost_Structure_Engineering_Consultancy.pdf'
    }
  ],
  scopeOfWorks: [
    {
      id: 'CP002-001',
      code: 'CP-002',
      category: 'Consultancy',
      fileName: 'CP-002_Reference_Scope_Consultancy.pdf'
    },
    {
      id: 'CP002-002',
      code: 'CP-002',
      category: 'Study',
      fileName: 'CP-002_Reference_Scope_Study.pdf'
    },
    {
      id: 'CP002-003',
      code: 'CP-002',
      category: 'Mining and Earth Work',
      fileName: 'CP-002_Reference_Scope_Mining_Earth_Work.pdf'
    },
    {
      id: 'CP002-004',
      code: 'CP-002',
      category: 'Construction Work',
      fileName: 'CP-002_Reference_Scope_Construction.pdf'
    },
    {
      id: 'CP002-005',
      code: 'CP-002',
      category: 'Medium Term Services',
      fileName: 'CP-002_Reference_Scope_Medium_Term.pdf'
    }
  ]
};

export const DOCUMENT_CATEGORIES = [
  'Minutes of Meeting',
  'Deviation Form',
  'Procurement Request',
  'Contract Request Form',
  'Administration Document',
  'Technical Specification',
  'Compliance Report'
];

// Helper function to calculate contract expiry status
export const getContractExpiryStatus = (endDate) => {
  const end = new Date(endDate);
  const now = new Date();
  const diffTime = end - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffMonths = diffDays / 30;

  if (diffMonths < 3) return 'critical';
  if (diffMonths < 6) return 'warning';
  return 'normal';
};

// Helper function to get documents from localStorage
export const getDocumentsFromStorage = () => {
  const docs = localStorage.getItem('cmt_documents');
  return docs ? JSON.parse(docs) : [];
};

// Helper function to save documents to localStorage
export const saveDocumentsToStorage = (documents) => {
  localStorage.setItem('cmt_documents', JSON.stringify(documents));
};

// Helper function to add a document
export const addDocument = (document) => {
  const documents = getDocumentsFromStorage();
  const newDoc = {
    ...document,
    id: `DOC-${Date.now()}`,
    uploadDate: new Date().toISOString()
  };
  documents.push(newDoc);
  saveDocumentsToStorage(documents);
  return newDoc;
};
