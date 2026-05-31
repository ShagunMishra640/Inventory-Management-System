import React from "react";

export default function Unauthorized() {
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-2xl text-red-600 font-bold">
        ❌ You are not allowed to access this page
      </h1>
    </div>
  );
}