import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TIMES } from "../constants";

const WORK_TIME = 1500;
const SHORT_BREAK_TIME = 300;

function displaySeconds(time) {
    var seconds = `0${time % 60}`;
    var minutes = `0${Math.floor(time / 60)}`;

    return `${minutes.slice(-2)}:${seconds.slice(-2)}`;
}

const Timer = ({
    time,
    setTime,
    timerStart,
    setTimerStart,
    phase,
    setPhase,
}) => {
    const numDots = 60;
    const angleIncrement = 360 / numDots;

    const [activeIdx, setActiveIdx] = useState(-1);

    useEffect(() => {
        const interval = setInterval(() => {
            if (timerStart) {
                if (time > 0) {
                    setTime(time - 1);
                    setActiveIdx((activeIdx + 1) % numDots);
                } else if (time === 0) {
                    // TODO: Send notification to user.
                    setTimerStart(false);
                    setTime(TIMES[(phase + 1) % TIMES.length]);
                    setPhase(phase + 1);
                    clearInterval(interval);
                    setActiveIdx(-1);
                }
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [timerStart, time]);

    return (
        <div className="h-48 w-56 relative  ">
            <div className="flex justify-center items-center h-full w-full">
                {Array.from({ length: numDots }).map((_, index) => (
                    <div
                        key={index}
                        className="absolute"
                        style={{
                            transform: `rotate(${
                                angleIncrement * index
                            }deg) translate(0px, -56px)`,
                        }}
                    >
                        <div
                            className={`w-2 h-1 rounded-full duration-1000  ${
                                index <= activeIdx
                                    ? "bg-gray-100 scale-0"
                                    : "bg-gray-100 scale-100"
                            }`}
                        ></div>
                    </div>
                ))}

                <div className="absolute text-gray-100 text-6xl font-bold flex items-center justify-center ">
                    {Math.floor(time / 60)}
                    <span className="text-sm text-gray-400 ml-1">min</span>
                    {/* {displaySeconds(time)} */}
                </div>

                {/* {time % 60 == 59 && activeIdx >= 0 && (
                    <motion.div
                        initial={{ opacity: 0.3, scale: 1 }}
                        animate={{ opacity: 0, scale: 1.4 }}
                        transition={{
                            duration: 1,
                            type: "tween",
                            ease: "easeIn",
                            delay: 0,
                        }}
                        className="absolute w-32 h-32 rounded-full border-4 border-gray-100"
                    ></motion.div>
                )} */}
            </div>
        </div>
    );
};

export default Timer;
