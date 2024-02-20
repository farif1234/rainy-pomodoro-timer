import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TIMES } from "../constants";
import bellSound from "../assets/fairybell.wav";

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

    const getPhaseTimerColor = (p) => {
        if (p % 2 == 0) return "bg-sky-300 ";
        if (p % 7 == 0) return "bg-fuchsia-300";
        return "bg-yellow-300";
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (timerStart) {
                if (time > 0) {
                    setTime(time - 1);
                    setActiveIdx((activeIdx + 1) % numDots);
                } else if (time === 0) {
                    // Timer done
                    setTimerStart(false);
                    setTime(TIMES[(phase + 1) % TIMES.length]);
                    setPhase(phase + 1);
                    clearInterval(interval);
                    setActiveIdx(-1);

                    const audio = new Audio(bellSound);

                    audio.play();
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
                        className="absolute "
                        style={{
                            transform: `rotate(${
                                angleIncrement * index
                            }deg) translate(0px, -56px)`,
                        }}
                    >
                        <div
                            className={`w-2 h-1 rounded-full duration-1000 ${getPhaseTimerColor(
                                phase
                            )}   ${
                                index <= activeIdx ? "scale-0" : "scale-100"
                            }`}
                        ></div>
                        <div
                            className={`w-2 h-1 rounded-full duration-1000 blur-md ${getPhaseTimerColor(
                                phase
                            )} ${index <= activeIdx ? "scale-0" : "scale-100"}`}
                        ></div>
                    </div>
                ))}

                <div className="absolute text-gray-100 text-6xl font-bold flex items-center justify-center  ">
                    {Math.floor(time / 60)}
                    <span className="text-sm text-gray-100 ml-1">min</span>
                </div>
            </div>
        </div>
    );
};

export default Timer;
