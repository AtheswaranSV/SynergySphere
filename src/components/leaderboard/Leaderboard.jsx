import { useState } from 'react';
import { Trophy, Award, TrendingUp, TrendingDown, Flag, Mail } from 'lucide-react';
import { mockUsers } from '../../lib/mockData';
import EmailPreviewModal from './EmailPreviewModal';

export default function Leaderboard() {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Sort users by performance score
  const sortedUsers = [...mockUsers].sort((a, b) => b.performance_score - a.performance_score);
  
  const topPerformers = sortedUsers.filter(user => user.performance_score >= 80);
  const poorPerformers = sortedUsers.filter(user => user.performance_score < 50);

  const getRankIcon = (index) => {
    if (index === 0) return <Trophy className="h-6 w-6 text-yellow-500" />;
    if (index === 1) return <Award className="h-6 w-6 text-gray-400" />;
    if (index === 2) return <Award className="h-6 w-6 text-amber-600" />;
    return <span className="text-lg font-bold text-gray-500">#{index + 1}</span>;
  };

  const getPerformanceColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
    if (score >= 80) return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
    return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
  };

  const handleSendWarning = (user) => {
    setSelectedUser(user);
    setShowEmailModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Performance Leaderboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Team performance rankings and achievements
        </p>
      </div>

      {/* Top Performers Highlight */}
      <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
        <div className="flex items-center mb-4">
          <Trophy className="h-8 w-8 text-yellow-600 mr-3" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Top Performers 🏆</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topPerformers.slice(0, 3).map((user, index) => (
            <div key={user.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <div className="flex items-center mb-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full mr-3"
                />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{user.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{user.role}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPerformanceColor(user.performance_score)}`}>
                  {user.performance_score}%
                </span>
                {getRankIcon(sortedUsers.findIndex(u => u.id === user.id))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Leaderboard */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Team Rankings</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Completed
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Pending
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  On-time Rate
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {sortedUsers.map((user, index) => (
                <tr 
                  key={user.id} 
                  className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 ${
                    user.performance_score < 50 ? 'bg-red-50 dark:bg-red-900/10' : ''
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getRankIcon(index)}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full mr-4"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {user.name}
                          {user.performance_score < 50 && <Flag className="inline h-4 w-4 text-red-500 ml-2" />}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{user.role}</div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPerformanceColor(user.performance_score)}`}>
                      {user.performance_score}%
                    </span>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                      {user.tasks_completed}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {user.tasks_pending}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-900 dark:text-white mr-2">{user.on_time_rate}%</span>
                      <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${user.on_time_rate >= 80 ? 'bg-green-500' : user.on_time_rate >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${user.on_time_rate}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {user.performance_score < 50 && (
                      <button
                        onClick={() => handleSendWarning(user)}
                        className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-lg text-xs font-medium transition-colors duration-200 flex items-center ml-auto"
                      >
                        <Mail className="h-3 w-3 mr-1" />
                        Send Warning
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Poor Performers Alert */}
      {poorPerformers.length > 0 && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <Flag className="h-8 w-8 text-red-600 mr-3" />
            <h2 className="text-xl font-bold text-red-900 dark:text-red-300">Attention Required 🚩</h2>
          </div>
          <p className="text-red-800 dark:text-red-300 mb-4">
            {poorPerformers.length} team member{poorPerformers.length !== 1 ? 's' : ''} need immediate attention and support.
          </p>
          <div className="space-y-2">
            {poorPerformers.map(user => (
              <div key={user.id} className="flex items-center justify-between bg-white dark:bg-red-900/30 rounded-lg p-3">
                <div className="flex items-center">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full mr-3"
                  />
                  <div>
                    <span className="font-medium text-red-900 dark:text-red-200">{user.name}</span>
                    <span className="text-red-700 dark:text-red-300 ml-2">({user.performance_score}%)</span>
                  </div>
                </div>
                <button
                  onClick={() => handleSendWarning(user)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
                >
                  <Mail className="h-4 w-4 mr-1" />
                  Send Warning
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Email Preview Modal */}
      {showEmailModal && selectedUser && (
        <EmailPreviewModal
          user={selectedUser}
          onClose={() => setShowEmailModal(false)}
        />
      )}
    </div>
  );
}