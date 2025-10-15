const SalaryInsights = ({ salaryData, location, targetRole }) => {
  if (!salaryData) return null;

  const formatSalary = (amount) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Hero Salary Card */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-xl p-8 text-white">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-green-100 mb-2">Expected Salary Range in {location}</p>
            <h2 className="text-5xl font-bold mb-4">
              {formatSalary(salaryData.min)} - {formatSalary(salaryData.max)}
            </h2>
            <div className="flex items-center space-x-6">
              <div>
                <p className="text-sm text-green-100">Average</p>
                <p className="text-2xl font-bold">{formatSalary(salaryData.average)}</p>
              </div>
              <div>
                <p className="text-sm text-green-100">Median</p>
                <p className="text-2xl font-bold">{formatSalary(salaryData.median)}</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className="text-6xl">💰</span>
          </div>
        </div>
      </div>

      {/* Salary Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* By Experience Level */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Salary by Experience Level</h3>
          <div className="space-y-4">
            {salaryData.byExperience?.map((level, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{level.level}</span>
                  <span className="text-sm font-bold text-gray-900">
                    {formatSalary(level.salary)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all"
                    style={{ width: `${(level.salary / salaryData.max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* By City */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Salary by Australian City</h3>
          <div className="space-y-4">
            {salaryData.byCity?.map((city, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-700">{city.name}</span>
                    {city.name === location && (
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                        Your Target
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-bold text-gray-900">
                    {formatSalary(city.averageSalary)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all ${
                      city.name === location
                        ? 'bg-gradient-to-r from-blue-400 to-blue-600'
                        : 'bg-gradient-to-r from-purple-400 to-purple-600'
                    }`}
                    style={{ width: `${(city.averageSalary / salaryData.max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Market Insights */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <span className="text-2xl mr-3">📊</span>
          Market Insights for {targetRole}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Demand */}
          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
            <span className="text-3xl mb-2 block">📈</span>
            <p className="text-sm text-gray-600 mb-1">Job Market Demand</p>
            <p className="text-2xl font-bold text-blue-600">
              {salaryData.marketInsights?.demand || 'High'}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {salaryData.marketInsights?.demandTrend || 'Growing 15% YoY'}
            </p>
          </div>

          {/* Competition */}
          <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
            <span className="text-3xl mb-2 block">👥</span>
            <p className="text-sm text-gray-600 mb-1">Competition Level</p>
            <p className="text-2xl font-bold text-purple-600">
              {salaryData.marketInsights?.competition || 'Moderate'}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {salaryData.marketInsights?.competitionNote || 'Strong portfolio helps'}
            </p>
          </div>

          {/* Growth */}
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
            <span className="text-3xl mb-2 block">🚀</span>
            <p className="text-sm text-gray-600 mb-1">Career Growth</p>
            <p className="text-2xl font-bold text-green-600">
              {salaryData.marketInsights?.growthPotential || 'Excellent'}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {salaryData.marketInsights?.growthNote || '+30% in 3-5 years'}
            </p>
          </div>
        </div>
      </div>

      {/* Salary Negotiation Tips */}
      {salaryData.negotiationTips && salaryData.negotiationTips.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="text-2xl mr-3">💡</span>
            Salary Negotiation Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {salaryData.negotiationTips.map((tip, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <span className="text-yellow-600 text-lg mt-0.5">💼</span>
                <p className="text-sm text-gray-700">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Benefits to Negotiate */}
      {salaryData.benefits && salaryData.benefits.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="text-2xl mr-3">🎁</span>
            Common Benefits to Negotiate
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {salaryData.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <span className="text-lg">✓</span>
                <span className="text-sm text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Salary Timeline */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-md p-6 border border-blue-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Your Salary Growth Projection</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white rounded-lg">
            <div>
              <p className="font-semibold text-gray-900">Entry Level (Now)</p>
              <p className="text-sm text-gray-600">With completed roadmap</p>
            </div>
            <p className="text-xl font-bold text-blue-600">{formatSalary(salaryData.byExperience?.[0]?.salary || salaryData.min)}</p>
          </div>
          <div className="flex items-center justify-between p-4 bg-white rounded-lg">
            <div>
              <p className="font-semibold text-gray-900">After 2 Years</p>
              <p className="text-sm text-gray-600">With experience & portfolio</p>
            </div>
            <p className="text-xl font-bold text-purple-600">{formatSalary(salaryData.byExperience?.[1]?.salary || salaryData.average)}</p>
          </div>
          <div className="flex items-center justify-between p-4 bg-white rounded-lg">
            <div>
              <p className="font-semibold text-gray-900">After 5 Years</p>
              <p className="text-sm text-gray-600">Senior level potential</p>
            </div>
            <p className="text-xl font-bold text-green-600">{formatSalary(salaryData.byExperience?.[2]?.salary || salaryData.max)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryInsights;