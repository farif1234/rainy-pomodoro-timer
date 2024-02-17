import React from "react";
import { motion, useAnimation } from "framer-motion";

const LightningEffect = () => {
    const controls = useAnimation();

    const flash = async () => {
        await controls.start({ opacity: 1 }); // Make the background color opaque (white) for the flash
        await controls.start({ opacity: 0, transition: { duration: 0.1 } }); // Fade back to transparent quickly
    };

    // Call the flash function randomly
    React.useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.5) {
                flash();
            }
        }, 5000); // Adjust the interval as needed
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            className="absolute inset-0 h-full w-28"
            style={{ backgroundColor: "white" }} // Start with transparent background color
            animate={controls}
        />
    );
};

export default LightningEffect;
