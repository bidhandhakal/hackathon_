import React from "react";

const Hero = () => {
  return (
    <div className="align-center flex justify-center items-center bg-[#ffffff] p-0 md:p-8">
      <div className="max-w-6xl w-full">
        <img 
          src="/heroimage.jpg" 
          alt="Professional woman working on laptop"
          className="w-[110%] h-auto max-h-[400px] md:max-h-[500px] scale-120 md:scale-100 md:w-full rounded-none md:rounded-3xl object-cover"
        />
      </div>
    </div>
  );
};

export default Hero;
