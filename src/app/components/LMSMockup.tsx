import { ArrowLeft, BookOpen, Users, Clock, Award, Filter, Search, Play, Book } from 'lucide-react';
import { BackgroundPattern } from './BackgroundPattern';

export function LMSMockup() {
  const courses = [
    {
      id: 1,
      title: "Kebijakan Fiskal Nasional 2024",
      category: "Kebijakan Fiskal",
      level: "Intermediate",
      duration: "4 jam",
      students: 245,
      progress: 0,
      thumbnail: "bg-gradient-to-br from-blue-900 to-blue-700"
    },
    {
      id: 2,
      title: "Sistem Akuntansi Pemerintah Pusat",
      category: "Akuntansi",
      level: "Advanced",
      duration: "6 jam",
      students: 189,
      progress: 0,
      thumbnail: "bg-gradient-to-br from-yellow-600 to-yellow-800"
    },
    {
      id: 3,
      title: "Pengelolaan Keuangan Daerah",
      category: "Keuangan Daerah",
      level: "Beginner",
      duration: "3 jam",
      students: 312,
      progress: 0,
      thumbnail: "bg-gradient-to-br from-blue-800 to-blue-600"
    },
    {
      id: 4,
      title: "Digitalisasi Layanan Perbendaharaan",
      category: "Digitalisasi",
      level: "Intermediate",
      duration: "5 jam",
      students: 276,
      progress: 0,
      thumbnail: "bg-gradient-to-br from-yellow-700 to-amber-700"
    },
    {
      id: 5,
      title: "Analisis Laporan Keuangan Pemerintah",
      category: "Akuntansi",
      level: "Advanced",
      duration: "7 jam",
      students: 198,
      progress: 0,
      thumbnail: "bg-gradient-to-br from-blue-700 to-blue-500"
    },
    {
      id: 6,
      title: "Manajemen Kas Pemerintah",
      category: "Perbendaharaan",
      level: "Intermediate",
      duration: "4 jam",
      students: 234,
      progress: 0,
      thumbnail: "bg-gradient-to-br from-yellow-600 to-yellow-700"
    }
  ];

  const stats = [
    { icon: <BookOpen className="w-6 h-6" />, label: "Total Kursus", value: "124", color: "bg-blue-50 text-blue-900" },
    { icon: <Users className="w-6 h-6" />, label: "Peserta Aktif", value: "2,847", color: "bg-yellow-50 text-yellow-800" },
    { icon: <Award className="w-6 h-6" />, label: "Sertifikat Terbit", value: "1,456", color: "bg-green-50 text-green-800" },
    { icon: <Filter className="w-6 h-6" />, label: "Completion Rate", value: "87%", color: "bg-purple-50 text-purple-800" }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-800 relative">
      <BackgroundPattern />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-6 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => window.close()}
                className="p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl mb-1">Learning Management System</h1>
                <p className="text-sm text-blue-100">Kanwil DJPb Sumatera Selatan</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center font-bold text-gray-900">
                A
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6 relative z-10">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mb-3`}>
                {stat.icon}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</div>
              <div className="text-2xl text-gray-900 dark:text-white">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari kursus, kategori, atau topik..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <button className="flex items-center px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              <Filter className="w-5 h-5 mr-2" />
              Filter
            </button>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mt-4">
            {["Semua", "Kebijakan Fiskal", "Akuntansi", "Keuangan Daerah", "Digitalisasi", "Perbendaharaan"].map((cat, idx) => (
              <button
                key={idx}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  idx === 0 
                    ? "bg-blue-900 text-white dark:bg-yellow-400 dark:text-gray-900" 
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl text-gray-900 dark:text-white">Kursus Tersedia</h2>
            <button className="text-blue-900 dark:text-yellow-400 hover:text-blue-700 dark:hover:text-yellow-300 transition-colors">
              Lihat Semua →
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer">
                {/* Thumbnail */}
                <div className={`${course.thumbnail} h-40 relative flex items-center justify-center text-white`}>
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8" />
                    </div>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-white bg-opacity-90 text-gray-900 rounded-full text-xs font-medium">
                      {course.level}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="text-xs text-blue-900 dark:text-yellow-400 mb-2 font-medium">{course.category}</div>
                  <h3 className="text-lg text-gray-900 dark:text-white mb-3 line-clamp-2">{course.title}</h3>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{course.students}</span>
                    </div>
                  </div>

                  <button className="w-full py-2.5 bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-lg hover:from-blue-800 hover:to-blue-700 transition-all shadow-md hover:shadow-lg">
                    Mulai Belajar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Path */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl text-gray-900 dark:text-white mb-2">Learning Path Rekomendasi</h2>
              <p className="text-gray-600 dark:text-gray-400">Jalur pembelajaran terstruktur untuk pengembangan kompetensi</p>
            </div>
            <Book className="w-12 h-12 text-blue-900 dark:text-yellow-400" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Dasar Keuangan Negara", courses: 5, duration: "20 jam" },
              { title: "Akuntansi Pemerintah", courses: 8, duration: "35 jam" },
              { title: "Manajemen Fiskal Regional", courses: 6, duration: "28 jam" }
            ].map((path, idx) => (
              <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-5 hover:border-blue-900 dark:hover:border-yellow-400 hover:shadow-md transition-all cursor-pointer">
                <div className="w-10 h-10 bg-blue-50 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-blue-900 dark:text-yellow-400" />
                </div>
                <h3 className="text-lg text-gray-900 dark:text-white mb-2">{path.title}</h3>
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>{path.courses} Kursus</span>
                  <span>{path.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}