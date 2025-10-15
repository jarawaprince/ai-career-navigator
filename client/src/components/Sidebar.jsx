import { BookOpen, Briefcase, TrendingUp, Users, MapPin } from 'lucide-react'
import { SAMPLE_QUERIES } from '../config'

export default function Sidebar() {
  return (
    <aside className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-6">
        {/* Quick Stats */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
            <TrendingUp className="w-4 h-4 mr-2 text-purple-600" />
            Australian Job Market
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">AI Skills Premium</span>
              <span className="font-bold text-green-600">+43-56%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Workers Upskilling</span>
              <span className="font-bold text-purple-600">62%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Tech Jobs Needed</span>
              <span className="font-bold text-blue-600">300k by 2030</span>
            </div>
          </div>
        </div>

        {/* Sample Queries */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
            <BookOpen className="w-4 h-4 mr-2 text-purple-600" />
            Try Asking
          </h3>
          <div className="space-y-2">
            {SAMPLE_QUERIES.slice(0, 5).map((query, index) => (
              <button
                key={index}
                className="w-full text-left px-3 py-2 text-sm bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg transition-colors"
                onClick={() => {
                  // This will be connected to the chat input
                  const event = new CustomEvent('setSampleQuery', { detail: query })
                  window.dispatchEvent(event)
                }}
              >
                {query}
              </button>
            ))}
          </div>
        </div>

        {/* Popular Pathways */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
            <Briefcase className="w-4 h-4 mr-2 text-purple-600" />
            Popular Pathways
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-gray-800">Admin → Business Analyst</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  +47%
                </span>
              </div>
              <p className="text-xs text-gray-600">5-7 months • TAFE + Power BI</p>
            </div>
            
            <div className="p-3 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-gray-800">Grad → ML Engineer</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  +52%
                </span>
              </div>
              <p className="text-xs text-gray-600">3-4 months • Portfolio projects</p>
            </div>

            <div className="p-3 bg-gradient-to-r from-green-50 to-purple-50 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-gray-800">Accountant → Data Analyst</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  +28%
                </span>
              </div>
              <p className="text-xs text-gray-600">6-8 months • Python + CPA courses</p>
            </div>
          </div>
        </div>

        {/* Cities */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-purple-600" />
            Major Cities
          </h3>
          <div className="flex flex-wrap gap-2">
            {['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'].map((city) => (
              <span
                key={city}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-purple-100 hover:text-purple-700 cursor-pointer transition-colors"
              >
                {city}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Powered by Australian job market data<br />
            Jobs & Skills Australia • PwC • SEEK
          </p>
        </div>
      </div>
    </aside>
  )
}