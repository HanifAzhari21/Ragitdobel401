import { useState } from 'react';
import { LogIn, LogOut, Menu, X, Moon, Sun, Eye, EyeOff } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';

// Login Modal Component
function LoginModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useDarkMode();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Handle login logic
    const success = login(username, password);
    
    if (success) {
      // Close modal after successful login
      setUsername('');
      setPassword('');
      setShowPassword(false);
      onClose();
    } else {
      setError('Username atau password salah!');
    }
  };

  const handleClose = () => {
    setUsername('');
    setPassword('');
    setShowPassword(false);
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-white/30 dark:bg-gray-900/30 backdrop-blur-md z-50 flex items-center justify-center p-4" onClick={handleClose}>
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-6 rounded-t-xl flex justify-between items-center">
          <div>
            <h3 className="text-2xl mb-1">Login Admin</h3>
            <p className="text-sm text-blue-100">Akses sistem internal Kanwil DJPb</p>
          </div>
          <button onClick={handleClose} className="hover:bg-white hover:bg-opacity-10 p-2 rounded-lg transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <div className="mb-5">
            <label htmlFor="username" className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Masukkan username"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Masukkan password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-blue-900 dark:hover:text-yellow-400 transition-colors p-1"
                title={showPassword ? "Sembunyikan password" : "Tampilkan password"}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center">
              <input type="checkbox" className="w-4 h-4 text-blue-900 border-gray-300 rounded focus:ring-blue-900" />
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Ingat saya</span>
            </label>
            <a href="#" className="text-sm text-blue-900 dark:text-yellow-400 hover:text-yellow-600 dark:hover:text-yellow-300 transition-colors">
              Lupa password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all shadow-md hover:shadow-lg"
          >
            Login
          </button>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Belum punya akses?{' '}
              <a href="#" className="text-blue-900 dark:text-yellow-400 hover:text-yellow-600 dark:hover:text-yellow-300 transition-colors">
                Hubungi Administrator
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const { darkMode, toggleDarkMode, isAdmin, logout } = useDarkMode();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm transition-colors duration-300">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-blue-800 dark:from-gray-700 dark:to-gray-600 rounded-lg flex items-center justify-center">
                <span className="text-yellow-400 dark:text-white font-bold">R4</span>
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-gray-900 dark:text-white">Ragit Dobel 4.0</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Kanwil DJPb Sumatera Selatan</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              <a href="#beranda" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                Beranda
              </a>
              <a href="#dashboard" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                Dashboard
              </a>
              <a href="#lms" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                Learning Management System
              </a>
              <a 
                href="#dokumentasi"
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Dokumentasi
              </a>
            </nav>

            {/* Right side - Dark Mode Toggle & Login/Logout */}
            <div className="flex items-center gap-3">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 text-gray-700 dark:text-gray-300 hover:bg-yellow-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              {/* Admin Status & Login/Logout Button */}
              {isAdmin ? (
                <div className="flex items-center gap-2">
                  <span className="hidden md:inline text-sm text-gray-700 dark:text-gray-300 px-3 py-1 bg-green-100 dark:bg-green-900 rounded-lg">
                    Admin
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 dark:bg-red-700 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-800 transition-all shadow-md hover:shadow-lg"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setLoginModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-900 dark:bg-yellow-400 text-white dark:text-gray-900 rounded-lg hover:bg-yellow-600 dark:hover:bg-yellow-500 transition-all shadow-md hover:shadow-lg"
                >
                  <LogIn className="w-5 h-5" />
                  <span className="hidden sm:inline">Login</span>
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <nav className="lg:hidden py-4 border-t border-gray-200 dark:border-gray-700 space-y-1">
              <a href="#beranda" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-gray-700 rounded-lg">
                Beranda
              </a>
              <a href="#dashboard" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-gray-700 rounded-lg">
                Dashboard
              </a>
              <a href="#lms" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-gray-700 rounded-lg">
                Learning Management System
              </a>
              <a 
                href="#dokumentasi"
                className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-gray-700 rounded-lg"
              >
                Dokumentasi
              </a>
            </nav>
          )}
        </div>
      </header>

      {/* Login Modal */}
      <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </>
  );
}