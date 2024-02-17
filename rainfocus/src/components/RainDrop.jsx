import React from "react";
import { motion } from "framer-motion";

const RainDrop = ({ index }) => {
    return (
        <motion.div
            key={index}
            className="absolute bg-gray-600 h-5 w-0.5 rounded-full"
            style={{
                left: `${Math.random() * 100}%`, // Randomize horizontal position
                top: `${Math.random() * -100}%`, // Start raindrop above the viewport
                opacity: Math.random() + 0.3,
            }}
            animate={{ top: "100vh" }} // Animate raindrop to fall to the bottom of the screen
            transition={{
                duration: 0.65,
                ease: "linear",
                repeat: Infinity,
                delay: Math.random(),
            }} // Add randomness to duration for staggered effect
        ></motion.div>
    );
};

export default RainDrop;
