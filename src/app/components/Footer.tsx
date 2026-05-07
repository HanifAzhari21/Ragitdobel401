import {
  Mail,
  Phone,
  MapPin,
  ExternalLink,
} from "lucide-react";

export function Footer() {
  const quickLinks = [
    { label: "Dashboard", href: "#dashboard" },
    { label: "LMS", href: "#lms" },
    { label: "Dokumentasi Kegiatan", href: "#dokumentasi" },
  ];

  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300 dark:text-gray-400 transition-colors duration-300">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-blue-800 dark:from-gray-700 dark:to-gray-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  R4
                </span>
              </div>
              <div>
                <div className="font-bold text-white text-lg">
                  Ragit Dobel 4.0
                </div>
                <div className="text-sm text-gray-400 dark:text-gray-500">
                  Kanwil DJPb Sumatera Selatan
                </div>
              </div>
            </div>
            <p className="text-gray-400 dark:text-gray-500 mb-6 leading-relaxed">
              Dashboard monitoring dan layanan terpadu Kantor
              Wilayah Direktorat Jenderal Perbendaharaan
              Sumatera Selatan untuk K/L, Pemerintah Daerah, dan
              Publik
            </p>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm">
                  Jl. Kapten A. Rivai No. 4, Palembang, Sumatera
                  Selatan 30129
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-sm">(0711) 355430</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-sm">
                  kanwilpalembang@djpb.kemenkeu.go.id
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-yellow-400 transition-colors inline-flex items-center group"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Website Kami */}
          <div id="website-kami">
            <h3 className="text-white mb-4">Website Kami</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.kemenkeu.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-yellow-400 transition-colors inline-flex items-center group"
                >
                  Kementerian Keuangan
                  <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.djpb.kemenkeu.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-yellow-400 transition-colors inline-flex items-center group"
                >
                  Direktorat Jenderal Perbendaharaan
                  <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.djpb.kemenkeu.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-yellow-400 transition-colors inline-flex items-center group"
                >
                  Portal Nasional DJPB
                  <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="https://span.kemenkeu.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-yellow-400 transition-colors inline-flex items-center group"
                >
                  SPAN Kemenkeu
                  <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Rencana Section */}
        <div
          id="rencana"
          className="mt-12 pt-8 border-t border-gray-800 dark:border-gray-900"
        >
          <h3 className="text-white mb-4">
            Rencana Ragit Dobel 4.0
          </h3>
          <p className="text-gray-400 dark:text-gray-500 leading-relaxed max-w-4xl">
            Platform ini terus dikembangkan untuk meningkatkan
            layanan dan transparansi pengelolaan keuangan
            negara. Rencana pengembangan mencakup peningkatan
            dashboard interaktif, integrasi data real-time, dan
            perluasan fitur layanan digital untuk K/L dan Pemda.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 dark:border-gray-900 text-center">
          <p className="text-gray-400 dark:text-gray-500 text-sm">
            © {new Date().getFullYear()} Kanwil Direktorat
            Jenderal Perbendaharaan Sumatera Selatan
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-sm">
            Powered by{" "}
            <span className="text-blue-600">
              IT Magang Kemnaker DJPb Sumsel
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}