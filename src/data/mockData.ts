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

export interface FileType {
  id: string
  name: string
  category: string
  description?: string
}

export const AREAS = ['Morowali', 'Pomalaa', 'Sorowako', 'Bahodopi']

export const FILE_TYPES: FileType[] = [
  // Heavy Equipment & Machinery
  { id: 'WN-001', name: 'Heavy Equipment Rental', category: 'Mining', description: 'Rental of heavy equipment for mining operations' },
  { id: 'WN-002', name: 'Drilling Equipment Rental', category: 'Mining', description: 'Rental of drilling equipment for exploration and extraction' },
  { id: 'WN-003', name: 'Equipment Maintenance', category: 'Mechanical', description: 'Maintenance and repair of industrial equipment' },
  { id: 'WN-004', name: 'Equipment Parts', category: 'Spare Parts', description: 'Supply of spare parts for industrial machinery' },
  { id: 'WN-005', name: 'Industrial Tools', category: 'Tools', description: 'Industrial tools and equipment supply' },

  // Construction & Infrastructure
  { id: 'WN-006', name: 'Infrastructure Development', category: 'Construction', description: 'Development of infrastructure projects' },
  { id: 'WN-007', name: 'Building Construction', category: 'Construction', description: 'Building construction services' },
  { id: 'WN-008', name: 'Road Development', category: 'Construction', description: 'Road construction and development' },
  { id: 'WN-009', name: 'Foundation Work', category: 'Construction', description: 'Foundation engineering and construction' },
  { id: 'WN-010', name: 'Water System Installation', category: 'Plumbing', description: 'Installation of water systems and plumbing' },
  { id: 'WN-011', name: 'Power Installation', category: 'Electrical', description: 'Electrical power installation services' },

  // Logistics & Supply Chain
  { id: 'WN-012', name: 'Material Logistics', category: 'Transportation', description: 'Material transportation and logistics' },
  { id: 'WN-013', name: 'Supply Chain Management', category: 'Logistics', description: 'Supply chain management services' },
  { id: 'WN-014', name: 'Transportation Services', category: 'Transportation', description: 'Transportation and logistics services' },
  { id: 'WN-015', name: 'Logistics Services', category: 'Logistics', description: 'Logistics and distribution services' },

  // Technical & Engineering Services
  { id: 'WN-016', name: 'Consultancy Services', category: 'Engineering', description: 'Technical consulting services' },
  { id: 'WN-017', name: 'Geotechnical Survey', category: 'Survey', description: 'Geotechnical survey and analysis' },
  { id: 'WN-018', name: 'Engineering Design', category: 'Engineering', description: 'Engineering design and planning' },
  { id: 'WN-019', name: 'Technology Consulting Services', category: 'Technology Services', description: 'Technology consulting and advisory' },

  // Safety & Environmental
  { id: 'WN-020', name: 'Safety Equipment Supply', category: 'Safety', description: 'Supply of safety equipment and gear' },
  { id: 'WN-021', name: 'Waste Management', category: 'Environmental', description: 'Waste management and disposal services' },
  { id: 'WN-022', name: 'Recycling Services', category: 'Waste Management', description: 'Recycling and waste recovery services' },
  { id: 'WN-023', name: 'Environmental Impact Assessment', category: 'Environmental', description: 'Environmental impact studies and assessments' },
  { id: 'WN-024', name: 'Fire Protection System', category: 'Fire Safety', description: 'Fire protection system installation and maintenance' },

  // IT & Software
  { id: 'WN-025', name: 'Software Implementation', category: 'IT Services', description: 'Software implementation and deployment' },
  { id: 'WN-026', name: 'IT Infrastructure Services', category: 'IT Infrastructure', description: 'IT infrastructure setup and management' },
  { id: 'WN-027', name: 'Digital Transformation Services', category: 'Digital Transformation', description: 'Digital transformation consulting and implementation' },
  { id: 'WN-028', name: 'Cybersecurity Services', category: 'Cybersecurity', description: 'Cybersecurity protection and consulting' },
  { id: 'WN-029', name: 'Data Analytics Services', category: 'Data Analytics', description: 'Data analytics and business intelligence' },

  // Specialized Mining Services
  { id: 'WN-030', name: 'Blasting Services', category: 'Mining', description: 'Mining blasting and demolition services' },
  { id: 'WN-031', name: 'Ore Processing', category: 'Mining', description: 'Ore processing and mineral extraction' },
  { id: 'WN-032', name: 'Mining Operations Support', category: 'Mining', description: 'Support services for mining operations' },
  { id: 'WN-033', name: 'Mining and Earthmoving Operations', category: 'Mining', description: 'Mining and earthmoving equipment operations' },

  // Facility & Support Services
  { id: 'WN-034', name: 'Facility Cleaning', category: 'Cleaning', description: 'Facility cleaning and janitorial services' },
  { id: 'WN-035', name: 'Ground Maintenance', category: 'Landscaping', description: 'Ground maintenance and landscaping' },
  { id: 'WN-036', name: 'Pest Management', category: 'Pest Control', description: 'Pest control and management services' },
  { id: 'WN-037', name: 'Security Services', category: 'Security', description: 'Security and surveillance services' },
  { id: 'WN-038', name: 'Healthcare Services', category: 'Medical', description: 'Healthcare and medical services' },
  { id: 'WN-039', name: 'Food Services', category: 'Catering', description: 'Food catering and services' },

  // Utilities & Energy
  { id: 'WN-040', name: 'Climate Control System', category: 'HVAC', description: 'HVAC and climate control systems' },
  { id: 'WN-041', name: 'Renewable Energy', category: 'Energy', description: 'Renewable energy solutions' },
  { id: 'WN-042', name: 'Water Purification', category: 'Water Treatment', description: 'Water purification and treatment systems' },
  { id: 'WN-043', name: 'Water Supply Services', category: 'Water Supply', description: 'Water supply and distribution services' },
  { id: 'WN-044', name: 'Power Generation Services', category: 'Power Generation', description: 'Power generation and electrical services' },
  { id: 'WN-045', name: 'Communication Network', category: 'Telecommunication', description: 'Telecommunication network services' },
  { id: 'WN-046', name: 'Telecommunication Services', category: 'Telecommunication', description: 'Telecommunication services and infrastructure' },

  // Testing & Quality
  { id: 'WN-047', name: 'Testing Services', category: 'Laboratory', description: 'Laboratory testing and analysis services' },
  { id: 'WN-048', name: 'Inspection Services', category: 'Quality Control', description: 'Quality inspection and testing services' },
  { id: 'WN-049', name: 'Quality Assurance Services', category: 'Quality Assurance', description: 'Quality assurance and control services' },
  { id: 'WN-050', name: 'Welding Services', category: 'Welding', description: 'Welding and fabrication services' },
  { id: 'WN-051', name: 'Industrial Painting', category: 'Painting', description: 'Industrial painting and coating services' },

  // Business & Professional Services
  { id: 'WN-052', name: 'R&D Services', category: 'Research', description: 'Research and development services' },
  { id: 'WN-053', name: 'Employee Training', category: 'Training', description: 'Employee training and development programs' },
  { id: 'WN-054', name: 'Training and Development Programs', category: 'Training and Development', description: 'Professional training and development' },
  { id: 'WN-055', name: 'Consultancy Services', category: 'Consultancy', description: 'Business consulting services' },
  { id: 'WN-056', name: 'Technical Studies', category: 'Study', description: 'Technical studies and analysis' },
  { id: 'WN-057', name: 'Feasibility Study Services', category: 'Feasibility Study', description: 'Feasibility studies and analysis' },
  { id: 'WN-058', name: 'Project Management Services', category: 'Project Management', description: 'Project management and coordination' },
  { id: 'WN-059', name: 'Infrastructure Development Projects', category: 'Infrastructure Development', description: 'Large-scale infrastructure projects' },

  // Manufacturing & Industrial
  { id: 'WN-060', name: 'Manufacturing and Production Services', category: 'Manufacturing Services', description: 'Manufacturing and production services' },
  { id: 'WN-061', name: 'Oil and Gas Services', category: 'Oil and Gas Services', description: 'Oil and gas industry services' },
  { id: 'WN-062', name: 'Chemical Processing Services', category: 'Chemical Processing', description: 'Chemical processing and treatment' },
  { id: 'WN-063', name: 'Food and Beverage Services', category: 'Food and Beverage', description: 'Food and beverage services' },
  { id: 'WN-064', name: 'Pharmaceutical Services', category: 'Pharmaceutical Services', description: 'Pharmaceutical services and support' },

  // Support & Maintenance
  { id: 'WN-065', name: 'Maintenance and Support Services', category: 'Maintenance Services', description: 'Equipment maintenance and support' },
  { id: 'WN-066', name: 'Human Resources Services', category: 'Human Resources', description: 'Human resources consulting and services' },
  { id: 'WN-067', name: 'Financial Management Services', category: 'Financial Management', description: 'Financial management and consulting' },
  { id: 'WN-068', name: 'Legal Consulting Services', category: 'Legal Services', description: 'Legal consulting and advisory services' },
  { id: 'WN-069', name: 'Procurement and Sourcing Services', category: 'Procurement Services', description: 'Procurement and sourcing services' },

  // Specialized Services
  { id: 'WN-070', name: 'Education and Training Programs', category: 'Education and Training', description: 'Educational programs and training' },
  { id: 'WN-071', name: 'Research and Development Services', category: 'Research and Development', description: 'R&D services and innovation support' },
  { id: 'WN-072', name: 'Healthcare and Medical Services', category: 'Healthcare Services', description: 'Healthcare and medical support services' },
  { id: 'WN-073', name: 'Renewable Energy Projects', category: 'Renewable Energy', description: 'Renewable energy project development' },
  { id: 'WN-074', name: 'General Construction Services', category: 'Construction Work', description: 'General construction and building services' },
  { id: 'WN-075', name: 'Medium Term Service Contracts', category: 'Medium Term Services', description: 'Medium-term service contracts and agreements' },
  { id: 'WN-076', name: 'Health and Safety Services', category: 'Health and Safety', description: 'Health and safety consulting and services' }
]

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
export interface CatalogueItem {
  id: string
  category: string
  fileType: string
  fileName: string
  uploadDate: string
  status: 'approved' | 'pending' | 'rejected'
  uploaderName: string
  approverName?: string
  approvedDate?: string | number
  description?: string
  version?: string
}

export enum Category {
  PRICING_CATALOGUE = 'Pricing Catalogue',
  SCOPE_OF_WORKS = 'Scope of Works'
}

export const CONTRACT_TEMPLATES: CatalogueItem[] = [
  {
    id: 'CP003-001',
    category: Category.PRICING_CATALOGUE,
    fileType: 'Heavy Equipment Rental',
    fileName: 'CP-003_Cost_Structure_Mining_Heavy_Equipment',
    uploadDate: '2024-02-20T10:00:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'John Smith',
    approvedDate: '2024-02-21T14:30:00Z',
    version: 'v1.0',
  },
  {
    id: 'CP003-001',
    category: Category.PRICING_CATALOGUE,
    fileType: 'Heavy Equipment Rental',
    fileName: 'CP-003_Cost_Structure_Mining_Heavy_Equipment',
    uploadDate: '2024-02-21T10:00:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'John Smith',
    approvedDate: '2024-02-22T14:30:00Z',
    version: 'v1.1',
  },
  {
    id: 'CP003-001',
    category: Category.PRICING_CATALOGUE,
    fileType: 'Heavy Equipment Rental',
    fileName: 'CP-003_Cost_Structure_Mining_Heavy_Equipment',
    uploadDate: '2024-02-22T10:00:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'John Smith',
    approvedDate: '2024-02-23T14:30:00Z',
    version: 'v1.2',
  },
  {
    id: 'CP003-001',
    category: Category.PRICING_CATALOGUE,
    fileType: 'Heavy Equipment Rental',
    fileName: 'CP-003_Cost_Structure_Mining_Heavy_Equipment',
    uploadDate: '2024-02-23T10:00:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'John Smith',
    approvedDate: '2024-02-24T14:30:00Z',
    version: 'v1.3',
  },
  {
    id: 'CP003-002',
    category: Category.PRICING_CATALOGUE,
    fileType: 'Infrastructure Development',
    fileName: 'CP-003_Cost_Structure_Construction_Infrastructure',
    uploadDate: '2024-02-22T14:30:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Sarah Johnson',
    approvedDate: '2024-02-23T09:15:00Z'
  },
  {
    id: 'CP003-002-DUP', // Note: Corrected duplicate ID to be unique
    category: Category.PRICING_CATALOGUE,
    fileType: 'Infrastructure Development',
    fileName: 'CP-003_Cost_Structure_Construction_Infrastructure_v2',
    uploadDate: '2024-02-22T14:30:00Z',
    status: 'rejected', // Varied status for the duplicate
    uploaderName: 'Admin CMT',
    approverName: 'Sarah Johnson',
    approvedDate: '2024-02-23T10:00:00Z'
  },
  {
    id: 'CP003-003',
    category: Category.PRICING_CATALOGUE,
    fileType: 'Material Logistics',
    fileName: 'CP-003_Cost_Structure_Transportation_Logistics',
    uploadDate: '2024-02-18T09:15:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Michael Chen',
    approvedDate: '2024-02-19T11:00:00Z'
  },
  {
    id: 'CP003-004',
    category: Category.PRICING_CATALOGUE,
    fileType: 'Consultancy Services',
    fileName: 'CP-003_Cost_Structure_Engineering_Consultancy',
    uploadDate: '2024-02-25T11:45:00Z',
    status: 'pending',
    uploaderName: 'Admin CMT'
  },
  {
    id: 'CP003-005',
    category: Category.PRICING_CATALOGUE,
    fileType: 'Drilling Equipment Rental',
    fileName: 'CP-003_Cost_Structure_Mining_Drilling_Equipment',
    uploadDate: '2024-01-15T08:30:00Z',
    status: 'rejected',
    uploaderName: 'Admin CMT',
    approverName: 'Robert Taylor',
    approvedDate: '2024-01-16T14:00:00Z'
  },
  {
    id: 'CP003-006',
    category: Category.PRICING_CATALOGUE,
    fileType: 'Road Development',
    fileName: 'CP-003_Cost_Structure_Construction_Road_Development',
    uploadDate: '2024-01-18T11:20:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Amanda Lee',
    approvedDate: '2024-01-19T09:30:00Z'
  },
  {
    id: 'CP003-007',
    category: Category.PRICING_CATALOGUE,
    fileType: 'Waste Management',
    fileName: 'CP-003_Cost_Structure_Environmental_Waste_Management',
    uploadDate: '2024-01-22T13:45:00Z',
    status: 'pending',
    uploaderName: 'Admin CMT'
  },
  {
    id: 'CP003-008',
    category: Category.PRICING_CATALOGUE,
    fileType: 'Safety Equipment Supply',
    fileName: 'CP-003_Cost_Structure_Safety_Equipment',
    uploadDate: '2024-01-25T09:00:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Chris Martin',
    approvedDate: '2024-01-26T11:30:00Z'
  },
  {
    id: 'CP003-009',
    category: Category.PRICING_CATALOGUE,
    fileType: 'Software Implementation',
    fileName: 'CP-003_Cost_Structure_IT_Software',
    uploadDate: '2024-01-28T14:15:00Z',
    status: 'pending',
    uploaderName: 'Admin CMT'
  },
  {
    id: 'CP003-010',
    category: Category.PRICING_CATALOGUE,
    fileType: 'Blasting Services',
    fileName: 'CP-003_Cost_Structure_Mining_Blasting',
    uploadDate: '2024-02-01T10:30:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Eric Kim',
    approvedDate: '2024-02-02T13:00:00Z'
  },
  {
    id: 'CP003-011',
    category: Category.PRICING_CATALOGUE,
    fileType: 'Building Construction',
    fileName: 'CP-003_Cost_Structure_Construction_Building',
    uploadDate: '2024-02-04T12:00:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Lucas Anderson',
    approvedDate: '2024-02-05T09:45:00Z'
  },
  {
    id: 'CP003-012',
    category: Category.PRICING_CATALOGUE,
    fileType: 'Power Installation',
    fileName: 'CP-003_Cost_Structure_Electrical_Power',
    uploadDate: '2024-02-07T15:30:00Z',
    status: 'pending',
    uploaderName: 'Admin CMT'
  },
  {
    id: 'CP003-013',
    category: Category.PRICING_CATALOGUE,
    fileType: 'Equipment Maintenance',
    fileName: 'CP-003_Cost_Structure_Mechanical_Maintenance',
    uploadDate: '2024-02-10T08:45:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Sophia Turner',
    approvedDate: '2024-02-11T11:00:00Z'
  },
  {
    id: 'CP003-014',
    category: Category.PRICING_CATALOGUE,
    fileType: 'Geotechnical Survey',
    fileName: 'CP-003_Cost_Structure_Survey_Geotechnical',
    uploadDate: '2024-02-13T11:10:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'George Hill',
    approvedDate: '2024-02-14T09:30:00Z'
  },
  {
    id: 'CP003-015',
    category: Category.PRICING_CATALOGUE,
    fileType: 'Supply Chain Management',
    fileName: 'CP-003_Cost_Structure_Logistics_Supply_Chain',
    uploadDate: '2024-02-16T13:25:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Grace Thompson',
    approvedDate: '2024-02-17T10:45:00Z'
  },
  {
    id: 'CP003-016',
    category: Category.PRICING_CATALOGUE,
    fileType: 'Employee Training',
    fileName: 'CP-003_Cost_Structure_Training_Employee',
    uploadDate: '2024-02-19T09:40:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Hannah Baker',
    approvedDate: '2024-02-20T14:20:00Z'
  },
  {
    id: 'CP003-017',
    category: Category.PRICING_CATALOGUE,
    fileType: 'Healthcare Services',
    fileName: 'CP-003_Cost_Structure_Medical_Healthcare',
    uploadDate: '2024-02-22T16:05:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Ivan Petrov',
    approvedDate: '2024-02-23T10:15:00Z'
  },
  {
    id: 'CP003-018',
    category: Category.PRICING_CATALOGUE,
    fileType: 'Food Services',
    fileName: 'CP-003_Cost_Structure_Catering_Food',
    uploadDate: '2024-02-25T10:20:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Julia Roberts',
    approvedDate: '2024-02-26T12:00:00Z'
  },
  {
    id: 'CP003-019',
    category: Category.PRICING_CATALOGUE,
    fileType: 'Security Services',
    fileName: 'CP-003_Cost_Structure_Security_Services',
    uploadDate: '2024-02-28T12:50:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Kevin Hart',
    approvedDate: '2024-02-29T15:30:00Z'
  },
  {
    id: 'CP003-020',
    category: Category.PRICING_CATALOGUE,
    fileType: 'Facility Cleaning',
    fileName: 'CP-003_Cost_Structure_Cleaning_Facility',
    uploadDate: '2024-03-02T14:15:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Laura Croft',
    approvedDate: '2024-03-03T16:45:00Z'
  },
  {
    id: 'CP003-021',
    category: Category.PRICING_CATALOGUE,
    fileType: 'Ore Processing',
    fileName: 'CP-003_Cost_Structure_Mining_Processing',
    uploadDate: '2024-03-05T11:35:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Mike Ross',
    approvedDate: '2024-03-06T09:20:00Z'
  },
  {
    id: 'CP003-022',
    category: Category.PRICING_CATALOGUE,
    fileType: 'Foundation Work',
    fileName: 'CP-003_Cost_Structure_Construction_Foundation',
    uploadDate: '2024-03-08T15:00:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Nina Williams',
    approvedDate: '2024-03-09T11:55:00Z'
  },
  {
    id: 'CP003-023',
    category: Category.PRICING_CATALOGUE,
    fileType: 'Water System Installation',
    fileName: 'CP-003_Cost_Structure_Plumbing_Water',
    uploadDate: '2024-03-11T09:25:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Oscar Isaac',
    approvedDate: '2024-03-12T13:10:00Z'
  },
  {
    id: 'CP003-024',
    category: Category.PRICING_CATALOGUE,
    fileType: 'Climate Control System',
    fileName: 'CP-003_Cost_Structure_HVAC_Climate',
    uploadDate: '2024-03-14T13:40:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Paul Rudd',
    approvedDate: '2024-03-15T10:00:00Z'
  },
  {
    id: 'CP003-025',
    category: Category.PRICING_CATALOGUE,
    fileType: 'Fire Protection System',
    fileName: 'CP-003_Cost_Structure_Fire_Safety',
    uploadDate: '2024-03-17T10:55:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Quinn Fabray',
    approvedDate: '2024-03-18T14:40:00Z'
  },
  {
    id: 'CP003-026',
    category: Category.PRICING_CATALOGUE,
    fileType: 'Communication Network',
    fileName: 'CP-003_Cost_Structure_Telecom_Network',
    uploadDate: '2024-03-20T16:10:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Rachel Green',
    approvedDate: '2024-03-21T09:15:00Z'
  },
  {
    id: 'CP003-027',
    category: Category.PRICING_CATALOGUE,
    fileType: 'Testing Services',
    fileName: 'CP-003_Cost_Structure_Lab_Testing',
    uploadDate: '2024-03-23T08:30:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Steve Rogers',
    approvedDate: '2024-03-24T11:00:00Z'
  },
  {
    id: 'CP003-028',
    category: Category.PRICING_CATALOGUE,
    fileType: 'R&D Services',
    fileName: 'CP-003_Cost_Structure_Research_RD',
    uploadDate: '2024-03-26T14:45:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Tony Stark',
    approvedDate: '2024-03-27T16:30:00Z'
  },
  {
    id: 'CP003-029',
    category: Category.PRICING_CATALOGUE,
    fileType: 'Inspection Services',
    fileName: 'CP-003_Cost_Structure_QC_Inspection',
    uploadDate: '2024-03-29T11:00:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Ursula Buffay',
    approvedDate: '2024-03-30T13:45:00Z'
  },
  {
    id: 'CP003-030',
    category: Category.PRICING_CATALOGUE,
    fileType: 'Welding Services',
    fileName: 'CP-003_Cost_Structure_Welding_Services',
    uploadDate: '2024-04-01T12:15:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Victor Stone',
    approvedDate: '2024-04-02T15:00:00Z'
  },
  {
    id: 'CP003-031',
    category: Category.PRICING_CATALOGUE,
    fileType: 'Industrial Painting',
    fileName: 'CP-003_Cost_Structure_Painting_Industrial',
    uploadDate: '2024-04-04T15:30:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Wanda Maximoff',
    approvedDate: '2024-04-05T09:30:00Z'
  },
  {
    id: 'CP003-032',
    category: Category.PRICING_CATALOGUE,
    fileType: 'Ground Maintenance',
    fileName: 'CP-003_Cost_Structure_Landscaping_Ground',
    uploadDate: '2024-04-07T09:45:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Xander Cage',
    approvedDate: '2024-04-08T11:20:00Z'
  },
  {
    id: 'CP003-033',
    category: Category.PRICING_CATALOGUE,
    fileType: 'Pest Management',
    fileName: 'CP-003_Cost_Structure_Pest_Control',
    uploadDate: '2024-04-10T13:00:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Yara Greyjoy',
    approvedDate: '2024-04-11T14:45:00Z'
  },
  {
    id: 'CP003-034',
    category: Category.PRICING_CATALOGUE,
    fileType: 'Recycling Services',
    fileName: 'CP-003_Cost_Structure_Waste_Recycling',
    uploadDate: '2024-04-13T16:20:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Zoe Saldana',
    approvedDate: '2024-04-14T09:10:00Z'
  },
  {
    id: 'CP003-035',
    category: Category.PRICING_CATALOGUE,
    fileType: 'Renewable Energy',
    fileName: 'CP-003_Cost_Structure_Energy_Renewable',
    uploadDate: '2024-04-16T10:35:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Aaron Paul',
    approvedDate: '2024-04-17T13:00:00Z'
  },
  {
    id: 'CP003-036',
    category: Category.PRICING_CATALOGUE,
    fileType: 'Water Purification',
    fileName: 'CP-003_Cost_Structure_Water_Treatment',
    uploadDate: '2024-04-19T14:50:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Nancy Liu',
    approvedDate: '2024-04-20T10:30:00Z'
  },
  {
    id: 'CP003-037',
    category: Category.PRICING_CATALOGUE,
    fileType: 'Fuel Supply',
    fileName: 'CP-003_Cost_Structure_Fuel_Supply',
    uploadDate: '2024-04-22T08:05:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Olivia Martinez',
    approvedDate: '2024-04-23T11:20:00Z'
  },
  {
    id: 'CP003-038',
    category: Category.PRICING_CATALOGUE,
    fileType: 'Industrial Lubricants',
    fileName: 'CP-003_Cost_Structure_Lubricants_Industrial',
    uploadDate: '2024-04-25T12:25:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Paul Davis',
    approvedDate: '2024-04-26T14:45:00Z'
  },
  {
    id: 'CP003-039',
    category: Category.PRICING_CATALOGUE,
    fileType: 'Equipment Parts',
    fileName: 'CP-003_Cost_Structure_Spare_Parts',
    uploadDate: '2024-04-28T15:40:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Rachel Thompson',
    approvedDate: '2024-04-29T16:00:00Z'
  },
  {
    id: 'CP003-040',
    category: Category.PRICING_CATALOGUE,
    fileType: 'Industrial Tools',
    fileName: 'CP-003_Cost_Structure_Tools_Industrial',
    uploadDate: '2024-05-01T11:55:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Steven Clark',
    approvedDate: '2024-05-02T13:00:00Z'
  },
  {
    id: 'CP002-001',
    category: Category.SCOPE_OF_WORKS,
    fileType: 'Consultancy Services',
    fileName: 'CP-002_Reference_Scope_Consultancy',
    uploadDate: '2024-02-21T13:00:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'David Wilson',
    approvedDate: '2024-02-22T10:30:00Z'
  },
  {
    id: 'CP002-002',
    category: Category.SCOPE_OF_WORKS,
    fileType: 'Technical Studies',
    fileName: 'CP-002_Reference_Scope_Study',
    uploadDate: '2024-02-19T16:20:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Lisa Anderson',
    approvedDate: '2024-02-20T15:45:00Z'
  },
  {
    id: 'CP002-003',
    category: Category.SCOPE_OF_WORKS,
    fileType: 'Mining and Earthmoving Operations',
    fileName: 'CP-002_Reference_Scope_Mining_Earth_Work',
    uploadDate: '2024-02-24T08:45:00Z',
    status: 'pending',
    uploaderName: 'Admin CMT'
  },
  {
    id: 'CP002-004',
    category: Category.SCOPE_OF_WORKS,
    fileType: 'General Construction Services',
    fileName: 'CP-002_Reference_Scope_Construction',
    uploadDate: '2024-02-17T12:10:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Mark Johnson',
    approvedDate: '2024-02-18T09:30:00Z'
  },
  {
    id: 'CP002-005',
    category: Category.SCOPE_OF_WORKS,
    fileType: 'Medium Term Service Contracts',
    fileName: 'CP-002_Reference_Scope_Medium_Term',
    uploadDate: '2024-02-23T15:30:00Z',
    status: 'rejected',
    uploaderName: 'Admin CMT',
    approverName: 'Jennifer Brown',
    approvedDate: '2024-02-24T16:30:00Z'
  },
  {
    id: 'CP002-006',
    category: Category.SCOPE_OF_WORKS,
    fileType: 'Engineering Design Services',
    fileName: 'CP-002_Reference_Scope_Engineering_Design',
    uploadDate: '2024-01-10T11:00:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Alex Rodriguez',
    approvedDate: '2024-01-11T14:30:00Z'
  },
  {
    id: 'CP002-007',
    category: Category.SCOPE_OF_WORKS,
    fileType: 'Feasibility Study Services',
    fileName: 'CP-002_Reference_Scope_Feasibility_Study',
    uploadDate: '2024-01-12T14:30:00Z',
    status: 'pending',
    uploaderName: 'Admin CMT'
  },
  {
    id: 'CP002-008',
    category: Category.SCOPE_OF_WORKS,
    fileType: 'Environmental Impact Assessment',
    fileName: 'CP-002_Reference_Scope_Environmental_Impact',
    uploadDate: '2024-01-15T09:15:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Sandra White',
    approvedDate: '2024-01-16T10:45:00Z'
  },
  {
    id: 'CP002-009',
    category: Category.SCOPE_OF_WORKS,
    fileType: 'Health and Safety Services',
    fileName: 'CP-002_Reference_Scope_Health_Safety',
    uploadDate: '2024-01-18T16:45:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Tom Harris',
    approvedDate: '2024-01-19T11:00:00Z'
  },
  {
    id: 'CP002-010',
    category: Category.SCOPE_OF_WORKS,
    fileType: 'Quality Assurance Services',
    fileName: 'CP-002_Reference_Scope_Quality_Assurance',
    uploadDate: '2024-01-20T10:20:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Jessica Lee',
    approvedDate: '2024-01-21T14:30:00Z'
  },
  {
    id: 'CP002-011',
    category: Category.SCOPE_OF_WORKS,
    fileType: 'Project Management Services',
    fileName: 'CP-002_Reference_Scope_Project_Management',
    uploadDate: '2024-01-22T13:55:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Ryan Martinez',
    approvedDate: '2024-01-23T10:15:00Z'
  },
  {
    id: 'CP002-012',
    category: Category.SCOPE_OF_WORKS,
    fileType: 'Infrastructure Development Projects',
    fileName: 'CP-002_Reference_Scope_Infrastructure',
    uploadDate: '2024-01-25T08:40:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Daniel Craig',
    approvedDate: '2024-01-26T10:15:00Z'
  },
  {
    id: 'CP002-013',
    category: Category.SCOPE_OF_WORKS,
    fileType: 'Power Generation Services',
    fileName: 'CP-002_Reference_Scope_Power_Generation',
    uploadDate: '2024-01-28T15:10:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Emma Watson',
    approvedDate: '2024-01-29T11:45:00Z'
  },
  {
    id: 'CP002-014',
    category: Category.SCOPE_OF_WORKS,
    fileType: 'Water Supply Services',
    fileName: 'CP-002_Reference_Scope_Water_Supply',
    uploadDate: '2024-01-30T12:25:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Frank Ocean',
    approvedDate: '2024-01-31T14:30:00Z'
  },
  {
    id: 'CP002-015',
    category: Category.SCOPE_OF_WORKS,
    fileType: 'Waste Management Services',
    fileName: 'CP-002_Reference_Scope_Waste_Management',
    uploadDate: '2024-02-01T09:50:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Gary Oldman',
    approvedDate: '2024-02-02T13:00:00Z'
  },
  {
    id: 'CP002-016',
    category: Category.SCOPE_OF_WORKS,
    fileType: 'Telecommunication Services',
    fileName: 'CP-002_Reference_Scope_Telecommunication',
    uploadDate: '2024-02-03T14:15:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Helen Mirren',
    approvedDate: '2024-02-04T16:20:00Z'
  },
  {
    id: 'CP002-017',
    category: Category.SCOPE_OF_WORKS,
    fileType: 'Transportation Services',
    fileName: 'CP-002_Reference_Scope_Transportation',
    uploadDate: '2024-02-05T11:30:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Ian McKellen',
    approvedDate: '2024-02-06T09:45:00Z'
  },
  {
    id: 'CP002-018',
    category: Category.SCOPE_OF_WORKS,
    fileType: 'Logistics Services',
    fileName: 'CP-002_Reference_Scope_Logistics',
    uploadDate: '2024-02-07T16:05:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Jack Black',
    approvedDate: '2024-02-08T10:50:00Z'
  },
  {
    id: 'CP002-019',
    category: Category.SCOPE_OF_WORKS,
    fileType: 'Maintenance and Support Services',
    fileName: 'CP-002_Reference_Scope_Maintenance',
    uploadDate: '2024-02-09T10:40:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Kate Winslet',
    approvedDate: '2024-02-10T14:15:00Z'
  },
  {
    id: 'CP002-020',
    category: Category.SCOPE_OF_WORKS,
    fileType: 'Training and Development Programs',
    fileName: 'CP-002_Reference_Scope_Training',
    uploadDate: '2024-02-11T13:20:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Liam Neeson',
    approvedDate: '2024-02-12T09:30:00Z'
  },
  {
    id: 'CP002-021',
    category: Category.SCOPE_OF_WORKS,
    fileType: 'Human Resources Services',
    fileName: 'CP-002_Reference_Scope_Human_Resources',
    uploadDate: '2024-02-13T08:55:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Meryl Streep',
    approvedDate: '2024-02-14T11:45:00Z'
  },
  {
    id: 'CP002-022',
    category: Category.SCOPE_OF_WORKS,
    fileType: 'Financial Management Services',
    fileName: 'CP-002_Reference_Scope_Financial',
    uploadDate: '2024-02-15T15:30:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Natalie Portman',
    approvedDate: '2024-02-16T10:10:00Z'
  },
  {
    id: 'CP002-023',
    category: Category.SCOPE_OF_WORKS,
    fileType: 'Legal Consulting Services',
    fileName: 'CP-002_Reference_Scope_Legal',
    uploadDate: '2024-02-17T12:05:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Orlando Bloom',
    approvedDate: '2024-02-18T16:00:00Z'
  },
  {
    id: 'CP002-024',
    category: Category.SCOPE_OF_WORKS,
    fileType: 'Procurement and Sourcing Services',
    fileName: 'CP-002_Reference_Scope_Procurement',
    uploadDate: '2024-02-19T09:40:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Penelope Cruz',
    approvedDate: '2024-02-20T13:25:00Z'
  },
  {
    id: 'CP002-025',
    category: Category.SCOPE_OF_WORKS,
    fileType: 'Supply Chain Management Services',
    fileName: 'CP-002_Reference_Scope_Supply_Chain',
    uploadDate: '2024-02-21T14:15:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Quentin Tarantino',
    approvedDate: '2024-02-22T09:50:00Z'
  },
  {
    id: 'CP002-026',
    category: Category.SCOPE_OF_WORKS,
    fileType: 'Manufacturing and Production Services',
    fileName: 'CP-002_Reference_Scope_Manufacturing',
    uploadDate: '2024-02-23T11:50:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Ryan Gosling',
    approvedDate: '2024-02-24T15:30:00Z'
  },
  {
    id: 'CP002-027',
    category: Category.SCOPE_OF_WORKS,
    fileType: 'Mining Operations Support',
    fileName: 'CP-002_Reference_Scope_Mining_Operations',
    uploadDate: '2024-02-25T16:25:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Scarlett Johansson',
    approvedDate: '2024-02-26T10:00:00Z'
  },
  {
    id: 'CP002-028',
    category: Category.SCOPE_OF_WORKS,
    fileType: 'Oil and Gas Services',
    fileName: 'CP-002_Reference_Scope_Oil_Gas',
    uploadDate: '2024-02-27T10:00:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Tom Hardy',
    approvedDate: '2024-02-28T14:45:00Z'
  },
  {
    id: 'CP002-029',
    category: Category.SCOPE_OF_WORKS,
    fileType: 'Renewable Energy Projects',
    fileName: 'CP-002_Reference_Scope_Renewable_Energy',
    uploadDate: '2024-03-01T13:35:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Uma Thurman',
    approvedDate: '2024-03-02T11:20:00Z'
  },
  {
    id: 'CP002-030',
    category: Category.SCOPE_OF_WORKS,
    fileType: 'Chemical Processing Services',
    fileName: 'CP-002_Reference_Scope_Chemical_Processing',
    uploadDate: '2024-03-03T09:10:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Vin Diesel',
    approvedDate: '2024-03-04T16:00:00Z'
  },
  {
    id: 'CP002-031',
    category: Category.SCOPE_OF_WORKS,
    fileType: 'Food and Beverage Services',
    fileName: 'CP-002_Reference_Scope_Food_Beverage',
    uploadDate: '2024-03-05T15:45:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Will Smith',
    approvedDate: '2024-03-06T10:30:00Z'
  },
  {
    id: 'CP002-032',
    category: Category.SCOPE_OF_WORKS,
    fileType: 'Pharmaceutical Services',
    fileName: 'CP-002_Reference_Scope_Pharmaceutical',
    uploadDate: '2024-03-07T12:20:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Xavier Dolan',
    approvedDate: '2024-03-08T14:50:00Z'
  },
  {
    id: 'CP002-033',
    category: Category.SCOPE_OF_WORKS,
    fileType: 'Healthcare and Medical Services',
    fileName: 'CP-002_Reference_Scope_Healthcare',
    uploadDate: '2024-03-09T08:55:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Yoko Ono',
    approvedDate: '2024-03-10T11:15:00Z'
  },
  {
    id: 'CP002-034',
    category: Category.SCOPE_OF_WORKS,
    fileType: 'Education and Training Programs',
    fileName: 'CP-002_Reference_Scope_Education',
    uploadDate: '2024-03-11T14:30:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Zac Efron',
    approvedDate: '2024-03-12T16:40:00Z'
  },
  {
    id: 'CP002-035',
    category: Category.SCOPE_OF_WORKS,
    fileType: 'Research and Development Services',
    fileName: 'CP-002_Reference_Scope_Research',
    uploadDate: '2024-03-13T11:05:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Andy Samberg',
    approvedDate: '2024-03-14T09:30:00Z'
  },
  {
    id: 'CP002-036',
    category: Category.SCOPE_OF_WORKS,
    fileType: 'Technology Consulting Services',
    fileName: 'CP-002_Reference_Scope_Technology',
    uploadDate: '2024-03-15T16:40:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Ben Stiller',
    approvedDate: '2024-03-16T13:20:00Z'
  },
  {
    id: 'CP002-037',
    category: Category.SCOPE_OF_WORKS,
    fileType: 'IT Infrastructure Services',
    fileName: 'CP-002_Reference_Scope_IT_Infrastructure',
    uploadDate: '2024-03-17T10:15:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Cameron Diaz',
    approvedDate: '2024-03-18T15:10:00Z'
  },
  {
    id: 'CP002-038',
    category: Category.SCOPE_OF_WORKS,
    fileType: 'Digital Transformation Services',
    fileName: 'CP-002_Reference_Scope_Digital_Transformation',
    uploadDate: '2024-03-19T13:50:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Drew Barrymore',
    approvedDate: '2024-03-20T11:35:00Z'
  },
  {
    id: 'CP002-039',
    category: Category.SCOPE_OF_WORKS,
    fileType: 'Cybersecurity Services',
    fileName: 'CP-002_Reference_Scope_Cybersecurity',
    uploadDate: '2024-03-21T09:25:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Eddie Murphy',
    approvedDate: '2024-03-22T14:00:00Z'
  },
  {
    id: 'CP002-040',
    category: Category.SCOPE_OF_WORKS,
    fileType: 'Data Analytics Services',
    fileName: 'CP-002_Reference_Scope_Data_Analytics',
    uploadDate: '2024-03-23T15:00:00Z',
    status: 'approved',
    uploaderName: 'Admin CMT',
    approverName: 'Florence Pugh',
    approvedDate: '2024-03-24T10:45:00Z'
  }
] as const
// Library of older documents (archived)
export const WORK_PACKAGE_LIBRARY = [
  // Old CP-003 versions
  {
    id: 'CP003-001-V1',
    code: 'CP-003',
    category: 'Mining',
    fileType: 'Heavy Equipment Rental',
    fileName: 'CP-003_Cost_Structure_Mining_Heavy_Equipment_V1',
    uploadDate: '2023-12-15T10:00:00Z',
    isLatest: false
  },
  {
    id: 'CP003-001-V2',
    code: 'CP-003',
    category: 'Mining',
    fileType: 'Heavy Equipment Rental',
    fileName: 'CP-003_Cost_Structure_Mining_Heavy_Equipment_V2',
    uploadDate: '2023-11-20T14:30:00Z',
    isLatest: false
  },
  {
    id: 'CP003-002-V1',
    code: 'CP-003',
    category: 'Construction',
    fileType: 'Infrastructure Development',
    fileName: 'CP-003_Cost_Structure_Construction_Infrastructure_V1',
    uploadDate: '2024-01-10T14:30:00Z',
    isLatest: false
  },
  {
    id: 'CP003-002-V2',
    code: 'CP-003',
    category: 'Construction',
    fileType: 'Infrastructure Development',
    fileName: 'CP-003_Cost_Structure_Construction_Infrastructure_V2',
    uploadDate: '2023-12-05T09:15:00Z',
    isLatest: false
  },
  {
    id: 'CP003-003-V1',
    code: 'CP-003',
    category: 'Transportation',
    fileType: 'Material Logistics',
    fileName: 'CP-003_Cost_Structure_Transportation_Logistics_V1',
    uploadDate: '2023-11-30T11:45:00Z',
    isLatest: false
  },
  {
    id: 'CP003-004-V1',
    code: 'CP-003',
    category: 'Engineering',
    fileType: 'Consultancy Services',
    fileName: 'CP-003_Cost_Structure_Engineering_Consultancy_V1',
    uploadDate: '2023-12-10T15:20:00Z',
    isLatest: false
  },
  {
    id: 'CP003-005-V1',
    code: 'CP-003',
    category: 'Mining',
    fileType: 'Drilling Equipment Rental',
    fileName: 'CP-003_Cost_Structure_Mining_Drilling_Equipment_V1',
    uploadDate: '2023-12-01T08:30:00Z',
    isLatest: false
  },
  {
    id: 'CP003-006-V1',
    code: 'CP-003',
    category: 'Construction',
    fileType: 'Road Development',
    fileName: 'CP-003_Cost_Structure_Construction_Road_Development_V1',
    uploadDate: '2023-11-25T13:10:00Z',
    isLatest: false
  },
  {
    id: 'CP003-007-V1',
    code: 'CP-003',
    category: 'Environmental',
    fileType: 'Waste Management',
    fileName: 'CP-003_Cost_Structure_Environmental_Waste_Management_V1',
    uploadDate: '2023-12-08T10:40:00Z',
    isLatest: false
  },
  {
    id: 'CP003-008-V1',
    code: 'CP-003',
    category: 'Safety',
    fileType: 'Safety Equipment Supply',
    fileName: 'CP-003_Cost_Structure_Safety_Equipment_V1',
    uploadDate: '2023-11-15T14:55:00Z',
    isLatest: false
  },
  {
    id: 'CP003-009-V1',
    code: 'CP-003',
    category: 'IT Services',
    fileType: 'Software Implementation',
    fileName: 'CP-003_Cost_Structure_IT_Software_V1',
    uploadDate: '2023-12-20T09:25:00Z',
    isLatest: false
  },
  {
    id: 'CP003-010-V1',
    code: 'CP-003',
    category: 'Mining',
    fileType: 'Blasting Services',
    fileName: 'CP-003_Cost_Structure_Mining_Blasting_V1',
    uploadDate: '2023-11-10T16:00:00Z',
    isLatest: false
  },
  {
    id: 'CP003-011-V1',
    code: 'CP-003',
    category: 'Construction',
    fileType: 'Building Construction',
    fileName: 'CP-003_Cost_Structure_Construction_Building_V1',
    uploadDate: '2023-12-05T11:35:00Z',
    isLatest: false
  },
  {
    id: 'CP003-012-V1',
    code: 'CP-003',
    category: 'Electrical',
    fileType: 'Power Installation',
    fileName: 'CP-003_Cost_Structure_Electrical_Power_V1',
    uploadDate: '2023-11-28T13:50:00Z',
    isLatest: false
  },
  {
    id: 'CP003-013-V1',
    code: 'CP-003',
    category: 'Mechanical',
    fileType: 'Equipment Maintenance',
    fileName: 'CP-003_Cost_Structure_Mechanical_Maintenance_V1',
    uploadDate: '2023-12-12T08:15:00Z',
    isLatest: false
  },
  {
    id: 'CP003-014-V1',
    code: 'CP-003',
    category: 'Survey',
    fileType: 'Geotechnical Survey',
    fileName: 'CP-003_Cost_Structure_Survey_Geotechnical_V1',
    uploadDate: '2023-11-18T15:30:00Z',
    isLatest: false
  },
  {
    id: 'CP003-015-V1',
    code: 'CP-003',
    category: 'Logistics',
    fileType: 'Supply Chain Management',
    fileName: 'CP-003_Cost_Structure_Logistics_Supply_Chain_V1',
    uploadDate: '2023-12-03T10:05:00Z',
    isLatest: false
  },
  {
    id: 'CP003-016-V1',
    code: 'CP-003',
    category: 'Training',
    fileType: 'Employee Training',
    fileName: 'CP-003_Cost_Structure_Training_Employee_V1',
    uploadDate: '2023-11-22T14:20:00Z',
    isLatest: false
  },
  {
    id: 'CP003-017-V1',
    code: 'CP-003',
    category: 'Medical',
    fileType: 'Healthcare Services',
    fileName: 'CP-003_Cost_Structure_Medical_Healthcare_V1',
    uploadDate: '2023-12-15T09:45:00Z',
    isLatest: false
  },
  {
    id: 'CP003-018-V1',
    code: 'CP-003',
    category: 'Catering',
    fileType: 'Food Services',
    fileName: 'CP-003_Cost_Structure_Catering_Food_V1',
    uploadDate: '2023-11-08T16:10:00Z',
    isLatest: false
  },
  {
    id: 'CP003-019-V1',
    code: 'CP-003',
    category: 'Security',
    fileType: 'Security Services',
    fileName: 'CP-003_Cost_Structure_Security_Services_V1',
    uploadDate: '2023-12-01T12:25:00Z',
    isLatest: false
  },
  {
    id: 'CP003-020-V1',
    code: 'CP-003',
    category: 'Cleaning',
    fileType: 'Facility Cleaning',
    fileName: 'CP-003_Cost_Structure_Cleaning_Facility_V1',
    uploadDate: '2023-11-25T11:40:00Z',
    isLatest: false
  },
  {
    id: 'CP003-021-V1',
    code: 'CP-003',
    category: 'Mining',
    fileType: 'Ore Processing',
    fileName: 'CP-003_Cost_Structure_Mining_Processing_V1',
    uploadDate: '2023-12-08T14:55:00Z',
    isLatest: false
  },
  {
    id: 'CP003-022-V1',
    code: 'CP-003',
    category: 'Construction',
    fileType: 'Foundation Work',
    fileName: 'CP-003_Cost_Structure_Construction_Foundation_V1',
    uploadDate: '2023-11-12T09:10:00Z',
    isLatest: false
  },
  {
    id: 'CP003-023-V1',
    code: 'CP-003',
    category: 'Plumbing',
    fileType: 'Water System Installation',
    fileName: 'CP-003_Cost_Structure_Plumbing_Water_V1',
    uploadDate: '2023-12-18T15:35:00Z',
    isLatest: false
  },
  {
    id: 'CP003-024-V1',
    code: 'CP-003',
    category: 'HVAC',
    fileType: 'Climate Control System',
    fileName: 'CP-003_Cost_Structure_HVAC_Climate_V1',
    uploadDate: '2023-11-05T08:50:00Z',
    isLatest: false
  },
  {
    id: 'CP003-025-V1',
    code: 'CP-003',
    category: 'Fire Safety',
    fileType: 'Fire Protection System',
    fileName: 'CP-003_Cost_Structure_Fire_Safety_V1',
    uploadDate: '2023-12-10T13:15:00Z',
    isLatest: false
  },
  {
    id: 'CP003-026-V1',
    code: 'CP-003',
    category: 'Telecommunication',
    fileType: 'Communication Network',
    fileName: 'CP-003_Cost_Structure_Telecom_Network_V1',
    uploadDate: '2023-11-30T10:40:00Z',
    isLatest: false
  },
  {
    id: 'CP003-027-V1',
    code: 'CP-003',
    category: 'Laboratory',
    fileType: 'Testing Services',
    fileName: 'CP-003_Cost_Structure_Lab_Testing_V1',
    uploadDate: '2023-12-14T16:25:00Z',
    isLatest: false
  },
  {
    id: 'CP003-028-V1',
    code: 'CP-003',
    category: 'Research',
    fileType: 'R&D Services',
    fileName: 'CP-003_Cost_Structure_Research_RD_V1',
    uploadDate: '2023-11-20T12:00:00Z',
    isLatest: false
  },
  {
    id: 'CP003-029-V1',
    code: 'CP-003',
    category: 'Quality Control',
    fileType: 'Inspection Services',
    fileName: 'CP-003_Cost_Structure_QC_Inspection_V1',
    uploadDate: '2023-12-05T14:30:00Z',
    isLatest: false
  },
  {
    id: 'CP003-030-V1',
    code: 'CP-003',
    category: 'Welding',
    fileType: 'Welding Services',
    fileName: 'CP-003_Cost_Structure_Welding_Services_V1',
    uploadDate: '2023-11-15T09:45:00Z',
    isLatest: false
  },
  {
    id: 'CP003-031-V1',
    code: 'CP-003',
    category: 'Painting',
    fileType: 'Industrial Painting',
    fileName: 'CP-003_Cost_Structure_Painting_Industrial_V1',
    uploadDate: '2023-12-12T11:10:00Z',
    isLatest: false
  },
  {
    id: 'CP003-032-V1',
    code: 'CP-003',
    category: 'Landscaping',
    fileType: 'Ground Maintenance',
    fileName: 'CP-003_Cost_Structure_Landscaping_Ground_V1',
    uploadDate: '2023-11-08T15:55:00Z',
    isLatest: false
  },
  {
    id: 'CP003-033-V1',
    code: 'CP-003',
    category: 'Pest Control',
    fileType: 'Pest Management',
    fileName: 'CP-003_Cost_Structure_Pest_Control_V1',
    uploadDate: '2023-12-18T08:20:00Z',
    isLatest: false
  },
  {
    id: 'CP003-034-V1',
    code: 'CP-003',
    category: 'Waste Management',
    fileType: 'Recycling Services',
    fileName: 'CP-003_Cost_Structure_Waste_Recycling_V1',
    uploadDate: '2023-11-25T13:35:00Z',
    isLatest: false
  },
  {
    id: 'CP003-035-V1',
    code: 'CP-003',
    category: 'Energy',
    fileType: 'Renewable Energy',
    fileName: 'CP-003_Cost_Structure_Energy_Renewable_V1',
    uploadDate: '2023-12-08T10:50:00Z',
    isLatest: false
  },
  {
    id: 'CP003-036-V1',
    code: 'CP-003',
    category: 'Water Treatment',
    fileType: 'Water Purification',
    fileName: 'CP-003_Cost_Structure_Water_Treatment_V1',
    uploadDate: '2023-11-12T16:15:00Z',
    isLatest: false
  },
  {
    id: 'CP003-037-V1',
    code: 'CP-003',
    category: 'Fuel',
    fileType: 'Fuel Supply',
    fileName: 'CP-003_Cost_Structure_Fuel_Supply_V1',
    uploadDate: '2023-12-15T12:40:00Z',
    isLatest: false
  },
  {
    id: 'CP003-038-V1',
    code: 'CP-003',
    category: 'Lubricants',
    fileType: 'Industrial Lubricants',
    fileName: 'CP-003_Cost_Structure_Lubricants_Industrial_V1',
    uploadDate: '2023-11-20T09:05:00Z',
    isLatest: false
  },
  {
    id: 'CP003-039-V1',
    code: 'CP-003',
    category: 'Spare Parts',
    fileType: 'Equipment Parts',
    fileName: 'CP-003_Cost_Structure_Spare_Parts_V1',
    uploadDate: '2023-12-10T14:20:00Z',
    isLatest: false
  },
  {
    id: 'CP003-040-V1',
    code: 'CP-003',
    category: 'Tools',
    fileType: 'Industrial Tools',
    fileName: 'CP-003_Cost_Structure_Tools_Industrial_V1',
    uploadDate: '2023-11-05T11:45:00Z',
    isLatest: false
  },
  // Old CP-002 versions
  {
    id: 'CP002-001-V1',
    code: 'CP-002',
    category: 'Consultancy',
    fileName: 'CP-002_Reference_Scope_Consultancy_V1',
    uploadDate: '2023-11-20T13:00:00Z',
    isLatest: false
  },
  {
    id: 'CP002-001-V2',
    code: 'CP-002',
    category: 'Consultancy',
    fileName: 'CP-002_Reference_Scope_Consultancy_V2',
    uploadDate: '2023-10-15T09:30:00Z',
    isLatest: false
  },
  {
    id: 'CP002-002-V1',
    code: 'CP-002',
    category: 'Study',
    fileName: 'CP-002_Reference_Scope_Study_V1',
    uploadDate: '2024-01-05T16:20:00Z',
    isLatest: false
  },
  {
    id: 'CP002-002-V2',
    code: 'CP-002',
    category: 'Study',
    fileName: 'CP-002_Reference_Scope_Study_V2',
    uploadDate: '2023-11-28T11:45:00Z',
    isLatest: false
  },
  {
    id: 'CP002-003-V1',
    code: 'CP-002',
    category: 'Mining and Earth Work',
    fileName: 'CP-002_Reference_Scope_Mining_Earth_Work_V1',
    uploadDate: '2023-12-10T14:10:00Z',
    isLatest: false
  },
  {
    id: 'CP002-004-V1',
    code: 'CP-002',
    category: 'Construction Work',
    fileName: 'CP-002_Reference_Scope_Construction_V1',
    uploadDate: '2023-10-12T12:10:00Z',
    isLatest: false
  },
  {
    id: 'CP002-004-V2',
    code: 'CP-002',
    category: 'Construction Work',
    fileName: 'CP-002_Reference_Scope_Construction_V2',
    uploadDate: '2023-11-18T15:35:00Z',
    isLatest: false
  },
  {
    id: 'CP002-005-V1',
    code: 'CP-002',
    category: 'Medium Term Services',
    fileName: 'CP-002_Reference_Scope_Medium_Term_V1',
    uploadDate: '2023-12-01T10:25:00Z',
    isLatest: false
  },
  {
    id: 'CP002-006-V1',
    code: 'CP-002',
    category: 'Engineering Design',
    fileName: 'CP-002_Reference_Scope_Engineering_Design_V1',
    uploadDate: '2023-11-22T13:50:00Z',
    isLatest: false
  },
  {
    id: 'CP002-007-V1',
    code: 'CP-002',
    category: 'Feasibility Study',
    fileName: 'CP-002_Reference_Scope_Feasibility_Study_V1',
    uploadDate: '2023-12-15T08:15:00Z',
    isLatest: false
  },
  {
    id: 'CP002-008-V1',
    code: 'CP-002',
    category: 'Environmental Impact',
    fileName: 'CP-002_Reference_Scope_Environmental_Impact_V1',
    uploadDate: '2023-11-08T16:40:00Z',
    isLatest: false
  },
  {
    id: 'CP002-009-V1',
    code: 'CP-002',
    category: 'Health and Safety',
    fileName: 'CP-002_Reference_Scope_Health_Safety_V1',
    uploadDate: '2023-12-05T11:05:00Z',
    isLatest: false
  },
  {
    id: 'CP002-010-V1',
    code: 'CP-002',
    category: 'Quality Assurance',
    fileName: 'CP-002_Reference_Scope_Quality_Assurance_V1',
    uploadDate: '2023-11-30T14:30:00Z',
    isLatest: false
  },
  {
    id: 'CP002-011-V1',
    code: 'CP-002',
    category: 'Project Management',
    fileName: 'CP-002_Reference_Scope_Project_Management_V1',
    uploadDate: '2023-12-12T09:55:00Z',
    isLatest: false
  },
  {
    id: 'CP002-012-V1',
    code: 'CP-002',
    category: 'Infrastructure Development',
    fileName: 'CP-002_Reference_Scope_Infrastructure_V1',
    uploadDate: '2023-11-15T12:20:00Z',
    isLatest: false
  },
  {
    id: 'CP002-013-V1',
    code: 'CP-002',
    category: 'Power Generation',
    fileName: 'CP-002_Reference_Scope_Power_Generation_V1',
    uploadDate: '2023-12-18T15:45:00Z',
    isLatest: false
  },
  {
    id: 'CP002-014-V1',
    code: 'CP-002',
    category: 'Water Supply',
    fileName: 'CP-002_Reference_Scope_Water_Supply_V1',
    uploadDate: '2023-11-25T10:00:00Z',
    isLatest: false
  },
  {
    id: 'CP002-015-V1',
    code: 'CP-002',
    category: 'Waste Management',
    fileName: 'CP-002_Reference_Scope_Waste_Management_V1',
    uploadDate: '2023-12-08T13:35:00Z',
    isLatest: false
  },
  {
    id: 'CP002-016-V1',
    code: 'CP-002',
    category: 'Telecommunication',
    fileName: 'CP-002_Reference_Scope_Telecommunication_V1',
    uploadDate: '2023-11-10T16:10:00Z',
    isLatest: false
  },
  {
    id: 'CP002-017-V1',
    code: 'CP-002',
    category: 'Transportation',
    fileName: 'CP-002_Reference_Scope_Transportation_V1',
    uploadDate: '2023-12-20T08:25:00Z',
    isLatest: false
  },
  {
    id: 'CP002-018-V1',
    code: 'CP-002',
    category: 'Logistics',
    fileName: 'CP-002_Reference_Scope_Logistics_V1',
    uploadDate: '2023-11-28T14:50:00Z',
    isLatest: false
  },
  {
    id: 'CP002-019-V1',
    code: 'CP-002',
    category: 'Maintenance Services',
    fileName: 'CP-002_Reference_Scope_Maintenance_V1',
    uploadDate: '2023-12-03T09:15:00Z',
    isLatest: false
  },
  {
    id: 'CP002-020-V1',
    code: 'CP-002',
    category: 'Training and Development',
    fileName: 'CP-002_Reference_Scope_Training_V1',
    uploadDate: '2023-11-15T15:30:00Z',
    isLatest: false
  },
  {
    id: 'CP002-021-V1',
    code: 'CP-002',
    category: 'Human Resources',
    fileName: 'CP-002_Reference_Scope_Human_Resources_V1',
    uploadDate: '2023-12-10T12:45:00Z',
    isLatest: false
  },
  {
    id: 'CP002-022-V1',
    code: 'CP-002',
    category: 'Financial Management',
    fileName: 'CP-002_Reference_Scope_Financial_V1',
    uploadDate: '2023-11-05T13:00:00Z',
    isLatest: false
  },
  {
    id: 'CP002-023-V1',
    code: 'CP-002',
    category: 'Legal Services',
    fileName: 'CP-002_Reference_Scope_Legal_V1',
    uploadDate: '2023-12-15T10:20:00Z',
    isLatest: false
  },
  {
    id: 'CP002-024-V1',
    code: 'CP-002',
    category: 'Procurement Services',
    fileName: 'CP-002_Reference_Scope_Procurement_V1',
    uploadDate: '2023-11-20T14:35:00Z',
    isLatest: false
  },
  {
    id: 'CP002-025-V1',
    code: 'CP-002',
    category: 'Supply Chain Management',
    fileName: 'CP-002_Reference_Scope_Supply_Chain_V1',
    uploadDate: '2023-12-05T08:50:00Z',
    isLatest: false
  },
  {
    id: 'CP002-026-V1',
    code: 'CP-002',
    category: 'Manufacturing Services',
    fileName: 'CP-002_Reference_Scope_Manufacturing_V1',
    uploadDate: '2023-11-25T15:05:00Z',
    isLatest: false
  },
  {
    id: 'CP002-027-V1',
    code: 'CP-002',
    category: 'Mining Operations',
    fileName: 'CP-002_Reference_Scope_Mining_Operations_V1',
    uploadDate: '2023-12-12T11:30:00Z',
    isLatest: false
  },
  {
    id: 'CP002-028-V1',
    code: 'CP-002',
    category: 'Oil and Gas Services',
    fileName: 'CP-002_Reference_Scope_Oil_Gas_V1',
    uploadDate: '2023-11-18T13:45:00Z',
    isLatest: false
  },
  {
    id: 'CP002-029-V1',
    code: 'CP-002',
    category: 'Renewable Energy',
    fileName: 'CP-002_Reference_Scope_Renewable_Energy_V1',
    uploadDate: '2023-12-20T09:00:00Z',
    isLatest: false
  },
  {
    id: 'CP002-030-V1',
    code: 'CP-002',
    category: 'Chemical Processing',
    fileName: 'CP-002_Reference_Scope_Chemical_Processing_V1',
    uploadDate: '2023-11-08T16:15:00Z',
    isLatest: false
  },
  {
    id: 'CP002-031-V1',
    code: 'CP-002',
    category: 'Food and Beverage',
    fileName: 'CP-002_Reference_Scope_Food_Beverage_V1',
    uploadDate: '2023-12-15T12:40:00Z',
    isLatest: false
  },
  {
    id: 'CP002-032-V1',
    code: 'CP-002',
    category: 'Pharmaceutical Services',
    fileName: 'CP-002_Reference_Scope_Pharmaceutical_V1',
    uploadDate: '2023-11-25T10:55:00Z',
    isLatest: false
  },
  {
    id: 'CP002-033-V1',
    code: 'CP-002',
    category: 'Healthcare Services',
    fileName: 'CP-002_Reference_Scope_Healthcare_V1',
    uploadDate: '2023-12-05T14:10:00Z',
    isLatest: false
  },
  {
    id: 'CP002-034-V1',
    code: 'CP-002',
    category: 'Education and Training',
    fileName: 'CP-002_Reference_Scope_Education_V1',
    uploadDate: '2023-11-30T09:25:00Z',
    isLatest: false
  },
  {
    id: 'CP002-035-V1',
    code: 'CP-002',
    category: 'Research and Development',
    fileName: 'CP-002_Reference_Scope_Research_V1',
    uploadDate: '2023-12-10T15:40:00Z',
    isLatest: false
  },
  {
    id: 'CP002-036-V1',
    code: 'CP-002',
    category: 'Technology Services',
    fileName: 'CP-002_Reference_Scope_Technology_V1',
    uploadDate: '2023-11-12T08:05:00Z',
    isLatest: false
  },
  {
    id: 'CP002-037-V1',
    code: 'CP-002',
    category: 'IT Infrastructure',
    fileName: 'CP-002_Reference_Scope_IT_Infrastructure_V1',
    uploadDate: '2023-12-18T12:30:00Z',
    isLatest: false
  },
  {
    id: 'CP002-038-V1',
    code: 'CP-002',
    category: 'Digital Transformation',
    fileName: 'CP-002_Reference_Scope_Digital_Transformation_V1',
    uploadDate: '2023-11-22T14:45:00Z',
    isLatest: false
  },
  {
    id: 'CP002-039-V1',
    code: 'CP-002',
    category: 'Cybersecurity',
    fileName: 'CP-002_Reference_Scope_Cybersecurity_V1',
    uploadDate: '2023-12-08T11:20:00Z',
    isLatest: false
  },
  {
    id: 'CP002-040-V1',
    code: 'CP-002',
    category: 'Data Analytics',
    fileName: 'CP-002_Reference_Scope_Data_Analytics_V1',
    uploadDate: '2023-11-15T16:35:00Z',
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

  // Force refresh if needed (for testing)
  if (shouldRefreshSampleData()) {
    console.log('Force refreshing sample data with link documents...')
    return refreshDocumentsFromSample()
  }

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
    fileName: 'contract_mining_services',
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
    fileName: 'safety_procedure_heavy_equipment',
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
    linkUrl: 'https://example.com/monthly-compliance-report',
    description: 'Monthly compliance report for environmental regulations',
    category: 'Compliance Report',
    area: 'Bahodopi',
    workspace: 'planning',
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
    fileName: 'meeting_minutes_project_review',
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
    fileName: 'procurement_request_equipment',
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
    fileName: 'technical_specification_machinery',
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
    fileName: 'administration_policy_2024',
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
    fileName: 'work_order_construction',
    description: 'Construction work order for facility expansion',
    category: Category.SCOPE_OF_WORKS,
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
    fileName: 'deviation_form_material',
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
  },
  {
    id: 'DOC-011',
    linkUrl: 'https://docs.google.com/document/d/abc123-xyz789',
    description: 'Technical specifications for mining machinery installation',
    category: 'Technical Specification',
    area: 'Sorowako',
    workspace: 'planning',
    uploadDate: '2024-02-28T16:30:00Z',
    status: 'pending_review',
    metadata: {
      specificationNumber: 'TS-2024-011',
      equipmentType: 'Mining Equipment',
      version: '3.0',
      issueDate: '2024-02-28',
      technicalOwner: 'Engineering Department'
    }
  },
  {
    id: 'DOC-012',
    linkUrl: 'https://company-portal.com/policies/hr-policy-2024',
    description: 'Updated HR policies and procedures for 2024',
    category: 'Administration Document',
    area: 'Morowali',
    workspace: 'planning',
    uploadDate: '2024-03-01T10:15:00Z',
    status: 'approved',
    reviewedBy: 'HR Director',
    reviewedDate: '2024-03-02T09:00:00Z',
    metadata: {
      documentType: 'Policy',
      effectiveDate: '2024-03-01',
      department: 'Human Resources',
      approvedBy: 'HR Director',
      reviewFrequency: 'Annually'
    }
  },
  {
    id: 'DOC-013',
    linkUrl: 'https://project-management.com/timeline/phase-3',
    description: 'Project timeline and milestones for construction phase',
    category: 'Minutes of Meeting',
    area: 'Bahodopi',
    workspace: 'planning',
    uploadDate: '2024-03-05T14:45:00Z',
    status: 'pending_review',
    metadata: {
      meetingDate: '2024-03-05',
      meetingType: 'Project Planning',
      attendees: 15,
      facilitator: 'Sarah Chen - Project Manager',
      location: 'Project Management Office'
    }
  },
  {
    id: 'DOC-014',
    linkUrl: 'https://external-contractor.com/safety-protocols',
    description: 'External contractor safety protocols and procedures',
    category: 'Safety Procedures',
    area: 'Sorowako',
    workspace: 'planning',
    uploadDate: '2024-03-10T11:20:00Z',
    status: 'approved',
    reviewedBy: 'Safety Manager',
    reviewedDate: '2024-03-11T08:30:00Z',
    metadata: {
      procedureNumber: 'SP-2024-014',
      procedureType: 'External Contractor Protocol',
      riskLevel: 'Medium Risk',
      effectiveDate: '2024-03-10',
      reviewDate: '2024-09-10'
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

// Helper function to clear localStorage and load fresh sample data
export const refreshDocumentsFromSample = (): Document[] => {
  if (typeof window === 'undefined') return []
  localStorage.removeItem('cmt_documents')
  return getSampleDocuments()
}

// Helper function to check if we need to refresh data (for testing)
export const shouldRefreshSampleData = (): boolean => {
  // This function can be called to force refresh sample data for testing
  return true // Set to true if you want to force refresh
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