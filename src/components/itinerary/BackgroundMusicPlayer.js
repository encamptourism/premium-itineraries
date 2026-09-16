"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, Music } from "lucide-react";

export default function BackgroundMusicPlayer({ itinerary, backgroundMusic }) {
  const music = backgroundMusic || itinerary?.backgroundMusic || itinerary?.background_music;
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!music?.url) return;

    const audio = new Audio(music.url);
    audio.loop = music.loop ?? true;
    audio.volume = typeof music.volume === "number" ? music.volume : 0.5;
    audioRef.current = audio;

    // Handle audio end if loop is false
    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener("ended", handleEnded);

    // Attempt autoplay on itinerary open
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        // Autoplay blocked by browser policy; play on first user interaction
        setIsPlaying(false);
        const handleFirstInteraction = () => {
          if (audioRef.current && audioRef.current.paused) {
            audioRef.current
              .play()
              .then(() => setIsPlaying(true))
              .catch(() => {});
          }
          window.removeEventListener("pointerdown", handleFirstInteraction);
          window.removeEventListener("keydown", handleFirstInteraction);
        };
        window.addEventListener("pointerdown", handleFirstInteraction);
        window.addEventListener("keydown", handleFirstInteraction);
      });

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, [music?.url, music?.loop, music?.volume]);

  if (!music?.url) return null;

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Audio play error:", err));
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2 group">
      {/* Floating Toggle Button */}
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause background music" : "Play background music"}
        title={music.title ? `${isPlaying ? "Pause" : "Play"}: ${music.title}` : (isPlaying ? "Pause Music" : "Play Music")}
        className={`relative flex items-center justify-center w-12 h-12 rounded-full shadow-2xl transition-all duration-300 border backdrop-blur-md cursor-pointer ${
          isPlaying
            ? "bg-[#062a1c] text-[#dfa62f] border-[#dfa62f] ring-4 ring-[#dfa62f]/20 scale-105"
            : "bg-white/95 text-stone-700 border-stone-300 hover:border-[#062a1c] hover:bg-[#062a1c] hover:text-[#dfa62f]"
        }`}
      >
        {isPlaying ? (
          <>
            <Pause className="w-5 h-5 fill-current" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#dfa62f] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#dfa62f]"></span>
            </span>
          </>
        ) : (
          <Play className="w-5 h-5 ml-0.5 fill-current" />
        )}
      </button>

      {/* Track Title Badge (Visible on hover or when playing) */}
      {music.title && (
        <div className="hidden sm:flex items-center gap-2 bg-[#062a1c]/90 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-md border border-[#dfa62f]/40 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
          <Music className="w-3.5 h-3.5 text-[#dfa62f] animate-pulse" />
          <span className="truncate max-w-[160px] font-medium">{music.title}</span>
        </div>
      )}
    </div>
  );
}
