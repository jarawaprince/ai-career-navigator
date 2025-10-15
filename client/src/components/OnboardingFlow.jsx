import { useState } from 'react';

const OnboardingFlow = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    currentRole: '',
    experience: '',
    dreamJob: '',
    timeCommitment: '',
    location: 'Sydney',
    background: ''
  });

  const steps = [
    {
      title: "Let's start with where you are now",
      subtitle: "Understanding your current position",
      fields: [
        {
          name: 'currentRole',
          label: 'What is your current role?',
          placeholder: 'e.g., Marketing Coordinator, Software Engineer, Sales Manager',
          type: 'text'
        },
        {
          name: 'experience',
          label: 'How many years of experience do you have?',
          type: 'select',
          options: ['0-1 years', '1-3 years', '3-5 years', '5-10 years', '10+ years']
        }
      ]
    },
    {
      title: "Where do you want to go?",
      subtitle: "Your dream career destination",
      fields: [
        {
          name: 'dreamJob',
          label: 'What is your target role?',
          placeholder: 'e.g., Data Scientist, Product Manager, UX Designer',
          type: 'text'
        },
        {
          name: 'location',
          label: 'Which Australian city are you targeting?',
          type: 'select',
          options: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Canberra', 'Remote']
        }
      ]
    },
    {
      title: "Let's make this realistic",
      subtitle: "Your learning capacity and background",
      fields: [
        {
          name: 'timeCommitment',
          label: 'How many hours per week can you dedicate to learning?',
          type: 'select',
          options: ['5-10 hours', '10-15 hours', '15-20 hours', '20+ hours']
        },
        {
          name: 'background',
          label: 'Tell us about your relevant skills and background',
          placeholder: 'e.g., I have a marketing degree, strong in content creation, some experience with Google Analytics...',
          type: 'textarea'
        }
      ]
    }
  ];

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isStepValid = () => {
    const currentFields = steps[currentStep].fields;
    return currentFields.every(field => formData[field.name]?.trim());
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / 3) * 100;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-sm font-medium text-blue-600">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {steps[currentStep].title}
          </h2>
          <p className="text-gray-600">{steps[currentStep].subtitle}</p>
        </div>

        <div className="space-y-6">
          {steps[currentStep].fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {field.label}
              </label>
              {field.type === 'text' && (
                <input
                  type="text"
                  value={formData[field.name]}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              )}
              {field.type === 'select' && (
                <select
                  value={formData[field.name]}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select an option...</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
              {field.type === 'textarea' && (
                <textarea
                  value={formData[field.name]}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                />
              )}
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={!isStepValid()}
            className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
          >
            {currentStep === steps.length - 1 ? 'Generate My Roadmap' : 'Continue'}
          </button>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="text-2xl mb-2">📊</div>
          <h3 className="font-semibold text-gray-900 mb-1">Data-Driven</h3>
          <p className="text-sm text-gray-600">Based on 250+ Australian job postings and salary data</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
          <div className="text-2xl mb-2">🎯</div>
          <h3 className="font-semibold text-gray-900 mb-1">Personalized</h3>
          <p className="text-sm text-gray-600">Custom roadmap based on your background and goals</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="text-2xl mb-2">⏱️</div>
          <h3 className="font-semibold text-gray-900 mb-1">Realistic Timeline</h3>
          <p className="text-sm text-gray-600">6-month plan adapted to your available time</p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;