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
        <linearGradient id="saFlag" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#007749"/>
          <stop offset="16%" stopColor="#007749"/>
          <stop offset="16%" stopColor="#FFB81C"/>
          <stop offset="33%" stopColor="#FFB81C"/>
          <stop offset="33%" stopColor="#000000"/>
          <stop offset="50%" stopColor="#000000"/>
          <stop offset="50%" stopColor="#FFFFFF"/>
          <stop offset="66%" stopColor="#FFFFFF"/>
          <stop offset="66%" stopColor="#DE3831"/>
          <stop offset="83%" stopColor="#DE3831"/>
          <stop offset="83%" stopColor="#002395"/>
          <stop offset="100%" stopColor="#002395"/>
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Background with SA flag colors */}
      <circle cx="50" cy="50" r="48" fill="url(#saFlag)" filter="url(#glow)"/>
      
      {/* Inner circle */}
      <circle cx="50" cy="50" r="40" fill="#1E293B"/>
      
      {/* Student */}
      <g transform="translate(30, 55)">
        {/* Body */}
        <rect x="-8" y="-25" width="16" height="25" rx="3" fill="#4ECDC4"/>
        
        {/* Head */}
        <circle cx="0" cy="-32" r="8" fill="#FFD93D"/>
        
        {/* Hair */}
        <path d="M-7 -35 Q-8 -42 0 -44 Q8 -42 7 -35" fill="#1E293B"/>
        
        {/* Face */}
        <circle cx="-3" cy="-33" r="1.5" fill="#1E293B"/>
        <circle cx="3" cy="-33" r="1.5" fill="#1E293B"/>
        <path d="M-3 -29 Q0 -27 3 -29" stroke="#1E293B" strokeWidth="1" fill="none"/>
        
        {/* Arms holding book */}
        <line x1="-8" y1="-18" x2="-15" y2="-8" stroke="#FFD93D" strokeWidth="3" strokeLinecap="round"/>
        <line x1="8" y1="-18" x2="15" y2="-8" stroke="#FFD93D" strokeWidth="3" strokeLinecap="round"/>
        
        {/* Book in hands */}
        <rect x="-12" y="-5" width="24" height="18" rx="2" fill="#FFFFFF"/>
        <rect x="-10" y="-3" width="8" height="12" rx="1" fill="#E2E8F0"/>
        <rect x="2" y="-3" width="8" height="12" rx="1" fill="#E2E8F0"/>
        <line x1="0" y1="-5" x2="0" y2="13" stroke="#1E293B" strokeWidth="1"/>
        
        {/* Book lines */}
        <line x1="-8" y1="1" x2="-4" y2="1" stroke="#CBD5E1" strokeWidth="0.5"/>
        <line x1="-8" y1="4" x2="-4" y2="4" stroke="#CBD5E1" strokeWidth="0.5"/>
        <line x1="4" y1="1" x2="8" y2="1" stroke="#CBD5E1" strokeWidth="0.5"/>
        <line x1="4" y1="4" x2="8" y2="4" stroke="#CBD5E1" strokeWidth="0.5"/>
      </g>
      
      {/* AI Symbol */}
      <g transform="translate(70, 45)">
        {/* AI Circle */}
        <circle cx="0" cy="0" r="12" fill="#8B5CF6" stroke="#FFFFFF" strokeWidth="2"/>
        
        {/* AI text */}
        <text x="0" y="4" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">AI</text>
        
        {/* Sparkles */}
        <circle cx="10" cy="-10" r="2" fill="#FBBF24"/>
        <circle cx="-10" cy="-8" r="1.5" fill="#FBBF24"/>
        <circle cx="12" cy="5" r="1" fill="#FBBF24"/>
      </g>
      
      {/* Stars decoration */}
      <g fill="#FBBF24">
        <path d="M15 20 L17 15 L19 20 L14 17 L20 17 Z"/>
        <path d="M80 75 L82 70 L84 75 L79 72 L85 72 Z"/>
      </g>
    </svg>
  );
}