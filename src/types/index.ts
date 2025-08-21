// User and Authentication Types
export interface User {
  id: string
  email: string
  full_name?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  full_name?: string
}

export interface AuthResponse {
  access_token: string
  token_type: string
  user: User
}

// Report Types
export interface Report {
  id: string
  title: string
  reference_number: string
  purpose: 'mortgage' | 'sale' | 'insurance' | 'taxation' | 'legal' | 'other'
  status: 'draft' | 'in_progress' | 'completed' | 'exported'
  bank_name?: string
  bank_branch?: string
  inspection_date?: string
  valuation_date?: string
  report_date?: string
  created_at: string
  updated_at: string
  user_id: string
  generated_files?: string[]
}

export interface CreateReportRequest {
  title: string
  reference_number?: string
  purpose: string
  bank_name?: string
  bank_branch?: string
  inspection_date?: string
  valuation_date?: string
  report_date?: string
}

// Applicant Types
export interface Applicant {
  id: string
  name: string
  address?: string
  contact_numbers?: string[]
  email?: string
  nic_number?: string
  business_name?: string
  business_registration?: string
  report_id: string
  created_at: string
  updated_at: string
}

// Property Types
export interface Property {
  id: string
  report_id: string
  lot_number?: string
  plan_number?: string
  plan_date?: string
  surveyor_name?: string
  deed_numbers?: string[]
  address?: string
  village?: string
  gn_division?: string
  district?: string
  province?: string
  latitude?: number
  longitude?: number
  road_access?: boolean
  directions_text?: string
  access_description?: string
  property_type?: string
  total_extent?: string
  total_extent_sqft?: number
  land_shape?: string
  elevation?: string
  soil_type?: string
  water_table?: string
  flood_risk?: boolean
  building_area?: number
  building_structure?: string
  year_built?: number
  building_condition?: string
  depreciation_rate?: number
  electricity?: boolean
  water_supply?: boolean
  sewerage?: boolean
  telephone?: boolean
  internet?: boolean
  market_activity?: string
  development_potential?: string
  restrictions?: string
  created_at: string
  updated_at: string
}

// Valuation Types
export interface Valuation {
  id: string
  report_id: string
  primary_method: 'market' | 'cost' | 'income' | 'comparative'
  secondary_methods?: string[]
  methodology_explanation?: string
  land_rate_per_perch?: number
  land_extent_perches?: number
  building_rate_per_sqft?: number
  building_area?: number
  building_value_before_depreciation?: number
  building_value_after_depreciation?: number
  depreciation_percentage?: number
  other_improvements_value?: number
  other_improvements_description?: string
  total_market_value: number
  forced_sale_value?: number
  insurance_value?: number
  rental_value_monthly?: number
  value_per_perch?: number
  value_per_sqft?: number
  market_trend_analysis?: string
  assumptions?: string[]
  limitations?: string[]
  risk_factors?: string[]
  valuation_fee?: number
  travel_cost?: number
  other_charges?: number
  total_fee?: number
  created_at: string
  updated_at: string
}

// Comparable Types
export interface Comparable {
  id: string
  report_id: string
  address: string
  lot_number?: string
  plan_number?: string
  distance_from_subject?: number
  location_similarity?: 'similar' | 'slightly_different' | 'different'
  sale_date: string
  sale_price: number
  transaction_type?: string
  land_extent_perches?: number
  land_extent_sqft?: number
  building_area?: number
  property_type?: string
  location_adjustment?: number
  size_adjustment?: number
  condition_adjustment?: number
  time_adjustment?: number
  other_adjustments?: number
  adjusted_price?: number
  price_per_perch?: number
  price_per_sqft?: number
  source?: string
  verification_status?: string
  reliability_rating?: number
  market_conditions?: string
  special_circumstances?: string
  remarks?: string
  created_at: string
  updated_at: string
}

// Photo Types
export interface Photo {
  id: string
  report_id: string
  file_url: string
  filename: string
  caption?: string
  description?: string
  type: 'exterior' | 'interior' | 'document' | 'other'
  sequence_order: number
  created_at: string
}

// Legal Aspect Types
export interface LegalAspect {
  id: string
  report_id: string
  document_type: 'deed' | 'survey_plan' | 'approval' | 'permit' | 'other'
  document_number?: string
  document_date?: string
  issuing_authority?: string
  current_owner?: string
  previous_owners?: string[]
  ownership_type?: string
  ownership_percentage?: number
  title_clear: boolean
  encumbrances?: string[]
  mortgages?: string[]
  liens?: string[]
  easements?: string[]
  approvals_permits?: string[]
  zoning_classification?: string
  development_restrictions?: string[]
  registration_details?: string
  legal_issues?: string[]
  court_cases?: string[]
  disputes?: string[]
  remarks?: string
  created_at: string
  updated_at: string
}

// Upload and Processing Types
export interface UploadResponse {
  file_url: string
  filename: string
  file_size: number
  file_type: string
}

export interface OCRResult {
  extracted_text: string
  confidence_score: number
}

export interface AIParseResult {
  parsed_data: Record<string, any>
  confidence_score: number
  suggestions: Suggestion[]
}

export interface Suggestion {
  id: string
  type: 'applicant' | 'property' | 'legal' | 'valuation'
  field_name: string
  suggested_value: string
  current_value?: string
  confidence_score: number
  status: 'pending' | 'accepted' | 'rejected'
  source: 'ocr' | 'ai_parsing' | 'user_input'
  created_at: string
}

// Maps Types
export interface GeocodeResult {
  address: string
  latitude: number
  longitude: number
  formatted_address: string
  place_id?: string
}

export interface DirectionsResult {
  distance: string
  duration: string
  steps: DirectionStep[]
}

export interface DirectionStep {
  instruction: string
  distance: string
  duration: string
}

// Valuer Profile Types
export interface ValuerProfile {
  id: string
  user_id: string
  title?: string
  full_name: string
  qualifications?: string[]
  memberships?: string[]
  address?: string
  telephone_numbers?: string[]
  email: string
  registration_number?: string
  license_number?: string
  areas_of_expertise?: string[]
  avatar_url?: string
  created_at: string
  updated_at: string
}

// API Response Types
export interface ApiResponse<T> {
  data: T
  message?: string
  status: number
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  per_page: number
  pages: number
}

// Form Types
export interface ReportFormData {
  title: string
  reference_number?: string
  purpose: string
  bank_name?: string
  bank_branch?: string
  inspection_date?: string
  valuation_date?: string
  report_date?: string
}

export interface ApplicantFormData {
  name: string
  address?: string
  contact_numbers?: string[]
  email?: string
  nic_number?: string
  business_name?: string
  business_registration?: string
}

// Theme and UI Types
export type Theme = 'light' | 'dark' | 'system'

export interface NotificationConfig {
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  duration?: number
}