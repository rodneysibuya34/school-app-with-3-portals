export default function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Book base */}
      <rect x="15" y="45" width="70" height="45" rx="4" fill="#1E293B" stroke="#F59E0B" strokeWidth="2"/>
      
      {/* Book pages */}
      <rect x="20" y="50" width="28" height="35" rx="2" fill="#F8FAFC"/>
      <rect x="52" y="50" width="28" height="35" rx="2" fill="#F8FAFC"/>
      
      {/* Book spine */}
      <rect x="47" y="45" width="6" height="45" fill="#EF4444"/>
      
      {/* Lines on pages */}
      <line x1="24" y1="58" x2="44" y2="58" stroke="#CBD5E1" strokeWidth="1.5"/>
      <line x1="24" y1="65" x2="44" y2="65" stroke="#CBD5E1" strokeWidth="1.5"/>
      <line x1="24" y1="72" x2="44" y2="72" stroke="#CBD5E1" strokeWidth="1.5"/>
      
      <line x1="56" y1="58" x2="76" y2="58" stroke="#CBD5E1" strokeWidth="1.5"/>
      <line x1="56" y1="65" x2="76" y2="65" stroke="#CBD5E1" strokeWidth="1.5"/>
      <line x1="56" y1="72" x2="76" y2="72" stroke="#CBD5E1" strokeWidth="1.5"/>
      
      {/* SA Flag colors - top stripe */}
      <rect x="10" y="20" width="80" height="8" rx="2" fill="#007749"/>
      <rect x="10" y="28" width="80" height="8" rx="2" fill="#FFB81C"/>
      <rect x="10" y="36" width="80" height="8" rx="2" fill="#000000"/>
      
      {/* Pencil */}
      <g transform="translate(75, 10) rotate(45)">
        <rect x="0" y="0" width="8" height="35" fill="#FFB81C"/>
        <polygon points="0,35 8,35 4,45" fill="#1E293B"/>
        <rect x="0" y="0" width="8" height="6" fill="#EF4444"/>
      </g>
    </svg>
  );
}