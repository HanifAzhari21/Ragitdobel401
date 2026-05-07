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
          </div>
        </div>
      </div>
    </section>
  );
}