import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { 
  AuthResponse, 
  LoginRequest, 
  RegisterRequest, 
  User,
  Report,
  CreateReportRequest,
  PaginatedResponse,
  Applicant,
  Property,
  Valuation,
  Comparable,
  LegalAspect,
  Photo,
  OCRResult,
  AIParseResult,
  GeocodeResult,
  DirectionsResult,
  ValuerProfile,
  UploadResponse
} from '@/types'

class ApiClient {
  private client: AxiosInstance
  private token: string | null = null

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = this.getToken()
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          this.clearToken()
          if (typeof window !== 'undefined') {
            window.location.href = '/auth/login'
          }
        }
        return Promise.reject(error)
      }
    )
  }

  private getToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('access_token')
  }

  private setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', token)
    }
    this.token = token
  }

  private clearToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token')
    }
    this.token = null
  }

  // Authentication
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const formData = new FormData()
    formData.append('username', credentials.email)
    formData.append('password', credentials.password)
    
    const response: AxiosResponse<AuthResponse> = await this.client.post(
      '/auth/login',
      formData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )
    
    if (response.data.access_token) {
      this.setToken(response.data.access_token)
    }
    
    return response.data
  }

  async register(userData: RegisterRequest): Promise<User> {
    const response: AxiosResponse<User> = await this.client.post('/auth/register', userData)
    return response.data
  }

  async getCurrentUser(): Promise<User> {
    const response: AxiosResponse<User> = await this.client.get('/auth/me')
    return response.data
  }

  async logout(): Promise<void> {
    try {
      await this.client.post('/auth/logout')
    } catch (error) {
      // Ignore logout errors and clear token anyway
    } finally {
      this.clearToken()
    }
  }

  // Reports
  async getReports(page = 1, limit = 10, filters?: Record<string, any>): Promise<PaginatedResponse<Report>> {
    const params = { page, limit, ...filters }
    const response: AxiosResponse<PaginatedResponse<Report>> = await this.client.get('/api/v1/reports', { params })
    return response.data
  }

  async getReport(id: string): Promise<Report> {
    const response: AxiosResponse<Report> = await this.client.get(`/api/v1/reports/${id}`)
    return response.data
  }

  async createReport(data: CreateReportRequest): Promise<Report> {
    const response: AxiosResponse<Report> = await this.client.post('/api/v1/reports', data)
    return response.data
  }

  async updateReport(id: string, data: Partial<CreateReportRequest>): Promise<Report> {
    const response: AxiosResponse<Report> = await this.client.put(`/api/v1/reports/${id}`, data)
    return response.data
  }

  async deleteReport(id: string): Promise<void> {
    await this.client.delete(`/api/v1/reports/${id}`)
  }

  async generateReportPDF(id: string): Promise<Blob> {
    const response = await this.client.post(`/api/v1/reports/${id}/generate-pdf`, {}, {
      responseType: 'blob'
    })
    return response.data
  }

  async generateReportDOCX(id: string): Promise<Blob> {
    const response = await this.client.post(`/api/v1/reports/${id}/generate-docx`, {}, {
      responseType: 'blob'
    })
    return response.data
  }

  // Applicants
  async createApplicant(reportId: string, data: Omit<Applicant, 'id' | 'report_id' | 'created_at' | 'updated_at'>): Promise<Applicant> {
    const response: AxiosResponse<Applicant> = await this.client.post('/api/v1/valuer-profile/create-applicant', {
      ...data,
      report_id: reportId
    })
    return response.data
  }

  async getApplicants(reportId: string): Promise<Applicant[]> {
    const response: AxiosResponse<Applicant[]> = await this.client.get(`/api/v1/applicants?report_id=${reportId}`)
    return response.data
  }

  // Properties
  async createProperty(data: Omit<Property, 'id' | 'created_at' | 'updated_at'>): Promise<Property> {
    const response: AxiosResponse<Property> = await this.client.post('/api/v1/properties', data)
    return response.data
  }

  async getProperty(reportId: string): Promise<Property | null> {
    try {
      const response: AxiosResponse<Property> = await this.client.get(`/api/v1/properties?report_id=${reportId}`)
      return response.data
    } catch (error) {
      return null
    }
  }

  async updateProperty(id: string, data: Partial<Property>): Promise<Property> {
    const response: AxiosResponse<Property> = await this.client.put(`/api/v1/properties/${id}`, data)
    return response.data
  }

  // Valuations
  async createValuation(data: Omit<Valuation, 'id' | 'created_at' | 'updated_at'>): Promise<Valuation> {
    const response: AxiosResponse<Valuation> = await this.client.post('/api/v1/valuations', data)
    return response.data
  }

  async getValuation(reportId: string): Promise<Valuation | null> {
    try {
      const response: AxiosResponse<Valuation> = await this.client.get(`/api/v1/valuations?report_id=${reportId}`)
      return response.data
    } catch (error) {
      return null
    }
  }

  async updateValuation(id: string, data: Partial<Valuation>): Promise<Valuation> {
    const response: AxiosResponse<Valuation> = await this.client.put(`/api/v1/valuations/${id}`, data)
    return response.data
  }

  // Comparables
  async createComparable(data: Omit<Comparable, 'id' | 'created_at' | 'updated_at'>): Promise<Comparable> {
    const response: AxiosResponse<Comparable> = await this.client.post('/api/v1/comparables', data)
    return response.data
  }

  async getComparables(reportId: string): Promise<Comparable[]> {
    const response: AxiosResponse<Comparable[]> = await this.client.get(`/api/v1/comparables?report_id=${reportId}`)
    return response.data
  }

  async updateComparable(id: string, data: Partial<Comparable>): Promise<Comparable> {
    const response: AxiosResponse<Comparable> = await this.client.put(`/api/v1/comparables/${id}`, data)
    return response.data
  }

  async deleteComparable(id: string): Promise<void> {
    await this.client.delete(`/api/v1/comparables/${id}`)
  }

  // Legal Aspects
  async createLegalAspect(data: Omit<LegalAspect, 'id' | 'created_at' | 'updated_at'>): Promise<LegalAspect> {
    const response: AxiosResponse<LegalAspect> = await this.client.post('/api/v1/legal-aspects', data)
    return response.data
  }

  async getLegalAspects(reportId: string): Promise<LegalAspect[]> {
    const response: AxiosResponse<LegalAspect[]> = await this.client.get(`/api/v1/legal-aspects?report_id=${reportId}`)
    return response.data
  }

  async updateLegalAspect(id: string, data: Partial<LegalAspect>): Promise<LegalAspect> {
    const response: AxiosResponse<LegalAspect> = await this.client.put(`/api/v1/legal-aspects/${id}`, data)
    return response.data
  }

  async deleteLegalAspect(id: string): Promise<void> {
    await this.client.delete(`/api/v1/legal-aspects/${id}`)
  }

  // Photos
  async createPhoto(data: Omit<Photo, 'id' | 'created_at'>): Promise<Photo> {
    const response: AxiosResponse<Photo> = await this.client.post('/api/v1/photos', data)
    return response.data
  }

  async getPhotos(reportId: string): Promise<Photo[]> {
    const response: AxiosResponse<Photo[]> = await this.client.get(`/api/v1/photos?report_id=${reportId}`)
    return response.data
  }

  async deletePhoto(id: string): Promise<void> {
    await this.client.delete(`/api/v1/photos/${id}`)
  }

  // File Upload
  async uploadFile(file: File): Promise<UploadResponse> {
    const formData = new FormData()
    formData.append('file', file)
    
    const response: AxiosResponse<UploadResponse> = await this.client.post(
      '/api/v1/upload/single',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    return response.data
  }

  async uploadMultipleFiles(files: File[]): Promise<UploadResponse[]> {
    const formData = new FormData()
    files.forEach(file => formData.append('files', file))
    
    const response: AxiosResponse<UploadResponse[]> = await this.client.post(
      '/api/v1/upload/multiple',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    return response.data
  }

  // OCR
  async extractText(file: File): Promise<OCRResult> {
    const formData = new FormData()
    formData.append('file', file)
    
    const response: AxiosResponse<OCRResult> = await this.client.post(
      '/api/v1/ocr/extract_text',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    return response.data
  }

  async extractDocumentText(file: File): Promise<OCRResult> {
    const formData = new FormData()
    formData.append('file', file)
    
    const response: AxiosResponse<OCRResult> = await this.client.post(
      '/api/v1/ocr/extract_doc_text',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    return response.data
  }

  async extractSinhalaText(file: File): Promise<OCRResult> {
    const formData = new FormData()
    formData.append('file', file)
    
    const response: AxiosResponse<OCRResult> = await this.client.post(
      '/api/v1/ocr/extract_sinhala_text',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    return response.data
  }

  // AI Processing
  async parseSurveyPlan(text: string): Promise<AIParseResult> {
    const response: AxiosResponse<AIParseResult> = await this.client.post('/api/v1/ai/parse_survey_plan', { text })
    return response.data
  }

  async parseDeed(text: string): Promise<AIParseResult> {
    const response: AxiosResponse<AIParseResult> = await this.client.post('/api/v1/ai/parse_deed_doc', { text })
    return response.data
  }

  async parseApplicant(text: string): Promise<AIParseResult> {
    const response: AxiosResponse<AIParseResult> = await this.client.post('/api/v1/ai/parse_applicant', { text })
    return response.data
  }

  async translateSinhala(text: string): Promise<{ translated_text: string }> {
    const response: AxiosResponse<{ translated_text: string }> = await this.client.post('/api/v1/ai/translate_si_to_en', { text })
    return response.data
  }

  // Maps
  async geocode(address: string): Promise<GeocodeResult> {
    const response: AxiosResponse<GeocodeResult> = await this.client.post('/api/v1/maps/geocode', { address })
    return response.data
  }

  async reverseGeocode(lat: number, lng: number): Promise<GeocodeResult> {
    const response: AxiosResponse<GeocodeResult> = await this.client.post('/api/v1/maps/reverse-geocode', { 
      latitude: lat, 
      longitude: lng 
    })
    return response.data
  }

  async getDirections(origin: string, destination: string): Promise<DirectionsResult> {
    const response: AxiosResponse<DirectionsResult> = await this.client.post('/api/v1/maps/directions', { 
      origin, 
      destination 
    })
    return response.data
  }

  async getStaticMap(lat: number, lng: number, zoom = 15, size = '400x400'): Promise<Blob> {
    const response = await this.client.post('/api/v1/maps/static-map', {
      latitude: lat,
      longitude: lng,
      zoom,
      size
    }, {
      responseType: 'blob'
    })
    return response.data
  }

  // Valuer Profile
  async getValuerProfile(): Promise<ValuerProfile | null> {
    try {
      const response: AxiosResponse<ValuerProfile> = await this.client.get('/api/v1/valuer-profile')
      return response.data
    } catch (error) {
      return null
    }
  }

  async createValuerProfile(data: Omit<ValuerProfile, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<ValuerProfile> {
    const response: AxiosResponse<ValuerProfile> = await this.client.post('/api/v1/valuer-profile', data)
    return response.data
  }

  async updateValuerProfile(data: Partial<ValuerProfile>): Promise<ValuerProfile> {
    const response: AxiosResponse<ValuerProfile> = await this.client.put('/api/v1/valuer-profile', data)
    return response.data
  }
}

export const apiClient = new ApiClient()
export default apiClient