import { useState } from 'react';
import { Plus, Search, Filter, Calendar, Users, MoreHorizontal, X } from 'lucide-react';
import { mockProjects, mockUsers } from '../../lib/mockData';
import { format } from 'date-fns';

export default function Projects() {
  const [projects, setProjects] = useState(mockProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [addingToProject, setAddingToProject] = useState(null); // Project id for adding members

  const filteredProjects = projects.filter(project => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = status => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'on_hold':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getTeamMembers = memberIds => mockUsers.filter(user => memberIds.includes(user.id));

  const handleAddMember = (projectId, userId) => {
    setProjects(prev =>
      prev.map(p =>
        p.id === projectId && !p.team_members.includes(userId)
          ? { ...p, team_members: [...p.team_members, userId] }
          : p
      )
    );
    setAddingToProject(null); // Close modal after adding
  };

  const handleRemoveMember = (projectId, userId) => {
    setProjects(prev =>
      prev.map(p =>
        p.id === projectId
          ? { ...p, team_members: p.team_members.filter(id => id !== userId) }
          : p
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Projects</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage and track your team projects</p>
        </div>
        <button className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center font-semibold transition-colors duration-200">
          <Plus className="h-5 w-5 mr-2" />
          New Project
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="on_hold">On Hold</option>
        </select>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(project => {
          const teamMembers = getTeamMembers(project.team_members);
          const availableMembers = mockUsers.filter(u => !project.team_members.includes(u.id));

          return (
            <div
              key={project.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{project.name}</h3>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        project.status
                      )}`}
                    >
                      {project.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Progress</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                {/* Timeline */}
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>
                    {format(new Date(project.start_date), 'MMM dd')} -{' '}
                    {format(new Date(project.end_date), 'MMM dd, yyyy')}
                  </span>
                </div>

                {/* Team */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {teamMembers.length} member{teamMembers.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <button
                    className="text-sm text-blue-600 hover:underline"
                    onClick={() => setAddingToProject(project.id)}
                  >
                    Add Member
                  </button>
                </div>

                <div className="flex -space-x-2 mb-4">
                  {teamMembers.map(member => (
                    <div key={member.id} className="relative">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800"
                        title={member.name}
                      />
                      <button
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs hover:bg-red-600"
                        onClick={() => handleRemoveMember(project.id, member.id)}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add Member Modal */}
                {addingToProject === project.id && (
                  <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg space-y-2">
                    {availableMembers.length === 0 && <p className="text-gray-500 dark:text-gray-300 text-sm">All users added</p>}
                    {availableMembers.map(user => (
                      <button
                        key={user.id}
                        className="w-full text-left px-3 py-1 hover:bg-blue-100 dark:hover:bg-blue-800 rounded-lg text-sm"
                        onClick={() => handleAddMember(project.id, user.id)}
                      >
                        {user.name}
                      </button>
                    ))}
                    <button
                      className="w-full text-left px-3 py-1 text-red-600 hover:text-red-800 rounded-lg text-sm"
                      onClick={() => setAddingToProject(null)}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-500 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No projects found</h3>
          <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}
