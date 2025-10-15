import { useState } from 'react';
import SkillGapChart from './SkillGapChart';
import RoadmapTimeline from './RoadmapTimeline';
import SalaryInsights from './SalaryInsights';
import CourseCard from './CourseCard';

const RoadmapView = ({ roadmapData, userProfile, onRefine }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'skills', label: 'Skill Gap', icon: '🎯' },
    { id: 'timeline', label: '6-Month Plan', icon: '📅' },
    { id: 'courses', label: 'Courses', icon: '📚' },
    { id: 'strategy', label: 'Job Search', icon: '💼' },
    { id: 'salary', label: 'Salary', icon: '💰' }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl shadow-xl p-8 mb-8 text-white">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="inline-flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2 mb-4">
              <span className="text-sm font-medium">✨ Your Personalized Career Roadmap</span>
            </div>
            <h1 className="text-4xl font-bold mb-3">
              {userProfile.currentRole} → {userProfile.dreamJob}
            </h1>
            <p className="text-xl text-blue-100 mb-6">
              Your 6-month journey to landing your dream role in {userProfile.location}
            </p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <span className="text-3xl">⏱️</span>
                <div>
                  <p className="text-sm text-blue-100">Duration</p>
                  <p className="text-lg font-semibold">6 Months</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-3xl">📚</span>
                <div>
                  <p className="text-sm text-blue-100">Courses</p>
                  <p className="text-lg font-semibold">{roadmapData.courses?.length || 0} Recommended</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-3xl">🎯</span>
                <div>
                  <p className="text-sm text-blue-100">Skills to Master</p>
                  <p className="text-lg font-semibold">{roadmapData.skillGap?.skillsNeeded?.length || 0} Core Skills</p>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={onRefine}
            className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
          >
            Refine Roadmap
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-md mb-6 border border-gray-200">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-fit px-6 py-4 text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Your Unique Angle */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">💎</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Your Unique Angle</h2>
              </div>
              <div className="space-y-4">
                <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
                  <h3 className="font-semibold text-gray-900 mb-2">Why Your Background is an Asset</h3>
                  <p className="text-gray-700">{roadmapData.uniqueAngle?.asset}</p>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  <h3 className="font-semibold text-gray-900 mb-2">What Makes You Different</h3>
                  <p className="text-gray-700">{roadmapData.uniqueAngle?.differentiator}</p>
                </div>
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                  <h3 className="font-semibold text-gray-900 mb-2">How to Pitch Your Career Switch</h3>
                  <p className="text-gray-700">{roadmapData.uniqueAngle?.pitch}</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4">Success Metrics</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Skill Match</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {roadmapData.skillGap?.matchPercentage || 0}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${roadmapData.skillGap?.matchPercentage || 0}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Ready to Apply</span>
                      <span className="text-sm font-semibold text-gray-900">Month 5</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '83%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Transferable Skills</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {roadmapData.skillGap?.transferableSkills?.length || 0}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '70%' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-md p-6 border border-green-200">
                <div className="text-center">
                  <span className="text-4xl mb-2 block">🎉</span>
                  <h3 className="font-bold text-gray-900 mb-1">Expected Outcome</h3>
                  <p className="text-sm text-gray-600">
                    Ready to interview for {userProfile.dreamJob} roles in {userProfile.location}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <SkillGapChart skillGap={roadmapData.skillGap} />
        )}

        {activeTab === 'timeline' && (
          <RoadmapTimeline timeline={roadmapData.timeline} timeCommitment={userProfile.timeCommitment} />
        )}

        {activeTab === 'courses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roadmapData.courses?.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))}
          </div>
        )}

        {activeTab === 'strategy' && (
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Search Strategy</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-2xl">📅</span>
                  <h3 className="text-lg font-semibold text-gray-900">When to Start Applying</h3>
                </div>
                <p className="text-gray-700 mb-4">{roadmapData.jobSearch?.whenToApply}</p>
                
                <div className="flex items-center space-x-3 mb-4 mt-6">
                  <span className="text-2xl">🏢</span>
                  <h3 className="text-lg font-semibold text-gray-900">Target Companies</h3>
                </div>
                <ul className="space-y-2">
                  {roadmapData.jobSearch?.targetCompanies?.map((company, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span className="text-gray-700">{company}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-2xl">🤝</span>
                  <h3 className="text-lg font-semibold text-gray-900">Networking Approach</h3>
                </div>
                <div className="space-y-3">
                  {roadmapData.jobSearch?.networking?.map((tip, index) => (
                    <div key={index} className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <p className="text-gray-700">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'salary' && (
          <SalaryInsights salaryData={roadmapData.salary} location={userProfile.location} targetRole={userProfile.dreamJob} />
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-8 bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Ready to Start Your Journey?</h3>
            <p className="text-sm text-gray-600">Download your roadmap or share it with a mentor</p>
          </div>
          <div className="flex space-x-3">
            <button className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
              Download PDF
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg">
              Share Roadmap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapView;