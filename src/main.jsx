import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MainPanel from "./pages/MainPanel/index.jsx";

// 引入Web3
// import './web3.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainPanel />
  </StrictMode>,
)
