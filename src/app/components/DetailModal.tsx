import { X, ExternalLink } from 'lucide-react';
import { ReactNode } from 'react';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon: ReactNode;
  description: string;
  gradient: string;
  details?: {
    subtitle?: string;
    content?: string[];
    features?: string[];
    contact?: {
      phone?: string;
      email?: string;
      whatsapp?: string;
    };
  };
}

export function DetailModal({ 
  isOpen, 
  onClose, 
  title, 
  icon, 
  description, 
  gradient,
  details 
}: DetailModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-white/30 dark:bg-gray-900/30 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200" 
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto shadow-2xl animate-in zoom-in-95 duration-200" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`bg-gradient-to-r ${gradient} text-white p-6 rounded-t-2xl`}>
          <div className="flex items-start justify-between mb-4">
            <div className="w-16 h-16 bg-gray-700 dark:bg-gray-600 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white [&>svg]:w-8 [&>svg]:h-8">{icon}</span>
            </div>
            <button 
              onClick={onClose} 
              className="hover:bg-white hover:bg-opacity-10 p-2 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <h2 className="text-2xl mb-2">{title}</h2>
          <p className="text-sm text-white text-opacity-90">{description}</p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {details?.subtitle && (
            <div>
              <h3 className="text-lg text-gray-900 dark:text-white mb-3">{details.subtitle}</h3>
            </div>
          )}

          {details?.content && details.content.length > 0 && (
            <div>
              <h4 className="text-base text-gray-900 dark:text-white mb-3">Deskripsi Lengkap</h4>
              <div className="space-y-2">
                {details.content.map((item, idx) => (
                  <p key={idx} className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          )}

          {details?.features && details.features.length > 0 && (
            <div>
              <h4 className="text-base text-gray-900 dark:text-white mb-3">Layanan/Fitur</h4>
              <ul className="space-y-2">
                {details.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-blue-900 dark:bg-yellow-400 rounded-full mt-2"></div>
                    <span className="text-gray-600 dark:text-gray-400 text-sm flex-1">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {details?.contact && (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
              <h4 className="text-base text-gray-900 dark:text-white mb-3">Informasi Kontak</h4>
              <div className="space-y-2">
                {details.contact.phone && (
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Telepon:</span>
                    <span className="text-blue-900 dark:text-yellow-400 font-medium">{details.contact.phone}</span>
                  </div>
                )}
                {details.contact.email && (
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Email:</span>
                    <span className="text-blue-900 dark:text-yellow-400 font-medium">{details.contact.email}</span>
                  </div>
                )}
                {details.contact.whatsapp && (
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-gray-600 dark:text-gray-400">WhatsApp:</span>
                    <span className="text-blue-900 dark:text-yellow-400 font-medium">{details.contact.whatsapp}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="flex gap-3 pt-4">
            <button 
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Tutup
            </button>
            <button 
              onClick={() => window.open('#', '_blank')}
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-lg hover:from-blue-800 hover:to-blue-700 transition-all shadow-md hover:shadow-lg inline-flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Tautan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}