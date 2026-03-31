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
        <linearGradient id="capGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E293B"/>
          <stop offset="100%" stopColor="#334155"/>
        </linearGradient>
        <linearGradient id="bgCircle" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6"/>
          <stop offset="100%" stopColor="#1D4ED8"/>
        </linearGradient>
      </defs>
      
      {/* Background circle */}
      <circle cx="50" cy="50" r="48" fill="url(#bgCircle)"/>
      
      {/* Inner white circle */}
      <circle cx="50" cy="50" r="42" fill="white"/>
      
      {/* Open book */}
      <g transform="translate(50, 62)">
        {/* Book spine */}
        <path d="M0,-20 L0,10" stroke="#1E293B" strokeWidth="2"/>
        
        {/* Left page */}
        <path d="M0,-20 Q-20,-18 -25,-5 L-25,15 Q-20,12 0,10" fill="#F1F5F9" stroke="#1E293B" strokeWidth="1.5"/>
        
        {/* Right page */}
        <path d="M0,-20 Q20,-18 25,-5 L25,15 Q20,12 0,10" fill="#F1F5F9" stroke="#1E293B" strokeWidth="1.5"/>
        
        {/* Left page lines */}
        <line x1="-5" y1="-10" x2="-20" y2="-8" stroke="#CBD5E1" strokeWidth="1"/>
        <line x1="-5" y1="-4" x2="-22" y2="-2" stroke="#CBD5E1" strokeWidth="1"/>
        <line x1="-5" y1="2" x2="-18" y2="4" stroke="#CBD5E1" strokeWidth="1"/>
        
        {/* Right page lines */}
        <line x1="5" y1="-10" x2="20" y2="-8" stroke="#CBD5E1" strokeWidth="1"/>
        <line x1="5" y1="-4" x2="22" y2="-2" stroke="#CBD5E1" strokeWidth="1"/>
        <line x1="5" y1="2" x2="18" y2="4" stroke="#CBD5E1" strokeWidth="1"/>
      </g>
      
      {/* Graduation cap */}
      <g transform="translate(50, 28)">
        {/* Cap top */}
        <polygon points="0,-12 -25,0 0,12 25,0" fill="url(#capGrad)"/>
        
        {/* Cap base */}
        <ellipse cx="0" cy="8" rx="18" ry="4" fill="#1E293B"/>
        
        {/* Tassel string */}
        <line x1="20" y1="0" x2="20" y2="15" stroke="#F59E0B" strokeWidth="2"/>
        
        {/* Tassel end */}
        <circle cx="20" cy="17" r="3" fill="#F59E0B"/>
        <line x1="18" y1="20" x2="22" y2="20" stroke="#F59E0B" strokeWidth="1.5"/>
        <line x1="17" y1="22" x2="23" y2="22" stroke="#F59E0B" strokeWidth="1.5"/>
      </g>
      
      {/* Small star decorations */}
      <circle cx="20" cy="25" r="2" fill="#F59E0B"/>
      <circle cx="80" cy="25" r="2" fill="#F59E0B"/>
      <circle cx="15" cy="75" r="1.5" fill="#3B82F6"/>
      <circle cx="85" cy="75" r="1.5" fill="#3B82F6"/>
    </svg>
  );
}