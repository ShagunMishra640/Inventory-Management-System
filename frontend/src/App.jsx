

import Register from "./pages/auth/Register";

function App() {
  return (
    <>
      <Register />
    </>
  );
}

export default App;

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
function App() {
  return (
    <div className="bg-black h-screen flex items-center justify-center">
      <h1 className="text-white text-5xl font-bold">
        Tailwind Working
      </h1>
    </div>
  )
}

export default App