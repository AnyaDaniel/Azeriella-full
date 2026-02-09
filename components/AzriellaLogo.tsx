export default function AzriellaLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="azriellaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E91E8C" />
          <stop offset="100%" stopColor="#1E2A5E" />
        </linearGradient>
      </defs>
      
      {/* Background rounded square */}
      <rect width="100" height="100" rx="20" fill="url(#azriellaGradient)" />
      
      {/* Letter A */}
      <path 
        d="M 30 75 L 50 25 L 70 75 M 38 60 L 62 60" 
        stroke="white" 
        strokeWidth="8" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
