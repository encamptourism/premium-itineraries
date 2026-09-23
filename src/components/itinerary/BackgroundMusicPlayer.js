"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

/**
 * Simple & Royal Burgundy Audio Player Button
 * Styled in rich royal burgundy (#64161B) matching Encamp Privé's royal gold ribbon branding.
 */
export default function BackgroundMusicPlayer({ itinerary, backgroundMusic }) {
  const music = backgroundMusic || itinerary?.backgroundMusic || itinerary?.background_music;
  const audioUrl = music?.url || "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=nature-ambient-11233.mp3";
  const title = music?.title || (itinerary?.title ? `${itinerary.title} Score` : "Royal Expedition Score");

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioUrl) return;

    const audio = new Audio(audioUrl);
    audio.loop = true;
    audio.volume = 0.45;
    audioRef.current = audio;

    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener("ended", handleEnded);

    // Attempt audio play gracefully
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

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    const nextState = !isMuted;
    setIsMuted(nextState);
    audioRef.current.muted = nextState;
  };

  if (!audioUrl) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3 select-none">
      {/* Royal Burgundy & Gold Floating Play/Pause Medallion */}
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause background music" : "Play background music"}
        title={isPlaying ? "Pause Music" : "Play Music"}
        className={`relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full transition-all duration-300 shadow-[0_8px_25px_rgba(0,0,0,0.5)] border border-[#d4af37] cursor-pointer backdrop-blur-md active:scale-95 ${
          isPlaying
            ? "bg-[#64161B] text-[#f0c85a] ring-4 ring-[#f0c85a]/25 scale-105 border-[#f0c85a]"
            : "bg-[#4a0e14]/90 text-[#d5b45a] hover:bg-[#64161B] hover:text-[#f0c85a] hover:border-[#f0c85a]"
        }`}
      >
        {/* Subtle Inset Gold Bezel */}
        <div className="absolute inset-1 rounded-full border border-[#f0c85a]/30 pointer-events-none" />

        {isPlaying ? (
          <>
            <Pause className="w-5 h-5 fill-current drop-shadow-sm" />
            <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f0c85a] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#f0c85a] border border-[#64161B]" />
            </span>
          </>
        ) : (
          <Play className="w-5 h-5 ml-0.5 fill-current drop-shadow-sm" />
        )}
      </button>

      {/* Clean Royal Burgundy Track Badge */}
      <div className="hidden sm:flex items-center gap-2.5 bg-[#4a0e14]/95 text-stone-100 text-xs px-4 py-2 rounded-full border border-[#d4af37]/50 shadow-2xl backdrop-blur-md">
        <span className="font-serif-display italic text-[#f0c85a] font-medium tracking-wide max-w-[190px] truncate">
          {title}
        </span>
        
        <button
          onClick={toggleMute}
          title={isMuted ? "Unmute" : "Mute"}
          className="text-[#d5b45a] hover:text-[#f0c85a] transition-colors p-0.5 ml-1 border-l border-[#d4af37]/30 pl-2 cursor-pointer"
        >
          {isMuted ? (
            <VolumeX className="w-3.5 h-3.5 text-red-300" />
          ) : (
            <Volume2 className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
    </div>
  );
}
