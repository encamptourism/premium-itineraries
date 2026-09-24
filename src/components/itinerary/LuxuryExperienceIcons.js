"use client";

import React from "react";
import { getExperienceIconKey } from "./luxuryExperiencesData";

/**
 * High-end Vector SVG Ornaments & Icons for Luxury Experiences Section
 * Pixel-perfect reproduction of royal Indian luxury travel aesthetics.
 * 
 * Supports dynamic mapping for backend API titles:
 * - Private Tea Estate Experience
 * - Dedicated Luxury SUV
 * - Umiam Lake Escape
 * - Curated Dining
 * - Living Root Heritage
 * - Wellness & Leisure
 * - Private Scenic Stops
 * - Sunrise on the Ganges
 * - Curated Kashi Dining
 * - Private Transfers
 * - Luxury Spa Ritual
 * - Ganges from the Water
 */

// Top Center Lotus Bloom Ornament (Unchanged for section headers)
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
        <line x1="12" y1="6" x2="48" y2="6" stroke={goldColor} strokeWidth="1.0" strokeLinecap="round" opacity="0.75" />
        <line x1="72" y1="6" x2="108" y2="6" stroke={goldColor} strokeWidth="1.0" strokeLinecap="round" opacity="0.75" />
        <circle cx="52" cy="6" r="1" fill={goldColor} />
        <polygon points="60,1 63.5,6 60,11 56.5,6" fill={dimGold} />
        <circle cx="68" cy="6" r="1" fill={goldColor} />
      </svg>
    </div>
  );
}

/* ==========================================================================
   BESPOKE 32x32 SVG VECTOR EMBLEM PATHS FOR ALL 12 EXPERIENCES
   ========================================================================== */

export function renderExperienceIconVector(key, color = "#FFEAA8", isActive = true) {
  const strokeColor = color;
  const fillColor = color;
  const softFillOpacity = isActive ? "0.35" : "0.25";

  switch (key) {
    // 1. Private Tea Estate Experience
    case "tea-estate":
      return (
        <g stroke={strokeColor} fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Two leaves & bud */}
          <path
            d="M 16,5 C 14.8,9 14.8,13 16,16 C 17.2,13 17.2,9 16,5 Z"
            fill={fillColor}
            strokeWidth="1.1"
          />
          <path
            d="M 16,13 C 10.5,11.5 7.5,7 7.5,3.5 C 11.5,3.5 14.5,8.5 16,13 Z"
            fill={fillColor}
            fillOpacity={softFillOpacity}
            strokeWidth="1.1"
          />
          <path d="M 10.5,6.5 Q 12.5,9.5 15,12" strokeWidth="0.9" opacity="0.85" />
          <path
            d="M 16,13 C 21.5,11.5 24.5,7 24.5,3.5 C 20.5,3.5 17.5,8.5 16,13 Z"
            fill={fillColor}
            fillOpacity={softFillOpacity}
            strokeWidth="1.1"
          />
          <path d="M 21.5,6.5 Q 19.5,9.5 17,12" strokeWidth="0.9" opacity="0.85" />

          {/* Porcelain Tea Cup & Saucer */}
          <path
            d="M 10.5,19 C 10.5,23.5 12.8,25.5 16,25.5 C 19.2,25.5 21.5,23.5 21.5,19 L 10.5,19 Z"
            fill={fillColor}
            fillOpacity="0.25"
            strokeWidth="1.2"
          />
          <line x1="9" y1="19" x2="23" y2="19" strokeWidth="1.3" />
          <path d="M 21.5,19.5 C 24.5,19.5 25,23 21.5,23.5" strokeWidth="1.1" />
          <path d="M 8,27.5 Q 16,29.5 24,27.5" strokeWidth="1.3" />

          {/* Rising aromatic steam wisps */}
          <path d="M 13.5,17 Q 12.5,15 13.5,13.5" strokeWidth="1.0" opacity="0.8" />
          <path d="M 17.5,17 Q 18.5,15 17.5,13" strokeWidth="1.0" opacity="0.8" />
          <circle cx="16" cy="1.8" r="0.9" fill={fillColor} stroke="none" />
        </g>
      );

    // 2. Dedicated Luxury SUV
    case "luxury-suv":
      return (
        <g stroke={strokeColor} fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Navigation Star Burst above vehicle */}
          <polygon
            points="16,2 17.2,4.3 19.5,5 17.2,5.7 16,8 14.8,5.7 12.5,5 14.8,4.3"
            fill={fillColor}
            stroke="none"
          />
          {/* Roof & Roof rails */}
          <line x1="11" y1="9.5" x2="21" y2="9.5" strokeWidth="1.3" />
          <line x1="12" y1="8" x2="20" y2="8" strokeWidth="0.9" />
          <line x1="13.5" y1="8" x2="13.5" y2="9.5" strokeWidth="0.8" />
          <line x1="18.5" y1="8" x2="18.5" y2="9.5" strokeWidth="0.8" />

          {/* Windshield & Pillars */}
          <polygon
            points="11,9.5 7.5,15.5 24.5,15.5 21,9.5"
            fill={fillColor}
            fillOpacity={softFillOpacity}
            strokeWidth="1.2"
          />

          {/* Hood, Grille & Front Body */}
          <path d="M 6.5,15.5 L 25.5,15.5" strokeWidth="1.3" />
          <path d="M 6.5,15.5 L 6.5,22.5 L 9.5,22.5 L 9.5,25.5 L 22.5,25.5 L 22.5,22.5 L 25.5,22.5 L 25.5,15.5" strokeWidth="1.3" />

          {/* Luxury Radiator Grille */}
          <rect x="11.5" y="17.5" width="9" height="4.5" rx="0.8" fill={fillColor} fillOpacity="0.2" strokeWidth="1.0" />
          <line x1="11.5" y1="19.8" x2="20.5" y2="19.8" strokeWidth="0.8" />
          <line x1="16" y1="17.5" x2="16" y2="22" strokeWidth="0.8" />

          {/* Modern LED Headlights */}
          <polygon points="7.5,17 10,17 9.5,19 7.5,18.5" fill={fillColor} stroke="none" />
          <polygon points="24.5,17 22,17 22.5,19 24.5,18.5" fill={fillColor} stroke="none" />

          {/* Rugged Expedition Tires */}
          <rect x="4.8" y="20.5" width="2.2" height="5.5" rx="0.6" fill={fillColor} stroke="none" />
          <rect x="25" y="20.5" width="2.2" height="5.5" rx="0.6" fill={fillColor} stroke="none" />

          {/* Front Bumper / Skid Plate */}
          <path d="M 12.5,23.5 L 19.5,23.5 L 18.5,25.5 L 13.5,25.5 Z" fill={fillColor} fillOpacity="0.5" strokeWidth="0.9" />
        </g>
      );

    // 3. Umiam Lake Escape
    case "umiam-lake":
      return (
        <g stroke={strokeColor} fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Glowing Celestial Sun over Mountains */}
          <circle cx="16" cy="8.5" r="3.2" fill={fillColor} fillOpacity={softFillOpacity} strokeWidth="1.1" />
          <line x1="16" y1="3.5" x2="16" y2="4.8" strokeWidth="1.0" />
          <line x1="11.5" y1="6" x2="12.5" y2="6.8" strokeWidth="1.0" />
          <line x1="20.5" y1="6" x2="19.5" y2="6.8" strokeWidth="1.0" />

          {/* Rolling Highland Ridge Lines */}
          <path d="M 3,15 Q 9,10.5 16,13.5 Q 23,9.5 29,14" strokeWidth="1.2" />
          <path d="M 2,17 Q 8,14 14,16" strokeWidth="0.9" opacity="0.7" />

          {/* Shoreline Indigenous Pine Tree */}
          <polygon points="6.5,17.5 8,13.5 9.5,17.5" fill={fillColor} fillOpacity="0.6" strokeWidth="0.8" />
          <polygon points="7,15 8,11.5 9,15" fill={fillColor} stroke="none" />
          <line x1="8" y1="17.5" x2="8" y2="19.5" strokeWidth="1.0" />

          {/* Sailing Catamaran / Boat */}
          <path d="M 19,19.2 L 24.5,19.2 L 23.5,20.5 L 19.8,20.5 Z" fill={fillColor} stroke="none" />
          <path d="M 22,14.8 L 22,18.8 L 24.5,18.8 Z" fill={fillColor} fillOpacity="0.6" strokeWidth="0.9" />

          {/* Serene Lake Water Ripples */}
          <path d="M 4,21 Q 10,19.5 16,21 Q 22,22.5 28,21" strokeWidth="1.2" />
          <path d="M 7,24.5 Q 16,23 25,24.5" strokeWidth="1.1" />
          <path d="M 11,27.5 Q 16,26.5 21,27.5" strokeWidth="1.0" />
        </g>
      );

    // 4. Curated Dining - Crossed Royal Spoon & Fork
    case "curated-dining":
    case "dining":
      return (
        <g fill="none">
          {/* Spoon (tilted +45deg to top-right) */}
          <g transform="rotate(45 16 16)">
            <path
              fill={fillColor}
              fillRule="evenodd"
              d="
                M 15.1,26.5 
                A 0.9,0.9 0 0 0 16.9,26.5 
                L 16.9,13.5 
                C 16.9,12.5 19.4,11.8 19.4,8.5 
                C 19.4,5.8 17.8,4.2 16,4.2 
                C 14.2,4.2 12.6,5.8 12.6,8.5 
                C 12.6,11.8 15.1,12.5 15.1,13.5 
                Z 

                M 16,5.7 
                C 17.4,5.7 17.8,7.0 17.8,8.6 
                C 17.8,10.2 17.4,11.5 16,11.5 
                C 14.6,11.5 14.2,10.2 14.2,8.6 
                C 14.2,7.0 14.6,5.7 16,5.7 
                Z
              "
            />
          </g>

          {/* Fork (tilted -45deg to top-left) */}
          <g transform="rotate(-45 16 16)">
            <path
              fill={fillColor}
              d="
                M 15.1,26.5 
                A 0.9,0.9 0 0 0 16.9,26.5 
                L 16.9,13.5 
                C 16.9,12 19.2,11.5 19.2,10.5 
                L 19.2,4.8 
                Q 19.2,4.2 18.5,4.2 
                Q 17.8,4.2 17.8,4.8 
                L 17.8,9.8 
                Q 17.2,10.5 16.6,9.8 
                L 16.6,4.8 
                Q 16.6,4.2 16,4.2 
                Q 15.4,4.2 15.4,4.8 
                L 15.4,9.8 
                Q 14.8,10.5 14.2,9.8 
                L 14.2,4.8 
                Q 14.2,4.2 13.5,4.2 
                Q 12.8,4.2 12.8,4.8 
                L 12.8,10.5 
                C 12.8,11.5 15.1,12 15.1,13.5 
                Z
              "
            />
          </g>
        </g>
      );

    // 5. Living Root Heritage
    case "living-root":
      return (
        <g stroke={strokeColor} fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Ancient Ficus Trunks on Banks */}
          <path d="M 3,11 C 4,15 4,20 3,25" strokeWidth="1.5" />
          <path d="M 29,9 C 28,14 28,20 29,25" strokeWidth="1.5" />

          {/* Canopy Rainforest Leaves */}
          <path d="M 4,9 C 5,6 9,7 7,11 Z" fill={fillColor} fillOpacity="0.5" strokeWidth="0.9" />
          <path d="M 28,7 C 27,4 23,5 25,9 Z" fill={fillColor} fillOpacity="0.5" strokeWidth="0.9" />

          {/* Upper Living Handrail Cable */}
          <path d="M 3,15.5 C 8,13.5 14,13.5 19,12.5 C 24,11.5 28,14.5 29,14.5" strokeWidth="1.5" />
          {/* Lower Walking Footway Span */}
          <path d="M 3,18.5 C 9,17 16,17 22,16.5 C 26,16 29,17.5 29,17.5" strokeWidth="1.7" />

          {/* Natural Living Root Balustrades */}
          <path d="M 8,15 Q 9,16.5 10,18" strokeWidth="1.0" />
          <path d="M 13.5,14 Q 14.5,16 15.5,17.5" strokeWidth="1.0" />
          <path d="M 19,13 Q 20,15 21,17" strokeWidth="1.0" />
          <path d="M 24.5,13.5 Q 25.5,15.5 26.5,17" strokeWidth="1.0" />

          {/* Hanging Aerial Roots dipping below */}
          <path d="M 9.5,18 C 9.5,21.5 10.5,23.5 9,25.5" strokeWidth="1.0" />
          <path d="M 15.5,17.5 C 16,20.5 15,22.5 15.5,25" strokeWidth="1.0" />
          <path d="M 22,17 C 22,20 23,22 22.5,24.5" strokeWidth="1.0" />

          {/* River Stream Flow below */}
          <path d="M 10,27.5 Q 16,26.5 22,27.5" strokeWidth="1.1" />
        </g>
      );

    // 6. Wellness & Leisure
    case "wellness-leisure":
      return (
        <g stroke={strokeColor} fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Zen Basalt Stones Stack */}
          <ellipse cx="16" cy="24.5" rx="8" ry="2.5" fill={fillColor} fillOpacity={softFillOpacity} strokeWidth="1.2" />
          <ellipse cx="16" cy="20.5" rx="5.5" ry="2" fill={fillColor} fillOpacity="0.4" strokeWidth="1.2" />

          {/* Blooming Sacred Lotus Flower */}
          <path
            d="M 16,7 C 14.5,11 14.5,15 16,18.5 C 17.5,15 17.5,11 16,7 Z"
            fill={fillColor}
            strokeWidth="1.1"
          />
          <path
            d="M 16,11.5 C 12,13.5 11,16.5 13.5,18.5 C 15,17 15.5,14.5 16,11.5 Z"
            fill={fillColor}
            fillOpacity={softFillOpacity}
            strokeWidth="1.0"
          />
          <path
            d="M 16,11.5 C 20,13.5 21,16.5 18.5,18.5 C 17,17 16.5,14.5 16,11.5 Z"
            fill={fillColor}
            fillOpacity={softFillOpacity}
            strokeWidth="1.0"
          />
          <path
            d="M 14,14.5 C 9.5,15.5 8.5,18.5 11.5,19.5 C 13,18.5 13.5,16.5 14,14.5 Z"
            fill={fillColor}
            fillOpacity="0.25"
            strokeWidth="0.9"
          />
          <path
            d="M 18,14.5 C 22.5,15.5 23.5,18.5 20.5,19.5 C 19,18.5 18.5,16.5 18,14.5 Z"
            fill={fillColor}
            fillOpacity="0.25"
            strokeWidth="0.9"
          />

          {/* Gentle Base Ripples & Radiant Aura Dot */}
          <path d="M 6,28 Q 16,30 26,28" strokeWidth="1.0" />
          <circle cx="16" cy="4" r="1.1" fill={fillColor} stroke="none" />
        </g>
      );

    // 7. Private Scenic Stops
    case "scenic-stops":
      return (
        <g stroke={strokeColor} fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* North Guiding Star above peaks */}
          <polygon
            points="16,2.5 17,4.5 19,5.5 17,6.5 16,8.5 15,6.5 13,5.5 15,4.5"
            fill={fillColor}
            stroke="none"
          />

          {/* Panoramic Mountain Overlook */}
          <polygon
            points="7,19 16,8 25,19"
            fill={fillColor}
            fillOpacity={softFillOpacity}
            strokeWidth="1.3"
          />
          <line x1="16" y1="8" x2="16" y2="19" strokeWidth="1.0" opacity="0.8" />
          <path d="M 3,21 L 9.5,15.5 L 16.5,21" strokeWidth="1.1" />

          {/* Traveler's Brass Telescope & Tripod */}
          <polygon
            points="18.5,13.5 25.5,9.5 26.5,11.5 19.5,15.5"
            fill={fillColor}
            strokeWidth="1.0"
          />
          <line x1="17.5" y1="14.8" x2="18.5" y2="13.5" strokeWidth="1.1" />
          <line x1="25.5" y1="9.5" x2="26.5" y2="11.5" strokeWidth="1.3" />

          {/* Tripod Legs */}
          <circle cx="21" cy="15.5" r="1" fill={fillColor} stroke="none" />
          <line x1="21" y1="16.5" x2="18" y2="25" strokeWidth="1.1" />
          <line x1="21" y1="16.5" x2="21.5" y2="25.5" strokeWidth="1.1" />
          <line x1="21" y1="16.5" x2="25" y2="25" strokeWidth="1.1" />
        </g>
      );

    // 8. Sunrise on the Ganges
    case "sunrise-ganges":
      return (
        <g stroke={strokeColor} fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Sacred Golden Rising Sun */}
          <path
            d="M 10,18 A 6,6 0 0 1 22,18 Z"
            fill={fillColor}
            fillOpacity="0.5"
            strokeWidth="1.2"
          />
          {/* Solar Dawn Rays */}
          <line x1="16" y1="8.5" x2="16" y2="4.5" strokeWidth="1.3" />
          <line x1="11" y1="10.5" x2="8" y2="7.5" strokeWidth="1.2" />
          <line x1="21" y1="10.5" x2="24" y2="7.5" strokeWidth="1.2" />
          <line x1="7.5" y1="15" x2="4.5" y2="14" strokeWidth="1.1" />
          <line x1="24.5" y1="15" x2="27.5" y2="14" strokeWidth="1.1" />

          {/* Temple Shikhara & Ghat Spire Silhouettes */}
          <polygon points="4,18 6,13 8,18" fill={fillColor} strokeWidth="0.9" />
          <line x1="6" y1="13" x2="6" y2="11" strokeWidth="0.9" />
          <path d="M 24,18 L 26,14.5 L 28,18" strokeWidth="1.1" />

          {/* Sacred Ganga Waves */}
          <path d="M 3,20.5 Q 9,19 16,20.5 Q 23,22 29,20.5" strokeWidth="1.2" />
          <path d="M 5,23.5 Q 12,22 19,23.5 Q 26,25 29,23.5" strokeWidth="1.1" />
          <path d="M 8,26.5 Q 16,25 24,26.5" strokeWidth="1.0" />

          {/* Floating Brass Prayer Diya & Sacred Flame */}
          <path d="M 13.5,23.5 Q 16,25.2 18.5,23.5 Z" fill={fillColor} stroke="none" />
          <path
            d="M 16,19.2 C 15,21 15,22.2 16,23.2 C 17,22.2 17,21 16,19.2 Z"
            fill={fillColor}
            stroke="none"
          />
        </g>
      );

    // 9. Curated Kashi Dining
    case "kashi-dining":
      return (
        <g stroke={strokeColor} fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Royal Banarasi Bronze Thali Rim */}
          <circle cx="15.5" cy="18" r="10.5" fill={fillColor} fillOpacity={softFillOpacity} strokeWidth="1.3" />
          <circle cx="15.5" cy="18" r="9" strokeWidth="0.7" strokeDasharray="1,1.5" />

          {/* 4 Heritage Katori Bowls */}
          <circle cx="15.5" cy="12.5" r="2.2" fill={fillColor} fillOpacity="0.4" strokeWidth="0.9" />
          <circle cx="10.5" cy="17" r="2.2" fill={fillColor} fillOpacity="0.4" strokeWidth="0.9" />
          <circle cx="15.5" cy="21.5" r="2.2" fill={fillColor} fillOpacity="0.4" strokeWidth="0.9" />
          <circle cx="20.5" cy="17" r="2.2" fill={fillColor} fillOpacity="0.4" strokeWidth="0.9" />

          {/* Center Royal Mithai Diamond */}
          <polygon points="15.5,15.5 17,17 15.5,18.5 14,17" fill={fillColor} stroke="none" />

          {/* Traditional Clay Kulhad of Masala Chai */}
          <polygon points="23.5,6.5 27.5,6.5 26.5,12.5 24.5,12.5" fill={fillColor} fillOpacity="0.4" strokeWidth="1.0" />
          <line x1="24" y1="8.5" x2="27" y2="8.5" strokeWidth="0.8" />
          <line x1="24.3" y1="10.5" x2="26.7" y2="10.5" strokeWidth="0.8" />
          <path d="M 25.5,5.5 Q 24.5,3.5 25.5,2" strokeWidth="0.9" />

          {/* Star Anise Garnish */}
          <polygon points="7,8 8,9.5 7,11 5.5,10 6,8" fill={fillColor} stroke="none" />
        </g>
      );

    // 10. Private Transfers - Luxury Executive Car (Front View)
    case "private-transfers":
      return (
        <g fill="none">
          {/* Two Front Tires beneath bumper */}
          <rect x="7.2" y="21.5" width="3.2" height="4" rx="1.2" fill={fillColor} />
          <rect x="21.6" y="21.5" width="3.2" height="4" rx="1.2" fill={fillColor} />

          {/* Left & Right Side Mirrors */}
          <ellipse cx="5.3" cy="14.2" rx="1.6" ry="1.1" fill={fillColor} />
          <path d="M 6.6,14.4 L 8.2,14.8" stroke={strokeColor} strokeWidth="0.9" strokeLinecap="round" />
          <ellipse cx="26.7" cy="14.2" rx="1.6" ry="1.1" fill={fillColor} />
          <path d="M 25.4,14.4 L 23.8,14.8" stroke={strokeColor} strokeWidth="0.9" strokeLinecap="round" />

          {/* Solid Luxury Car Silhouette with EvenOdd Cutouts for Windshield, Headlights & Grille */}
          <path
            fill={fillColor}
            fillRule="evenodd"
            d="
              M 12.6,7.5 
              L 19.4,7.5 
              Q 20.3,7.5 20.8,8.8 
              L 23.6,14.2 
              Q 24.2,14.8 25.2,15.4 
              Q 26.5,16.5 26.5,18.5 
              L 26.5,21.5 
              Q 26.5,23 25,23 
              L 7,23 
              Q 5.5,23 5.5,21.5 
              L 5.5,18.5 
              Q 5.5,16.5 6.8,15.4 
              Q 7.8,14.8 8.4,14.2 
              L 11.2,8.8 
              Q 11.7,7.5 12.6,7.5 Z 

              M 13,9 
              L 19,9 
              L 22.8,14 
              L 9.2,14 Z 

              M 8,17.2 
              H 11.8 
              Q 12.5,17.2 12.5,18.2 
              Q 12.5,19.2 11.8,19.2 
              H 8 
              Q 7.3,19.2 7.3,18.2 
              Q 7.3,17.2 8,17.2 Z 

              M 20.2,17.2 
              H 24 
              Q 24.7,17.2 24.7,18.2 
              Q 24.7,19.2 24,19.2 
              H 20.2 
              Q 19.5,19.2 19.5,18.2 
              Q 19.5,17.2 20.2,17.2 Z 

              M 14,18 
              H 18 
              Q 18.5,18 18.5,18.5 
              Q 18.5,19 18,19 
              H 14 
              Q 13.5,19 13.5,18.5 
              Q 13.5,18 14,18 Z 

              M 14,20.2 
              H 18 
              Q 18.5,20.2 18.5,20.7 
              Q 18.5,21.2 18,21.2 
              H 14 
              Q 13.5,21.2 13.5,20.7 
              Q 13.5,20.2 14,20.2 Z
            "
          />

          {/* Headlight Inner Jeweled Bulbs */}
          <circle cx="9.9" cy="18.2" r="0.75" fill={fillColor} />
          <circle cx="22.1" cy="18.2" r="0.75" fill={fillColor} />
        </g>
      );

    // 11. Luxury Spa Ritual - Sacred Blooming Lotus
    case "luxury-spa":
      return (
        <g stroke={strokeColor} fill="none" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Central Upright Petal */}
          <path d="M 16,6.8 C 13.2,11 13.2,16.3 16,20.3 C 18.8,16.3 18.8,11 16,6.8 Z" />

          {/* Inner Left & Right Flanking Petals */}
          <path d="M 16,20.3 C 10.8,17.8 9.2,13.3 10.8,9.6 C 12.5,11.6 14.5,14.8 16,20.3 Z" />
          <path d="M 16,20.3 C 21.2,17.8 22.8,13.3 21.2,9.6 C 19.5,11.6 17.5,14.8 16,20.3 Z" />

          {/* Outer Left & Right Ascending Petals */}
          <path d="M 14.5,20.3 C 10.2,18.8 7.5,17 6.8,14 C 8.2,13.3 11,15.3 14.5,20.3 Z" />
          <path d="M 17.5,20.3 C 21.8,18.8 24.5,17 25.2,14 C 23.8,13.3 21,15.3 17.5,20.3 Z" />

          {/* Bottom Left & Right Horizontal Base Petals */}
          <path d="M 16,21.2 C 12.8,19.2 9.5,19.5 7.2,21.2 C 9.5,22.9 12.8,23.2 16,21.2 Z" />
          <path d="M 16,21.2 C 19.2,19.2 22.5,19.5 24.8,21.2 C 22.5,22.9 19.2,23.2 16,21.2 Z" />
        </g>
      );

    // 12. Ganges from the Water
    case "ganges-water":
      return (
        <g stroke={strokeColor} fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Sweeping Handcrafted Royal Wooden Bajra Boat */}
          <path
            d="M 4,20 C 8,23 19,23.5 28,19 L 27,21.5 C 19,25 8,24.5 3,21 Z"
            fill={fillColor}
            fillOpacity={softFillOpacity}
            strokeWidth="1.3"
          />

          {/* Canopied Pavilion Chhatri on Boat */}
          <path d="M 10.5,15.5 Q 16,13 21.5,15.5 L 21,17 L 11,17 Z" fill={fillColor} fillOpacity="0.4" strokeWidth="1.1" />
          <line x1="16" y1="13" x2="16" y2="11.5" strokeWidth="1.1" />
          <circle cx="16" cy="11" r="0.7" fill={fillColor} stroke="none" />

          {/* Pavilion Pillars */}
          <line x1="12" y1="17" x2="12" y2="20.5" strokeWidth="1.0" />
          <line x1="16" y1="17" x2="16" y2="21" strokeWidth="1.0" />
          <line x1="20" y1="17" x2="20" y2="20.5" strokeWidth="1.0" />

          {/* Glowing Bow Lantern & Oar */}
          <line x1="26" y1="17.5" x2="26" y2="19" strokeWidth="0.9" />
          <circle cx="26" cy="19.5" r="1.1" fill={fillColor} stroke="none" />
          <line x1="7" y1="18.5" x2="5" y2="25.5" strokeWidth="1.1" />

          {/* Holy River Waves */}
          <path d="M 3.5,24 Q 9,22.5 15,24 Q 21,25.5 26.5,24" strokeWidth="1.2" />
          <path d="M 6.5,27 Q 16,25.5 25.5,27" strokeWidth="1.0" />
        </g>
      );

    // 13. Default / Fallback Luxury Star Emblem
    case "default-luxury":
    default:
      return (
        <g stroke={strokeColor} fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* 4 Diagonal Spark Rays */}
          <line x1="16" y1="16" x2="21.5" y2="10.5" strokeWidth="1.0" opacity="0.85" />
          <circle cx="22" cy="10" r="0.8" fill={fillColor} stroke="none" />
          <line x1="16" y1="16" x2="21.5" y2="21.5" strokeWidth="1.0" opacity="0.85" />
          <circle cx="22" cy="22" r="0.8" fill={fillColor} stroke="none" />
          <line x1="16" y1="16" x2="10.5" y2="21.5" strokeWidth="1.0" opacity="0.85" />
          <circle cx="10" cy="22" r="0.8" fill={fillColor} stroke="none" />
          <line x1="16" y1="16" x2="10.5" y2="10.5" strokeWidth="1.0" opacity="0.85" />
          <circle cx="10" cy="10" r="0.8" fill={fillColor} stroke="none" />

          {/* 4-Pointed Luxury Star */}
          <path
            d="M 16,4.5 C 16,11 11.5,15.5 5,16 C 11.5,16.5 16,21 16,27.5 C 16,21 20.5,16.5 27,16 C 20.5,15.5 16,11 16,4.5 Z"
            fill={fillColor}
            fillOpacity={softFillOpacity}
            strokeWidth="1.3"
          />

          {/* Facet Lines */}
          <line x1="16" y1="4.5" x2="16" y2="27.5" strokeWidth="1.0" opacity="0.9" />
          <line x1="5" y1="16" x2="27" y2="16" strokeWidth="1.0" opacity="0.9" />

          {/* Center Diamond Gem */}
          <polygon points="16,12.5 19,16 16,19.5 13,16" fill={fillColor} strokeWidth="0.9" />
          <circle cx="16" cy="16" r="1.2" fill={fillColor} stroke="none" />
        </g>
      );
  }
}

/**
 * Circular Medallion with Flanking Symmetrical Golden Filigree & Dynamic Experience Icon
 * Houses the custom SVG vector icon mapped to the experience title.
 */
export function MedallionFrame({
  isActive = true,
  title = "",
  iconKey = null,
  className = "w-28 sm:w-32 xl:w-36 h-14 sm:h-16 xl:h-18",
}) {
  const resolvedKey = iconKey || getExperienceIconKey(title);
  const ringGrad = isActive ? "actRing" : "lightRing";

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        viewBox="0 0 140 70"
        className={`${className} transition-transform duration-300 group-hover:scale-105`}
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
        </defs>

        {/* Left Filigree Scrolls - Clean Transparent Fill */}
        <g stroke={`url(#${ringGrad})`} fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 38,35 C 33,35 24,31 16,35 C 24,39 31,37 38,35" strokeWidth="1.3" />
          <path d="M 33,32 C 26,27 20,28 17,32" strokeWidth="1.1" />
          <path d="M 33,38 C 26,43 20,42 17,38" strokeWidth="1.1" />
          <path d="M 16,35 Q 11,35 8,32" strokeWidth="1.1" />
          <circle cx="7.5" cy="31.5" r="1" fill={`url(#${ringGrad})`} />
          <circle cx="21" cy="28" r="0.9" fill={`url(#${ringGrad})`} />
          <circle cx="21" cy="42" r="0.9" fill={`url(#${ringGrad})`} />
        </g>

        {/* Right Filigree Scrolls - Clean Transparent Fill */}
        <g stroke={`url(#${ringGrad})`} fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 102,35 C 107,35 116,31 124,35 C 116,39 109,37 102,35" strokeWidth="1.3" />
          <path d="M 107,32 C 114,27 120,28 123,32" strokeWidth="1.1" />
          <path d="M 107,38 C 114,43 120,42 123,38" strokeWidth="1.1" />
          <path d="M 124,35 Q 129,35 132,32" strokeWidth="1.1" />
          <circle cx="132.5" cy="31.5" r="1" fill={`url(#${ringGrad})`} />
          <circle cx="119" cy="28" r="0.9" fill={`url(#${ringGrad})`} />
          <circle cx="119" cy="42" r="0.9" fill={`url(#${ringGrad})`} />
        </g>

        {/* Concentric Gold Rings - Transparent background (no dark burgundy fill) */}
        <circle cx="70" cy="35" r="26" stroke={`url(#${ringGrad})`} strokeWidth="1.0" strokeDasharray="1.5,2.5" fill="none" opacity="0.8" />
        <circle cx="70" cy="35" r="28" stroke={`url(#${ringGrad})`} strokeWidth="2.0" fill="none" />

        {/* Central Experience Icon Vector - Refined size (32x32), Centered at (70, 35) */}
        <svg x="54" y="19" width="32" height="32" viewBox="0 0 32 32">
          {renderExperienceIconVector(resolvedKey, `url(#${ringGrad})`, isActive)}
        </svg>
      </svg>
    </div>
  );
}
