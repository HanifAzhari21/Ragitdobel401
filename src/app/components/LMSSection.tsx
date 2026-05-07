import { Book, ExternalLink, Edit2, X, Save } from 'lucide-react';
import { BackgroundPattern } from './BackgroundPattern';
import { useDarkMode } from '../contexts/DarkModeContext';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

// Edit Link Modal
interface EditLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (url: string) => void;
  currentUrl: string;
}

function EditLinkModal({ isOpen, onClose, onSave, currentUrl }: EditLinkModalProps) {
  const [url, setUrl] = useState(currentUrl);

  useEffect(() => {
    setUrl(currentUrl);
  }, [currentUrl]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(url);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-6 rounded-t-xl flex justify-between items-center">
          <div>
            <h3 className="text-xl mb-1">Edit Link LMS</h3>
            <p className="text-sm text-blue-100">Learning Management System</p>
          </div>
          <button onClick={onClose} className="hover:bg-white hover:bg-opacity-10 p-2 rounded-lg transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-5">
            <label htmlFor="lms-url" className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
              URL LMS
            </label>
            <input
              type="text"
              id="lms-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="https://example.com/lms"
              required
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Masukkan URL lengkap termasuk https://
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function LMSSection() {
  const { isAdmin } = useDarkMode();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [lmsUrl, setLmsUrl] = useState('/lms.html');
  const [loading, setLoading] = useState(true);

  // Fetch LMS link from Supabase on mount and setup real-time sync
  useEffect(() => {
    fetchLmsLink();

    // Setup real-time subscription for automatic sync across devices
    const channel = supabase
      .channel('lms_links_changes')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to INSERT, UPDATE, DELETE
          schema: 'public',
          table: 'lms_links',
          filter: 'is_active=eq.true'
        },
        (payload) => {
          console.log('🔄 LMS link changed:', payload);
          // Refresh data when changes detected
          fetchLmsLink();
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchLmsLink = async () => {
    try {
      // Try Supabase first
      const { data, error } = await supabase
        .from('lms_links')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.warn('Supabase fetch failed, using localStorage fallback:', error);
        // Fallback to localStorage
        const savedUrl = localStorage.getItem('lmsUrl');
        if (savedUrl) {
          setLmsUrl(savedUrl);
        }
      } else if (data && data.url) {
        setLmsUrl(data.url);
        // Also save to localStorage for offline support
        localStorage.setItem('lmsUrl', data.url);
      }
    } catch (err) {
      console.warn('Error fetching LMS link, using localStorage fallback:', err);
      // Fallback to localStorage
      const savedUrl = localStorage.getItem('lmsUrl');
      if (savedUrl) {
        setLmsUrl(savedUrl);
      }
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "Kebijakan Fiskal & Keuangan Daerah",
    "Akuntansi & Perbendaharaan",
    "Sistem Pembayaran & Digitalisasi Keuangan",
    "Jabatan Fungsional Perbendaharaan",
    "Pengembangan SDM & Organisasi",
    "Digitalisasi & Inovasi"
  ];

  const handleSaveLink = async (url: string) => {
    setLmsUrl(url);
    
    // Save to localStorage immediately as fallback
    localStorage.setItem('lmsUrl', url);
    
    // Save to Supabase
    try {
      // First, check if any active link exists
      const { data: existingData, error: fetchError } = await supabase
        .from('lms_links')
        .select('id')
        .eq('is_active', true)
        .limit(1)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        // PGRST116 = no rows returned, which is OK
        console.warn('Supabase not available, saved to localStorage only:', fetchError);
        alert('⚠️ Link disimpan secara lokal. Setup Supabase untuk sinkronisasi antar device.');
        return;
      }

      let result;
      if (existingData?.id) {
        // Update existing record
        result = await supabase
          .from('lms_links')
          .update({ 
            url: url,
            updated_at: new Date().toISOString(),
            updated_by: 'admin'
          })
          .eq('id', existingData.id);
      } else {
        // Insert new record
        result = await supabase
          .from('lms_links')
          .insert({ 
            url: url,
            label: 'Masuk ke LMS',
            is_active: true,
            updated_by: 'admin'
          });
      }

      if (result.error) {
        console.warn('Supabase save failed, using localStorage:', result.error);
        alert('⚠️ Link disimpan secara lokal. Setup Supabase untuk sinkronisasi antar device.');
        return;
      }

      console.log('✅ LMS link saved to Supabase');
      alert('✅ Link berhasil disimpan dan akan sync ke semua device!');
    } catch (err) {
      console.warn('Error saving to Supabase, using localStorage:', err);
      alert('⚠️ Link disimpan secara lokal. Setup Supabase untuk sinkronisasi antar device.');
    }
  };

  const handleOpenLMS = () => {
    if (lmsUrl && lmsUrl !== '#') {
      window.open(lmsUrl, '_blank');
    }
  };

  return (
    <section id="lms" className="py-20 lg:py-32 bg-white dark:bg-gray-800 relative transition-colors duration-300">
      <BackgroundPattern />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="relative">
            {/* Admin Edit Button */}
            {isAdmin && (
              <button
                onClick={() => setEditModalOpen(true)}
                className="absolute -top-4 right-0 z-20 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg shadow-lg transition-all flex items-center gap-2"
                title="Edit Link LMS"
              >
                <Edit2 className="w-4 h-4" />
                <span className="text-sm">Edit Link</span>
              </button>
            )}

            <div className="inline-flex items-center px-4 py-2 bg-yellow-100 dark:bg-yellow-900 dark:bg-opacity-30 text-yellow-800 dark:text-yellow-400 rounded-full mb-6">
              <Book className="w-4 h-4 mr-2" />
              Learning Management System
            </div>
            <h2 className="text-4xl lg:text-5xl mb-6 text-gray-900 dark:text-white">
              Pusat Pembelajaran Digital
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Materi pembelajaran terkurasi terkait kebijakan fiskal, perbendaharaan, dan keuangan daerah untuk meningkatkan kapasitas SDM
            </p>

            <div className="space-y-3 mb-8">
              {categories.map((category, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-900 dark:bg-yellow-400 rounded-full mt-2"></div>
                  <span className="text-gray-700 dark:text-gray-300">{category}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={handleOpenLMS}
              disabled={!lmsUrl || lmsUrl === '#'}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-lg hover:from-blue-800 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Masuk ke LMS
              <ExternalLink className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1735639013995-086e648eaa38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtd29yayUyMGNvbGxhYm9yYXRpb24lMjBvZmZpY2V8ZW58MXx8fHwxNzY2MDM0Njg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Learning"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-yellow-500/10"></div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border border-yellow-200 dark:border-yellow-700">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-yellow-600 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <Book className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl text-gray-900 dark:text-white">100+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Materi Pembelajaran</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Link Modal */}
      <EditLinkModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={handleSaveLink}
        currentUrl={lmsUrl}
      />
    </section>
  );
}