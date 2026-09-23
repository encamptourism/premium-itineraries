"use client";

/**
 * High-end Vector SVG Ornaments & Icons for Luxury Experiences Section
 * Pixel-perfect reproduction of royal Indian luxury travel aesthetics.
 */

// Top Center Lotus Bloom Ornament
export function LotusHeaderIcon({ className = "w-9 h-7" }) {
  return (
    <svg
      viewBox="0 0 60 40"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="lotusGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5DC9A" />
          <stop offset="50%" stopColor="#C99D40" />
          <stop offset="100%" stopColor="#A87720" />
        </linearGradient>
      </defs>
      {/* Central Petal */}
      <path
        d="M 30,5 C 27,14 26,24 30,34 C 34,24 33,14 30,5 Z"
        fill="url(#lotusGold)"
        opacity="0.95"
      />
      {/* Inner Petals */}
      <path
        d="M 30,12 C 22,18 20,27 25,34 C 28,29 29,22 30,12 Z"
        fill="url(#lotusGold)"
        opacity="0.8"
      />
      <path
        d="M 30,12 C 38,18 40,27 35,34 C 32,29 31,22 30,12 Z"
        fill="url(#lotusGold)"
        opacity="0.8"
      />
      {/* Outer Flaring Petals */}
      <path
        d="M 28,18 C 16,22 13,31 20,35 C 24,31 26,26 28,18 Z"
        fill="url(#lotusGold)"
        opacity="0.65"
      />
      <path
        d="M 32,18 C 44,22 47,31 40,35 C 36,31 34,26 32,18 Z"
        fill="url(#lotusGold)"
        opacity="0.65"
      />
      {/* Base Calyx / Waves */}
      <path
        d="M 17,35 Q 30,38 43,35 Q 30,36 17,35 Z"
        fill="url(#lotusGold)"
      />
      {/* Small base jewel */}
      <circle cx="30" cy="37" r="1.5" fill="url(#lotusGold)" />
    </svg>
  );
}

// Bottom Gold Filigree Card Divider (— ✦ —) Lightweight
export function CardBottomDivider({ isActive = false, className = "w-28 h-3" }) {
  const goldColor = isActive ? "#FFEAA8" : "#C99D40";
  const dimGold = isActive ? "#C99D40" : "#E8C874";

  return (
    <div className={`relative ${className} flex items-center justify-center`}>
      <svg
        viewBox="0 0 120 12"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="12" y1="6" x2="48" y2="6" stroke={goldColor} strokeWidth="1" strokeLinecap="round" opacity="0.75" />
        <line x1="72" y1="6" x2="108" y2="6" stroke={goldColor} strokeWidth="1" strokeLinecap="round" opacity="0.75" />
        <circle cx="52" cy="6" r="1" fill={goldColor} />
        <polygon points="60,1 63.5,6 60,11 56.5,6" fill={dimGold} />
        <circle cx="68" cy="6" r="1" fill={goldColor} />
      </svg>
    </div>
  );
}

// Circular Medallion with Flanking Symmetrical Golden Filigree & Luxury Emblem
export function MedallionFrame({ isActive = false }) {
  const ringGrad = isActive ? "actRing" : "lightRing";
  const fillGrad = isActive ? "actFill" : "lightFill";

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        viewBox="0 0 140 70"
        className="w-32 sm:w-36 h-16 sm:h-18 transition-transform duration-200 group-hover:scale-105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gold Ring Gradient */}
          <linearGradient id={ringGrad} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isActive ? "#FFEAA8" : "#F9E2A0"} />
            <stop offset="50%" stopColor="#C99D40" />
            <stop offset="100%" stopColor="#A87720" />
          </linearGradient>

          {/* Medallion Fill Gradient */}
          <radialGradient id={fillGrad} cx="50%" cy="45%" r="55%">
            {isActive ? (
              <>
                <stop offset="0%" stopColor="#58111a" />
                <stop offset="70%" stopColor="#3d0b13" />
                <stop offset="100%" stopColor="#1a0307" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#FFFDF7" />
                <stop offset="65%" stopColor="#F9EED4" />
                <stop offset="100%" stopColor="#ECD5A2" />
              </>
            )}
          </radialGradient>
        </defs>

        {/* Left Filigree */}
        <g stroke={`url(#${ringGrad})`} fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 38,35 C 33,35 24,31 16,35 C 24,39 31,37 38,35" strokeWidth="1.2" fill={isActive ? "#58111a" : "#F9EED4"} fillOpacity="0.4" />
          <path d="M 33,32 C 26,27 20,28 17,32" strokeWidth="1" />
          <path d="M 33,38 C 26,43 20,42 17,38" strokeWidth="1" />
          <path d="M 16,35 Q 11,35 8,32" strokeWidth="1" />
          <circle cx="7.5" cy="31.5" r="1" fill={`url(#${ringGrad})`} />
          <circle cx="21" cy="28" r="0.9" fill={`url(#${ringGrad})`} />
          <circle cx="21" cy="42" r="0.9" fill={`url(#${ringGrad})`} />
        </g>

        {/* Right Filigree */}
        <g stroke={`url(#${ringGrad})`} fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 102,35 C 107,35 116,31 124,35 C 116,39 109,37 102,35" strokeWidth="1.2" fill={isActive ? "#58111a" : "#F9EED4"} fillOpacity="0.4" />
          <path d="M 107,32 C 114,27 120,28 123,32" strokeWidth="1" />
          <path d="M 107,38 C 114,43 120,42 123,38" strokeWidth="1" />
          <path d="M 124,35 Q 129,35 132,32" strokeWidth="1" />
          <circle cx="132.5" cy="31.5" r="1" fill={`url(#${ringGrad})`} />
          <circle cx="119" cy="28" r="0.9" fill={`url(#${ringGrad})`} />
          <circle cx="119" cy="42" r="0.9" fill={`url(#${ringGrad})`} />
        </g>

        {/* Base Circle */}
        <circle cx="70" cy="35" r="26" fill={`url(#${fillGrad})`} />
        <circle cx="70" cy="35" r="24" stroke={`url(#${ringGrad})`} strokeWidth="0.8" strokeDasharray="1.5,2.5" fill="none" opacity="0.8" />
        <circle cx="70" cy="35" r="26" stroke={`url(#${ringGrad})`} strokeWidth="1.8" fill="none" />

        {/* Center Luxury Emblem */}
        <circle cx="70" cy="35" r="11" stroke={isActive ? "#FFEAA8" : "#A67A24"} strokeWidth="0.6" strokeDasharray="1 2" opacity={isActive ? 0.6 : 0.45} />

        {/* 4 Diagonal Spark Rays */}
        <g stroke={isActive ? "#FFEAA8" : "#A67A24"} strokeWidth="1" strokeLinecap="round" opacity="0.85">
          <line x1="70" y1="35" x2="76.5" y2="28.5" />
          <line x1="70" y1="35" x2="76.5" y2="41.5" />
          <line x1="70" y1="35" x2="63.5" y2="41.5" />
          <line x1="70" y1="35" x2="63.5" y2="28.5" />
          <circle cx="77" cy="28" r="0.8" fill={isActive ? "#FFF4D4" : "#D4A843"} />
          <circle cx="77" cy="42" r="0.8" fill={isActive ? "#FFF4D4" : "#D4A843"} />
          <circle cx="63" cy="42" r="0.8" fill={isActive ? "#FFF4D4" : "#D4A843"} />
          <circle cx="63" cy="28" r="0.8" fill={isActive ? "#FFF4D4" : "#D4A843"} />
        </g>

        {/* 4-Pointed Luxury Star */}
        <path
          d="M 70,22.5 C 70,30 65,35 57.5,35 C 65,35 70,40 70,47.5 C 70,40 75,35 82.5,35 C 75,35 70,30 70,22.5 Z"
          fill={isActive ? "#FFEAA8" : "#C99D40"}
          fillOpacity={isActive ? 0.35 : 0.25}
          stroke={isActive ? "#FFEAA8" : "#A67A24"}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        {/* Facet Lines */}
        <line x1="70" y1="22.5" x2="70" y2="47.5" stroke={isActive ? "#FFF4D4" : "#D4A843"} strokeWidth="0.9" opacity="0.9" />
        <line x1="57.5" y1="35" x2="82.5" y2="35" stroke={isActive ? "#FFF4D4" : "#D4A843"} strokeWidth="0.9" opacity="0.9" />

        {/* Center Diamond Gem */}
        <polygon
          points="70,30.5 73.5,35 70,39.5 66.5,35"
          fill={isActive ? "#FFF4D4" : "#D4A843"}
          stroke={isActive ? "#E2BE68" : "#8F6418"}
          strokeWidth="0.8"
        />
        <circle cx="70" cy="35" r="1.3" fill={isActive ? "#2A050B" : "#FFFFFF"} />
      </svg>
    </div>
  );
}


