import { X, Mail, Send, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function EmailPreviewModal({ user, onClose }) {
  const [emailSent, setEmailSent] = useState(false);

  const emailContent = {
    subject: 'Performance Alert – Immediate Improvement Required',
    body: `Hi ${user.name},

Our performance review shows your current score is **${user.performance_score}%**, which places you in the **Danger Zone** for this project.

Key issues identified:
• Pending tasks: ${user.tasks_pending}
• On-time completion: ${user.on_time_rate}%

To improve, please:
• Prioritize high-urgency tasks immediately
• Communicate blockers early with your team lead
• Break large tasks into smaller milestones

With focus and consistency, you can recover your performance before the next review cycle.

— SynergySphere AI Insights`
  };

  const handleSendEmail = () => {
    // Simulate sending email
    setEmailSent(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  if (emailSent) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6 text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Email Sent Successfully!
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Performance warning has been sent to {user.name}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <Mail className="h-6 w-6 text-blue-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Email Preview
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Email Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-16">To:</span>
                <div className="flex items-center">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-6 h-6 rounded-full mr-2"
                  />
                  <span className="text-sm text-gray-900 dark:text-white">{user.name} ({user.email})</span>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-16">From:</span>
                <span className="text-sm text-gray-900 dark:text-white">SynergySphere AI Insights</span>
              </div>
              <div className="flex items-start">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-16">Subject:</span>
                <span className="text-sm font-medium text-red-600 dark:text-red-400">{emailContent.subject}</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <pre className="text-sm text-gray-900 dark:text-white whitespace-pre-wrap font-sans leading-relaxed">
              {emailContent.body}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            This email will be sent automatically based on performance metrics.
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSendEmail}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 flex items-center"
            >
              <Send className="h-4 w-4 mr-2" />
              Send Warning Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}