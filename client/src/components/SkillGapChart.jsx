const SkillGapChart = ({ skillGap }) => {
  if (!skillGap) return null;

  const { currentSkills = [], skillsNeeded = [], transferableSkills = [] } = skillGap;

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-green-50 rounded-xl shadow-md p-6 border border-green-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Skills You Have</h3>
            <span className="text-3xl">✅</span>
          </div>
          <p className="text-4xl font-bold text-green-600 mb-2">{currentSkills.length}</p>
          <p className="text-sm text-gray-600">Ready to leverage</p>
        </div>

        <div className="bg-blue-50 rounded-xl shadow-md p-6 border border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Skills to Learn</h3>
            <span className="text-3xl">📚</span>
          </div>
          <p className="text-4xl font-bold text-blue-600 mb-2">{skillsNeeded.length}</p>
          <p className="text-sm text-gray-600">Focus areas</p>
        </div>

        <div className="bg-purple-50 rounded-xl shadow-md p-6 border border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Transferable</h3>
            <span className="text-3xl">🔄</span>
          </div>
          <p className="text-4xl font-bold text-purple-600 mb-2">{transferableSkills.length}</p>
          <p className="text-sm text-gray-600">Your advantage</p>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skills You Have */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Skills You Already Have</h3>
          </div>
          <div className="space-y-3">
            {currentSkills.map((skill, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{skill.name}</p>
                  {skill.level && (
                    <p className="text-sm text-gray-600">Level: {skill.level}</p>
                  )}
                </div>
                <span className="text-green-600 font-semibold">✓</span>
              </div>
            ))}
          </div>
        </div>

        {/* Skills to Learn */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📚</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Skills to Learn</h3>
          </div>
          <div className="space-y-3">
            {skillsNeeded.map((skill, index) => (
              <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-gray-900">{skill.name}</p>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    skill.priority === 'high' 
                      ? 'bg-red-100 text-red-700' 
                      : skill.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {skill.priority || 'Medium'} Priority
                  </span>
                </div>
                {skill.timeToLearn && (
                  <p className="text-sm text-gray-600">⏱️ ~{skill.timeToLearn} to learn</p>
                )}
                {skill.difficulty && (
                  <p className="text-sm text-gray-600">📊 Difficulty: {skill.difficulty}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transferable Skills */}
      {transferableSkills.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🔄</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Your Transferable Skills</h3>
              <p className="text-sm text-gray-600">These skills from your current role will help you succeed</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {transferableSkills.map((skill, index) => (
              <div key={index} className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <p className="font-semibold text-gray-900 mb-2">{skill.name}</p>
                <p className="text-sm text-gray-600">{skill.howItHelps}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Learning Path Summary */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-md p-6 text-white">
        <h3 className="text-xl font-bold mb-4">Your Learning Path Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/20 rounded-lg p-4">
            <p className="text-sm mb-1">Total Skills to Master</p>
            <p className="text-3xl font-bold">{skillsNeeded.length}</p>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <p className="text-sm mb-1">Estimated Time</p>
            <p className="text-3xl font-bold">6 months</p>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <p className="text-sm mb-1">Success Rate</p>
            <p className="text-3xl font-bold">87%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillGapChart;