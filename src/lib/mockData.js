import { format, subDays, addDays } from 'date-fns';

export const mockUsers = [
  {
    id: '1',
    name: 'Vishwanath',
    email: 'dev@Zetloom.com',
    role: 'Project Manager',
    avatar: 'https://www.google.com/imgres?q=empty%20profile%20image%20icon&imgurl=https%3A%2F%2Fwww.pngitem.com%2Fpimgs%2Fm%2F522-5220445_anonymous-profile-grey-person-sticker-glitch-empty-profile.png&imgrefurl=https%3A%2F%2Fwww.pngitem.com%2Fmiddle%2FhmhxiJi_anonymous-profile-grey-person-sticker-glitch-empty-profile%2F&docid=DW6FqC3PlmkyYM&tbnid=GHbdym26eAzRCM&vet=12ahUKEwiao8TM_MOPAxWQzjgGHW1MPSYQM3oECDQQAA..i&w=860&h=706&hcb=2&ved=2ahUKEwiao8TM_MOPAxWQzjgGHW1MPSYQM3oECDQQAA',
    performance_score: 92,
    tasks_completed: 18,
    tasks_pending: 3,
    on_time_rate: 85
  },
  {
    id: '2',
    name: 'Nandha',
    email: 'nandy@Zetloom.com',
    role: 'Frontend Developer',
    avatar: 'https://www.google.com/imgres?q=empty%20profile%20image%20icon&imgurl=https%3A%2F%2Fwww.pngitem.com%2Fpimgs%2Fm%2F522-5220445_anonymous-profile-grey-person-sticker-glitch-empty-profile.png&imgrefurl=https%3A%2F%2Fwww.pngitem.com%2Fmiddle%2FhmhxiJi_anonymous-profile-grey-person-sticker-glitch-empty-profile%2F&docid=DW6FqC3PlmkyYM&tbnid=GHbdym26eAzRCM&vet=12ahUKEwiao8TM_MOPAxWQzjgGHW1MPSYQM3oECDQQAA..i&w=860&h=706&hcb=2&ved=2ahUKEwiao8TM_MOPAxWQzjgGHW1MPSYQM3oECDQQAA',
    performance_score: 88,
    tasks_completed: 22,
    tasks_pending: 7,
    on_time_rate: 90
  },
  {
    id: '3',
    name: 'Dhikshan',
    email: 'kaalai@Zetloom.com',
    role: 'Backend Developer',
    avatar: 'https://www.google.com/imgres?q=empty%20profile%20image%20icon&imgurl=https%3A%2F%2Fwww.pngitem.com%2Fpimgs%2Fm%2F522-5220445_anonymous-profile-grey-person-sticker-glitch-empty-profile.png&imgrefurl=https%3A%2F%2Fwww.pngitem.com%2Fmiddle%2FhmhxiJi_anonymous-profile-grey-person-sticker-glitch-empty-profile%2F&docid=DW6FqC3PlmkyYM&tbnid=GHbdym26eAzRCM&vet=12ahUKEwiao8TM_MOPAxWQzjgGHW1MPSYQM3oECDQQAA..i&w=860&h=706&hcb=2&ved=2ahUKEwiao8TM_MOPAxWQzjgGHW1MPSYQM3oECDQQAA',
    performance_score: 76,
    tasks_completed: 15,
    tasks_pending: 5,
    on_time_rate: 70
  },
  {
    id: '4',
    name: 'Ashok',
    email: 'aw@Zetloom.com',
    role: 'AI/ML Engineer',
    avatar: 'https://www.google.com/imgres?q=empty%20profile%20image%20icon&imgurl=https%3A%2F%2Fwww.pngitem.com%2Fpimgs%2Fm%2F522-5220445_anonymous-profile-grey-person-sticker-glitch-empty-profile.png&imgrefurl=https%3A%2F%2Fwww.pngitem.com%2Fmiddle%2FhmhxiJi_anonymous-profile-grey-person-sticker-glitch-empty-profile%2F&docid=DW6FqC3PlmkyYM&tbnid=GHbdym26eAzRCM&vet=12ahUKEwiao8TM_MOPAxWQzjgGHW1MPSYQM3oECDQQAA..i&w=860&h=706&hcb=2&ved=2ahUKEwiao8TM_MOPAxWQzjgGHW1MPSYQM3oECDQQAA',
    performance_score: 60,
    tasks_completed: 20,
    tasks_pending: 6,
    on_time_rate: 95
  },
  {
    id: '5',
    name: 'ragav',
    email: 'drag@Zetloom.com',
    role: 'QA Engineer',
    avatar: 'https://www.google.com/imgres?q=empty%20profile%20image%20icon&imgurl=https%3A%2F%2Fwww.pngitem.com%2Fpimgs%2Fm%2F522-5220445_anonymous-profile-grey-person-sticker-glitch-empty-profile.png&imgrefurl=https%3A%2F%2Fwww.pngitem.com%2Fmiddle%2FhmhxiJi_anonymous-profile-grey-person-sticker-glitch-empty-profile%2F&docid=DW6FqC3PlmkyYM&tbnid=GHbdym26eAzRCM&vet=12ahUKEwiao8TM_MOPAxWQzjgGHW1MPSYQM3oECDQQAA..i&w=860&h=706&hcb=2&ved=2ahUKEwiao8TM_MOPAxWQzjgGHW1MPSYQM3oECDQQAA',
    performance_score: 42,
    tasks_completed: 8,
    tasks_pending: 12,
    on_time_rate: 30
  }
];

export const mockProjects = [
  {
    id: '1',
    name: 'E-Commerce Platform',
    description: 'Modern e-commerce platform with AI recommendations',
    status: 'active',
    progress: 75,
    start_date: format(subDays(new Date(), 30), 'yyyy-MM-dd'),
    end_date: format(addDays(new Date(), 15), 'yyyy-MM-dd'),
    team_members: ['1', '2', '3', '4']
  },
  {
    id: '2',
    name: 'Mobile App Redesign',
    description: 'Complete UI/UX overhaul of our mobile application',
    status: 'active',
    progress: 45,
    start_date: format(subDays(new Date(), 20), 'yyyy-MM-dd'),
    end_date: format(addDays(new Date(), 25), 'yyyy-MM-dd'),
    team_members: ['2', '4', '5']
  },
  {
    id: '3',
    name: 'API Integration',
    description: 'Third-party API integrations and optimization',
    status: 'completed',
    progress: 100,
    start_date: format(subDays(new Date(), 60), 'yyyy-MM-dd'),
    end_date: format(subDays(new Date(), 10), 'yyyy-MM-dd'),
    team_members: ['1', '3']
  }
];

export const mockTasks = [
  {
    id: '1',
    title: 'Design Homepage Layout',
    description: 'Create wireframes and mockups for the new homepage design',
    project_id: '1',
    assignee_id: '4',
    status: 'completed',
    priority: 'high',
    deadline: format(subDays(new Date(), 2), 'yyyy-MM-dd'),
    created_at: format(subDays(new Date(), 10), 'yyyy-MM-dd HH:mm:ss')
  },
  {
    id: '2',
    title: 'Implement User Authentication',
    description: 'Set up secure user authentication with JWT tokens',
    project_id: '1',
    assignee_id: '3',
    status: 'in_progress',
    priority: 'high',
    deadline: format(addDays(new Date(), 3), 'yyyy-MM-dd'),
    created_at: format(subDays(new Date(), 8), 'yyyy-MM-dd HH:mm:ss')
  },
  {
    id: '3',
    title: 'Product Catalog API',
    description: 'Develop REST API endpoints for product management',
    project_id: '1',
    assignee_id: '3',
    status: 'todo',
    priority: 'medium',
    deadline: format(addDays(new Date(), 7), 'yyyy-MM-dd'),
    created_at: format(subDays(new Date(), 5), 'yyyy-MM-dd HH:mm:ss')
  },
  {
    id: '4',
    title: 'Mobile Responsive Testing',
    description: 'Test and fix responsive design issues across devices',
    project_id: '2',
    assignee_id: '5',
    status: 'overdue',
    priority: 'high',
    deadline: format(subDays(new Date(), 1), 'yyyy-MM-dd'),
    created_at: format(subDays(new Date(), 12), 'yyyy-MM-dd HH:mm:ss')
  }
];

export const mockComments = [
  {
    id: '1',
    task_id: '2',
    user_id: '1',
    content: 'Great progress on this! Make sure to include proper error handling.',
    created_at: format(subDays(new Date(), 1), 'yyyy-MM-dd HH:mm:ss')
  },
  {
    id: '2',
    task_id: '2',
    user_id: '3',
    content: 'Thanks @Dhikshan! I\'ve added comprehensive error handling for all auth flows.',
    created_at: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
  }
];

export const performanceData = [
  { name: 'Vishwanath', completed: 18, score: 92 },
  { name: 'Nandha', completed: 22, score: 88 },
  { name: 'Dhikshan', completed: 15, score: 76 },
  { name: 'Ashok', completed: 20, score: 95 },
  { name: 'ragav', completed: 8, score: 42 }
];

export const workloadData = [
  { name: 'Frontend', value: 35, color: '#3B82F6' },
  { name: 'Backend', value: 30, color: '#10B981' },
  { name: 'AI/ML', value: 20, color: '#F59E0B' },
  { name: 'QA', value: 15, color: '#EF4444' }
];

export const trendData = [
  { week: 'Week 1', completed: 12 },
  { week: 'Week 2', completed: 19 },
  { week: 'Week 3', completed: 15 },
  { week: 'Week 4', completed: 28 },
  { week: 'Week 5', completed: 24 },
  { week: 'Week 6', completed: 31 }
];

export const aiInsights = {
  projectSummary: "Your team has completed 75% of the E-Commerce Platform project with strong momentum. The frontend components are ahead of schedule, while backend API development needs attention to meet the deadline.",
  delayPrediction: "⚠️ Risk Alert: Mobile App Redesign project has a 68% probability of missing its deadline due to pending QA tasks. Consider reallocating resources or extending the timeline by 1 week.",
  performanceCoaching: {
    poorPerformer: "Dragav",
    suggestions: [
      "Break down large tasks into smaller, manageable chunks",
      "Set up daily check-ins with project manager",
      "Focus on high-priority items first",
      "Consider additional training on testing frameworks"
    ]
  }
};