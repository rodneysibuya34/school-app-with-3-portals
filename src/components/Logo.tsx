export default function Logo({ size = 40, src }: { size?: number; src?: string }) {
  if (src) {
    return (
      <img 
        src={src} 
        alt="Logo" 
        width={size} 
        height={size} 
        className="rounded-lg object-cover"
      />
    );
  }
  
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B6B"/>
          <stop offset="50%" stopColor="#FFB347"/>
          <stop offset="100%" stopColor="#4ECDC4"/>
        </linearGradient>
        <linearGradient id="faceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFE66D"/>
          <stop offset="100%" stopColor="#FFB347"/>
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Background circle with gradient */}
      <circle cx="50" cy="50" r="48" fill="url(#bgGrad)" filter="url(#glow)"/>
      
      {/* Inner white circle */}
      <circle cx="50" cy="50" r="40" fill="white"/>
      
      {/* Face/Friendly character */}
      <circle cx="50" cy="50" r="32" fill="url(#faceGrad)"/>
      
      {/* Eyes - happy squinting */}
      <path d="M38 45 Q42 40 46 45" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <path d="M54 45 Q58 40 62 45" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none"/>
      
      {/* Big smile */}
      <path d="M38 55 Q50 68 62 55" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none"/>
      
      {/* Blush cheeks */}
      <circle cx="34" cy="52" r="5" fill="#FF9999" opacity="0.6"/>
      <circle cx="66" cy="52" r="5" fill="#FF9999" opacity="0.6"/>
      
      {/* Book on top */}
      <g transform="translate(50, 12)">
        <rect x="-15" y="0" width="30" height="20" rx="2" fill="#4ECDC4"/>
        <rect x="-12" y="3" width="10" height="14" rx="1" fill="white"/>
        <rect x="2" y="3" width="10" height="14" rx="1" fill="white"/>
        <line x1="0" y1="0" x2="0" y2="20" stroke="#1E293B" strokeWidth="2"/>
      </g>
      
      {/* Graduation cap tassel */}
      <line x1="50" y1="8" x2="50" y2="0" stroke="#1E293B" strokeWidth="2"/>
      <circle cx="50" cy="0" r="2" fill="#FF6B6B"/>
    </svg>
  );
}