# Source Code Lengkap - Ragit Dobel 4.0

## Daftar Isi
1. [App.tsx - Main Application](#apptsx)
2. [main.tsx - Entry Point](#maintsx)
3. [Header.tsx - Header dengan Login](#headertsx)
4. [HeroSection.tsx - Hero dengan Watermark](#herosectiontsx)
5. [DashboardSection.tsx - Dashboard Cards](#dashboardsectiontsx)
6. [LayananSection.tsx - Layanan Kanwil](#layanansectiontsx)
7. [LMSSection.tsx - Learning Management System](#lmssectiontsx)
8. [DokumentasiSection.tsx - Carousel Dokumentasi](#dokumentasisectiontsx)
9. [Footer.tsx - Footer](#footertsx)
10. [DarkModeContext.tsx - Context & Auth](#darkmodecontexttsx)

---

## App.tsx

```tsx
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { DashboardSection } from './components/DashboardSection';
import { LayananSection } from './components/LayananSection';
import { LMSSection } from './components/LMSSection';
import { DokumentasiSection } from './components/DokumentasiSection';
import { Footer } from './components/Footer';
import { DarkModeProvider } from './contexts/DarkModeContext';

export default function App() {
  return (
    <DarkModeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-800 transition-colors duration-300">
        <Header />
        <main>
          <HeroSection />
          <DashboardSection />
          <LayananSection />
          <LMSSection />
          <DokumentasiSection />
        </main>
        <Footer />
      </div>
    </DarkModeProvider>
  );
}
```

---

## main.tsx

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './app/App';
import { DashboardEkonomi } from './app/components/DashboardEkonomi';
import './styles/theme.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard-ekonomi" element={<DashboardEkonomi />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
```

---

## Header.tsx

**Fitur:**
- Login Modal dengan blur background
- Dark Mode Toggle
- Admin status & logout
- Responsive mobile menu
- Show/hide password

**Credential:**
- Username: `RagitAdmin1`
- Password: `SayaAdmin1234`

```tsx
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
    
    const success = login(username, password);
    
    if (success) {
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
              <a href="#layanan" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                Layanan Kanwil
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
              <a href="#layanan" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-gray-700 rounded-lg">
                Layanan Kanwil
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
```

---

## HeroSection.tsx

**Fitur:**
- Logo DJPb sebagai background watermark (700x700px, opacity 35%)
- Gradient biru harmonis (from-blue-600 via-blue-700 to-blue-900)
- Decorative elements (floating blur circles)
- CTA buttons

```tsx
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section id="beranda" className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white overflow-hidden">
      {/* Logo DJPb Background - Large Watermark */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-35">
        <img 
          src="https://djpb.kemenkeu.go.id/kppn/barabai/images/logo_ditjen_perbendaharaan0.png" 
          alt="Logo DJPb"
          className="w-[700px] h-[700px] object-contain drop-shadow-2xl"
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-yellow-400 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-300 rounded-full opacity-15 blur-3xl"></div>

      <div className="container mx-auto px-4 lg:px-8 py-20 lg:py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl lg:text-7xl mb-6">
            Ragit Dobel 4.0
          </h1>
          <p className="text-xl lg:text-2xl mb-12 text-blue-100 leading-relaxed">
            Dashboard monitoring dan layanan terpadu Kanwil DJPb Sumatera Selatan untuk K/L, Pemerintah Daerah, dan Publik
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#dashboard"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-lg hover:shadow-xl group"
            >
              Lihat Dashboard
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#layanan"
              className="inline-flex items-center px-8 py-4 bg-transparent text-white border-2 border-white rounded-lg hover:bg-white hover:text-blue-900 transition-colors"
            >
              Layanan Kanwil
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## DarkModeContext.tsx

**Fitur:**
- Dark mode state management
- Persistent dark mode (localStorage)
- Admin authentication
- Session-based login (sessionStorage)

**Credentials:**
- Username: `RagitAdmin1`
- Password: `SayaAdmin1234`

```tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface DarkModeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  isAdmin: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export function DarkModeProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check localStorage for saved preference
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
      setDarkMode(true);
    }
    
    // Check if admin is logged in
    const adminLoggedIn = sessionStorage.getItem('isAdminLoggedIn');
    if (adminLoggedIn === 'true') {
      setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    // Apply dark mode class to html and body
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const login = (username: string, password: string): boolean => {
    // Validate credentials
    if (username === 'RagitAdmin1' && password === 'SayaAdmin1234') {
      setIsAdmin(true);
      sessionStorage.setItem('isAdminLoggedIn', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('isAdminLoggedIn');
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode, isAdmin, login, logout }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
}
```

---

## package.json

```json
{
  "name": "@figma/my-make-file",
  "private": true,
  "version": "0.0.1",
  "type": "module",
  "scripts": {
    "build": "vite build"
  },
  "dependencies": {
    "@emotion/react": "11.14.0",
    "@emotion/styled": "11.14.1",
    "@mui/icons-material": "7.3.5",
    "@mui/material": "7.3.5",
    "@popperjs/core": "2.11.8",
    "@radix-ui/react-accordion": "1.2.3",
    "@radix-ui/react-alert-dialog": "1.1.6",
    "@radix-ui/react-dialog": "1.1.6",
    "@radix-ui/react-dropdown-menu": "2.1.6",
    "@radix-ui/react-label": "2.1.2",
    "@radix-ui/react-popover": "1.1.6",
    "@radix-ui/react-scroll-area": "1.2.3",
    "@radix-ui/react-select": "2.1.6",
    "@radix-ui/react-separator": "1.1.2",
    "@radix-ui/react-slot": "1.1.2",
    "@radix-ui/react-switch": "1.1.3",
    "@radix-ui/react-tabs": "1.1.3",
    "class-variance-authority": "0.7.1",
    "clsx": "2.1.1",
    "lucide-react": "0.487.0",
    "motion": "12.23.24",
    "next-themes": "0.4.6",
    "react-router-dom": "7.11.0",
    "react-slick": "0.31.0",
    "recharts": "2.15.2",
    "slick-carousel": "1.8.1",
    "sonner": "2.0.3",
    "tailwind-merge": "3.2.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "4.1.12",
    "@vitejs/plugin-react": "4.7.0",
    "tailwindcss": "4.1.12",
    "vite": "6.3.5"
  },
  "peerDependencies": {
    "react": "18.3.1",
    "react-dom": "18.3.1"
  }
}
```

---

## Build Commands

### Install Dependencies
```bash
npm install
```

### Development Mode
```bash
npm run dev
```
Akan berjalan di `http://localhost:5173`

### Production Build
```bash
npm run build
```

Output akan ada di folder `/dist` yang siap untuk di-upload ke server.

---

## Deployment ke Server Joomla

1. **Build aplikasi:**
   ```bash
   npm run build
   ```

2. **Upload ke server Joomla:**
   - Upload semua isi folder `dist/` ke subfolder di Joomla
   - Contoh path: `https://djpb.kemenkeu.go.id/kanwil/sumsel/id/ragit-dobel-4-0/`

3. **Tambah menu link di Joomla:**
   - Masuk ke Joomla Admin Panel
   - Menu Manager → Add New Menu Item
   - Menu Title: "Ragit Dobel 4.0"
   - Menu Type: External URL
   - Link: `/ragit-dobel-4-0/`
   - Parent: Di bawah menu "Inovasi"

4. **Configure .htaccess (jika perlu):**
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /ragit-dobel-4-0/
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /ragit-dobel-4-0/index.html [L]
   </IfModule>
   ```

---

## Fitur Admin yang Tersedia

### Setelah Login sebagai Admin:

1. **Dokumentasi Section:**
   - ✅ Tambah dokumentasi baru
   - ✅ Edit dokumentasi existing
   - ✅ Hapus dokumentasi
   
2. **UI Changes:**
   - ✅ Badge "Admin" muncul di header
   - ✅ Button "Logout" menggantikan "Login"
   - ✅ Button "Tambah Item" muncul di Dokumentasi Section
   - ✅ Button "Edit" dan "Hapus" muncul di modal dokumentasi

---

## Contact

**Developer:** IT Magang Kemnaker DJPb Sumsel  
**Organization:** Kanwil DJPb Sumatera Selatan  
**Email:** kanwilpalembang@djpb.kemenkeu.go.id

---

**© 2026 Kanwil DJPb Sumatera Selatan - All Rights Reserved**
