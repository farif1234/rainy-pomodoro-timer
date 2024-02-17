import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const WORK_TIME = 1500;
const SHORT_BREAK_TIME = 300;

function displaySeconds(time) {
    var seconds = `0${time % 60}`;
    var minutes = `0${Math.floor(time / 60)}`;

    return `${minutes.slice(-2)}:${seconds.slice(-2)}`;
}

const Timer = ({ time, setTime, timerStart, setTimerStart }) => {
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
                    clearInterval(interval);
                }
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [timerStart, time]);

    return (
        <div className="h-56 w-56 relative my-3">
            <div className="flex justify-center items-center h-full w-full">
                {Array.from({ length: numDots }).map((_, index) => (
                    <div
                        key={index}
                        className="absolute"
                        style={{
                            transform: `rotate(${
                                angleIncrement * index
                            }deg) translate(60px)`,
                        }}
                    >
                        <div
                            className={`w-1 h-1 rounded-full duration-200 ${
                                index == activeIdx
                                    ? "bg-gray-100 scale-150 shadow-2xl shadow-white"
                                    : "bg-gray-600"
                            }`}
                        ></div>
                    </div>
                ))}
                <motion.circle
                    cx={20} // Adjust the center x-coordinate as needed
                    r={1} // Set the radius of the additional circle
                    fill="blue" // Customize the color
                    animate={{ cx: [null, 100] }} // Smoothly transition the x-coordinate
                />
                <div className="absolute text-white text-6xl font-bold">
                    {Math.floor(time / 60)}
                    {/* {displaySeconds(time)} */}
                </div>
            </div>
        </div>
    );
};

export default Timer;
