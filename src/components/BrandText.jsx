import React from "react";

const WaterText = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="relative">
        {/* First water text with stroke effect */}
        <h2 className="absolute text-transparent text-lg transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2" 
            style={{ WebkitTextStroke: "2px #03a9f4" }}>
          water
        </h2>

        {/* Second water text with animation */}
        <h2 className="absolute text-blue-500 text-lg transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 animate-clip">
          water
        </h2>
      </div>
    </div>
  );
};

export default WaterText;
