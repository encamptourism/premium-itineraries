"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, X } from "lucide-react";

export default function BackgroundMusicPlayer({ itinerary, backgroundMusic }) {
  const music = backgroundMusic || itinerary?.backgroundMusic || itinerary?.background_music;
  const audioUrl = music?.url || "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=nature-ambient-11233.mp3";
  const title = music?.title || (itinerary?.title ? `${itinerary.title} Score` : "Royal Expedition Score");

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.45);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpandedMobile, setIsExpandedMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const audioRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsExpandedMobile(false);
      }
    }
    if (isExpandedMobile) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isExpandedMobile]);

  useEffect(() => {
    if (!audioUrl) return;

    const audio = new Audio(audioUrl);
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener("ended", handleEnded);

    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        setIsPlaying(false);
        const handleInteraction = () => {
          if (audioRef.current && audioRef.current.paused) {
            audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
          }
          window.removeEventListener("pointerdown", handleInteraction);
        };
        window.addEventListener("pointerdown", handleInteraction);
      });

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, [audioUrl]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  const togglePlay = (e) => {
    e?.stopPropagation();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const handleVolumeChange = (e) => {
    e?.stopPropagation();
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = (e) => {
    e?.stopPropagation();
    if (!audioRef.current) return;
    const next = !isMuted;
    setIsMuted(next);
    if (!next && volume === 0) {
      setVolume(0.45);
    }
  };

  if (!audioUrl) return null;

  const currentVolumePercent = Math.round((isMuted ? 0 : volume) * 100);
  const VolumeIcon = isMuted || volume === 0 ? VolumeX : Volume2;

  return (
    <>
      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background-color: #123B2A;
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
          transition: transform 0.1s ease;
        }
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.18);
        }
        input[type="range"]::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background-color: #123B2A;
          cursor: pointer;
          border: none;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
        }
        @keyframes musicBar1 {
          0%, 100% { height: 4px; }
          50% { height: 13px; }
        }
        @keyframes musicBar2 {
          0%, 100% { height: 13px; }
          50% { height: 5px; }
        }
        @keyframes musicBar3 {
          0%, 100% { height: 6px; }
          50% { height: 15px; }
        }
        @keyframes musicBar4 {
          0%, 100% { height: 11px; }
          50% { height: 4px; }
        }
        .animate-bar-1 { animation: musicBar1 0.8s ease-in-out infinite; }
        .animate-bar-2 { animation: musicBar2 0.7s ease-in-out infinite; }
        .animate-bar-3 { animation: musicBar3 0.9s ease-in-out infinite; }
        .animate-bar-4 { animation: musicBar4 0.75s ease-in-out infinite; }
      `}</style>

      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="fixed bottom-18 sm:bottom-6 left-3 sm:left-6 z-40 sm:z-50 select-none group flex flex-col items-start gap-1"
      >
        {isPlaying && (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md border border-stone-200/90 shadow-xs max-w-[260px] sm:max-w-[320px] animate-fadeIn">
            <div className="flex items-end gap-0.5 h-3.5 px-0.5 shrink-0" title="Now Playing">
              <span className="w-0.5 bg-[#123B2A] rounded-full animate-bar-1" />
              <span className="w-0.5 bg-[#123B2A] rounded-full animate-bar-2" />
              <span className="w-0.5 bg-[#123B2A] rounded-full animate-bar-3" />
              <span className="w-0.5 bg-[#123B2A] rounded-full animate-bar-4" />
            </div>

            <span
              title={title}
              className="font-serif-display italic font-semibold text-[11px] sm:text-xs text-[#123B2A] truncate leading-tight"
            >
              {title}
            </span>
          </div>
        )}

        <div
          onClick={() => {
            if (typeof window !== "undefined" && window.innerWidth < 640 && !isExpandedMobile) {
              setIsExpandedMobile(true);
            }
          }}
          className={`flex items-center gap-2 sm:gap-2.5 px-2 sm:px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-xl border-2 border-stone-300/90 shadow-[0_6px_25px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out cursor-pointer ${
            isExpandedMobile ? "ring-2 ring-[#123B2A]/30 shadow-lg" : ""
          }`}
        >
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause background music" : "Play background music"}
            title={isPlaying ? "Pause Music" : "Play Music"}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 active:scale-90 cursor-pointer shadow-xs shrink-0 border ${
              isPlaying
                ? "bg-[#123B2A] hover:bg-[#1a4a35] text-[#f0c85a] border-[#d4af37]/60 ring-2 ring-[#123B2A]/20"
                : "bg-[#64161B] hover:bg-[#7d1c22] text-[#f0c85a] border-[#dfa62f]/60 ring-2 ring-[#64161B]/20"
            }`}
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 fill-[#f0c85a] text-[#f0c85a]" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-[#f0c85a] text-[#f0c85a] ml-0.5" />
            )}
          </button>

          <div
            className={`hidden sm:flex items-center transition-all duration-300 ease-out overflow-hidden ${
              isHovered
                ? "max-w-[240px] opacity-100 pl-1 pr-0.5"
                : "max-w-0 opacity-0 pl-0 pr-0"
            }`}
          >
            <div className="relative flex items-center w-28 md:w-36 h-6 px-1">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                title={`Volume: ${currentVolumePercent}%`}
                aria-label="Sound volume slider"
                className="w-full h-1.5 sm:h-2 rounded-full appearance-none cursor-pointer bg-transparent focus:outline-hidden"
                style={{
                  background: `linear-gradient(to right, #123B2A 0%, #123B2A ${currentVolumePercent}%, #d1d5db ${currentVolumePercent}%, #d1d5db 100%)`,
                }}
              />
            </div>

            <span className="font-mono text-[10px] font-bold text-[#123B2A] min-w-[28px] text-right shrink-0">
              {currentVolumePercent}%
            </span>

            <button
              type="button"
              onClick={toggleMute}
              title={isMuted ? "Unmute" : "Mute"}
              className="text-stone-500 hover:text-[#123B2A] p-1 rounded-full transition-colors cursor-pointer shrink-0 ml-0.5"
            >
              <VolumeIcon className="w-3.5 h-3.5" />
            </button>
          </div>

          <div
            className={`hidden sm:flex items-center transition-all duration-200 ${
              isHovered ? "w-0 opacity-0 overflow-hidden" : "opacity-70 group-hover:opacity-100 pl-0.5"
            }`}
          >
            <button
              type="button"
              onClick={toggleMute}
              title={`Volume: ${currentVolumePercent}% (Hover to adjust)`}
              className="text-[#123B2A] p-1 rounded-full hover:bg-black/5 transition-colors cursor-pointer"
            >
              <VolumeIcon className="w-3.5 h-3.5" />
            </button>
          </div>

          {isExpandedMobile && (
            <div className="flex sm:hidden items-center gap-1.5 pl-1 animate-fadeIn">
              <div className="relative flex items-center w-24 min-[380px]:w-28 h-6 px-0.5">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  title={`Volume: ${currentVolumePercent}%`}
                  aria-label="Sound volume slider"
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-transparent focus:outline-hidden"
                  style={{
                    background: `linear-gradient(to right, #123B2A 0%, #123B2A ${currentVolumePercent}%, #d1d5db ${currentVolumePercent}%, #d1d5db 100%)`,
                  }}
                />
              </div>

              <span className="font-mono text-[9px] font-bold text-[#123B2A] shrink-0">
                {currentVolumePercent}%
              </span>

              <button
                type="button"
                onClick={toggleMute}
                className="text-[#123B2A] p-1 rounded-full active:scale-90"
              >
                <VolumeIcon className="w-3 h-3" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpandedMobile(false);
                }}
                aria-label="Collapse sound controller"
                className="w-5 h-5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center cursor-pointer active:scale-90"
              >
                <X className="w-3 h-3 stroke-[2.5]" />
              </button>
            </div>
          )}

          {!isExpandedMobile && (
            <div className="flex sm:hidden items-center text-[#123B2A]/80 pr-0.5">
              <VolumeIcon className="w-3.5 h-3.5" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
