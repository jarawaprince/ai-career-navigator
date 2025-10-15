import { useState, useRef, useEffect } from 'react';

const ChatInterface = ({ userProfile, onRoadmapGenerated, conversationHistory, setConversationHistory }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversationHistory]);

  // Initialize conversation with AI greeting
  useEffect(() => {
    if (conversationHistory.length === 0) {
      const greeting = {
        role: 'assistant',
        content: `Great! I can see you're currently a **${userProfile.currentRole}** with **${userProfile.experience}** of experience, looking to transition into **${userProfile.dreamJob}**.

I'll help you create a personalized 6-month roadmap to make this transition successful. Let me ask you a few clarifying questions to make your roadmap as relevant as possible:

1. What specific aspects of ${userProfile.dreamJob} excite you the most?
2. Are there any particular companies or industries you're targeting in ${userProfile.location}?
3. What's your biggest concern about making this career switch?

Feel free to share as much detail as you'd like, or you can skip ahead and ask me to generate your roadmap now!`
      };
      setConversationHistory([greeting]);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setConversationHistory(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          userProfile,
          conversationHistory
        })
      });

      const data = await response.json();
      
      const assistantMessage = { role: 'assistant', content: data.response };
      setConversationHistory(prev => [...prev, assistantMessage]);

      // Check if roadmap is ready
      if (data.roadmapReady && data.roadmap) {
        onRoadmapGenerated(data.roadmap);
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      };
      setConversationHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = [
    "What skills do I need to learn?",
    "Generate my full roadmap now",
    "What's the realistic timeline?",
    "Show me salary expectations"
  ];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Profile Summary Card */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-200">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Your Career Journey</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 text-lg">📍</span>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Current Role</p>
                  <p className="text-sm font-semibold text-gray-900">{userProfile.currentRole}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 text-lg">🎯</span>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Target Role</p>
                  <p className="text-sm font-semibold text-gray-900">{userProfile.dreamJob}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 text-lg">⏱️</span>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Time Commitment</p>
                  <p className="text-sm font-semibold text-gray-900">{userProfile.timeCommitment}/week</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-orange-600 text-lg">📍</span>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Location</p>
                  <p className="text-sm font-semibold text-gray-900">{userProfile.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 flex flex-col h-[600px]">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {conversationHistory.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-3xl rounded-lg p-4 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xl">🤖</span>
                    <span className="font-semibold text-sm">Career Navigator AI</span>
                  </div>
                )}
                <div className="prose prose-sm max-w-none whitespace-pre-line">
                  {message.content}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        {conversationHistory.length <= 2 && (
          <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
            <p className="text-xs font-medium text-gray-600 mb-2">Quick actions:</p>
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => setInput(action)}
                  className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-6 border-t border-gray-200">
          <form onSubmit={handleSubmit} className="flex space-x-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about your career transition..."
              disabled={isLoading}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;