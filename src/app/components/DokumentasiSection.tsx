import { Calendar, Users, Building2, Camera, FileText, Link as LinkIcon, Plus, Trash2, Edit2, X, Save, ExternalLink, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { BackgroundPattern } from './BackgroundPattern';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRef, useState, useEffect } from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';
import { supabase } from '../../lib/supabase';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface DokumentasiFile {
  id: number;
  name: string;
  type: 'PDF' | 'DOC' | 'XLS' | 'PPT' | 'IMG';
  size: string;
  url: string;
}

interface DokumentasiLink {
  id: number;
  label: string;
  url: string;
}

interface DokumentasiItem {
  id: number;
  coverImage: string; // URL for cover image
  title: string;
  description: string;
  date: string;
  picName?: string;
  unit?: string;
  files: DokumentasiFile[];
  links: DokumentasiLink[];
}

// Stock Images Gallery - Optimized for government/professional activities
const STOCK_IMAGES = [
  {
    id: 'stock-1',
    url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    label: 'Workshop/Seminar'
  },
  {
    id: 'stock-2',
    url: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=600&fit=crop',
    label: 'Rapat Formal'
  },
  {
    id: 'stock-3',
    url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop',
    label: 'Pelatihan/Training'
  },
  {
    id: 'stock-4',
    url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop',
    label: 'Presentasi Bisnis'
  },
  {
    id: 'stock-5',
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    label: 'Data & Analytics'
  },
  {
    id: 'stock-6',
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
    label: 'Team Meeting'
  },
  {
    id: 'stock-7',
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    label: 'Kantor/Office'
  },
  {
    id: 'stock-8',
    url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
    label: 'Laporan/Report'
  },
  {
    id: 'stock-9',
    url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop',
    label: 'Kolaborasi Tim'
  },
  {
    id: 'stock-10',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
    label: 'Gedung Pemerintah'
  },
  {
    id: 'stock-11',
    url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop',
    label: 'Desk Work'
  },
  {
    id: 'stock-12',
    url: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=600&fit=crop',
    label: 'Sosialisasi/Outreach'
  }
];

const defaultDokumentasiData: DokumentasiItem[] = [
  {
    id: 1,
    coverImage: STOCK_IMAGES[0].url,
    title: 'Workshop Digitalisasi APBN',
    description: 'Kegiatan workshop dan sosialisasi sistem digitalisasi APBN untuk seluruh K/L di wilayah Sumatera Selatan dengan fokus pada implementasi SPAN dan SAKTI.',
    date: '15 Desember 2025',
    picName: 'Tim Digitalisasi',
    unit: 'Bidang PPA I',
    files: [
      {
        id: 1,
        name: 'Workshop_Digitalisasi_APBN.pdf',
        type: 'PDF',
        size: '2.5 MB',
        url: 'https://example.com/files/Workshop_Digitalisasi_APBN.pdf'
      }
    ],
    links: [
      {
        id: 1,
        label: 'Google Drive - Foto Kegiatan',
        url: 'https://drive.google.com/example'
      }
    ]
  },
  {
    id: 2,
    coverImage: STOCK_IMAGES[1].url,
    title: 'Rapat Koordinasi Transfer ke Daerah',
    description: 'Koordinasi intensif dengan pemerintah daerah terkait optimalisasi penyaluran Dana Alokasi Umum (DAU), Dana Alokasi Khusus (DAK), dan Dana Bagi Hasil (DBH).',
    date: '10 Desember 2025',
    picName: 'Kepala Kanwil',
    unit: 'Bidang PPA II',
    files: [
      {
        id: 2,
        name: 'Rapat_Koordinasi_Transfer_ke_Daerah.docx',
        type: 'DOC',
        size: '1.2 MB',
        url: 'https://example.com/files/Rapat_Koordinasi_Transfer_ke_Daerah.docx'
      }
    ],
    links: []
  },
  {
    id: 3,
    coverImage: STOCK_IMAGES[2].url,
    title: 'Pelatihan Keuangan Daerah',
    description: 'Pelatihan teknis pengelolaan keuangan daerah bagi aparatur pemda se-Sumatera Selatan dengan materi terkini tentang implementasi UU HKPD.',
    date: '5 Desember 2025',
    picName: 'Tim Pelatihan',
    unit: 'Bidang PPA III',
    files: [
      {
        id: 3,
        name: 'Pelatihan_Keuangan_Daerah.pptx',
        type: 'PPT',
        size: '3.8 MB',
        url: 'https://example.com/files/Pelatihan_Keuangan_Daerah.pptx'
      }
    ],
    links: []
  },
  {
    id: 4,
    coverImage: STOCK_IMAGES[3].url,
    title: 'Sosialisasi KUR dan UMi',
    description: 'Sosialisasi program Kredit Usaha Rakyat (KUR) dan Ultra Mikro (UMi) untuk pelaku UMKM dalam rangka mendorong pertumbuhan ekonomi daerah.',
    date: '28 November 2025',
    picName: 'Koordinator UMKM',
    unit: 'Bidang PKN',
    files: [
      {
        id: 4,
        name: 'Sosialisasi_KUR_UMi.xlsx',
        type: 'XLS',
        size: '1.5 MB',
        url: 'https://example.com/files/Sosialisasi_KUR_UMi.xlsx'
      }
    ],
    links: []
  },
  {
    id: 5,
    coverImage: STOCK_IMAGES[4].url,
    title: 'Monitoring Dashboard Ekonomi Regional',
    description: 'Kegiatan monitoring dan evaluasi dashboard ekonomi regional dengan menggunakan data real-time untuk mendukung kebijakan fiskal daerah.',
    date: '20 November 2025',
    picName: 'Tim Analisis',
    unit: 'Bidang PNBP',
    files: [
      {
        id: 5,
        name: 'Monitoring_Dashboard_Ekonomi_Regional.pdf',
        type: 'PDF',
        size: '2.1 MB',
        url: 'https://example.com/files/Monitoring_Dashboard_Ekonomi_Regional.pdf'
      }
    ],
    links: []
  },
  {
    id: 6,
    coverImage: STOCK_IMAGES[5].url,
    title: 'Forum Diskusi Kebijakan Fiskal',
    description: 'Forum diskusi dan sharing best practices dalam implementasi kebijakan fiskal regional bersama stakeholder dari berbagai instansi terkait.',
    date: '12 November 2025',
    picName: 'Tim Kebijakan',
    unit: 'Bagian Umum',
    files: [
      {
        id: 6,
        name: 'Forum_Diskusi_Kebijakan_Fiskal.docx',
        type: 'DOC',
        size: '1.8 MB',
        url: 'https://example.com/files/Forum_Diskusi_Kebijakan_Fiskal.docx'
      }
    ],
    links: []
  }
];

export function DokumentasiSection() {
  const sliderRef = useRef<Slider>(null);
  const { darkMode, isAdmin } = useDarkMode();
  const [selectedDokumentasi, setSelectedDokumentasi] = useState<DokumentasiItem | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<DokumentasiItem | null>(null);
  
  // Load from localStorage or use default data
  const [dokumentasiItems, setDokumentasiItems] = useState<DokumentasiItem[]>(() => {
    const saved = localStorage.getItem('dokumentasiItems');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return defaultDokumentasiData;
      }
    }
    return defaultDokumentasiData;
  });

  // Save to localStorage whenever dokumentasiItems changes
  useEffect(() => {
    localStorage.setItem('dokumentasiItems', JSON.stringify(dokumentasiItems));
  }, [dokumentasiItems]);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    picName: '',
    unit: '',
    coverImage: ''
  });

  // Image selection state
  const [imageMode, setImageMode] = useState<'stock' | 'custom'>('stock');
  const [selectedStockImage, setSelectedStockImage] = useState('');
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  // Links state
  const [documentLinks, setDocumentLinks] = useState<DokumentasiLink[]>([]);
  const [newLinkLabel, setNewLinkLabel] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleStockImageSelect = (imageUrl: string) => {
    setSelectedStockImage(imageUrl);
    setImagePreview(imageUrl);
    setFormData({
      ...formData,
      coverImage: imageUrl
    });
  };

  const handleCustomImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setCustomImageUrl(url);
    setImagePreview(url);
    setFormData({
      ...formData,
      coverImage: url
    });
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newItem: DokumentasiItem = {
      id: Date.now(),
      coverImage: formData.coverImage || STOCK_IMAGES[0].url,
      title: formData.title,
      description: formData.description,
      date: new Date(formData.date).toLocaleDateString('id-ID', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      }),
      picName: formData.picName,
      unit: formData.unit,
      files: [],
      links: documentLinks
    };

    setDokumentasiItems([newItem, ...dokumentasiItems]);
    resetForm();
    setAddModalOpen(false);
  };

  const handleEdit = (item: DokumentasiItem) => {
    setItemToEdit(item);
    
    // Parse date back to YYYY-MM-DD format
    const dateMatch = item.date.match(/(\d+) (\w+) (\d+)/);
    let dateValue = '';
    if (dateMatch) {
      const months: Record<string, string> = {
        'Januari': '01', 'Februari': '02', 'Maret': '03', 'April': '04',
        'Mei': '05', 'Juni': '06', 'Juli': '07', 'Agustus': '08',
        'September': '09', 'Oktober': '10', 'November': '11', 'Desember': '12'
      };
      const day = dateMatch[1].padStart(2, '0');
      const month = months[dateMatch[2]];
      const year = dateMatch[3];
      if (month) {
        dateValue = `${year}-${month}-${day}`;
      }
    }
    
    // Check if it's a stock image or custom
    const isStock = STOCK_IMAGES.some(img => img.url === item.coverImage);
    if (isStock) {
      setImageMode('stock');
      setSelectedStockImage(item.coverImage);
    } else {
      setImageMode('custom');
      setCustomImageUrl(item.coverImage);
    }
    
    setFormData({
      title: item.title,
      description: item.description,
      date: dateValue,
      picName: item.picName || '',
      unit: item.unit || '',
      coverImage: item.coverImage
    });
    setImagePreview(item.coverImage);
    setDocumentLinks(item.links || []);
    setEditModalOpen(true);
    setSelectedDokumentasi(null);
  };

  const handleEditItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemToEdit) return;
    
    const updatedItem: DokumentasiItem = {
      ...itemToEdit,
      coverImage: formData.coverImage || STOCK_IMAGES[0].url,
      title: formData.title,
      description: formData.description,
      date: new Date(formData.date).toLocaleDateString('id-ID', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      }),
      picName: formData.picName,
      unit: formData.unit,
      links: documentLinks
    };

    setDokumentasiItems(dokumentasiItems.map(item => 
      item.id === itemToEdit.id ? updatedItem : item
    ));
    
    resetForm();
    setEditModalOpen(false);
    setItemToEdit(null);
  };

  const handleDelete = (itemId: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus dokumentasi ini?')) {
      setDokumentasiItems(dokumentasiItems.filter(item => item.id !== itemId));
      setSelectedDokumentasi(null);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      picName: '',
      unit: '',
      coverImage: ''
    });
    setImageMode('stock');
    setSelectedStockImage('');
    setCustomImageUrl('');
    setImagePreview('');
    setDocumentLinks([]);
    setNewLinkLabel('');
    setNewLinkUrl('');
  };

  // Link management functions
  const handleAddLink = () => {
    if (newLinkLabel.trim() && newLinkUrl.trim()) {
      const newLink: DokumentasiLink = {
        id: Date.now(),
        label: newLinkLabel,
        url: newLinkUrl
      };
      setDocumentLinks([...documentLinks, newLink]);
      setNewLinkLabel('');
      setNewLinkUrl('');
    }
  };

  const handleRemoveLink = (linkId: number) => {
    setDocumentLinks(documentLinks.filter(link => link.id !== linkId));
  };

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case 'PDF':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      case 'DOC':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
      case 'XLS':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'PPT':
        return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400';
      case 'IMG':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400';
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ],
    customPaging: () => (
      <div className="w-3 h-3 mx-1 rounded-full bg-gray-300 dark:bg-gray-600 hover:bg-blue-900 dark:hover:bg-yellow-400 transition-colors cursor-pointer mt-8"></div>
    ),
    dotsClass: "slick-dots custom-dots flex justify-center items-center"
  };

  // Image Selector Component
  const ImageSelector = () => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        <div className="flex items-center gap-2">
          <Camera className="w-4 h-4" />
          Cover Image *
        </div>
      </label>

      {/* Mode Toggle */}
      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={() => {
            setImageMode('stock');
            if (selectedStockImage) {
              setImagePreview(selectedStockImage);
              setFormData({ ...formData, coverImage: selectedStockImage });
            }
          }}
          className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all ${
            imageMode === 'stock'
              ? 'bg-blue-900 dark:bg-yellow-400 text-white dark:text-gray-900 shadow-md'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <Camera className="w-4 h-4" />
            Stock Pictures
          </div>
        </button>
        <button
          type="button"
          onClick={() => {
            setImageMode('custom');
            if (customImageUrl) {
              setImagePreview(customImageUrl);
              setFormData({ ...formData, coverImage: customImageUrl });
            }
          }}
          className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all ${
            imageMode === 'custom'
              ? 'bg-blue-900 dark:bg-yellow-400 text-white dark:text-gray-900 shadow-md'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <LinkIcon className="w-4 h-4" />
            Custom URL
          </div>
        </button>
      </div>

      {/* Stock Images Gallery */}
      {imageMode === 'stock' && (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3 max-h-80 overflow-y-auto p-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
          {STOCK_IMAGES.map((img) => (
            <div
              key={img.id}
              onClick={() => handleStockImageSelect(img.url)}
              className={`relative cursor-pointer rounded-lg overflow-hidden group border-2 transition-all ${
                selectedStockImage === img.url
                  ? 'border-blue-900 dark:border-yellow-400 shadow-lg'
                  : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <div className="aspect-video bg-gray-200 dark:bg-gray-700">
                <ImageWithFallback
                  src={img.url}
                  alt={img.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              {selectedStockImage === img.url && (
                <div className="absolute inset-0 bg-blue-900/20 dark:bg-yellow-400/20 flex items-center justify-center">
                  <div className="w-8 h-8 bg-blue-900 dark:bg-yellow-400 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-white dark:text-gray-900" />
                  </div>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                <p className="text-white text-xs text-center font-medium">{img.label}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Custom URL Input */}
      {imageMode === 'custom' && (
        <div>
          <input
            type="url"
            value={customImageUrl}
            onChange={handleCustomImageChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400 focus:border-blue-500 dark:focus:border-yellow-400"
            placeholder="https://example.com/image.jpg"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Masukkan URL gambar lengkap (termasuk https://)
          </p>
        </div>
      )}

      {/* Image Preview */}
      {imagePreview && (
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Preview:</p>
          <div className="relative h-48 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600">
            <ImageWithFallback
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );

  return (
    <section id="dokumentasi" className="py-20 lg:py-32 bg-white dark:bg-gray-800 relative transition-colors duration-300">
      <BackgroundPattern />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 relative">
          {isAdmin && (
            <button
              onClick={() => setAddModalOpen(true)}
              className="absolute top-0 right-0 flex items-center gap-2 bg-blue-900 dark:bg-yellow-400 text-white dark:text-gray-900 px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all hover:bg-blue-800 dark:hover:bg-yellow-500"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Tambah Dokumentasi</span>
            </button>
          )}
          
          <h2 className="text-4xl lg:text-5xl mb-4 text-gray-900 dark:text-white">
            Dokumentasi Kegiatan
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Rangkaian kegiatan dan program unggulan Kanwil DJPb Sumatera Selatan
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <button
            onClick={() => sliderRef.current?.slickPrev()}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white dark:bg-gray-700 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center hover:bg-blue-900 dark:hover:bg-yellow-400 text-gray-900 dark:text-white hover:text-white dark:hover:text-gray-900 transition-all duration-300 group"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => sliderRef.current?.slickNext()}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white dark:bg-gray-700 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center hover:bg-blue-900 dark:hover:bg-yellow-400 text-gray-900 dark:text-white hover:text-white dark:hover:text-gray-900 transition-all duration-300 group"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <Slider ref={sliderRef} {...settings}>
            {dokumentasiItems.map((item) => (
              <div key={item.id} className="px-3">
                <div 
                  onClick={() => setSelectedDokumentasi(item)}
                  className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group h-full cursor-pointer"
                >
                  <div className="relative h-56 overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <ImageWithFallback
                      src={item.coverImage}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    
                    <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2 shadow-md">
                      <Calendar className="w-4 h-4 text-blue-900 dark:text-yellow-400" />
                      <span className="text-xs text-gray-900 dark:text-white">{item.date}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl mb-3 text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-900 dark:group-hover:text-yellow-400 transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                      {item.description}
                    </p>

                    {(item.picName || item.unit) && (
                      <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                        {item.picName && (
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <Users className="w-4 h-4 text-blue-900 dark:text-yellow-400" />
                            <span>{item.picName}</span>
                          </div>
                        )}
                        {item.unit && (
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-900 dark:bg-yellow-400 rounded-full"></div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">{item.unit}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        <style>{`
          .custom-dots {
            position: relative;
            bottom: 0;
            margin-top: 40px;
          }
          .custom-dots li {
            margin: 0;
          }
          .custom-dots li.slick-active div {
            background-color: ${darkMode ? '#facc15' : '#1e3a8a'};
            width: 24px;
            transition: all 0.3s ease;
          }
        `}</style>
      </div>

      {/* Detail Modal */}
      {selectedDokumentasi && (
        <div 
          className="fixed inset-0 bg-white/30 dark:bg-gray-900/30 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedDokumentasi(null)}
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-auto shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-6 rounded-t-2xl sticky top-0 z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-2xl mb-2">{selectedDokumentasi.title}</h2>
                </div>
                <button
                  onClick={() => setSelectedDokumentasi(null)}
                  className="hover:bg-white hover:bg-opacity-10 p-2 rounded-lg transition-colors ml-4"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{selectedDokumentasi.date}</span>
                </div>
                {selectedDokumentasi.picName && (
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{selectedDokumentasi.picName}</span>
                  </div>
                )}
                {selectedDokumentasi.unit && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>{selectedDokumentasi.unit}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6">
              {/* Cover Image */}
              <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-6 bg-gray-200 dark:bg-gray-700 shadow-lg">
                <ImageWithFallback
                  src={selectedDokumentasi.coverImage}
                  alt={selectedDokumentasi.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Description Section */}
              <div className="mb-8 p-5 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-800/50 rounded-xl border border-blue-100 dark:border-gray-700 shadow-sm">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-900 dark:text-yellow-400" />
                  Deskripsi Kegiatan
                </h3>
                <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                  {selectedDokumentasi.description}
                </p>
              </div>

              {/* Links Section - REPLACED File Dokumentasi */}
              <h3 className="text-lg text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <LinkIcon className="w-5 h-5 text-blue-900 dark:text-yellow-400" />
                Link Dokumentasi ({selectedDokumentasi.links?.length || 0})
              </h3>

              {selectedDokumentasi.links && selectedDokumentasi.links.length > 0 ? (
                <div className="space-y-3">
                  {selectedDokumentasi.links.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors group border border-transparent hover:border-blue-300 dark:hover:border-blue-700"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                          <LinkIcon className="w-5 h-5 text-blue-900 dark:text-blue-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-900 dark:text-white text-sm font-medium">{link.label}</p>
                          <p className="text-gray-500 dark:text-gray-400 text-xs truncate">{link.url}</p>
                        </div>
                      </div>
                      <div className="text-blue-900 dark:text-yellow-400 group-hover:translate-x-1 transition-transform">
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <LinkIcon className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">Tidak ada link dokumentasi tersedia</p>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 rounded-b-2xl">
              {isAdmin ? (
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(selectedDokumentasi)}
                    className="flex-1 py-3 bg-blue-900 dark:bg-yellow-400 text-white dark:text-gray-900 rounded-lg hover:bg-blue-800 dark:hover:bg-yellow-500 transition-all shadow-md hover:shadow-lg font-medium flex items-center justify-center gap-2"
                  >
                    <Edit2 className="w-5 h-5" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(selectedDokumentasi.id)}
                    className="flex-1 py-3 bg-red-600 dark:bg-red-500 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition-all shadow-md hover:shadow-lg font-medium flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-5 h-5" />
                    Hapus
                  </button>
                  <button
                    onClick={() => setSelectedDokumentasi(null)}
                    className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
                  >
                    Tutup
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSelectedDokumentasi(null)}
                  className="w-full py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Tutup
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {addModalOpen && (
        <div 
          className="fixed inset-0 bg-white/30 dark:bg-gray-900/30 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => { setAddModalOpen(false); resetForm(); }}
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-auto shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-6 rounded-t-2xl sticky top-0 z-10">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-2xl mb-1">Tambah Dokumentasi</h2>
                  <p className="text-sm text-blue-100">Pilih stock image atau upload custom image</p>
                </div>
                <button
                  onClick={() => { setAddModalOpen(false); resetForm(); }}
                  className="hover:bg-white hover:bg-opacity-10 p-2 rounded-lg transition-colors ml-4"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <form onSubmit={handleAddItem}>
                <ImageSelector />

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Judul *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400 focus:border-blue-500 dark:focus:border-yellow-400"
                    placeholder="Masukkan judul kegiatan"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Deskripsi *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400 focus:border-blue-500 dark:focus:border-yellow-400"
                    placeholder="Masukkan deskripsi kegiatan"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tanggal *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400 focus:border-blue-500 dark:focus:border-yellow-400"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Penanggung Jawab</label>
                  <input
                    type="text"
                    name="picName"
                    value={formData.picName}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400 focus:border-blue-500 dark:focus:border-yellow-400"
                    placeholder="Masukkan nama PIC"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Unit</label>
                  <input
                    type="text"
                    name="unit"
                    value={formData.unit}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400 focus:border-blue-500 dark:focus:border-yellow-400"
                    placeholder="Masukkan unit/bidang"
                  />
                </div>
                
                {/* Links Manager */}
                <div className="mb-6 p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900/50">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    <div className="flex items-center gap-2">
                      <LinkIcon className="w-4 h-4" />
                      Link Dokumentasi
                    </div>
                  </label>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                    Tambahkan link ke Google Drive, artikel, berita, atau dokumentasi lainnya
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <input
                      type="text"
                      value={newLinkLabel}
                      onChange={(e) => setNewLinkLabel(e.target.value)}
                      placeholder="Label link (contoh: Google Drive - Foto)"
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400 text-sm"
                    />
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={newLinkUrl}
                        onChange={(e) => setNewLinkUrl(e.target.value)}
                        placeholder="URL link (https://...)"
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400 text-sm"
                      />
                      <button
                        type="button"
                        onClick={handleAddLink}
                        className="px-4 py-2 bg-blue-900 dark:bg-yellow-400 text-white dark:text-gray-900 rounded-md hover:bg-blue-800 dark:hover:bg-yellow-500 transition-all flex items-center gap-2 text-sm font-medium"
                      >
                        <Plus className="w-4 h-4" />
                        Tambah
                      </button>
                    </div>
                  </div>

                  {documentLinks.length > 0 && (
                    <div className="space-y-2">
                      {documentLinks.map((link) => (
                        <div
                          key={link.id}
                          className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <LinkIcon className="w-4 h-4 text-blue-900 dark:text-yellow-400 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{link.label}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{link.url}</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveLink(link.id)}
                            className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                            title="Hapus link"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {documentLinks.length === 0 && (
                    <p className="text-xs text-center text-gray-400 dark:text-gray-500 py-2">
                      Belum ada link ditambahkan
                    </p>
                  )}
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-blue-900 dark:bg-yellow-400 text-white dark:text-gray-900 rounded-lg hover:bg-blue-800 dark:hover:bg-yellow-500 transition-all shadow-md hover:shadow-lg font-medium"
                  >
                    Simpan
                  </button>
                  <button
                    type="button"
                    onClick={() => { setAddModalOpen(false); resetForm(); }}
                    className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModalOpen && itemToEdit && (
        <div 
          className="fixed inset-0 bg-white/30 dark:bg-gray-900/30 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => { setEditModalOpen(false); resetForm(); }}
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-auto shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-6 rounded-t-2xl sticky top-0 z-10">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-2xl mb-1">Edit Dokumentasi</h2>
                  <p className="text-sm text-blue-100">Perbarui informasi kegiatan dan cover image</p>
                </div>
                <button
                  onClick={() => { setEditModalOpen(false); resetForm(); }}
                  className="hover:bg-white hover:bg-opacity-10 p-2 rounded-lg transition-colors ml-4"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <form onSubmit={handleEditItem}>
                <ImageSelector />

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Judul *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400 focus:border-blue-500 dark:focus:border-yellow-400"
                    placeholder="Masukkan judul kegiatan"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Deskripsi *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400 focus:border-blue-500 dark:focus:border-yellow-400"
                    placeholder="Masukkan deskripsi kegiatan"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tanggal *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400 focus:border-blue-500 dark:focus:border-yellow-400"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Penanggung Jawab</label>
                  <input
                    type="text"
                    name="picName"
                    value={formData.picName}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400 focus:border-blue-500 dark:focus:border-yellow-400"
                    placeholder="Masukkan nama PIC"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Unit</label>
                  <input
                    type="text"
                    name="unit"
                    value={formData.unit}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400 focus:border-blue-500 dark:focus:border-yellow-400"
                    placeholder="Masukkan unit/bidang"
                  />
                </div>
                
                {/* Links Manager - Edit Modal */}
                <div className="mb-6 p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900/50">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    <div className="flex items-center gap-2">
                      <LinkIcon className="w-4 h-4" />
                      Link Dokumentasi
                    </div>
                  </label>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                    Tambahkan link ke Google Drive, artikel, berita, atau dokumentasi lainnya
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <input
                      type="text"
                      value={newLinkLabel}
                      onChange={(e) => setNewLinkLabel(e.target.value)}
                      placeholder="Label link (contoh: Google Drive - Foto)"
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400 text-sm"
                    />
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={newLinkUrl}
                        onChange={(e) => setNewLinkUrl(e.target.value)}
                        placeholder="URL link (https://...)"
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400 text-sm"
                      />
                      <button
                        type="button"
                        onClick={handleAddLink}
                        className="px-4 py-2 bg-blue-900 dark:bg-yellow-400 text-white dark:text-gray-900 rounded-md hover:bg-blue-800 dark:hover:bg-yellow-500 transition-all flex items-center gap-2 text-sm font-medium"
                      >
                        <Plus className="w-4 h-4" />
                        Tambah
                      </button>
                    </div>
                  </div>

                  {documentLinks.length > 0 && (
                    <div className="space-y-2">
                      {documentLinks.map((link) => (
                        <div
                          key={link.id}
                          className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <LinkIcon className="w-4 h-4 text-blue-900 dark:text-yellow-400 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{link.label}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{link.url}</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveLink(link.id)}
                            className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                            title="Hapus link"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {documentLinks.length === 0 && (
                    <p className="text-xs text-center text-gray-400 dark:text-gray-500 py-2">
                      Belum ada link ditambahkan
                    </p>
                  )}
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-blue-900 dark:bg-yellow-400 text-white dark:text-gray-900 rounded-lg hover:bg-blue-800 dark:hover:bg-yellow-500 transition-all shadow-md hover:shadow-lg font-medium"
                  >
                    Simpan Perubahan
                  </button>
                  <button
                    type="button"
                    onClick={() => { setEditModalOpen(false); resetForm(); }}
                    className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}