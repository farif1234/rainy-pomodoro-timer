import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { motion, AnimatePresence } from "framer-motion";
import RainDrop from "./components/RainDrop";
import LightningEffect from "./components/Lightning";
import Timer from "./components/Timer";
import { TIMES, AUDIO_URL } from "./constants";
import rainSound from "./assets/rainSound.mp3";

const audioElement = new Audio(rainSound);
audioElement.loop = true;
audioElement.volume = 0.15;
// TODO: LOOP

function App() {
    const [time, setTime] = useState(TIMES[0]);
    const [timerStart, setTimerStart] = useState(false);
    const [phase, setPhase] = useState(0); // odd number -> work, even number -> short break, every 8th phase -> long break
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.1);
    const [showAbout, setShowAbout] = useState(false);

    const togglePlayback = () => {
        // const audioElement = document.getElementById("rain-sound");
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
        // const audioElement = document.getElementById("rain-sound");
        if (audioElement) audioElement.volume = newVolume;
    };

    const phases = ["focus", "short break", "long break"];

    function getPhase(p) {
        if (p % 2 == 0) return "focus";
        if (p % 7 == 0) return "long break";
        return "short break";
    }

    const toggleTimer = () => {
        setTimerStart(!timerStart);
    };

    const toggleAbout = () => {
        setShowAbout(!showAbout);
    };

    return (
        <motion.div
            // initial={{ opacity: 0 }}
            // animate={{ opacity: 1 }}
            // transition={{ duration: 1 }}
            className={`relative h-screen overflow-hidden duration-1000 flex items-center justify-center   ${
                getPhase(phase) == "focus"
                    ? "bg-gray-950"
                    : getPhase(phase) == "short break"
                    ? "bg-blue-600"
                    : "bg-orange-500"
            }`}
            // className={`relative h-screen overflow-hidden duration-1000   ${
            //     getPhase(phase) == "focus"
            //         ? "bg-gradient-to-t from-gray-950 from-80% to-gray-800"
            //         : getPhase(phase) == "short break"
            //         ? "bg-gradient-to-tr from-sky-900  via-sky-600 via-80% to-yellow-500"
            //         : "bg-orange-500"
            // }`}
        >
            {phase % 2 == 0 &&
                [...Array(100)].map((_, index) => <RainDrop index={index} />)}

            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.3, type: "tween", ease: "easeOut" }}
                className="absolute  flex flex-col justify-center items-center font-cormorant "
            >
                <h1 className="text-5xl text-gray-200 font-extralight italic">
                    nimbus
                </h1>
                <h3 className="text-lg text-gray-200">pomodoro timer</h3>
                <div className="mt-8 mx-2 flex items-center">
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
                {/* <div className="text-md text-gray-400">test</div> */}
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
                    className="text-gray-200 text-2xl border border-gray-300 hover:bg-gray-900  font-bold rounded-full px-7 py-2.5 mb-2 mt-5 duration-150 w-1/3"
                >
                    {time == TIMES[phase]
                        ? "start"
                        : timerStart
                        ? "pause"
                        : "resume"}
                </motion.button>
                <div className="flex mt-3 relative items-center justify-center w-full">
                    <button
                        onClick={() => handleVolumeChange(-0.1)}
                        className={`text-2xl text-gray-200  rounded-full w-8 h-8 font-serif border-gray-700 active:scale-75 active:border-gray-300 border-2 duration-300 flex justify-center hover:bg-gray-900  items-center ${
                            isPlaying
                                ? "opacity-100 scale-100"
                                : "opacity-0 scale-0"
                        }`}
                    >
                        -
                    </button>
                    <motion.button
                        onClick={togglePlayback}
                        type="button"
                        whileTap={{
                            scale: [1, 0.6, 1],
                            transition: {
                                duration: 1,
                            },
                        }}
                        className="text-gray-200 text-md border border-gray-300 hover:bg-gray-900  font-bold rounded-full p-3 mx-3 duration-150 w-1/3"
                    >
                        rain sound {isPlaying ? "off" : "on"}
                    </motion.button>
                    <button
                        onClick={() => handleVolumeChange(0.1)}
                        className={`text-2xl text-gray-200  rounded-full w-8 h-8 font-serif border-gray-700 active:scale-75 active:border-gray-300 border-2 duration-300 flex justify-center hover:bg-gray-900  items-center ${
                            isPlaying
                                ? "opacity-100 scale-100"
                                : "opacity-0 scale-0"
                        }`}
                    >
                        +
                    </button>
                </div>

                <div
                    className={`w-full h-full p-8 absolute bg-transparent backdrop-blur-md backdrop-brightness-[0.6] ${
                        showAbout ? "scale-110" : "scale-0"
                    }  flex flex-col duration-300 text-gray-100 rounded-xl text-sm md:text-lg`}
                >
                    <div className="flex justify-between">
                        <h1 className=" text-4xl h-fit font-bold underline underline-offset-4 w-fit">
                            about
                        </h1>
                        <button
                            onClick={toggleAbout}
                            className="text-xl rounded-full p-2 w-24 bg-gradient-to-r from-rose-400 to-red-500 hover:scale-105 duration-200"
                        >
                            close
                        </button>
                    </div>
                    <p className=" mt-8 font-bold text ">
                        the pomodoro technique was designed to enhance
                        productivity by breaking down work sessions into
                        intervals.
                    </p>
                    <p className=" mt-8 font-bold text ">
                        every work session is 25 minutes, followed by a 5 minute
                        short break. after 4 work sessions, you are rewarded
                        with a long break of 15 minutes.
                    </p>
                    <p className=" mt-8 font-bold text ">
                        this app features automatic session switching, calming
                        rain ambience, and a gentle notification bell.
                    </p>
                    <p className=" mt-8 font-bold text ">
                        more features otw. made by{" "}
                        <a
                            href="https://faihaan.dev"
                            target="_blank"
                            className="underline underline-offset-2 rounded-full font-extrabold italic "
                        >
                            faihaan.dev
                        </a>
                    </p>
                </div>

                <motion.button
                    onClick={toggleAbout}
                    type="button"
                    className="text-gray-200 text-lg border border-gray-300 hover:bg-gray-900 rounded-full px-4 py-2 mt-5 duration-150 w-1/3"
                >
                    about
                </motion.button>
            </motion.div>
        </motion.div>
    );
}

export default App;
