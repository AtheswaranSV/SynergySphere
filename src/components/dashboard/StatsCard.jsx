import { TrendingUp, TrendingDown } from 'lucide-react';

const colorClasses = {
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    icon: 'text-blue-600 dark:text-blue-400',
    accent: 'text-blue-600 dark:text-blue-400'
  },
  green: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    icon: 'text-green-600 dark:text-green-400',
    accent: 'text-green-600 dark:text-green-400'
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    icon: 'text-purple-600 dark:text-purple-400',
    accent: 'text-purple-600 dark:text-purple-400'
  },
  yellow: {
    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    icon: 'text-yellow-600 dark:text-yellow-400',
    accent: 'text-yellow-600 dark:text-yellow-400'
  }
};

export default function StatsCard({ title, value, total, icon: Icon, color, trend }) {
  const classes = colorClasses[color] || colorClasses.blue;
  const isPositiveTrend = trend?.startsWith('+');
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className={`p-3 rounded-lg ${classes.bg}`}>
          <Icon className={`h-6 w-6 ${classes.icon}`} />
        </div>
        {trend && (
          <div className={`flex items-center text-sm ${isPositiveTrend ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {isPositiveTrend ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
            {trend}
          </div>
        )}
      </div>
      
      <div className="mt-4">
        <div className="flex items-baseline">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </h3>
          {total && (
            <span className="text-gray-500 dark:text-gray-400 ml-2">
              / {total}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{title}</p>
      </div>
    </div>
  );
}