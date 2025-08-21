'use client'

import { useState } from 'react'

interface ReportPreviewProps {
  report: any
}

export function ReportPreview({ report }: ReportPreviewProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = report.metadata.pages

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const getStatusColor = (status: string) => {
    const colors = {
      draft: 'bg-yellow-100 text-yellow-800',
      in_review: 'bg-blue-100 text-blue-800',
      approved: 'bg-green-100 text-green-800',
      completed: 'bg-gray-100 text-gray-800',
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return <CoverPage report={report} />
      case 2:
        return <ExecutiveSummary report={report} />
      case 3:
        return <PropertyInformation report={report} />
      case 4:
        return <MarketAnalysis report={report} />
      case 5:
        return <ComparablesAnalysis report={report} />
      case 6:
        return <PhotosPage report={report} />
      case 7:
        return <LegalAspects report={report} />
      case 8:
        return <ValuationConclusion report={report} />
      default:
        return <div className="text-center py-12">Page not found</div>
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Preview Controls */}
      <div className="flex items-center justify-between p-4 border-b bg-gray-50">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ◀
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ▶
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
            {report.status.replace('_', ' ').toUpperCase()}
          </span>
        </div>
      </div>

      {/* Report Content */}
      <div className="p-8 min-h-[800px] bg-white">
        {renderPage()}
      </div>

      {/* Page Navigation */}
      <div className="flex justify-center p-4 border-t bg-gray-50">
        <div className="flex space-x-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded text-xs font-medium ${
                currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function CoverPage({ report }: { report: any }) {
  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Property Valuation Report</h1>
        <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">{report.property_address}</h2>
          <p className="text-lg text-gray-600">{report.property_type}</p>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg inline-block">
          <p className="text-sm text-blue-600 font-medium mb-1">ESTIMATED VALUE</p>
          <p className="text-3xl font-bold text-blue-900">
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(report.valuation)}
          </p>
        </div>

        <div className="space-y-2 text-gray-600">
          <p><strong>Report ID:</strong> {report.id}</p>
          <p><strong>Date Prepared:</strong> {new Date(report.created_at).toLocaleDateString()}</p>
          <p><strong>Last Updated:</strong> {new Date(report.updated_at).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="pt-8 text-gray-500">
        <p className="font-medium">ValuerPro</p>
        <p className="text-sm">Professional Property Valuation Services</p>
      </div>
    </div>
  )
}

function ExecutiveSummary({ report }: { report: any }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Executive Summary</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-3">Property Overview</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Property Type:</span>
              <span className="font-medium">{report.data.property_info.property_type}</span>
            </div>
            <div className="flex justify-between">
              <span>Year Built:</span>
              <span className="font-medium">{report.data.property_info.year_built}</span>
            </div>
            <div className="flex justify-between">
              <span>Square Feet:</span>
              <span className="font-medium">{report.data.property_info.square_feet.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Lot Size:</span>
              <span className="font-medium">{report.data.property_info.lot_size} acres</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-3">Valuation Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Estimated Value:</span>
              <span className="font-medium text-green-600">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(report.valuation)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Price per Sq Ft:</span>
              <span className="font-medium">${report.data.market_analysis.price_per_sqft}</span>
            </div>
            <div className="flex justify-between">
              <span>Confidence Level:</span>
              <span className="font-medium">{report.data.market_analysis.confidence_level}%</span>
            </div>
            <div className="flex justify-between">
              <span>Market Trend:</span>
              <span className="font-medium capitalize">{report.data.market_analysis.market_trend}</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-800 mb-3">Key Findings</h3>
        <ul className="space-y-2 text-gray-600">
          <li>• Property is in excellent condition with recent updates to kitchen and bathrooms</li>
          <li>• Market analysis shows stable pricing trends in the neighborhood</li>
          <li>• Comparable sales support the estimated valuation range</li>
          <li>• Property benefits from desirable location and amenities</li>
          <li>• All legal aspects have been verified and are in order</li>
        </ul>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">Methodology</h3>
        <p className="text-blue-800 text-sm">
          This valuation was conducted using the Sales Comparison Approach, analyzing recent comparable 
          sales in the immediate area. Market data was sourced from MLS records and verified through 
          public records. The analysis includes adjustments for property differences and market conditions.
        </p>
      </div>
    </div>
  )
}

function PropertyInformation({ report }: { report: any }) {
  const info = report.data.property_info

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Property Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold text-gray-800 mb-4">Basic Information</h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-500">Property Address</label>
              <p className="text-gray-900">{info.address}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Property Type</label>
              <p className="text-gray-900">{info.property_type}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Year Built</label>
              <p className="text-gray-900">{info.year_built}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 mb-4">Property Details</h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-500">Total Square Feet</label>
              <p className="text-gray-900">{info.square_feet.toLocaleString()} sq ft</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Lot Size</label>
              <p className="text-gray-900">{info.lot_size} acres</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Bedrooms</label>
              <p className="text-gray-900">{info.bedrooms}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Bathrooms</label>
              <p className="text-gray-900">{info.bathrooms}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Garage</label>
              <p className="text-gray-900">{info.garage}</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-800 mb-4">Property Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-2xl mb-2">🏠</div>
            <p className="font-medium">Single Family</p>
            <p className="text-sm text-gray-600">Detached home</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-2xl mb-2">🚗</div>
            <p className="font-medium">2-Car Garage</p>
            <p className="text-sm text-gray-600">Attached</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-2xl mb-2">🌳</div>
            <p className="font-medium">0.25 Acres</p>
            <p className="text-sm text-gray-600">Landscaped lot</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function MarketAnalysis({ report }: { report: any }) {
  const analysis = report.data.market_analysis

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Market Analysis</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-4">Market Overview</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Market Trend</span>
              <span className="font-medium capitalize bg-white px-2 py-1 rounded text-sm">
                {analysis.market_trend}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Neighborhood Score</span>
              <span className="font-medium bg-white px-2 py-1 rounded text-sm">
                {analysis.neighborhood_score}/100
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Confidence Level</span>
              <span className="font-medium bg-white px-2 py-1 rounded text-sm">
                {analysis.confidence_level}%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-4">Valuation Metrics</h3>
          <div className="space-y-3">
            <div>
              <span className="text-gray-600 text-sm">Estimated Value</span>
              <p className="text-2xl font-bold text-green-600">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(analysis.market_value_estimate)}
              </p>
            </div>
            <div>
              <span className="text-gray-600 text-sm">Price per Square Foot</span>
              <p className="text-lg font-medium">${analysis.price_per_sqft}</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-800 mb-4">Market Factors</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <div className="flex items-center mb-2">
              <span className="text-green-500 mr-2">✓</span>
              <span className="font-medium">Location</span>
            </div>
            <p className="text-sm text-gray-600">
              Desirable neighborhood with good schools and amenities
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <div className="flex items-center mb-2">
              <span className="text-green-500 mr-2">✓</span>
              <span className="font-medium">Condition</span>
            </div>
            <p className="text-sm text-gray-600">
              Well-maintained property with recent updates
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <div className="flex items-center mb-2">
              <span className="text-green-500 mr-2">✓</span>
              <span className="font-medium">Market Demand</span>
            </div>
            <p className="text-sm text-gray-600">
              Strong demand for this property type in the area
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ComparablesAnalysis({ report }: { report: any }) {
  const comparables = report.data.comparables

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Comparable Sales Analysis</h2>
      
      <div className="space-y-4">
        {comparables.map((comp: any, index: number) => (
          <div key={index} className="bg-white border rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <div>
                <h4 className="font-medium text-gray-900">{comp.address}</h4>
                <p className="text-sm text-gray-600">Sale Date: {new Date(comp.sale_date).toLocaleDateString()}</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(comp.sale_price)}
                </p>
                <p className="text-sm text-gray-600">Sale Price</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-blue-600">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(comp.adjusted_value)}
                </p>
                <p className="text-sm text-gray-600">Adjusted Value</p>
              </div>
              <div className="text-center">
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  comp.similarity_score >= 90 ? 'bg-green-100 text-green-800' :
                  comp.similarity_score >= 80 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {comp.similarity_score}% Match
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">Analysis Summary</h3>
        <p className="text-blue-800 text-sm">
          The comparable sales analysis shows strong support for the estimated value. All comparables 
          are recent sales within a 0.5-mile radius and have been adjusted for differences in size, 
          condition, and features. The adjusted values range from $282,000 to $287,500, with an 
          average of $284,750, supporting our valuation estimate.
        </p>
      </div>
    </div>
  )
}

function PhotosPage({ report }: { report: any }) {
  const photos = report.data.photos

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Property Photos</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {photos.map((photo: any, index: number) => (
          <div key={photo.id} className="bg-gray-100 rounded-lg overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="text-4xl mb-2">📷</div>
                <p className="text-sm">Photo {index + 1}</p>
                <p className="text-xs capitalize">{photo.category}</p>
              </div>
            </div>
            <div className="p-3">
              <p className="text-sm font-medium text-gray-800 capitalize">{photo.category}</p>
              <p className="text-xs text-gray-600">{photo.caption}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-2">Photo Documentation</h3>
        <p className="text-gray-600 text-sm">
          All photos were taken during the property inspection and represent the current condition 
          of the property. Photos include exterior views, interior rooms, and key features that 
          impact the property&apos;s value.
        </p>
      </div>
    </div>
  )
}

function LegalAspects({ report }: { report: any }) {
  const legal = report.data.legal_aspects

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Legal Aspects</h2>
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center mb-2">
          <span className="text-green-600 mr-2">✓</span>
          <span className="font-medium text-green-800">Legal Status: Clear</span>
        </div>
        <p className="text-green-700 text-sm">
          All legal aspects have been verified and are in good standing.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-gray-800 mb-4">Document Verification</h3>
        <div className="space-y-3">
          {legal.documents.map((doc: any, index: number) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white border rounded-lg">
              <div>
                <p className="font-medium text-gray-900 capitalize">{doc.type}</p>
                <p className="text-sm text-gray-600">{doc.description}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                doc.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {doc.verified ? 'Verified' : 'Pending'}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-2">Title Information</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Clear title with no encumbrances</li>
            <li>• Property taxes are current</li>
            <li>• No outstanding liens or judgments</li>
            <li>• Homeowner association fees up to date</li>
          </ul>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-2">Zoning & Restrictions</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Zoned for residential use</li>
            <li>• No deed restrictions affecting value</li>
            <li>• Complies with local building codes</li>
            <li>• No pending legal issues</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function ValuationConclusion({ report }: { report: any }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Valuation Conclusion</h2>
      
      <div className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg">
        <h3 className="text-lg font-medium text-gray-800 mb-2">Final Valuation</h3>
        <p className="text-4xl font-bold text-blue-600 mb-2">
          {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(report.valuation)}
        </p>
        <p className="text-gray-600">As of {new Date(report.updated_at).toLocaleDateString()}</p>
      </div>

      <div>
        <h3 className="font-semibold text-gray-800 mb-4">Valuation Summary</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          Based on our comprehensive analysis of the subject property, including market conditions, 
          comparable sales, and property-specific factors, we conclude that the estimated fair market 
          value of the property located at {report.property_address} is {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(report.valuation)}.
        </p>
        <p className="text-gray-700 leading-relaxed">
          This valuation is supported by recent comparable sales, current market conditions, and the 
          property&apos;s physical condition and location attributes. The confidence level for this 
          valuation is {report.data.market_analysis.confidence_level}%.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-gray-800 mb-4">Key Factors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Positive Factors</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Desirable neighborhood location</li>
              <li>• Well-maintained property condition</li>
              <li>• Recent updates and improvements</li>
              <li>• Strong market demand</li>
              <li>• Clear legal status</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Market Conditions</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Stable pricing trends</li>
              <li>• Low inventory levels</li>
              <li>• Active buyer market</li>
              <li>• Favorable interest rates</li>
              <li>• Economic stability</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-medium text-yellow-800 mb-2">Important Notes</h4>
        <p className="text-yellow-700 text-sm">
          This valuation is based on information available at the time of analysis and current 
          market conditions. Property values may fluctuate based on market changes, economic 
          conditions, and property-specific factors. This report is intended for the specific 
          purpose stated and should not be used for other purposes without additional analysis.
        </p>
      </div>
    </div>
  )
}