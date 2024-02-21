import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RainDrop from "./components/RainDrop";
import Timer from "./components/Timer";
import { TIMES } from "./constants";
import rainSound from "./assets/rainSound.mp3";
import About from "./components/About";
import AudioControls from "./components/AudioControls";
import { Analytics } from "@vercel/analytics/react";

const audioElement = new Audio(rainSound);
audioElement.loop = true;
audioElement.volume = 0.15;

function getHoverColor(p) {
    if (p % 2 == 0) return "hover:bg-gray-900";
    if ((p + 1) % 8 == 0) return "hover:bg-orange-600";
    return "hover:bg-sky-800";
}

function App() {
    const [time, setTime] = useState(TIMES[0]);
    const [timerStart, setTimerStart] = useState(false);
    const [phase, setPhase] = useState(0); // odd number -> work, even number -> short break, every 8th phase -> long break
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.1);
    const [showAbout, setShowAbout] = useState(false);

    const togglePlayback = () => {
        if (isPlaying) {
            audioElement.pause();
        } else {
            audioElement.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleVolumeChange = (change) => {
        var newVolume;
        if (change > 0) {
            newVolume = Math.min(volume + change, 1);
        } else {
            newVolume = Math.max(volume + change, 0.1);
        }
        setVolume(newVolume);
        if (audioElement) audioElement.volume = newVolume;
    };

    const phases = ["focus", "short break", "long break"];

    function getPhase(p) {
        if (p % 2 == 0) return "focus";
        if ((p + 1) % 8 == 0) return "long break";
        return "short break";
    }

    const hoverColor = getHoverColor(phase);

    const toggleTimer = () => {
        setTimerStart(!timerStart);
    };

    const toggleAbout = () => {
        setShowAbout(!showAbout);
    };

    return (
        <motion.div
            className={`relative h-screen overflow-hidden duration-1000 flex items-center justify-center   ${
                getPhase(phase) == "focus"
                    ? "bg-gray-950"
                    : getPhase(phase) == "short break"
                    ? "bg-sky-900"
                    : "bg-orange-700"
            }`}
        >
            <Analytics />
            {phase % 2 == 0 &&
                [...Array(100)].map((_, index) => <RainDrop index={index} />)}

            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.3, type: "tween", ease: "easeOut" }}
                className="absolute  flex flex-col justify-center items-center font-cormorant z-30  "
            >
                <h1 className="text-5xl text-gray-200 font-extralight italic">
                    nimbus
                </h1>
                <h3 className="text-lg text-gray-200">pomodoro timer</h3>
                <div className="mt-8 mb-2 mx-2 flex items-center">
                    {phases.map((phase_, idx) => (
                        <div className="flex items-center" key={idx}>
                            <h2
                                className={`relative font-extralight text-sm md:text-2xl sm:text-sm text-gray-100  px-5 py-1 rounded-full duration-1000 ${
                                    getPhase(phase) == phase_
                                        ? "bg-gradient-to-r from-amber-500 to-pink-500"
                                        : "bg-gray-800 opacity-20"
                                }`}
                            >
                                {phase_}
                            </h2>
                            {idx < 2 && (
                                <div className="w-5 h-0.5 bg-gray-700 rounded-full"></div>
                            )}
                        </div>
                    ))}
                </div>
                <Timer
                    time={time}
                    setTime={setTime}
                    timerStart={timerStart}
                    setTimerStart={setTimerStart}
                    phase={phase}
                    setPhase={setPhase}
                />

                <motion.button
                    onClick={toggleTimer}
                    type="button"
                    whileHover={{
                        scale: [1, 1.1, 1],
                        transition: {
                            duration: 0.8,
                            repeat: Infinity,
                        },
                    }}
                    className={`text-gray-200 text-2xl border border-gray-300 ${hoverColor}  font-bold rounded-full px-7 py-2.5 mb-2 mt-5 duration-150 w-1/3 backdrop-blur-md`}
                >
                    {timerStart
                        ? "pause"
                        : time == TIMES[phase % TIMES.length]
                        ? "start"
                        : "resume"}
                </motion.button>
                <AudioControls
                    handleVolumeChange={handleVolumeChange}
                    togglePlayback={togglePlayback}
                    isPlaying={isPlaying}
                    hoverColor={hoverColor}
                />
                <About toggleAbout={toggleAbout} showAbout={showAbout} />
                <motion.button
                    onClick={toggleAbout}
                    type="button"
                    className={`text-gray-200 text-lg border border-gray-300 ${hoverColor} rounded-full px-4 py-2 mt-5 duration-150 w-1/3`}
                >
                    about
                </motion.button>
            </motion.div>
        </motion.div>
    );
}

export default App;
