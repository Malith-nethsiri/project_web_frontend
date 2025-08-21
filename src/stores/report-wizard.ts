import { create } from '@/lib/create-store'

export interface ReportFormData {
  // Report Metadata
  title: string
  reference_number: string
  purpose: 'mortgage' | 'sale' | 'insurance' | 'taxation' | 'legal' | 'other'
  bank_name: string
  bank_branch: string
  inspection_date: string
  valuation_date: string
  report_date: string

  // Applicant Information
  applicant: {
    name: string
    address: string
    contact_numbers: string[]
    email: string
    nic_number: string
    business_name: string
    business_registration: string
  }

  // Property Details
  property: {
    // Legal Identification
    lot_number: string
    plan_number: string
    plan_date: string
    surveyor_name: string
    deed_numbers: string[]
    
    // Location
    address: string
    village: string
    gn_division: string
    district: string
    province: string
    latitude: number | null
    longitude: number | null
    
    // Access Details
    road_access: boolean
    directions_text: string
    access_description: string
    
    // Land Details
    property_type: string
    total_extent: string
    total_extent_sqft: number | null
    land_shape: string
    elevation: string
    soil_type: string
    water_table: string
    flood_risk: boolean
    
    // Building Details (optional)
    building_area: number | null
    building_structure: string
    year_built: number | null
    building_condition: string
    depreciation_rate: number | null
    
    // Utilities
    electricity: boolean
    water_supply: boolean
    sewerage: boolean
    telephone: boolean
    internet: boolean
    
    // Market Information
    market_activity: string
    development_potential: string
    restrictions: string
  }

  // Valuation Details
  valuation: {
    primary_method: 'market' | 'cost' | 'income' | 'comparative'
    secondary_methods: string[]
    methodology_explanation: string
    
    // Land Valuation
    land_rate_per_perch: number | null
    land_extent_perches: number | null
    
    // Building Valuation
    building_rate_per_sqft: number | null
    building_area: number | null
    building_value_before_depreciation: number | null
    building_value_after_depreciation: number | null
    depreciation_percentage: number | null
    
    // Other Improvements
    other_improvements_value: number | null
    other_improvements_description: string
    
    // Final Values
    total_market_value: number | null
    forced_sale_value: number | null
    insurance_value: number | null
    rental_value_monthly: number | null
    value_per_perch: number | null
    value_per_sqft: number | null
    
    // Analysis
    market_trend_analysis: string
    assumptions: string[]
    limitations: string[]
    risk_factors: string[]
    
    // Fee Details
    valuation_fee: number | null
    travel_cost: number | null
    other_charges: number | null
    total_fee: number | null
  }

  // Legal Aspects
  legal_aspects: Array<{
    document_type: 'deed' | 'survey_plan' | 'approval' | 'permit' | 'other'
    document_number: string
    document_date: string
    issuing_authority: string
    current_owner: string
    previous_owners: string[]
    ownership_type: string
    ownership_percentage: number | null
    title_clear: boolean
    encumbrances: string[]
    mortgages: string[]
    liens: string[]
    easements: string[]
    approvals_permits: string[]
    zoning_classification: string
    development_restrictions: string[]
    registration_details: string
    legal_issues: string[]
    court_cases: string[]
    disputes: string[]
    remarks: string
  }>

  // Photos
  photos: Array<{
    file_url: string
    filename: string
    caption: string
    description: string
    type: 'exterior' | 'interior' | 'document' | 'other'
    sequence_order: number
  }>

  // Comparables
  comparables: Array<{
    address: string
    lot_number: string
    plan_number: string
    distance_from_subject: number | null
    location_similarity: 'similar' | 'slightly_different' | 'different'
    sale_date: string
    sale_price: number
    transaction_type: string
    
    // Property Details
    land_extent_perches: number | null
    land_extent_sqft: number | null
    building_area: number | null
    property_type: string
    
    // Adjustments
    location_adjustment: number | null
    size_adjustment: number | null
    condition_adjustment: number | null
    time_adjustment: number | null
    other_adjustments: number | null
    adjusted_price: number | null
    price_per_perch: number | null
    price_per_sqft: number | null
    
    // Additional Info
    source: string
    verification_status: string
    reliability_rating: number | null
    market_conditions: string
    special_circumstances: string
    remarks: string
  }>
}

interface ReportWizardState {
  currentStep: number
  formData: ReportFormData
  isLoading: boolean
  isSaving: boolean
  errors: Record<string, string>
  reportId: string | null
  
  // Actions
  setCurrentStep: (step: number) => void
  updateFormData: (section: keyof ReportFormData, data: any) => void
  setLoading: (loading: boolean) => void
  setSaving: (saving: boolean) => void
  setError: (field: string, error: string) => void
  clearError: (field: string) => void
  clearAllErrors: () => void
  setReportId: (id: string) => void
  resetForm: () => void
  
  // Validation
  validateStep: (step: number) => boolean
  isStepValid: (step: number) => boolean
}

const getInitialFormData = (): ReportFormData => ({
  // Report Metadata
  title: '',
  reference_number: `VPR-${Date.now()}`,
  purpose: 'mortgage',
  bank_name: '',
  bank_branch: '',
  inspection_date: '',
  valuation_date: '',
  report_date: new Date().toISOString().split('T')[0],

  // Applicant Information
  applicant: {
    name: '',
    address: '',
    contact_numbers: [''],
    email: '',
    nic_number: '',
    business_name: '',
    business_registration: '',
  },

  // Property Details
  property: {
    lot_number: '',
    plan_number: '',
    plan_date: '',
    surveyor_name: '',
    deed_numbers: [''],
    address: '',
    village: '',
    gn_division: '',
    district: '',
    province: '',
    latitude: null,
    longitude: null,
    road_access: true,
    directions_text: '',
    access_description: '',
    property_type: 'land',
    total_extent: '',
    total_extent_sqft: null,
    land_shape: '',
    elevation: '',
    soil_type: '',
    water_table: '',
    flood_risk: false,
    building_area: null,
    building_structure: '',
    year_built: null,
    building_condition: '',
    depreciation_rate: null,
    electricity: false,
    water_supply: false,
    sewerage: false,
    telephone: false,
    internet: false,
    market_activity: '',
    development_potential: '',
    restrictions: '',
  },

  // Valuation Details
  valuation: {
    primary_method: 'market',
    secondary_methods: [],
    methodology_explanation: '',
    land_rate_per_perch: null,
    land_extent_perches: null,
    building_rate_per_sqft: null,
    building_area: null,
    building_value_before_depreciation: null,
    building_value_after_depreciation: null,
    depreciation_percentage: null,
    other_improvements_value: null,
    other_improvements_description: '',
    total_market_value: null,
    forced_sale_value: null,
    insurance_value: null,
    rental_value_monthly: null,
    value_per_perch: null,
    value_per_sqft: null,
    market_trend_analysis: '',
    assumptions: [''],
    limitations: [''],
    risk_factors: [''],
    valuation_fee: null,
    travel_cost: null,
    other_charges: null,
    total_fee: null,
  },

  // Legal Aspects
  legal_aspects: [],

  // Photos
  photos: [],

  // Comparables
  comparables: [],
})

export const useReportWizardStore = create<ReportWizardState>((set, get) => ({
  currentStep: 0,
  formData: getInitialFormData(),
  isLoading: false,
  isSaving: false,
  errors: {},
  reportId: null,

  setCurrentStep: (step: number) => set({ currentStep: step }),

  updateFormData: (section: keyof ReportFormData, data: any) => {
    set((state) => ({
      formData: {
        ...state.formData,
        [section]: typeof data === 'object' && data !== null ? { ...state.formData[section], ...data } : data,
      },
    }))
  },

  setLoading: (loading: boolean) => set({ isLoading: loading }),
  setSaving: (saving: boolean) => set({ isSaving: saving }),

  setError: (field: string, error: string) => {
    set((state) => ({
      errors: { ...state.errors, [field]: error },
    }))
  },

  clearError: (field: string) => {
    set((state) => {
      const { [field]: _, ...rest } = state.errors
      return { errors: rest }
    })
  },

  clearAllErrors: () => set({ errors: {} }),

  setReportId: (id: string) => set({ reportId: id }),

  resetForm: () => set({ 
    formData: getInitialFormData(), 
    currentStep: 0, 
    errors: {}, 
    reportId: null,
    isLoading: false,
    isSaving: false,
  }),

  // Validation logic
  validateStep: (step: number) => {
    const { formData } = get()
    const errors: Record<string, string> = {}

    switch (step) {
      case 0: // Report Metadata
        if (!formData.title.trim()) errors.title = 'Report title is required'
        if (!formData.purpose) errors.purpose = 'Purpose is required'
        if (!formData.inspection_date) errors.inspection_date = 'Inspection date is required'
        if (!formData.valuation_date) errors.valuation_date = 'Valuation date is required'
        break

      case 1: // Applicant Information
        if (!formData.applicant.name.trim()) errors['applicant.name'] = 'Applicant name is required'
        if (!formData.applicant.address.trim()) errors['applicant.address'] = 'Address is required'
        break

      case 2: // Property Details
        if (!formData.property.address.trim()) errors['property.address'] = 'Property address is required'
        if (!formData.property.district.trim()) errors['property.district'] = 'District is required'
        break

      case 3: // Valuation Details
        if (!formData.valuation.total_market_value) errors['valuation.total_market_value'] = 'Total market value is required'
        if (!formData.valuation.primary_method) errors['valuation.primary_method'] = 'Primary valuation method is required'
        break
    }

    set({ errors })
    return Object.keys(errors).length === 0
  },

  isStepValid: (step: number) => {
    return get().validateStep(step)
  },
}))