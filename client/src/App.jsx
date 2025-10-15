import { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import OnboardingFlow from './components/OnboardingFlow';
import RoadmapView from './components/RoadmapView';

function App() {
  const [step, setStep] = useState('onboarding');
  const [userProfile, setUserProfile] = useState(null);
  const [roadmapData, setRoadmapData] = useState(null);
  const [conversationHistory, setConversationHistory] = useState([]);

  const handleOnboardingComplete = (profile) => {
    setUserProfile(profile);
    setStep('chat');
  };

  const handleRoadmapGenerated = (data) => {
    setRoadmapData(data);
    setStep('roadmap');
  };

  const handleStartOver = () => {
    setStep('onboarding');
    setUserProfile(null);
    setRoadmapData(null);
    setConversationHistory([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">🎯</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  AU AI-Proof Career Navigator
                </h1>
                <p className="text-sm text-gray-600">
                  Future-proof your career with data-driven AI insights
                </p>
              </div>
            </div>
            {step !== 'onboarding' && (
              <button
                onClick={handleStartOver}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Start Over
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {step === 'onboarding' && (
          <OnboardingFlow onComplete={handleOnboardingComplete} />
        )}

        {step === 'chat' && (
          <ChatInterface
            userProfile={userProfile}
            onRoadmapGenerated={handleRoadmapGenerated}
            conversationHistory={conversationHistory}
            setConversationHistory={setConversationHistory}
          />
        )}

        {step === 'roadmap' && roadmapData && (
          <RoadmapView
            roadmapData={roadmapData}
            userProfile={userProfile}
            onRefine={() => setStep('chat')}
          />
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-600">
            Powered by Australian job & skills datasets • Built with AI for your career growth
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;