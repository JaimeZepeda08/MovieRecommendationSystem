import Reveal from "@/components/Reveal";
import Spring from "@/components/Spring";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

const Home: React.FC = () => {
  const title = "Fakeflix";
  const titleArray = title.split("");

  return (
    <div className="flex justify-center text-white mt-64">
      <div className="text-center">
        <div className="relative mb-64">
          <div className="absolute inset-0 flex justify-center items-center">
            <h1 className="text-8xl font-bold text-yellow-600 curved-title">
              {titleArray.map((letter, index) => (
                <Spring delay={0.1 * index}>
                  <div key={index} className={`letter-${index}`}>
                    {letter}
                  </div>
                </Spring>
              ))}
            </h1>
          </div>
        </div>
        <Reveal horizontal={true} delay={1.5}>
          <div className="flex justify-center text-lg">
            <a
              href="/genres"
              className="group p-4 flex items-center space-x-2 text-gray-400 hover:underline hover:text-yellow-300/60 transition-colors duration-200"
            >
              <h1>Get Started</h1>
              <FaArrowRightLong
                size={20}
                className="transform transition-transform duration-200 group-hover:translate-x-4"
              />
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default Home;
