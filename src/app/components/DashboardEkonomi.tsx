import { ArrowLeft, TrendingUp, DollarSign, BarChart3, PieChart, Calendar, Filter, RefreshCw, Download } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart as RechartPieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BackgroundPattern } from './BackgroundPattern';

export function DashboardEkonomi() {
  const pdrDataLine = [
    { name: 'Jan', realisasi: 3.2, target: 3.5 },
    { name: 'Feb', realisasi: 4.1, target: 4.0 },
    { name: 'Mar', realisasi: 5.8, target: 5.5 },
    { name: 'Apr', realisasi: 7.2, target: 7.0 },
    { name: 'Mei', realisasi: 9.1, target: 8.8 },
    { name: 'Jun', realisasi: 11.5, target: 11.0 },
    { name: 'Jul', realisasi: 13.2, target: 12.5 },
    { name: 'Agt', realisasi: 15.1, target: 14.8 },
  ];

  const sektorDataPie = [
    { name: 'Pertanian', value: 12.5 },
    { name: 'Manufaktur', value: 18.3 },
    { name: 'Perdagangan', value: 15.7 },
    { name: 'Jasa Keuangan', value: 14.2 },
    { name: 'Konstruksi', value: 11.8 },
    { name: 'Lainnya', value: 27.5 },
  ];

  const trendBulanan = [
    { bulan: 'Jan', nilai: 3.2 },
    { bulan: 'Feb', nilai: 3.8 },
    { bulan: 'Mar', nilai: 4.5 },
    { bulan: 'Apr', nilai: 5.1 },
    { bulan: 'Mei', nilai: 4.8 },
    { bulan: 'Jun', nilai: 5.3 },
    { bulan: 'Jul', nilai: 5.7 },
    { bulan: 'Agt', nilai: 5.2 },
  ];

  const COLORS = ['#1e3a8a', '#3b82f6', '#fbbf24', '#f59e0b', '#10b981', '#6366f1'];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-800 relative">
      <BackgroundPattern />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-6 shadow-lg relative z-10">
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
                <h1 className="text-3xl mb-1">Dashboard Ekonomi Regional</h1>
                <p className="text-blue-100">Sumatera Selatan - Update Terakhir: 30 Des 2024</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center px-4 py-2 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-colors">
                <Calendar className="w-4 h-4 mr-2" />
                2024
              </button>
              <button className="flex items-center px-4 py-2 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-colors">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
              <button className="p-2 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-colors">
                <RefreshCw className="w-5 h-5" />
              </button>
              <button className="p-2 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-colors">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto p-6 relative z-10">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-l-4 border-blue-900">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">PDRB Total</div>
            <div className="text-3xl text-gray-900 dark:text-white mb-1">Rp 412.8 T</div>
            <div className="text-sm text-green-600 dark:text-green-400">↑ +5.2% YoY</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-l-4 border-yellow-600">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">PDRB Per Kapita</div>
            <div className="text-3xl text-gray-900 dark:text-white mb-1">Rp 67.8 Jt</div>
            <div className="text-sm text-green-600 dark:text-green-400">↑ +4.2% YoY</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-l-4 border-blue-700">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Pertumbuhan Ekonomi</div>
            <div className="text-3xl text-gray-900 dark:text-white mb-1">5.2%</div>
            <div className="text-sm text-green-600 dark:text-green-400">↑ +0.8% QoQ</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-l-4 border-yellow-700">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Inflasi Tahunan</div>
            <div className="text-3xl text-gray-900 dark:text-white mb-1">2.87%</div>
            <div className="text-sm text-red-600 dark:text-red-400">↑ +0.15%</div>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Line Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h3 className="text-lg mb-4 text-gray-900 dark:text-white">Pertumbuhan PDRB (Triliun Rupiah)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={pdrDataLine}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value: any) => `Rp ${value.toLocaleString('id-ID')} T`} />
                <Legend />
                <Line type="monotone" dataKey="realisasi" stroke="#1e3a8a" strokeWidth={3} name="Realisasi" />
                <Line type="monotone" dataKey="target" stroke="#fbbf24" strokeWidth={3} name="Target" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h3 className="text-lg mb-4 text-gray-900 dark:text-white">Kontribusi Sektor terhadap PDRB</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RechartPieChart>
                <Pie
                  data={sektorDataPie}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }: any) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sektorDataPie.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => `${value}%`} />
              </RechartPieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h3 className="text-lg mb-4 text-gray-900 dark:text-white">Trend Pertumbuhan Bulanan (%)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={trendBulanan}>
                <defs>
                  <linearGradient id="colorNilai" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="bulan" />
                <YAxis />
                <Tooltip formatter={(value: any) => `${value}%`} />
                <Area type="monotone" dataKey="nilai" stroke="#1e3a8a" fillOpacity={1} fill="url(#colorNilai)" name="Pertumbuhan" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detail Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 className="text-lg mb-4 text-gray-900 dark:text-white">Detail Sektor Ekonomi</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-400">Sektor</th>
                  <th className="text-right py-3 px-4 text-gray-700 dark:text-gray-400">Nilai (T)</th>
                  <th className="text-right py-3 px-4 text-gray-700 dark:text-gray-400">Kontribusi (%)</th>
                  <th className="text-right py-3 px-4 text-gray-700 dark:text-gray-400">Pertumbuhan</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="py-3 px-4">Manufaktur</td>
                  <td className="text-right py-3 px-4">Rp 75.5</td>
                  <td className="text-right py-3 px-4">18.3%</td>
                  <td className="text-right py-3 px-4 text-green-600 dark:text-green-400">+6.2%</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="py-3 px-4">Perdagangan</td>
                  <td className="text-right py-3 px-4">Rp 64.8</td>
                  <td className="text-right py-3 px-4">15.7%</td>
                  <td className="text-right py-3 px-4 text-green-600 dark:text-green-400">+5.1%</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="py-3 px-4">Jasa Keuangan</td>
                  <td className="text-right py-3 px-4">Rp 58.6</td>
                  <td className="text-right py-3 px-4">14.2%</td>
                  <td className="text-right py-3 px-4 text-green-600 dark:text-green-400">+4.8%</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="py-3 px-4">Pertanian</td>
                  <td className="text-right py-3 px-4">Rp 51.6</td>
                  <td className="text-right py-3 px-4">12.5%</td>
                  <td className="text-right py-3 px-4 text-green-600 dark:text-green-400">+3.5%</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="py-3 px-4">Konstruksi</td>
                  <td className="text-right py-3 px-4">Rp 48.7</td>
                  <td className="text-right py-3 px-4">11.8%</td>
                  <td className="text-right py-3 px-4 text-green-600 dark:text-green-400">+7.3%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}