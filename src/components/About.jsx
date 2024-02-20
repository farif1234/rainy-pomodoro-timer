import React from "react";

const About = ({ showAbout, toggleAbout }) => {
    return (
        <div
            className={`w-full h-full p-8 absolute bg-transparent backdrop-blur-md backdrop-brightness-[0.6] ${
                showAbout ? "scale-110" : "scale-0"
            }  flex flex-col duration-500 text-gray-100 rounded-xl text-sm md:text-lg`}
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
            <p className=" mt-8 text ">
                the pomodoro technique was designed to enhance productivity by
                breaking down work sessions into intervals.
            </p>
            <p className=" mt-8 text ">
                every work session is 25 minutes, followed by a 5 minute short
                break. after 4 work sessions, you are rewarded with a long break
                of 15 minutes.
            </p>
            <p className=" mt-8 text ">
                this app features automatic session switching, calming rain
                ambience, and a gentle notification bell.
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
    );
};

export default About;
