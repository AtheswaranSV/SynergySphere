# SynergySphere - AI-Powered Team Collaboration Platform

> **Smarter Teams with AI** - A comprehensive team collaboration platform with AI-driven insights, performance tracking, and automated workflow management.

## 🚀 Features

### Core Functionality
- **🔐 Authentication & Profiles** - Secure email/password login with editable user profiles
- **📊 Projects & Tasks** - Complete project management with Kanban board (To-Do, In Progress, Done)
- **💬 Team Communication** - Threaded comments, @mentions, and real-time notifications
- **📈 Performance Tracking** - Comprehensive analytics with charts and individual member cards
- **🏆 Performance Leaderboard** - Team rankings with performance scores and achievements
- **🤖 AI Features** - Task summarization, delay prediction, and performance coaching
- **📧 Automated Emails** - Performance warning system with email preview

### Technical Features
- **🎨 Modern UI/UX** - Enterprise-grade dashboard with dark/light mode toggle
- **📱 Responsive Design** - Optimized for desktop, tablet, and mobile
- **⚡ Real-time Updates** - Live data synchronization with Supabase
- **📊 Interactive Charts** - Professional data visualization with Recharts
- **🎯 Performance Optimization** - Fast loading and smooth animations

## 🛠️ Tech Stack

- **Frontend**: React 18 (JavaScript) + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Real-time + Auth)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Date Handling**: date-fns
- **Build Tool**: Vite

## 🏁 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Supabase account (for backend)

### Installation

1. **Clone and Install**
   ```bash
   # Extract the project files
   cd synergysphere
   npm install
   ```

2. **Environment Setup**
   ```bash
   # Copy environment template
   cp .env.example .env
   
   # Add your Supabase credentials to .env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Start Development**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

### Demo Login
- **Email**: `demo@synergysphere.com`
- **Password**: `demo123`
- Or create a new account through the signup form

## 🎯 Key Components

### Dashboard
- Performance overview with interactive charts
- Real-time activity feed
- Team statistics and project progress

### Task Management
- **Board View**: Drag-and-drop Kanban board
- **List View**: Detailed table with filtering and sorting
- Task assignment, priorities, and deadlines
- Threaded comments and file attachments

### Performance Analytics
- Individual member performance cards
- Team-wide metrics and comparisons
- Interactive charts showing completion trends
- Performance leaderboard with rankings

### AI Insights
- **Task Summarizer**: Project progress overview
- **Delay Predictor**: Risk analysis for deadline management
- **Performance Coach**: Personalized improvement suggestions
- Real-time AI analytics dashboard

### Communication
- Task comments with @mentions
- Real-time notifications
- Performance alert emails with preview modal

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6) - Navigation and primary actions
- **Success**: Green (#10B981) - Completed tasks and positive metrics
- **Warning**: Amber (#F59E0B) - Pending items and caution states
- **Danger**: Red (#EF4444) - Overdue tasks and alerts
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Headings**: Inter font family, multiple weights
- **Body**: Consistent 16px base with 150% line height
- **UI Elements**: 14px for buttons and form elements

### Layout
- **Sidebar Navigation**: 256px fixed width with collapsible mobile view
- **Content Area**: Max-width container with responsive grid system
- **Cards**: Rounded corners (12px) with subtle shadows
- **Spacing**: 8px grid system throughout

## 📊 Data Models

### Users
```javascript
{
  id: string,
  name: string,
  email: string,
  role: string,
  avatar: string,
  performance_score: number,
  tasks_completed: number,
  tasks_pending: number,
  on_time_rate: number
}
```

### Projects
```javascript
{
  id: string,
  name: string,
  description: string,
  status: 'active' | 'completed' | 'on_hold',
  progress: number,
  start_date: string,
  end_date: string,
  team_members: string[]
}
```

### Tasks
```javascript
{
  id: string,
  title: string,
  description: string,
  project_id: string,
  assignee_id: string,
  status: 'todo' | 'in_progress' | 'completed' | 'overdue',
  priority: 'high' | 'medium' | 'low',
  deadline: string,
  created_at: string
}
```

## 🤖 AI Features

### Mock AI Implementation
The platform includes sophisticated AI features with realistic mock responses:

1. **Project Summarization**: Analyzes team progress and provides insights
2. **Delay Prediction**: Risk assessment for project deadlines
3. **Performance Coaching**: Personalized recommendations for team members
4. **Automated Alerts**: Smart notifications for performance issues

### Real AI Integration
To connect real AI services, update the AI insights component to call your preferred AI API (OpenAI, Google AI, etc.).

## 📧 Email System

### Mock Email Preview
- Performance warning emails with realistic templates
- Preview modal with full email content
- Automated sending simulation

### Real Email Integration
To enable actual email sending:
1. Set up SendGrid or similar email service
2. Create API endpoints for email sending
3. Update the email preview component to call real APIs

## 🚀 Production Deployment

### Build for Production
```bash
npm run build
```

### Deployment Options
- **Netlify**: Drag and drop the `dist` folder
- **Vercel**: Connect your Git repository
- **Supabase Hosting**: Use built-in hosting features
- **Custom Server**: Deploy the built files to any static hosting

### Environment Variables
Make sure to set your production environment variables:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 📱 Mobile Responsiveness

The application is fully responsive with:
- **Mobile-first design** approach
- **Collapsible sidebar** navigation
- **Touch-optimized** interactions
- **Responsive charts** and data tables
- **Optimized layouts** for all screen sizes

## 🔐 Security Features

- **Row Level Security (RLS)** enabled on all Supabase tables
- **JWT-based authentication** with secure token handling
- **Protected routes** requiring authentication
- **Input validation** on all forms
- **XSS protection** with proper data sanitization

## 🎯 Performance Optimizations

- **Code splitting** with React lazy loading
- **Image optimization** with WebP format support
- **Efficient state management** with React Context
- **Memoized components** to prevent unnecessary re-renders
- **Optimized bundle size** with tree shaking

## 🧪 Testing

### Manual Testing Checklist
- [ ] User authentication (login/signup/logout)
- [ ] Project creation and management
- [ ] Task board functionality (drag and drop)
- [ ] Performance analytics accuracy
- [ ] AI insights generation
- [ ] Email preview functionality
- [ ] Dark/light mode toggle
- [ ] Mobile responsiveness
- [ ] Real-time notifications

### Future Testing Enhancements
- Unit tests with Jest and React Testing Library
- Integration tests with Cypress
- Performance testing with Lighthouse
- Accessibility testing with axe-core

## 🚧 Future Enhancements

### Planned Features
- [ ] Real-time collaborative editing
- [ ] Advanced project templates
- [ ] Time tracking integration
- [ ] Advanced reporting and exports
- [ ] Mobile app development
- [ ] Advanced AI integrations
- [ ] Third-party integrations (Slack, GitHub, etc.)

### Technical Improvements
- [ ] Offline functionality with service workers
- [ ] Advanced caching strategies
- [ ] Real-time collaboration features
- [ ] Advanced search and filtering
- [ ] Bulk operations
- [ ] Advanced permission system

## 💡 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Check the documentation
- Create an issue on GitHub
- Contact the development team

---

**SynergySphere** - Transforming team collaboration with AI-powered insights and intelligent automation. Built for modern teams who demand excellence and efficiency.