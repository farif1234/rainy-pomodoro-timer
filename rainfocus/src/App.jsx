import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { motion, AnimatePresence } from "framer-motion";
import RainDrop from "./components/RainDrop";
import LightningEffect from "./components/Lightning";
import Timer from "./components/Timer";
import { TIMES } from "./constants";

function App() {
    const [time, setTime] = useState(TIMES[0]);
    const [timerStart, setTimerStart] = useState(false);
    const [phase, setPhase] = useState(0); // odd number -> work, even number -> short break, every 8th phase -> long break

    const phases = ["focus", "short break", "long break"];

    function getPhase(p) {
        if (p % 2 == 0) return "focus";
        if (p % 7 == 0) return "long break";
        return "short break";
    }

    const toggleTimer = () => {
        setTimerStart(!timerStart);
    };

    return (
        <div className="relative h-screen bg-gradient-to-t from-gray-950 from-80% to-gray-800 overflow-hidden">
            {[...Array(100)].map((_, index) => (
                <RainDrop index={index} />
            ))}

            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.3, type: "tween", ease: "easeOut" }}
                className="absolute inset-0 flex flex-col justify-center items-center font-cormorant"
            >
                <h1 className="text-5xl text-gray-300 font-extralight italic">
                    nimbus
                </h1>
                <h3 className="text-lg text-gray-400">pomodoro timer</h3>
                <div className="mt-8 flex items-center">
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
                    {/* <h2 className="relative font-extralight text-2xl text-gray-100  px-5 py-1 rounded-full duration-1000  bg-gradient-to-r from-amber-500 to-pink-500">
                        focus
                    </h2>
                    <div className="w-5 h-0.5 bg-gray-700 rounded-full"></div>
                    <h2 className="relative font-extralight text-2xl text-gray-100  px-5 py-1 rounded-full duration-1000  bg-gray-800 opacity-30">
                        short break
                    </h2>
                    <div className="w-5 h-0.5 bg-gray-700 rounded-full"></div>
                    <h2 className="relative font-extralight text-2xl text-gray-100  px-5 py-1 rounded-full duration-1000  bg-gray-800 opacity-30">
                        long break
                    </h2> */}
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
                    // initial={{ scale: 1, opacity: 0.7 }}
                    // animate={{ scale: 1.05, opacity: 1 }}
                    // transition={{
                    //     duration: 3,
                    //     repeat: Infinity,
                    //     repeatType: "reverse",
                    // }}
                    className="text-gray-300 text-2xl border border-gray-300 hover:bg-gray-900  font-bold rounded-full px-7 py-2.5 me-2 mb-2 mt-5 duration-150"
                >
                    {time == TIMES[phase]
                        ? "start"
                        : timerStart
                        ? "pause"
                        : "resume"}
                </motion.button>
            </motion.div>
        </div>
    );
}

export default App;
