export function BackgroundPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-100">
      <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="doodle-pattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
            {/* Circles - Navy and Yellow */}
            <circle cx="15" cy="15" r="3" fill="#1e3a8a" opacity="0.15" />
            <circle cx="105" cy="105" r="4" fill="#eab308" opacity="0.15" />
            <circle cx="60" cy="30" r="2.5" fill="#1e3a8a" opacity="0.2" />
            <circle cx="90" cy="60" r="2" fill="#eab308" opacity="0.2" />
            
            {/* Dots */}
            <circle cx="45" cy="85" r="1.5" fill="#1e3a8a" opacity="0.25" />
            <circle cx="25" cy="100" r="1.5" fill="#eab308" opacity="0.25" />
            <circle cx="80" cy="20" r="1.2" fill="#1e40af" opacity="0.2" />
            <circle cx="100" cy="40" r="1.2" fill="#f59e0b" opacity="0.2" />
            
            {/* Wavy lines */}
            <path d="M 20 40 Q 30 50 40 40" stroke="#1e3a8a" strokeWidth="1.5" fill="none" opacity="0.15" />
            <path d="M 70 80 Q 80 70 90 80" stroke="#eab308" strokeWidth="1.5" fill="none" opacity="0.15" />
            <path d="M 5 60 Q 10 55 15 60" stroke="#1e40af" strokeWidth="1.2" fill="none" opacity="0.18" />
            
            {/* Triangles */}
            <path d="M 50 100 L 55 110 L 45 110 Z" fill="#1e3a8a" opacity="0.12" />
            <path d="M 100 15 L 105 25 L 95 25 Z" fill="#eab308" opacity="0.12" />
            
            {/* Plus signs */}
            <path d="M 30 75 L 36 75 M 33 72 L 33 78" stroke="#1e3a8a" strokeWidth="1.5" opacity="0.15" />
            <path d="M 110 50 L 116 50 M 113 47 L 113 53" stroke="#eab308" strokeWidth="1.5" opacity="0.15" />
            
            {/* Arcs */}
            <path d="M 65 95 A 8 8 0 0 1 73 103" stroke="#1e3a8a" strokeWidth="1.5" fill="none" opacity="0.15" />
            <path d="M 35 55 A 6 6 0 0 1 41 61" stroke="#f59e0b" strokeWidth="1.5" fill="none" opacity="0.15" />
            
            {/* Small rectangles */}
            <rect x="10" y="90" width="3" height="3" fill="#1e3a8a" opacity="0.12" />
            <rect x="95" y="35" width="3" height="3" fill="#eab308" opacity="0.12" />
            
            {/* Additional decorative elements */}
            <circle cx="50" cy="10" r="1" fill="#1e40af" opacity="0.2" />
            <circle cx="15" cy="50" r="1" fill="#f59e0b" opacity="0.2" />
            <circle cx="85" cy="90" r="1" fill="#1e3a8a" opacity="0.2" />
            
            {/* Dashed lines */}
            <line x1="55" y1="45" x2="65" y2="45" stroke="#1e3a8a" strokeWidth="1.2" strokeDasharray="2,2" opacity="0.15" />
            <line x1="20" y1="25" x2="30" y2="25" stroke="#eab308" strokeWidth="1.2" strokeDasharray="2,2" opacity="0.15" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#doodle-pattern)" />
      </svg>
    </div>
  );
}