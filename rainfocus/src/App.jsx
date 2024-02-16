import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { motion } from "framer-motion";
import RainDrop from "./components/RainDrop";

function App() {
    const [count, setCount] = useState(0);

    return (
        // <div className="flex justify-center items-center h-screen bg-stone-800">
        //     <div className="p-4">
        //         {/* Your content goes here */}
        //         <h1 className="text-3xl text-zinc-200">Centered Content</h1>
        //     </div>
        // </div>

        <div className="relative h-screen bg-gradient-to-t from-gray-950 from-80% to-gray-700 overflow-hidden">
            {/* Create multiple motion.div components to represent raindrops */}
            {[...Array(100)].map((_, index) => (
                <RainDrop index={index} />
                // <motion.div
                //     key={index}
                //     className="absolute bg-gray-600 h-5 w-0.5 rounded-full"
                //     style={{
                //         left: `${Math.random() * 100}%`, // Randomize horizontal position
                //         top: `${Math.random() * -100}%`, // Start raindrop above the viewport
                //         opacity: Math.random() + 0.3,
                //     }}
                //     animate={{ top: "100vh" }} // Animate raindrop to fall to the bottom of the screen
                //     transition={{
                //         duration: 0.6,
                //         ease: "linear",
                //         repeat: Infinity,
                //         delay: Math.random(),
                //     }} // Add randomness to duration for staggered effect
                // ></motion.div>
            ))}

            <div className="absolute inset-0 flex flex-col justify-center items-center font-cormorant ">
                <h1 className="text-6xl text-gray-300  ">nimbus</h1>
                <h3 className="text-lg text-gray-400">pomodoro timer</h3>
            </div>
        </div>
    );
}

export default App;
