const CourseCard = ({ course }) => {
  if (!course) return null;

  const getPlatformColor = (platform) => {
    const colors = {
      'Coursera': 'bg-blue-100 text-blue-700 border-blue-200',
      'Udemy': 'bg-purple-100 text-purple-700 border-purple-200',
      'edX': 'bg-red-100 text-red-700 border-red-200',
      'LinkedIn Learning': 'bg-indigo-100 text-indigo-700 border-indigo-200',
      'YouTube': 'bg-red-100 text-red-700 border-red-200',
      'Free': 'bg-green-100 text-green-700 border-green-200'
    };
    return colors[platform] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getDifficultyColor = (level) => {
    const colors = {
      'Beginner': 'bg-green-100 text-green-700',
      'Intermediate': 'bg-yellow-100 text-yellow-700',
      'Advanced': 'bg-red-100 text-red-700'
    };
    return colors[level] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      {/* Course Header */}
      <div className="p-6 flex-1">
        <div className="flex items-start justify-between mb-3">
          <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getPlatformColor(course.platform)}`}>
            {course.platform}
          </div>
          {course.price === 0 || course.price === 'Free' ? (
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold border border-green-200">
              FREE
            </span>
          ) : (
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
              ${course.price || 'N/A'}
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {course.name}
        </h3>

        {course.instructor && (
          <p className="text-sm text-gray-600 mb-3">
            👤 {course.instructor}
          </p>
        )}

        {course.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            {course.description}
          </p>
        )}

        {/* Course Metrics */}
        <div className="flex flex-wrap gap-3 mb-4">
          {course.duration && (
            <div className="flex items-center text-sm text-gray-600">
              <span className="mr-1">⏱️</span>
              {course.duration}
            </div>
          )}
          {course.difficulty && (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course.difficulty)}`}>
              {course.difficulty}
            </span>
          )}
          {course.rating && (
            <div className="flex items-center text-sm text-gray-600">
              <span className="mr-1">⭐</span>
              {course.rating}
            </div>
          )}
        </div>

        {/* Skills Covered */}
        {course.skills && course.skills.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-700 mb-2">Skills you'll learn:</p>
            <div className="flex flex-wrap gap-2">
              {course.skills.slice(0, 4).map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-200"
                >
                  {skill}
                </span>
              ))}
              {course.skills.length > 4 && (
                <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full border border-gray-200">
                  +{course.skills.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Why Recommended */}
        {course.whyRecommended && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-4">
            <p className="text-xs font-semibold text-purple-900 mb-1">💡 Why recommended:</p>
            <p className="text-xs text-purple-700">{course.whyRecommended}</p>
          </div>
        )}

        {/* Month Recommendation */}
        {course.recommendedMonth && (
          <div className="flex items-center text-sm text-gray-600 mb-4">
            <span className="mr-2">📅</span>
            <span>Best to start in <strong>Month {course.recommendedMonth}</strong></span>
          </div>
        )}
      </div>

      {/* Course Actions */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="flex space-x-2">
          <a
            href={course.url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium text-center rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
          >
            View Course
          </a>
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
            ⭐
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;