

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
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <AppRoutes />
  );
}

export default App;
