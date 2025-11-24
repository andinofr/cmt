import { z } from 'zod'

// Metadata field types
export type FieldType = 'text' | 'number' | 'date' | 'select' | 'textarea' | 'email'

export interface MetadataField {
  id: string
  label: string
  type: FieldType
  required?: boolean
  placeholder?: string
  options?: string[] // For select fields
  validation?: z.ZodSchema
}

export interface CategoryMetadataConfig {
  [category: string]: MetadataField[]
}

// Text validation schema
const textSchema = z.string().min(1, 'This field is required')
const optionalTextSchema = z.string().optional()

// Number validation schema
const numberSchema = z.string().transform((val) => {
  const num = parseFloat(val.replace(/[^0-9.-]+/g, ''))
  return isNaN(num) ? 0 : num
}).pipe(z.number().min(0))

const optionalNumberSchema = z.string().optional().transform((val) => {
  if (!val) return undefined
  const num = parseFloat(val.replace(/[^0-9.-]+/g, ''))
  return isNaN(num) ? undefined : num
}).pipe(z.number().optional())

// Date validation schema
const dateSchema = z.string().min(1, 'Date is required')
const optionalDateSchema = z.string().optional()

// Email validation schema
const emailSchema = z.string().email('Invalid email address')
const optionalEmailSchema = z.string().email('Invalid email address').optional()

// Metadata configuration for each document category
export const METADATA_CONFIG: CategoryMetadataConfig = {
  'Cost Structure': [
    {
      id: 'kategoriPekerjaan',
      label: 'Kategori Pekerjaan',
      type: 'select',
      placeholder: 'Enter total amount',
      options: ['Pertambangan', 'Konstruksi', 'Umum', 'Pemeliharaan', 'Logistik', 'Administrasi'],
    },
    {
      id: 'namaPekerjaan',
      label: 'Nama Pekerjaan',
      type: 'text',
    }
  ],

  'Reference': [
    {
      id: 'kategoriPekerjaan',
      label: 'Kategori Pekerjaan',
      type: 'select',
      placeholder: 'Enter total amount',
      options: ['Pertambangan', 'Konstruksi', 'Umum', 'Pemeliharaan', 'Logistik', 'Administrasi'],
    },
  ],

  'Scope of Works': [
    {
      id: 'workOrderNumber',
      label: 'Work Order Number',
      type: 'text',
      required: true,
      placeholder: 'Enter work order number',
      validation: textSchema
    },
    {
      id: 'startDate',
      label: 'Start Date',
      type: 'date',
      required: true,
      validation: dateSchema
    },
    {
      id: 'endDate',
      label: 'End Date',
      type: 'date',
      required: true,
      validation: dateSchema
    },
    {
      id: 'estimatedValue',
      label: 'Estimated Value',
      type: 'number',
      required: false,
      placeholder: 'Enter estimated value',
      validation: optionalNumberSchema
    },
    {
      id: 'workLocation',
      label: 'Work Location',
      type: 'select',
      required: true,
      options: ['Morowali', 'Pomalaa', 'Sorowako', 'Bahodopi', 'Other'],
      validation: textSchema
    }
  ],

  'Work Instructions': [
    {
      id: 'instructionNumber',
      label: 'Instruction Number',
      type: 'text',
      required: true,
      placeholder: 'Enter instruction number',
      validation: textSchema
    },
    {
      id: 'issuedDate',
      label: 'Issued Date',
      type: 'date',
      required: true,
      validation: dateSchema
    },
    {
      id: 'issuedBy',
      label: 'Issued By',
      type: 'text',
      required: true,
      placeholder: 'Enter name of issuer',
      validation: textSchema
    },
    {
      id: 'department',
      label: 'Department',
      type: 'select',
      required: true,
      options: ['Operations', 'Maintenance', 'Safety', 'Administration', 'Finance'],
      validation: textSchema
    },
    {
      id: 'priorityLevel',
      label: 'Priority Level',
      type: 'select',
      required: true,
      options: ['Low', 'Medium', 'High', 'Critical'],
      validation: textSchema
    }
  ],

  'Safety Procedures': [
    {
      id: 'procedureNumber',
      label: 'Procedure Number',
      type: 'text',
      required: true,
      placeholder: 'Enter procedure number',
      validation: textSchema
    },
    {
      id: 'procedureType',
      label: 'Procedure Type',
      type: 'select',
      required: true,
      options: ['Standard Operating Procedure', 'Emergency Response', 'Risk Assessment', 'Safety Protocol'],
      validation: textSchema
    },
    {
      id: 'riskLevel',
      label: 'Risk Level',
      type: 'select',
      required: true,
      options: ['Low Risk', 'Medium Risk', 'High Risk', 'Critical Risk'],
      validation: textSchema
    },
    {
      id: 'effectiveDate',
      label: 'Effective Date',
      type: 'date',
      required: true,
      validation: dateSchema
    },
    {
      id: 'reviewDate',
      label: 'Next Review Date',
      type: 'date',
      required: false,
      validation: optionalDateSchema
    }
  ],

  'Minutes of Meeting': [
    {
      id: 'meetingDate',
      label: 'Meeting Date',
      type: 'date',
      required: true,
      validation: dateSchema
    },
    {
      id: 'meetingType',
      label: 'Meeting Type',
      type: 'select',
      required: true,
      options: ['Project Review', 'Safety Meeting', 'Progress Update', 'Stakeholder Meeting'],
      validation: textSchema
    },
    {
      id: 'attendees',
      label: 'Number of Attendees',
      type: 'number',
      required: true,
      placeholder: 'Enter number of attendees',
      validation: numberSchema
    },
    {
      id: 'facilitator',
      label: 'Meeting Facilitator',
      type: 'text',
      required: true,
      placeholder: 'Enter facilitator name',
      validation: textSchema
    },
    {
      id: 'location',
      label: 'Meeting Location',
      type: 'text',
      required: false,
      placeholder: 'Enter meeting location',
      validation: optionalTextSchema
    }
  ],

  'Deviation Form': [
    {
      id: 'deviationNumber',
      label: 'Deviation Number',
      type: 'text',
      required: true,
      placeholder: 'Enter deviation number',
      validation: textSchema
    },
    {
      id: 'deviationType',
      label: 'Deviation Type',
      type: 'select',
      required: true,
      options: ['Technical Deviation', 'Schedule Deviation', 'Cost Deviation', 'Quality Deviation'],
      validation: textSchema
    },
    {
      id: 'severity',
      label: 'Severity Level',
      type: 'select',
      required: true,
      options: ['Minor', 'Major', 'Critical'],
      validation: textSchema
    },
    {
      id: 'reportedDate',
      label: 'Reported Date',
      type: 'date',
      required: true,
      validation: dateSchema
    },
    {
      id: 'reportedBy',
      label: 'Reported By',
      type: 'text',
      required: true,
      placeholder: 'Enter name of reporter',
      validation: textSchema
    }
  ],

  'Procurement Request': [
    {
      id: 'requestNumber',
      label: 'Request Number',
      type: 'text',
      required: true,
      placeholder: 'Enter procurement request number',
      validation: textSchema
    },
    {
      id: 'requestDate',
      label: 'Request Date',
      type: 'date',
      required: true,
      validation: dateSchema
    },
    {
      id: 'requester',
      label: 'Requester Name',
      type: 'text',
      required: true,
      placeholder: 'Enter requester name',
      validation: textSchema
    },
    {
      id: 'requesterEmail',
      label: 'Requester Email',
      type: 'email',
      required: true,
      placeholder: 'Enter requester email',
      validation: emailSchema
    },
    {
      id: 'budgetAmount',
      label: 'Budget Amount',
      type: 'number',
      required: true,
      placeholder: 'Enter budget amount',
      validation: numberSchema
    },
    {
      id: 'urgency',
      label: 'Urgency Level',
      type: 'select',
      required: true,
      options: ['Normal', 'Urgent', 'Critical'],
      validation: textSchema
    }
  ],

  'Contract Request Form': [
    {
      id: 'contractRequestId',
      label: 'Contract Request ID',
      type: 'text',
      required: true,
      placeholder: 'Enter contract request ID',
      validation: textSchema
    },
    {
      id: 'contractType',
      label: 'Contract Type',
      type: 'select',
      required: true,
      options: ['Service Contract', 'Supply Contract', 'Consultancy Contract', 'Construction Contract'],
      validation: textSchema
    },
    {
      id: 'expectedStartDate',
      label: 'Expected Start Date',
      type: 'date',
      required: true,
      validation: dateSchema
    },
    {
      id: 'duration',
      label: 'Contract Duration (months)',
      type: 'number',
      required: true,
      placeholder: 'Enter contract duration in months',
      validation: numberSchema
    },
    {
      id: 'estimatedValue',
      label: 'Estimated Contract Value',
      type: 'number',
      required: true,
      placeholder: 'Enter estimated value',
      validation: numberSchema
    },
    {
      id: 'requester',
      label: 'Requester',
      type: 'text',
      required: true,
      placeholder: 'Enter requester name and department',
      validation: textSchema
    }
  ],

  'Administration Document': [
    {
      id: 'documentType',
      label: 'Document Type',
      type: 'select',
      required: true,
      options: ['Policy', 'Procedure', 'Guideline', 'Form Template', 'Report Template'],
      validation: textSchema
    },
    {
      id: 'effectiveDate',
      label: 'Effective Date',
      type: 'date',
      required: true,
      validation: dateSchema
    },
    {
      id: 'department',
      label: 'Department',
      type: 'select',
      required: true,
      options: ['Human Resources', 'Finance', 'Operations', 'Maintenance', 'HS&E', 'Procurement'],
      validation: textSchema
    },
    {
      id: 'approvedBy',
      label: 'Approved By',
      type: 'text',
      required: true,
      placeholder: 'Enter approver name and title',
      validation: textSchema
    },
    {
      id: 'reviewFrequency',
      label: 'Review Frequency',
      type: 'select',
      required: false,
      options: ['Annually', 'Bi-annually', 'Quarterly', 'As Needed'],
      validation: optionalTextSchema
    }
  ],

  'Technical Specification': [
    {
      id: 'specificationNumber',
      label: 'Specification Number',
      type: 'text',
      required: true,
      placeholder: 'Enter specification number',
      validation: textSchema
    },
    {
      id: 'equipmentType',
      label: 'Equipment/Process Type',
      type: 'select',
      required: true,
      options: ['Heavy Equipment', 'Processing Plant', 'Safety Equipment', 'IT Infrastructure', 'Electrical Systems'],
      validation: textSchema
    },
    {
      id: 'version',
      label: 'Version',
      type: 'text',
      required: true,
      placeholder: 'Enter specification version',
      validation: textSchema
    },
    {
      id: 'issueDate',
      label: 'Issue Date',
      type: 'date',
      required: true,
      validation: dateSchema
    },
    {
      id: 'technicalOwner',
      label: 'Technical Owner',
      type: 'text',
      required: true,
      placeholder: 'Enter technical owner name',
      validation: textSchema
    }
  ],

  'Compliance Report': [
    {
      id: 'reportPeriod',
      label: 'Reporting Period',
      type: 'select',
      required: true,
      options: ['Monthly', 'Quarterly', 'Semi-annually', 'Annually'],
      validation: textSchema
    },
    {
      id: 'reportDate',
      label: 'Report Date',
      type: 'date',
      required: true,
      validation: dateSchema
    },
    {
      id: 'complianceType',
      label: 'Compliance Type',
      type: 'select',
      required: true,
      options: ['Environmental Compliance', 'Safety Compliance', 'Regulatory Compliance', 'Quality Compliance'],
      validation: textSchema
    },
    {
      id: 'auditor',
      label: 'Auditor/Inspector',
      type: 'text',
      required: true,
      placeholder: 'Enter auditor or inspector name',
      validation: textSchema
    },
    {
      id: 'overallRating',
      label: 'Overall Compliance Rating',
      type: 'select',
      required: true,
      options: ['Excellent', 'Good', 'Satisfactory', 'Needs Improvement', 'Non-Compliant'],
      validation: textSchema
    }
  ]
}

// Helper function to get metadata fields for a category
export function getMetadataFields(category: string): MetadataField[] {
  return METADATA_CONFIG[category] || []
}

// Helper function to create validation schema for a category
export function createCategoryValidationSchema(category: string) {
  const fields = getMetadataFields(category)
  const schemaObject: Record<string, z.ZodSchema> = {}

  fields.forEach(field => {
    if (field.validation) {
      schemaObject[field.id] = field.validation
    }
  })

  return z.object(schemaObject)
}