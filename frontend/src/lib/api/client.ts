import axios, { AxiosInstance, AxiosResponse } from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

class APIClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: `${API_BASE_URL}/api/v1`,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Add request interceptor to include auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('access_token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Redirect to login if unauthorized
          localStorage.removeItem('access_token')
          window.location.href = '/auth/login'
        }
        return Promise.reject(error)
      }
    )
  }

  // Auth methods
  async login(email: string, password: string) {
    const formData = new FormData()
    formData.append('username', email)
    formData.append('password', password)
    
    const response = await this.client.post('/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    
    const { access_token } = response.data
    localStorage.setItem('access_token', access_token)
    return response.data
  }

  async register(email: string, password: string) {
    return this.client.post('/auth/register', { email, password })
  }

  async getCurrentUser() {
    return this.client.get('/auth/me')
  }

  // Valuer Profile methods
  async getValuerProfile() {
    return this.client.get('/profile/')
  }

  async createValuerProfile(profileData: any) {
    return this.client.post('/profile/', profileData)
  }

  async updateValuerProfile(profileData: any) {
    return this.client.put('/profile/', profileData)
  }

  // Reports methods
  async getReports(params?: any) {
    return this.client.get('/reports/', { params })
  }

  async getReport(reportId: number) {
    return this.client.get(`/reports/${reportId}`)
  }

  async createReport(reportData: any) {
    return this.client.post('/reports/', reportData)
  }

  async updateReport(reportId: number, updateData: any) {
    return this.client.put(`/reports/${reportId}`, updateData)
  }

  async deleteReport(reportId: number) {
    return this.client.delete(`/reports/${reportId}`)
  }

  async generateReportDocx(reportId: number) {
    return this.client.post(`/reports/${reportId}/generate-docx`, {}, {
      responseType: 'blob'
    })
  }

  async generateReportPdf(reportId: number) {
    return this.client.post(`/reports/${reportId}/generate-pdf`, {}, {
      responseType: 'blob'
    })
  }

  async previewReport(reportId: number) {
    return this.client.get(`/reports/${reportId}/preview`)
  }

  // OCR methods
  async extractText(file: File, languageHints?: string) {
    const formData = new FormData()
    formData.append('file', file)
    if (languageHints) {
      formData.append('language_hints', languageHints)
    }
    
    return this.client.post('/ocr/extract', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  async extractDocumentText(file: File) {
    const formData = new FormData()
    formData.append('file', file)
    
    return this.client.post('/ocr/extract-document', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  async extractSinhalaText(file: File) {
    const formData = new FormData()
    formData.append('file', file)
    
    return this.client.post('/ocr/extract-sinhala', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  // AI methods
  async parseSurveyPlan(text: string) {
    return this.client.post('/ai/parse-survey-plan', {
      text,
      document_type: 'survey_plan'
    })
  }

  async parseDeed(text: string) {
    return this.client.post('/ai/parse-deed', {
      text,
      document_type: 'deed'
    })
  }

  async parseApplicant(text: string) {
    return this.client.post('/ai/parse-applicant', {
      text,
      document_type: 'bank_letter'
    })
  }

  async translateText(text: string) {
    return this.client.post('/ai/translate', { text })
  }

  async generateDescription(data: any) {
    return this.client.post('/ai/generate-description', data)
  }

  async suggestValuationMethod(propertyData: any) {
    return this.client.post('/ai/suggest-valuation-method', propertyData)
  }

  async validateData(data: any, dataType: string) {
    return this.client.post('/ai/validate', { data, data_type: dataType })
  }

  // Maps methods
  async geocodeAddress(address: string) {
    return this.client.post('/maps/geocode', { address })
  }

  async reverseGeocode(latitude: number, longitude: number) {
    return this.client.post('/maps/reverse-geocode', { latitude, longitude })
  }

  async generateStaticMap(latitude: number, longitude: number, options?: any) {
    return this.client.post('/maps/static-map', {
      latitude,
      longitude,
      ...options
    })
  }

  async getDirections(originLat: number, originLng: number, destLat: number, destLng: number) {
    return this.client.post('/maps/directions', {
      origin_lat: originLat,
      origin_lng: originLng,
      dest_lat: destLat,
      dest_lng: destLng
    })
  }

  async generateAccessDirections(propertyLat: number, propertyLng: number, landmark?: string) {
    return this.client.post('/maps/access-directions', {
      property_lat: propertyLat,
      property_lng: propertyLng,
      landmark
    })
  }

  async findNearbyLandmarks(latitude: number, longitude: number, radius?: number) {
    return this.client.post('/maps/nearby-landmarks', {
      latitude,
      longitude
    }, {
      params: { radius }
    })
  }

  // File upload methods
  async uploadFile(file: File) {
    const formData = new FormData()
    formData.append('file', file)
    
    return this.client.post('/upload/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }
}

export const apiClient = new APIClient()
export default apiClient