import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Zap, Users, TrendingUp } from "lucide-react";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext"; // Updated: useAuth provides user and role context

export default function Login() {
  const navigate = useNavigate();
  const { setUser, setRole } = useAuth(); // handles both user and role globally

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [roleSelect, setRoleSelect] = useState("employee"); // default signup role
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        // LOGIN
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Fetch role from Firestore
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        const userRole = docSnap.exists() ? docSnap.data().role : "employee";

        setUser(user);
        setRole(userRole);
        navigate("/dashboard");
      } else {
        // SIGNUP
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save user profile in Firestore
        await setDoc(doc(db, "users", user.uid), {
          name,
          email,
          role: roleSelect,
          createdAt: new Date(),
        });

        setUser(user);
        setRole(roleSelect);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setEmail("demo@synergysphere.com");
    setPassword("demo123");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex">
      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-12 flex-col justify-center">
        <div className="max-w-md">
          <div className="flex items-center mb-8">
            <Zap className="h-12 w-12 mr-3" />
            <h1 className="text-4xl font-bold">SynergySphere</h1>
          </div>
          <p className="text-xl mb-8 text-blue-100">Smarter Teams with AI</p>
          <div className="space-y-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 mr-4 text-blue-200" />
              <div>
                <h3 className="font-semibold">Team Collaboration</h3>
                <p className="text-blue-100">Streamlined project management and task tracking</p>
              </div>
            </div>
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 mr-4 text-blue-200" />
              <div>
                <h3 className="font-semibold">Performance Analytics</h3>
                <p className="text-blue-100">AI-powered insights and performance tracking</p>
              </div>
            </div>
            <div className="flex items-center">
              <Zap className="h-8 w-8 mr-4 text-blue-200" />
              <div>
                <h3 className="font-semibold">Smart Automation</h3>
                <p className="text-blue-100">Automated warnings and intelligent recommendations</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4 lg:hidden">
                <Zap className="h-8 w-8 mr-2 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">SynergySphere</h1>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {isLogin ? "Welcome Back" : "Get Started"}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {isLogin ? "Sign in to your account" : "Create your account"}
              </p>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Role</label>
                    <select
                      value={roleSelect}
                      onChange={(e) => setRoleSelect(e.target.value)}
                      className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="employee">Employee</option>
                      <option value="manager">Project Manager</option>
                    </select>
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-3 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : isLogin ? "Sign In" : "Create Account"}
              </button>
            </form>

            <div className="mt-6">
              <button
                onClick={handleDemoLogin}
                className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg font-semibold transition-colors duration-200"
              >
                Try Demo Account
              </button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold"
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
