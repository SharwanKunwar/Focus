import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "motion/react";

// Import your audio files

import track4 from "../assets/music/Relaxing Guitar for Stress Relief, work and study.mp3";
import track5 from "../assets/music/Classical-Deep-SitarFlute-Ragas-for-Study, Work-Productivity.mp3";
import track6 from "../assets/music/Relaxing-music-improve-your-Focus-relaxed.mp3";
import track7 from "../assets/music/Sitar-Tabla - Classical-Instrumental.mp3";
import track8 from "../assets/music/Study Session [lofi_hip_hop].mp3";
import track9 from "../assets/music/Гио-Пика Буйно-голова 🌧.mp3";
import track10 from "../assets/music/BOLD MUSIC - Gold-Digger-Taimorbeg .mp3";
import track11 from "../assets/music/BOLD MUSIC - Aafno by vten .mp3";
import track12 from "../assets/music/Die With A Smile.mp3";
import track13 from "../assets/music/J-Cole All-My-Life .mp3";
import track14 from "../assets/music/Koi Apna Hoga.mp3";
import track15 from "../assets/music/Passenger___Let-Her-Go.mp3";
import track16 from "../assets/music/Perfect - Ed_Sheeran.mp3";
import track17 from "../assets/music/SOCIETY - TAIMOUR BAIG.mp3";
import track18 from "../assets/music/Talha_Anjum Run it back.mp3";
import track19 from "../assets/music/Talha_Anjum.mp3";
import track20 from "../assets/music/Talhah-Yunus Therapy.mp3";

const musicList = [
  { name: "Focus : Relaxing Guitar for Stress Relief, work and study.mp3", file: track4, },
  { name: "Focus : Classical-Deep-SitarFlute- Study, Work-Productivity.mp3", file: track5, }, 
  { name: "Focus : Relaxing-music-improve-your-Focus-relaxed.mp3", file: track6, },
  { name: "Focus : Sitar-Tabla - Classical-Instrumental.mp3", file: track7 },
  { name: "Focus : Study Session [lofi_hip_hop].mp3", file: track8 },
  { name: "Focus : Гио-Пика Буйно-голова 🌧.mp3", file: track9 },
  { name: "Focus : BOLD MUSIC - Gold-Digger-Taimorbeg.mp3", file: track10 },
  { name: "Focus : BOLD MUSIC - Aafno by vten.mp3", file: track11 },
  { name: "Focus : Die With A Smile.mp3", file: track12 },
  { name: "Focus : J-Cole All-My-Life.mp3", file: track13 },
  { name: "Focus : Koi Apna Hoga.mp3", file: track14 },
  { name: "Focus : Passenger___Let-Her-Go.mp3", file: track15 },
  { name: "Focus : Perfect - Ed_Sheeran", file: track16 },
  { name: "Focus : SOCIETY - TAIMOUR BAIG.mp3", file: track17 },
  { name: "Focus : Talha_Anjum Run it back.mp3", file: track18 },
  { name: "Focus : Talha_Anjum.mp3", file: track19 },
  { name: "Focus : Talhah-Yunus Therapy.mp3", file: track20 },
];

function MusicPlayer({ onRefReady }) {
  const [currentTrack, setCurrentTrack] = useState(null);
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.5); // default 50%
  const [isPlaying, setIsPlaying] = useState(false);

  const controls = useAnimation();

  useEffect(() => {
    if (onRefReady) onRefReady(audioRef);
  }, [onRefReady]);

  // Update progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current) {
        setProgress(audioRef.current.currentTime);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // For control the rotation of the circle
  useEffect(() => {
    if (isPlaying) {
      controls.start({
        rotate: 360,
        transition: {
          repeat: Infinity,
          duration: 4,
          ease: "linear",
        },
      });
    } else {
      controls.stop(); // instantly stop rotation
    }
  }, [isPlaying]);

  const playTrack = (index) => {
    setCurrentTrack(index);
    setTimeout(() => audioRef.current?.play(), 100);
  };

  const nextTrack = () => {
    if (currentTrack === null) return;
    const nextIndex = (currentTrack + 1) % musicList.length;
    playTrack(nextIndex);
  };

  const prevTrack = () => {
    if (currentTrack === null) return;
    const prevIndex = (currentTrack - 1 + musicList.length) % musicList.length;
    playTrack(prevIndex);
  };

  //helper function to formate second to mm:ss
  function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  }

  return (
    <div className=" w-full h-full rounded-sm mastShadow flex gap-3">
      {/* Left Box: Music Player */}
      <div className=" w-6/12 h-full flex flex-col items-center justify-center p-6 rounded-lg bg-yellow-200 shadow-md">
        {/* Album Art */}
        <div className="w-[40vw] h-[50vh] bg-gradient-to-br from-indigo-400/30 via-pink-400/30 to-sky-400/30 backdrop-blur-2xl rounded-lg flex border border-white/30 items-center justify-center shadow-xl relative">
          {/* volume slider button  */}
          <div className="w-[40%] -right-20 h-[15%] absolute -rotate-90  bg-white/10 backdrop-blur-2xl mastShadow flex rounded-md  items-center mt-4">
            <span className="text-[4vh] rotate-90">🔈</span>

            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => {
                const vol = parseFloat(e.target.value);
                setVolume(vol);
                if (audioRef.current) audioRef.current.volume = vol;
              }}
              className="flex-1 h-4 bg-gray-50 appearance-none rounded-full hover:bg-gradient-to-bl from-indigo-400 to-pink-500 via-orange-400 focus:outline-none focus:ring-2 focus:ring-white mastInShadow"
              style={{
                accentColor: "#f5f56f", // modern indigo color for thumb (works in Chrome, Edge, Safari)
              }}
            />

            <span className="text-[4vh] rotate-90">🔊</span>
          </div>

          {/* roateing circle music album  */}
          <motion.div
            animate={controls}
            className="bg-white w-[300px] h-[300px] rounded-full flex justify-center items-center mastShadow"
          >
            <div className="bg-gradient-to-bl from-indigo-400 to-green-500 via-pink-400 w-[280px] h-[280px] rounded-full mastShadow flex justify-center items-center mastShadow">
              <div className="bg-white w-[60px] h-[60px] rounded-full mastShadow"></div>
            </div>
          </motion.div>
        </div>

        {/* Track Name */}
        <h2 className="mt-5 text-lg font-semibold text-gray-800">
          {currentTrack !== null
            ? musicList[currentTrack].name
            : "Select a track"}
        </h2>

        {/* Audio Player */}
        {currentTrack !== null && (
          <>
            <audio ref={audioRef} src={musicList[currentTrack].file} loop />

            {/* Controls */}
            <div className="flex gap-4 mt-4">
              <button
                onClick={prevTrack}
                className="px-4 py-2 bg-white text-black font-medium rounded-sm mastShadow hover:text-white hover:bg-indigo-700 transition"
              >
                Prev
              </button>
              <button
                onClick={() => {
                  if (audioRef.current.paused) {
                    audioRef.current.play();
                  } else {
                    audioRef.current.pause();
                  }
                }}
                className="px-4 py-2 bg-white text-black rounded-sm mastShadow hover:bg-indigo-700 transition hover:text-white font-medium"
              >
                {audioRef.current && !audioRef.current.paused
                  ? "Pause"
                  : "Play"}
              </button>
              <button
                onClick={nextTrack}
                className="px-4 py-2 bg-white text-black rounded-sm mastShadow font-medium hover:text-white hover:bg-indigo-700 transition"
              >
                Next
              </button>
            </div>

            {/* Progress Bar */}
            <div className="w-full mt-4 flex items-center gap-3 justify-center">
              {/* Current time */}
              <span className="text-sm">{formatTime(progress)}</span>

              {/* Progress Slider */}
              <div className="w-[50%] h-[30px] bg-white mastShadow rounded-sm flex justify-center items-center">
                <input
                  type="range"
                  min="0"
                  max={audioRef.current?.duration || 0}
                  value={progress}
                  onChange={(e) => {
                    audioRef.current.currentTime = e.target.value;
                    setProgress(e.target.value);
                  }}
                  className="w-full flex justify-center items-center bg-gray-300 h-[13px] appearance-none"
                  style={{
                    borderRadius: 0, // Remove track rounding
                  }}
                />
              </div>

              {/* Total duration */}
              <span className="text-sm">
                {audioRef.current
                  ? formatTime(audioRef.current.duration)
                  : "0:00"}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Right Box: Playlist */}
      <div
        className=" w-6/12 h-full p-5 overflow-y-auto scroll-smooth transition-transform"
        style={{ maxHeight: "100%", scrollBehavior: "smooth" }}
      >
        <h3 className="text-xl font-semibold mb-4">Playlist</h3>
        {musicList.map((track, index) => (
          <div
            key={index}
            onClick={() => (playTrack(index), setIsPlaying(true))}
            className={`flex items-center justify-between p-3 mb-2 rounded-lg cursor-pointer transition-all duration-200 mastShadow
              ${
                currentTrack === index
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-white hover:bg-gray-100"
              }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-bold mastShadow">
                🎵
              </div>
              <span className="font-medium">{track.name}</span>
            </div>
            {currentTrack === index && <span className="mastShadow">▶️</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MusicPlayer;
