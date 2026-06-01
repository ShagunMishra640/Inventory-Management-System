import React from "react";

export default function StockCard({
  title,
  value,
  icon,
  color = "blue",
}) {
  const colors = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    red: "from-red-500 to-red-600",
    yellow: "from-yellow-500 to-orange-500",
    purple: "from-purple-500 to-purple-600",
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
      <div className="flex items-center justify-between">
        
        {/* Left Side */}
        <div>
          <p className="text-gray-500 text-sm font-medium">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            {value}
          </h2>
        </div>

        {/* Right Side Icon */}
        <div
          className={`w-14 h-14 rounded-xl bg-gradient-to-r ${
            colors[color]
          } flex items-center justify-center text-white text-2xl shadow-md`}
        >
          {icon}
        </div>
      </div>

      {/* Progress Line */}
      <div className="mt-5">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`bg-gradient-to-r ${
              colors[color]
            } h-2 rounded-full w-3/4`}
          ></div>
        </div>
      </div>
    </div>
  );
}