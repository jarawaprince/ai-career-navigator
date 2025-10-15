const RoadmapTimeline = ({ timeline, timeCommitment }) => {
  if (!timeline) return null;

  const months = timeline.months || [];

  const getMonthColor = (index) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-purple-500 to-purple-600',
      'from-pink-500 to-pink-600',
      'from-red-500 to-red-600',
      'from-orange-500 to-orange-600',
      'from-green-500 to-green-600'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="space-y-6">
      {/* Timeline Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-md p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Your 6-Month Learning Timeline</h2>
        <p className="text-blue-100">
          Commit {timeCommitment} to this plan. Consistency is key to success!
        </p>
      </div>

      {/* Timeline Visualization */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500" />

        {/* Month Cards */}
        <div className="space-y-8">
          {months.map((month, index) => (
            <div key={index} className="relative pl-20">
              {/* Timeline Dot */}
              <div className={`absolute left-4 w-9 h-9 rounded-full bg-gradient-to-br ${getMonthColor(index)} flex items-center justify-center text-white font-bold shadow-lg`}>
                {index + 1}
              </div>

              {/* Month Card */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow">
                {/* Month Header */}
                <div className={`bg-gradient-to-r ${getMonthColor(index)} p-4 text-white`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold">{month.title}</h3>
                      <p className="text-sm opacity-90">{month.subtitle}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm opacity-90">Time Investment</p>
                      <p className="text-lg font-bold">{month.timePerWeek || timeCommitment}</p>
                    </div>
                  </div>
                </div>

                {/* Month Content */}
                <div className="p-6">
                  {/* Focus Areas */}
                  {month.focusAreas && month.focusAreas.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <span className="text-xl mr-2">🎯</span>
                        Focus Areas
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {month.focusAreas.map((area, areaIndex) => (
                          <div key={areaIndex} className="flex items-start space-x-2 bg-gray-50 p-3 rounded-lg">
                            <span className="text-blue-500 mt-0.5">▸</span>
                            <span className="text-gray-700 text-sm">{area}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Learning Activities */}
                  {month.activities && month.activities.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <span className="text-xl mr-2">📚</span>
                        Learning Activities
                      </h4>
                      <div className="space-y-2">
                        {month.activities.map((activity, actIndex) => (
                          <div key={actIndex} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <input type="checkbox" className="mt-1 w-4 h-4 text-blue-600 rounded" />
                            <span className="text-gray-700 text-sm flex-1">{activity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Project */}
                  {month.project && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <span className="text-xl mr-2">🔨</span>
                        Portfolio Project
                      </h4>
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
                        <h5 className="font-semibold text-gray-900 mb-2">{month.project.name}</h5>
                        <p className="text-gray-700 text-sm mb-3">{month.project.description}</p>
                        {month.project.skills && (
                          <div className="flex flex-wrap gap-2">
                            {month.project.skills.map((skill, skillIndex) => (
                              <span key={skillIndex} className="px-2 py-1 bg-white text-purple-700 text-xs font-medium rounded-full border border-purple-200">
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Milestones */}
                  {month.milestones && month.milestones.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <span className="text-xl mr-2">🏆</span>
                        Milestones
                      </h4>
                      <div className="space-y-2">
                        {month.milestones.map((milestone, milestoneIndex) => (
                          <div key={milestoneIndex} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                            <span className="text-green-600 text-lg">✓</span>
                            <span className="text-gray-700 text-sm">{milestone}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Resources */}
                  {month.resources && month.resources.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <span className="text-xl mr-2">🔗</span>
                        Resources
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {month.resources.map((resource, resourceIndex) => (
                          <a
                            key={resourceIndex}
                            href={resource.url || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <span className="mr-1">📎</span>
                            {resource.name || resource}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Progress Indicator */}
                <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Month {index + 1} of 6</span>
                    <span className="font-semibold text-gray-900">
                      {Math.round(((index + 1) / 6) * 100)}% Complete
                    </span>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className={`bg-gradient-to-r ${getMonthColor(index)} h-1.5 rounded-full transition-all`}
                      style={{ width: `${((index + 1) / 6) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Card */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Timeline Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Total Duration</p>
            <p className="text-2xl font-bold text-blue-600">6 Months</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Projects</p>
            <p className="text-2xl font-bold text-purple-600">
              {months.filter(m => m.project).length}
            </p>
          </div>
          <div className="text-center p-4 bg-pink-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Skills</p>
            <p className="text-2xl font-bold text-pink-600">
              {months.reduce((acc, m) => acc + (m.focusAreas?.length || 0), 0)}
            </p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Weekly Time</p>
            <p className="text-2xl font-bold text-green-600">{timeCommitment.split('/')[0]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapTimeline;