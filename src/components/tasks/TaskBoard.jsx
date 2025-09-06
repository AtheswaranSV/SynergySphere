import { Calendar, User, Flag, MessageCircle } from 'lucide-react';
import { format, isPast } from 'date-fns';

const columns = [
  { id: 'todo', title: 'To Do', color: 'border-gray-300' },
  { id: 'in_progress', title: 'In Progress', color: 'border-blue-300' },
  { id: 'completed', title: 'Done', color: 'border-green-300' }
];

export default function TaskBoard({ tasks, users, projects }) {
  const getTasksByStatus = (status) => {
    return tasks.filter(task => {
      if (status === 'todo') return task.status === 'todo';
      if (status === 'in_progress') return task.status === 'in_progress';
      if (status === 'completed') return task.status === 'completed';
      return false;
    });
  };

  const getAssignee = (assigneeId) => {
    return users.find(user => user.id === assigneeId);
  };

  const getProject = (projectId) => {
    return projects.find(project => project.id === projectId);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {columns.map(column => {
        const columnTasks = getTasksByStatus(column.id);
        
        return (
          <div key={column.id} className="flex flex-col">
            <div className={`border-t-4 ${column.color} bg-white dark:bg-gray-800 rounded-lg shadow-sm`}>
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{column.title}</h3>
                  <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full text-sm">
                    {columnTasks.length}
                  </span>
                </div>
              </div>
              
              <div className="p-4 space-y-4 min-h-96">
                {columnTasks.map(task => {
                  const assignee = getAssignee(task.assignee_id);
                  const project = getProject(task.project_id);
                  const isOverdue = isPast(new Date(task.deadline)) && task.status !== 'completed';
                  
                  return (
                    <div
                      key={task.id}
                      className={`bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 cursor-pointer border-l-4 ${
                        isOverdue ? 'border-red-500' : 'border-transparent'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-2">
                          {task.title}
                        </h4>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                      
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                        {task.description}
                      </p>

                      {project && (
                        <div className="text-xs text-blue-600 dark:text-blue-400 mb-3 font-medium">
                          {project.name}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span className={isOverdue ? 'text-red-600 font-medium' : ''}>
                            {format(new Date(task.deadline), 'MMM dd')}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <MessageCircle className="h-3 w-3" />
                          <span>2</span>
                          
                          {assignee && (
                            <div className="flex items-center ml-2">
                              <img
                                src={assignee.avatar}
                                alt={assignee.name}
                                className="w-5 h-5 rounded-full"
                                title={assignee.name}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                {columnTasks.length === 0 && (
                  <div className="text-center py-8 text-gray-400 dark:text-gray-500">
                    <p className="text-sm">No tasks in this column</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}