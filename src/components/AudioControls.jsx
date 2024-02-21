import React from "react";
import { motion } from "framer-motion";

const AudioControls = ({
    handleVolumeChange,
    togglePlayback,
    isPlaying,
    hoverColor,
}) => {
    return (
        <div className="flex mt-3 relative items-center justify-center w-full">
            <button
                onClick={() => handleVolumeChange(-0.1)}
                className={`text-2xl text-gray-200  rounded-full w-8 h-8 font-serif border-gray-300 active:scale-75 active:border-gray-700 border-[1px] duration-300 flex justify-center ${hoverColor} items-center ${
                    isPlaying ? "opacity-100 scale-100" : "opacity-0 scale-0"
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
                className={`text-gray-200 text-md border border-gray-300 ${hoverColor}  font-bold rounded-full p-3 mx-3 duration-150 w-1/3 backdrop-blur-md`}
            >
                rain sound {isPlaying ? "off" : "on"}
            </motion.button>
            <button
                onClick={() => handleVolumeChange(0.1)}
                className={`text-2xl text-gray-200  rounded-full w-8 h-8 font-serif border-gray-300 active:scale-75 active:border-gray-700 border-[1px] duration-300 flex justify-center ${hoverColor}  items-center ${
                    isPlaying ? "opacity-100 scale-100" : "opacity-0 scale-0"
                }`}
            >
                +
            </button>
        </div>
    );
};

export default AudioControls;
