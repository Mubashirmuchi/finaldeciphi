export default function AbstractLines({ className }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <svg className="w-full h-full">
        <defs>
          <pattern
            id="abstractLines"
            width="8"
            height="8"
            patternUnits="userSpaceOnUse"
          >
            {/* simple diagonal line */}
            <path
              d="M0 8 L8 0"
              stroke="white"
              strokeWidth="0.6"
              opacity="0.06"
            />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#abstractLines)" />
      </svg>
    </div>
  );
}
