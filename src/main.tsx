import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.js'
import "./styles/index.css"

const container = document.getElementById('root');

if (!container) {
  throw new Error("Elemen root tidak ditemukan. Pastikan <div id='root'> ada di index.html");
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
