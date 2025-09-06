import { useState } from 'react';
import { Brain, TrendingUp, AlertTriangle, Lightbulb, Zap, RefreshCw } from 'lucide-react';
import { aiInsights } from '../../lib/mockData';

export default function AIInsights() {
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState(aiInsights);

  const generateNewInsights = async () => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate new mock insights
    const newInsights = {
      projectSummary: "Team velocity has increased by 15% this week! The E-Commerce Platform is now 85% complete with excellent code quality metrics. Consider moving some resources to the Mobile App Redesign to accelerate delivery.",
      delayPrediction: "✅ Good News: All current projects are on track for their deadlines. The improved task distribution and recent performance improvements have reduced delivery risks significantly.",
      performanceCoaching: {
        poorPerformer: "ragav",
        suggestions: [
          "Implement pair programming sessions with senior developers",
          "Provide additional training on automated testing tools",
          "Assign a mentor for technical guidance and support",
          "Break complex tasks into smaller, achievable milestones"
        ]
      }
    };
    
    setInsights(newInsights);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Insights</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Smart recommendations and predictions powered by AI
          </p>
        </div>
        
        <button
          onClick={generateNewInsights}
          disabled={loading}
          className="mt-4 md:mt-0 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white px-6 py-3 rounded-lg flex items-center font-semibold transition-colors duration-200"
        >
          {loading ? (
            <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
          ) : (
            <Zap className="h-5 w-5 mr-2" />
          )}
          {loading ? 'Generating...' : 'Generate AI Insights'}
        </button>
      </div>

      {/* AI Insights Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 col-span-1 lg:col-span-2">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg mr-4">
              <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Task Summarizer</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Project progress overview</p>
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/10 rounded-lg p-4">
            <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
              {insights.projectSummary}
            </p>
          </div>
        </div>

        {/* Delay Prediction */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-amber-100 dark:bg-amber-900/20 rounded-lg mr-4">
              <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Delay Predictor</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Deadline risk analysis</p>
            </div>
          </div>
          
          <div className="bg-amber-50 dark:bg-amber-900/10 rounded-lg p-4">
            <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
              {insights.delayPrediction}
            </p>
          </div>
        </div>

        {/* Performance Coaching */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg mr-4">
              <Lightbulb className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Performance Coach</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Improvement suggestions</p>
            </div>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/10 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Recommendations for {insights.performanceCoaching.poorPerformer}:
            </p>
            <ul className="space-y-2">
              {insights.performanceCoaching.suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                  <span className="text-green-600 mr-2">•</span>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* AI Analytics Dashboard */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center mb-6">
          <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg mr-4">
            <Brain className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Analytics Dashboard</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Real-time insights and metrics</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-900 dark:text-blue-300">Team Efficiency</span>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-900 dark:text-blue-200">87%</p>
            <p className="text-xs text-blue-700 dark:text-blue-400">+12% from last week</p>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-green-900 dark:text-green-300">Quality Score</span>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-900 dark:text-green-200">94%</p>
            <p className="text-xs text-green-700 dark:text-green-400">Code quality metrics</p>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-purple-900 dark:text-purple-300">Risk Level</span>
              <AlertTriangle className="h-4 w-4 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-900 dark:text-purple-200">Low</p>
            <p className="text-xs text-purple-700 dark:text-purple-400">Project delivery risk</p>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center max-w-sm w-full mx-4">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Analyzing Team Data...
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              AI is processing performance metrics and generating insights
            </p>
          </div>
        </div>
      )}
    </div>
  );
}