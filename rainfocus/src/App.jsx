import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { motion } from "framer-motion";
import RainDrop from "./components/RainDrop";
import LightningEffect from "./components/Lightning";
import Timer from "./components/Timer";

function App() {
    const [time, setTime] = useState(1500);
    const [timerStart, setTimerStart] = useState(false);
    const [activeTimer, setActiveTimer] = useState(false);

    const toggleTimer = () => {
        setActiveTimer(!activeTimer);
        setTimerStart(!timerStart);
    };

    return (
        <div className="relative h-screen bg-gradient-to-t from-gray-950 from-80% to-gray-800 overflow-hidden">
            {/* <LightningEffect /> */}

            {[...Array(100)].map((_, index) => (
                <RainDrop index={index} />
            ))}

            <div className="absolute inset-0 flex flex-col justify-center items-center font-cormorant ">
                <h1 className="text-6xl text-gray-300  ">nimbus</h1>
                <h3 className="text-lg text-gray-400">pomodoro timer</h3>
                {/* <div className="text-gray-300 text-9xl my-5">25:00</div> */}
                <Timer
                    time={time}
                    setTime={setTime}
                    timerStart={timerStart}
                    setTimerStart={setTimerStart}
                />
                <motion.button
                    onClick={toggleTimer}
                    type="button"
                    whileHover={{
                        scale: [1, 1.05, 1],
                        transition: {
                            duration: 2,
                            repeat: Infinity,
                        },
                    }}
                    className="text-gray-300 text-2xl border border-gray-300 hover:bg-gray-900  font-bold rounded-full px-7 py-2.5 me-2 mb-2 mt-5"
                >
                    {activeTimer ? "pause" : "start"}
                </motion.button>
            </div>
        </div>
    );
}

export default App;
