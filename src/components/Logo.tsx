export default function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bookGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6"/>
          <stop offset="100%" stopColor="#8B5CF6"/>
        </linearGradient>
        <linearGradient id="pageGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF"/>
          <stop offset="100%" stopColor="#F1F5F9"/>
        </linearGradient>
        <linearGradient id="capGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FBBF24"/>
          <stop offset="100%" stopColor="#F59E0B"/>
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3"/>
        </filter>
      </defs>
      
      {/* Background circle */}
      <circle cx="50" cy="50" r="48" fill="url(#bookGradient)" filter="url(#shadow)"/>
      
      {/* Book */}
      <g transform="translate(50, 55)">
        {/* Book cover */}
        <rect x="-28" y="-25" width="56" height="35" rx="3" fill="#1E293B" filter="url(#shadow)"/>
        
        {/* Book pages */}
        <rect x="-24" y="-21" width="22" height="27" rx="1" fill="url(#pageGradient)"/>
        <rect x="2" y="-21" width="22" height="27" rx="1" fill="url(#pageGradient)"/>
        
        {/* Book spine */}
        <rect x="-2" y="-25" width="4" height="35" fill="#EF4444"/>
        
        {/* Lines on pages */}
        <line x1="-20" y1="-14" x2="-6" y2="-14" stroke="#CBD5E1" strokeWidth="1"/>
        <line x1="-20" y1="-8" x2="-6" y2="-8" stroke="#CBD5E1" strokeWidth="1"/>
        <line x1="-20" y1="-2" x2="-6" y2="-2" stroke="#CBD5E1" strokeWidth="1"/>
        
        <line x1="6" y1="-14" x2="20" y2="-14" stroke="#CBD5E1" strokeWidth="1"/>
        <line x1="6" y1="-8" x2="20" y2="-8" stroke="#CBD5E1" strokeWidth="1"/>
        <line x1="6" y1="-2" x2="20" y2="-2" stroke="#CBD5E1" strokeWidth="1"/>
      </g>
      
      {/* Graduation cap */}
      <g transform="translate(50, 20)">
        <polygon points="0,-15 -20,-5 0,5 20,-5" fill="url(#capGradient)" filter="url(#shadow)"/>
        <rect x="-3" y="5" width="6" height="12" fill="#F59E0B"/>
        <circle cx="0" cy="-15" r="3" fill="#EF4444"/>
      </g>
      
      {/* Stars */}
      <g fill="#FBBF24">
        <path d="M15 70 L17 65 L19 70 L14 67 L20 67 Z" transform="scale(0.8)"/>
        <path d="M80 30 L82 25 L84 30 L79 27 L85 27 Z" transform="scale(0.8)"/>
      </g>
    </svg>
  );
}