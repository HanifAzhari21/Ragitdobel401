import { LogIn, X } from 'lucide-react';
import { useState } from 'react';

// Login Modal Component (sama dengan di Header)
function LoginModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt with:', { email, password });
    // Close modal after submit (in real app, wait for API response)
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-white/30 dark:bg-gray-900/30 backdrop-blur-md z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-6 rounded-t-xl flex justify-between items-center">
          <div>
            <h3 className="text-2xl mb-1">Login Internal</h3>
            <p className="text-sm text-blue-100">Akses sistem internal Kanwil DJPb</p>
          </div>
          <button onClick={onClose} className="hover:bg-white hover:bg-opacity-10 p-2 rounded-lg transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-5">
            <label htmlFor="email-internal" className="block text-sm text-gray-700 mb-2">
              Email / Username
            </label>
            <input
              type="text"
              id="email-internal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all"
              placeholder="Masukkan email atau username"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password-internal" className="block text-sm text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password-internal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all"
              placeholder="Masukkan password"
              required
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center">
              <input type="checkbox" className="w-4 h-4 text-blue-900 border-gray-300 rounded focus:ring-blue-900" />
              <span className="ml-2 text-sm text-gray-600">Ingat saya</span>
            </label>
            <a href="#" className="text-sm text-blue-900 hover:text-yellow-600 transition-colors">
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
            <p className="text-sm text-gray-600">
              Belum punya akses?{' '}
              <a href="#" className="text-blue-900 hover:text-yellow-600 transition-colors">
                Hubungi Administrator
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export function InternalSection() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const internalServices = [
    "SiKUPIK (Kinerja Organisasi)",
    "Layanan Peminjaman TURT",
    "KMS Internal",
    "Linktree Internal DJPb Sumsel",
    "Manajemen Aset & Kegiatan Rutin"
  ];

  return (
    <>
      <section className="py-16 bg-gray-300 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-blue-900 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <LogIn className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl mb-2 text-gray-900 dark:text-white">Akses Internal</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Layanan khusus untuk pegawai internal Kanwil DJPb Sumatera Selatan. Login diperlukan untuk mengakses:
                  </p>
                  <ul className="space-y-2 mb-6">
                    {internalServices.map((service, index) => (
                      <li key={index} className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                        <div className="w-1.5 h-1.5 bg-blue-900 dark:bg-yellow-400 rounded-full"></div>
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={() => setLoginModalOpen(true)}
                    className="px-6 py-3 bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all shadow-md hover:shadow-lg"
                  >
                    Login Internal
                  </button>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                    * Login menggunakan akun Kemenkeu
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Login Modal */}
      <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </>
  );
}