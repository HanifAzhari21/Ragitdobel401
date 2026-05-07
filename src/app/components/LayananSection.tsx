import { useState } from 'react';
import { FileText, Info, Building, GraduationCap, Shield, Phone, ArrowRight } from 'lucide-react';
import { BackgroundPattern } from './BackgroundPattern';
import { DetailModal } from './DetailModal';

interface LayananCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

function LayananCard({ icon, title, description, onClick }: LayananCardProps) {
  return (
    <div 
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-yellow-400 dark:hover:border-yellow-500 group cursor-pointer"
    >
      <div className="w-12 h-12 bg-blue-50 dark:bg-white rounded-lg flex items-center justify-center mb-4 group-hover:bg-yellow-50 dark:group-hover:bg-yellow-100 transition-colors">
        <span className="text-blue-900 [&>svg]:w-6 [&>svg]:h-6">{icon}</span>
      </div>
      <h3 className="text-lg mb-2 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

export function LayananSection() {
  const [selectedLayanan, setSelectedLayanan] = useState<number | null>(null);

  const layanan = [
    {
      icon: <FileText className="w-6 h-6 text-blue-900" />,
      title: "Konsultasi & Asistensi",
      description: "Layanan konsultasi kebijakan perbendaharaan dan asistensi teknis untuk K/L dan Pemda",
      gradient: "from-blue-900 to-blue-800",
      details: {
        subtitle: "Layanan Konsultasi Profesional",
        content: [
          "Kami menyediakan layanan konsultasi komprehensif terkait kebijakan perbendaharaan negara dan asistensi teknis bagi Kementerian/Lembaga (K/L) dan Pemerintah Daerah (Pemda).",
          "Tim ahli kami siap membantu Anda dalam memahami dan mengimplementasikan berbagai regulasi dan kebijakan terkait pengelolaan keuangan negara."
        ],
        features: [
          "Konsultasi kebijakan perbendaharaan dan keuangan negara",
          "Asistensi teknis implementasi sistem dan regulasi",
          "Pendampingan penyusunan dokumen perencanaan dan pelaporan",
          "Workshop dan pelatihan teknis",
          "Koordinasi lintas instansi"
        ],
        contact: {
          phone: "(0711) 351234",
          email: "konsultasi.sumsel@djpb.kemenkeu.go.id",
          whatsapp: "+62 811-7012-3456"
        }
      }
    },
    {
      icon: <Building className="w-6 h-6 text-blue-900" />,
      title: "Layanan Administrasi",
      description: "Layanan administrasi keuangan, verifikasi, dan validasi dokumen",
      gradient: "from-blue-800 to-blue-700",
      details: {
        subtitle: "Layanan Administrasi Keuangan Terintegrasi",
        content: [
          "Layanan administrasi keuangan meliputi proses verifikasi, validasi, dan pengelolaan dokumen terkait transaksi keuangan negara.",
          "Kami memastikan setiap proses administrasi berjalan sesuai dengan ketentuan yang berlaku untuk mendukung transparansi dan akuntabilitas pengelolaan keuangan negara."
        ],
        features: [
          "Verifikasi dokumen pencairan dana",
          "Validasi SPM (Surat Perintah Membayar)",
          "Pengelolaan rekening bendahara",
          "Rekonsiliasi data keuangan",
          "Penerbitan surat keterangan dan dokumen administrasi"
        ],
        contact: {
          phone: "(0711) 351235",
          email: "administrasi.sumsel@djpb.kemenkeu.go.id",
          whatsapp: "+62 811-7012-3457"
        }
      }
    },
    {
      icon: <Info className="w-6 h-6 text-blue-900" />,
      title: "Informasi Fiskal & Keuangan Daerah",
      description: "Akses informasi kebijakan fiskal, keuangan daerah, dan regulasi terkini",
      gradient: "from-yellow-600 to-yellow-700",
      details: {
        subtitle: "Portal Informasi Fiskal Regional",
        content: [
          "Pusat informasi terpadu untuk kebijakan fiskal nasional dan daerah, data keuangan daerah, serta update regulasi terbaru di bidang perbendaharaan dan keuangan negara.",
          "Platform ini menyediakan data dan analisis yang komprehensif untuk mendukung perencanaan dan pengambilan keputusan yang berbasis data."
        ],
        features: [
          "Database kebijakan fiskal dan keuangan daerah",
          "Update regulasi dan peraturan terbaru",
          "Dashboard monitoring transfer ke daerah",
          "Analisis dan kajian fiskal regional",
          "Publikasi laporan keuangan pemerintah"
        ],
        contact: {
          phone: "(0711) 351236",
          email: "info.sumsel@djpb.kemenkeu.go.id",
          whatsapp: "+62 811-7012-3458"
        }
      }
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-blue-900" />,
      title: "Publikasi & Edukasi Keuangan Negara",
      description: "Materi edukasi, publikasi riset, dan artikel keuangan negara",
      gradient: "from-blue-700 to-blue-600",
      details: {
        subtitle: "Knowledge Center Keuangan Negara",
        content: [
          "Menyediakan berbagai materi edukasi, publikasi hasil riset, artikel ilmiah, dan modul pembelajaran terkait pengelolaan keuangan negara.",
          "Konten edukatif dirancang untuk meningkatkan literasi keuangan publik dan kapasitas pengelola keuangan di berbagai tingkatan."
        ],
        features: [
          "E-book dan modul pembelajaran keuangan negara",
          "Publikasi hasil kajian dan riset",
          "Artikel dan newsletter berkala",
          "Video tutorial dan webinar",
          "Infografis dan visualisasi data"
        ],
        contact: {
          phone: "(0711) 351237",
          email: "edukasi.sumsel@djpb.kemenkeu.go.id",
          whatsapp: "+62 811-7012-3459"
        }
      }
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-900" />,
      title: "Akses PPID",
      description: "Portal informasi publik dan layanan permohonan informasi",
      gradient: "from-blue-800 to-blue-900",
      details: {
        subtitle: "Pejabat Pengelola Informasi dan Dokumentasi",
        content: [
          "PPID (Pejabat Pengelola Informasi dan Dokumentasi) adalah portal resmi untuk mengakses informasi publik sesuai dengan UU Keterbukaan Informasi Publik.",
          "Masyarakat dapat mengajukan permohonan informasi secara online dengan proses yang transparan dan akuntabel."
        ],
        features: [
          "Akses informasi publik yang wajib disediakan",
          "Pengajuan permohonan informasi online",
          "Tracking status permohonan informasi",
          "Download dokumen informasi publik",
          "Layanan keberatan atas permohonan informasi"
        ],
        contact: {
          phone: "(0711) 351238",
          email: "ppid.sumsel@djpb.kemenkeu.go.id",
          whatsapp: "+62 811-7012-3460"
        }
      }
    },
    {
      icon: <Phone className="w-6 h-6 text-blue-900" />,
      title: "Kontak & Helpdesk",
      description: "Hubungi kami untuk pertanyaan, pengaduan, atau bantuan teknis",
      gradient: "from-yellow-700 to-yellow-800",
      details: {
        subtitle: "Layanan Bantuan 24/7",
        content: [
          "Tim helpdesk kami siap membantu menjawab pertanyaan, menangani pengaduan, dan memberikan bantuan teknis terkait layanan Kanwil DJPb Sumatera Selatan.",
          "Kami berkomitmen memberikan respon cepat dan solusi efektif untuk setiap kebutuhan Anda."
        ],
        features: [
          "Layanan informasi umum",
          "Penanganan pengaduan dan keluhan",
          "Bantuan teknis sistem aplikasi",
          "Konsultasi cepat via telepon/chat",
          "Pemandu kunjungan kantor"
        ],
        contact: {
          phone: "(0711) 351239 / 351240",
          email: "helpdesk.sumsel@djpb.kemenkeu.go.id",
          whatsapp: "+62 811-7012-3461"
        }
      }
    }
  ];

  return (
    <>
      <section id="layanan" className="py-20 lg:py-32 bg-white dark:bg-gray-800 relative transition-colors duration-300">
        <BackgroundPattern />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl mb-4 text-gray-900 dark:text-white">
              Layanan Kanwil DJPb Sumatera Selatan
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Berbagai layanan untuk mendukung pengelolaan keuangan negara yang efektif dan efisien
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {layanan.map((item, index) => (
              <LayananCard 
                key={index} 
                icon={item.icon}
                title={item.title}
                description={item.description}
                onClick={() => setSelectedLayanan(index)}
              />
            ))}
          </div>

          <div className="text-center">
            <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-lg hover:shadow-xl group">
              Lihat Semua Layanan
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedLayanan !== null && (
        <DetailModal
          isOpen={selectedLayanan !== null}
          onClose={() => setSelectedLayanan(null)}
          title={layanan[selectedLayanan].title}
          icon={layanan[selectedLayanan].icon}
          description={layanan[selectedLayanan].description}
          gradient={layanan[selectedLayanan].gradient}
          details={layanan[selectedLayanan].details}
        />
      )}
    </>
  );
}