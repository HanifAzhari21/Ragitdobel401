import { TrendingUp, ArrowRight, Activity, CreditCard, BarChart3, ChevronLeft, ChevronRight, Edit2, X, Save } from 'lucide-react';
import { BackgroundPattern } from './BackgroundPattern';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRef, useState, useEffect } from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';
import { supabase } from '../../lib/supabase';

interface DashboardCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  dashboardUrl: string;
  index: number;
  onEditLink: (index: number) => void;
  isAdmin: boolean;
}

function DashboardCard({ icon, title, description, gradient, dashboardUrl, index, onEditLink, isAdmin }: DashboardCardProps) {
  const handleOpenDashboard = () => {
    if (dashboardUrl && dashboardUrl !== '#') {
      window.open(dashboardUrl, '_blank');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 dark:border-gray-700 hover:border-yellow-400 dark:hover:border-yellow-500 h-full relative">
      {/* Admin Edit Button */}
      {isAdmin && (
        <button
          onClick={() => onEditLink(index)}
          className="absolute top-4 right-4 z-20 p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg shadow-lg transition-all"
          title="Edit Link"
        >
          <Edit2 className="w-4 h-4" />
        </button>
      )}

      {/* Header with gradient */}
      <div className={`${gradient} p-6 text-white relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full -ml-12 -mb-12"></div>
        <div className="relative z-10 flex items-start justify-between">
          <div className="flex-1">
            <div className="w-14 h-14 bg-white backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
              <span className="text-blue-900 [&>svg]:w-7 [&>svg]:h-7 [&>svg]:stroke-current">{icon}</span>
            </div>
            <h3 className="text-xl mb-1">{title}</h3>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 leading-relaxed">{description}</p>

        <button 
          onClick={handleOpenDashboard}
          disabled={!dashboardUrl || dashboardUrl === '#'}
          className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-lg hover:from-blue-800 hover:to-blue-700 transition-all group/btn shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Lihat Dashboard Lengkap
          <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

interface ArrowProps {
  onClick?: () => void;
}

function NextArrow({ onClick }: ArrowProps) {
  return (
    <button
      onClick={onClick}
      className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-blue-900 dark:bg-blue-800 text-white rounded-full shadow-lg hover:bg-blue-800 dark:hover:bg-blue-700 transition-all flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label="Next slide"
    >
      <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
    </button>
  );
}

function PrevArrow({ onClick }: ArrowProps) {
  return (
    <button
      onClick={onClick}
      className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-blue-900 dark:bg-blue-800 text-white rounded-full shadow-lg hover:bg-blue-800 dark:hover:bg-blue-700 transition-all flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label="Previous slide"
    >
      <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
    </button>
  );
}

// Edit Link Modal
interface EditLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (url: string) => void;
  currentUrl: string;
  title: string;
}

function EditLinkModal({ isOpen, onClose, onSave, currentUrl, title }: EditLinkModalProps) {
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
            <h3 className="text-xl mb-1">Edit Link Dashboard</h3>
            <p className="text-sm text-blue-100">{title}</p>
          </div>
          <button onClick={onClose} className="hover:bg-white hover:bg-opacity-10 p-2 rounded-lg transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-5">
            <label htmlFor="dashboard-url" className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
              URL Dashboard
            </label>
            <input
              type="text"
              id="dashboard-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="https://example.com/dashboard"
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

export function DashboardSection() {
  const sliderRef = useRef<Slider>(null);
  const { isAdmin } = useDarkMode();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const defaultDashboards = [
    {
      icon: <TrendingUp />,
      title: "Dashboard Ekonomi Regional",
      description: "Monitoring indikator ekonomi makro Sumatera Selatan meliputi PDRB, inflasi, investasi, dan perdagangan untuk mendukung kebijakan fiskal daerah",
      gradient: "bg-gradient-to-br from-blue-900 to-blue-800",
      dashboardUrl: "#"
    },
    {
      icon: <CreditCard />,
      title: "Dashboard Realisasi Belanja",
      description: "Monitoring realisasi belanja daerah dan K/L secara real-time dengan breakdown per program dan kegiatan untuk transparansi anggaran",
      gradient: "bg-gradient-to-br from-blue-800 to-blue-700",
      dashboardUrl: "#"
    },
    {
      icon: <BarChart3 />,
      title: "Dashboard Monitoring Kinerja",
      description: "Monitoring kinerja pelaksanaan anggaran K/L dan evaluasi capaian target strategis untuk optimalisasi pengelolaan keuangan negara",
      gradient: "bg-gradient-to-br from-blue-800 to-blue-700",
      dashboardUrl: "#"
    }
  ];

  // Load dashboard URLs from Supabase
  const [dashboards, setDashboards] = useState(defaultDashboards);
  const [loading, setLoading] = useState(true);

  // Fetch links from Supabase on mount and setup real-time sync
  useEffect(() => {
    fetchDashboardLinks();

    // Setup real-time subscription for automatic sync across devices
    const channel = supabase
      .channel('dashboard_links_changes')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to INSERT, UPDATE, DELETE
          schema: 'public',
          table: 'dashboard_links',
          filter: 'is_active=eq.true'
        },
        (payload) => {
          console.log('🔄 Dashboard link changed:', payload);
          // Refresh data when changes detected
          fetchDashboardLinks();
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchDashboardLinks = async () => {
    try {
      // Try Supabase first
      const { data, error } = await supabase
        .from('dashboard_links')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.warn('Supabase fetch failed, using localStorage fallback:', error);
        // Fallback to localStorage
        const savedUrl = localStorage.getItem('dashboardUrl');
        if (savedUrl) {
          setDashboards(prev => prev.map((dash, idx) => 
            idx === 0 ? { ...dash, dashboardUrl: savedUrl } : dash
          ));
        }
      } else if (data && data.url) {
        // Update the first dashboard with the stored URL
        setDashboards(prev => prev.map((dash, idx) => 
          idx === 0 ? { ...dash, dashboardUrl: data.url } : dash
        ));
        // Also save to localStorage for offline support
        localStorage.setItem('dashboardUrl', data.url);
      }
    } catch (err) {
      console.warn('Error fetching dashboard link, using localStorage fallback:', err);
      // Fallback to localStorage
      const savedUrl = localStorage.getItem('dashboardUrl');
      if (savedUrl) {
        setDashboards(prev => prev.map((dash, idx) => 
          idx === 0 ? { ...dash, dashboardUrl: savedUrl } : dash
        ));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEditLink = (index: number) => {
    setEditingIndex(index);
    setEditModalOpen(true);
  };

  const handleSaveLink = async (url: string) => {
    if (editingIndex !== null) {
      const updatedDashboards = [...dashboards];
      updatedDashboards[editingIndex] = {
        ...updatedDashboards[editingIndex],
        dashboardUrl: url
      };
      setDashboards(updatedDashboards);
      
      // Save to localStorage immediately as fallback
      if (editingIndex === 0) {
        localStorage.setItem('dashboardUrl', url);
      }
      
      // Save to Supabase (only for first dashboard - Dashboard Ekonomi Regional)
      if (editingIndex === 0) {
        try {
          // First, check if any active link exists
          const { data: existingData, error: fetchError } = await supabase
            .from('dashboard_links')
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
              .from('dashboard_links')
              .update({ 
                url: url,
                updated_at: new Date().toISOString(),
                updated_by: 'admin'
              })
              .eq('id', existingData.id);
          } else {
            // Insert new record
            result = await supabase
              .from('dashboard_links')
              .insert({ 
                url: url,
                label: 'Lihat Dashboard Lengkap',
                is_active: true,
                updated_by: 'admin'
              });
          }

          if (result.error) {
            console.warn('Supabase save failed, using localStorage:', result.error);
            alert('⚠️ Link disimpan secara lokal. Setup Supabase untuk sinkronisasi antar device.');
            return;
          }

          console.log('✅ Dashboard link saved to Supabase');
          alert('✅ Link berhasil disimpan dan akan sync ke semua device!');
        } catch (err) {
          console.warn('Error saving to Supabase, using localStorage:', err);
          alert('⚠️ Link disimpan secara lokal. Setup Supabase untuk sinkronisasi antar device.');
        }
      }
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    customPaging: () => (
      <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600 hover:bg-blue-900 dark:hover:bg-blue-700 transition-colors mt-4"></div>
    ),
    dotsClass: "slick-dots !flex !justify-center !gap-2 !bottom-[-2.5rem]",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false
        }
      }
    ]
  };

  return (
    <section id="dashboard" className="py-20 lg:py-32 bg-white dark:bg-gray-800 relative transition-colors duration-300">
      <BackgroundPattern />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-yellow-100 dark:bg-yellow-900 dark:bg-opacity-30 text-yellow-800 dark:text-yellow-400 rounded-full mb-4">
            <Activity className="w-4 h-4 mr-2" />
            Real-time Monitoring
          </div>
          <h2 className="text-4xl lg:text-5xl mb-4 text-gray-900 dark:text-white">
            Dashboard Ekonomi
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Pantau perkembangan ekonomi Sumatera Selatan secara real-time dengan data terintegrasi dan visualisasi komprehensif
          </p>
        </div>

        {/* All Dashboards in Carousel */}
        <div className="max-w-2xl mx-auto relative px-8 md:px-12 pb-12">
          <Slider ref={sliderRef} {...settings}>
            {dashboards.map((dashboard, index) => (
              <div key={index} className="px-2">
                <DashboardCard 
                  {...dashboard} 
                  index={index}
                  onEditLink={handleEditLink}
                  isAdmin={isAdmin}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Edit Link Modal */}
      <EditLinkModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={handleSaveLink}
        currentUrl={editingIndex !== null ? dashboards[editingIndex].dashboardUrl : ''}
        title={editingIndex !== null ? dashboards[editingIndex].title : ''}
      />

      <style>{`
        .slick-dots li.slick-active div {
          background-color: #1e3a8a !important;
          transform: scale(1.2);
        }
        .dark .slick-dots li.slick-active div {
          background-color: #3b82f6 !important;
        }
        .slick-slide > div {
          height: 100%;
        }
        .slick-track {
          display: flex !important;
          align-items: stretch !important;
        }
        .slick-slide {
          height: auto !important;
        }
        .slick-slide > div {
          height: 100%;
        }
      `}</style>
    </section>
  );
}