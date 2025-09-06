import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect, createContext, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Layout from "./components/layout/Layout";
import Projects from "./components/projects/Projects";
import Tasks from "./components/tasks/Tasks";
import Performance from "./components/performance/Performance";
import Leaderboard from "./components/leaderboard/Leaderboard";
import AIInsights from "./components/ai/AIInsights";
import Settings from "./components/settings/Settings";

// Auth Context
const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

// Theme Context
const ThemeContext = createContext({});
export const useTheme = () => useContext(ThemeContext);

// Role Context
const RoleContext = createContext({});
export const useRole = () => useContext(RoleContext);

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // employee or manager
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Fetch role from Firestore
        const userDoc = await fetch(
          `https://firestore.googleapis.com/v1/projects/YOUR_PROJECT_ID/databases/(default)/documents/users/${currentUser.uid}`
        ).then(res => res.json());

        const userRole = userDoc.fields?.role?.stringValue || "employee";
        setRole(userRole);
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <RoleContext.Provider value={{ role, setRole }}>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <div className={theme}>
            <Routes>
              {/* Public route */}
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/dashboard" replace />}
              />

              {/* Protected routes */}
              {user && (
                <Route element={<Layout />}>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/tasks" element={<Tasks />} />
                  <Route path="/performance" element={<Performance />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/ai-insights" element={<AIInsights />} />
                  <Route path="/settings" element={<Settings />} />
                </Route>
              )}

              {/* Fallback */}
              <Route
                path="*"
                element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
              />
            </Routes>
          </div>
        </ThemeContext.Provider>
      </RoleContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
