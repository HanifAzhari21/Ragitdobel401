import { useState } from 'react';
import {
  TrendingUp,
  Wallet,
  Shield,
  Landmark,
  PiggyBank,
  Building,
  ArrowRight,
  Users,
  Banknote,
  LineChart,
} from "lucide-react";
import { BackgroundPattern } from "./BackgroundPattern";
import { DetailModal } from './DetailModal';

interface TematikCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  onClick: () => void;
}

function TematikCard({ icon, title, description, color, onClick }: TematikCardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-gradient-to-br ${color} rounded-xl p-6 text-white hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl group`}
    >
      <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md">
        {icon}
      </div>
      <h3 className="text-lg mb-2">{title}</h3>
      <p className="text-sm text-white text-opacity-90 mb-3 line-clamp-2">{description}</p>
      <div className="flex items-center text-sm text-white text-opacity-90 group-hover:text-opacity-100">
        Lihat Detail
        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
}

export function TematikSection() {
  const [selectedTematik, setSelectedTematik] = useState<number | null>(null);

  const tematik = [
    {
      icon: <TrendingUp className="w-7 h-7 text-blue-900" />,
      title: "Optimalisasi Transfer ke Daerah",
      description: "Peningkatan efektivitas penyaluran dan monitoring Dana Alokasi Umum, Dana Alokasi Khusus, dan Dana Bagi Hasil",
      color: "from-blue-900 to-blue-800",
      details: {
        subtitle: "Program Optimalisasi Transfer ke Daerah",
        content: [
          "Program ini bertujuan meningkatkan efektivitas dan efisiensi penyaluran Transfer ke Daerah (TKD) yang meliputi Dana Alokasi Umum (DAU), Dana Alokasi Khusus (DAK), dan Dana Bagi Hasil (DBH).",
          "Monitoring real-time dilakukan untuk memastikan tepat waktu, tepat sasaran, dan tepat jumlah dalam penyaluran dana ke pemerintah daerah."
        ],
        features: [
          "Dashboard monitoring penyaluran TKD real-time",
          "Sistem pelaporan dan rekonsiliasi terintegrasi",
          "Asistensi teknis perencanaan dan pelaporan TKD",
          "Koordinasi intensif dengan Pemda dan K/L terkait",
          "Evaluasi berkala efektivitas penggunaan dana"
        ]
      }
    },
    {
      icon: <Wallet className="w-7 h-7 text-yellow-700" />,
      title: "Akselerasi KUR & UMi",
      description: "Program percepatan penyaluran Kredit Usaha Rakyat dan Ultra Mikro untuk pemberdayaan UMKM daerah",
      color: "from-yellow-600 to-yellow-700",
      details: {
        subtitle: "Program Percepatan Pembiayaan UMKM",
        content: [
          "Akselerasi penyaluran Kredit Usaha Rakyat (KUR) dan Pembiayaan Ultra Mikro (UMi) untuk mendukung pertumbuhan dan keberlanjutan usaha mikro, kecil, dan menengah di Sumatera Selatan.",
          "Program ini mencakup edukasi, fasilitasi akses pembiayaan, dan monitoring untuk memastikan dampak positif bagi pelaku UMKM."
        ],
        features: [
          "Sosialisasi dan edukasi program KUR/UMi",
          "Fasilitasi akses pembiayaan untuk UMKM",
          "Monitoring dan evaluasi penyaluran",
          "Koordinasi dengan lembaga penyalur (bank)",
          "Pendampingan dan asistensi teknis UMKM"
        ]
      }
    },
    {
      icon: <Shield className="w-7 h-7 text-blue-900" />,
      title: "Penanganan Kemiskinan Ekstrem",
      description: "Sinergi program bantuan sosial dan pemberdayaan ekonomi untuk pengentasan kemiskinan ekstrem",
      color: "from-blue-800 to-blue-700",
      details: {
        subtitle: "Program Pengentasan Kemiskinan Ekstrem",
        content: [
          "Program terpadu untuk penanganan kemiskinan ekstrem melalui sinergi bantuan sosial, pemberdayaan ekonomi, dan akses layanan dasar.",
          "Fokus pada keluarga penerima manfaat untuk mendapatkan intervensi yang tepat sasaran dan berkelanjutan."
        ],
        features: [
          "Koordinasi program bantuan sosial (PKH, BPNT, dll)",
          "Fasilitasi akses pembiayaan produktif",
          "Pendampingan pemberdayaan ekonomi keluarga",
          "Monitoring dampak program terhadap penurunan kemiskinan",
          "Sinergi dengan program daerah dan pusat"
        ]
      }
    },
    {
      icon: <Landmark className="w-7 h-7 text-yellow-800" />,
      title: "Local Taxing Power & HKPD",
      description: "Penguatan kapasitas pajak daerah dan harmonisasi kebijakan keuangan pusat-daerah",
      color: "from-yellow-700 to-yellow-800",
      details: {
        subtitle: "Penguatan Kapasitas Fiskal Daerah",
        content: [
          "Program penguatan kapasitas perpajakan daerah (local taxing power) dan implementasi Hubungan Keuangan Pusat dan Daerah (HKPD) sesuai UU No. 1 Tahun 2022.",
          "Mendorong peningkatan Pendapatan Asli Daerah (PAD) melalui optimalisasi potensi pajak dan retribusi daerah."
        ],
        features: [
          "Asistensi implementasi UU HKPD",
          "Kajian potensi pajak dan retribusi daerah",
          "Pelatihan aparatur pemungut pajak daerah",
          "Harmonisasi regulasi pajak daerah",
          "Fasilitasi sistem informasi pajak daerah"
        ]
      }
    },
    {
      icon: <PiggyBank className="w-7 h-7 text-blue-800" />,
      title: "Digitalisasi Keuangan Negara",
      description: "Transformasi digital layanan keuangan negara untuk meningkatkan transparansi dan efisiensi",
      color: "from-blue-700 to-blue-600",
      details: {
        subtitle: "Transformasi Digital Keuangan Negara",
        content: [
          "Program transformasi digital dalam pengelolaan keuangan negara untuk meningkatkan transparansi, akuntabilitas, dan efisiensi layanan.",
          "Implementasi sistem terintegrasi dan otomasi proses bisnis untuk mendukung good governance."
        ],
        features: [
          "Implementasi sistem SPAN dan SAKTI",
          "E-procurement dan e-katalog",
          "Digitalisasi dokumen dan arsip",
          "Dashboard dan analytics keuangan real-time",
          "Integrasi sistem antar instansi"
        ]
      }
    },
    {
      icon: <Building className="w-7 h-7 text-yellow-700" />,
      title: "Pembiayaan Infrastruktur Daerah",
      description: "Optimalisasi skema pembiayaan infrastruktur strategis untuk mendorong pertumbuhan ekonomi regional",
      color: "from-yellow-600 to-amber-600",
      details: {
        subtitle: "Skema Pembiayaan Infrastruktur Regional",
        content: [
          "Program fasilitasi dan optimalisasi berbagai skema pembiayaan untuk pembangunan infrastruktur daerah yang strategis dan berdampak pada pertumbuhan ekonomi.",
          "Mencakup KPBU (Kerjasama Pemerintah Badan Usaha), pinjaman daerah, dan skema pembiayaan kreatif lainnya."
        ],
        features: [
          "Asistensi penyusunan kajian kelayakan proyek",
          "Fasilitasi skema KPBU dan PPP",
          "Pendampingan akses pinjaman daerah",
          "Koordinasi dengan lembaga pembiayaan",
          "Monitoring dan evaluasi proyek infrastruktur"
        ]
      }
    },
    {
      icon: <Users className="w-7 h-7 text-blue-900" />,
      title: "Pengembangan SDM Keuangan",
      description: "Peningkatan kompetensi aparatur pengelola keuangan daerah melalui program pelatihan berkelanjutan",
      color: "from-blue-800 to-blue-900",
      details: {
        subtitle: "Program Peningkatan Kapasitas SDM",
        content: [
          "Program pengembangan kompetensi aparatur pengelola keuangan di lingkungan pemerintah daerah melalui pelatihan, workshop, dan coaching clinic.",
          "Fokus pada peningkatan pemahaman regulasi, teknis operasional, dan best practices pengelolaan keuangan."
        ],
        features: [
          "Pelatihan teknis keuangan daerah",
          "Workshop implementasi regulasi terbaru",
          "Coaching clinic dan mentoring",
          "Sertifikasi kompetensi pengelola keuangan",
          "Knowledge sharing dan forum diskusi"
        ]
      }
    },
    {
      icon: <Banknote className="w-7 h-7 text-yellow-700" />,
      title: "Monitoring Belanja APBN Regional",
      description: "Sistem monitoring dan evaluasi realisasi belanja APBN di wilayah Sumatera Selatan",
      color: "from-yellow-700 to-yellow-600",
      details: {
        subtitle: "Sistem Monitoring Belanja Regional",
        content: [
          "Program monitoring dan evaluasi realisasi belanja APBN di wilayah kerja untuk memastikan penyerapan yang optimal dan tepat sasaran.",
          "Dashboard terintegrasi menyediakan informasi real-time untuk mendukung pengambilan keputusan."
        ],
        features: [
          "Dashboard monitoring belanja APBN real-time",
          "Analisis penyerapan anggaran per K/L",
          "Early warning system kendala penyerapan",
          "Koordinasi percepatan realisasi belanja",
          "Laporan berkala ke stakeholder"
        ]
      }
    },
    {
      icon: <LineChart className="w-7 h-7 text-blue-900" />,
      title: "Analisis Fiskal Regional",
      description: "Kajian mendalam terhadap kondisi dan proyeksi fiskal daerah untuk perencanaan strategis",
      color: "from-blue-900 to-blue-700",
      details: {
        subtitle: "Kajian dan Analisis Fiskal Regional",
        content: [
          "Program kajian dan analisis komprehensif terhadap kondisi fiskal daerah, proyeksi, dan rekomendasi kebijakan untuk mendukung perencanaan strategis pemerintah daerah.",
          "Hasil analisis menjadi input penting dalam penyusunan kebijakan fiskal regional."
        ],
        features: [
          "Analisis APBD dan kapasitas fiskal daerah",
          "Proyeksi pendapatan dan belanja daerah",
          "Kajian kebijakan fiskal regional",
          "Benchmarking kinerja fiskal antar daerah",
          "Rekomendasi kebijakan berbasis data"
        ]
      }
    },
  ];

  return (
    <>
      <section className="py-20 lg:py-32 bg-gray-300 dark:bg-gray-900 relative transition-colors duration-300">
        <BackgroundPattern />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl mb-4 text-gray-900 dark:text-white">
              Isu & Program Strategis
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
              Informasi tematik unggulan terkait program dan kebijakan strategis nasional di wilayah Sumatera Selatan
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {tematik.map((item, index) => (
              <TematikCard 
                key={index} 
                icon={item.icon}
                title={item.title}
                description={item.description}
                color={item.color}
                onClick={() => setSelectedTematik(index)}
              />
            ))}
          </div>

          <div className="text-center">
            <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-xl hover:from-blue-800 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl group">
              <span className="text-lg">Lihat Selengkapnya</span>
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedTematik !== null && (
        <DetailModal
          isOpen={selectedTematik !== null}
          onClose={() => setSelectedTematik(null)}
          title={tematik[selectedTematik].title}
          icon={tematik[selectedTematik].icon}
          description={tematik[selectedTematik].description}
          gradient={tematik[selectedTematik].color}
          details={tematik[selectedTematik].details}
        />
      )}
    </>
  );
}