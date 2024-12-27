import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MainPanel from "./pages/MainPanel/index.jsx";
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import ElectionList from "./pages/MainPanel/Election/ElectionList.jsx";
import ElectionDetail from "./pages/MainPanel/Election/ElectionDetail.jsx";

// 引入Web3
// import './web3.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <HashRouter>
          <Routes>
              <Route index element={<Navigate to="/main" replace />} />
              <Route path="/main" element={<MainPanel />} >
                  <Route index element={<Navigate to="list" replace />} />
                  <Route path="list" element={<ElectionList />}/>
                  <Route path="detail/:id" element={<ElectionDetail />} />
              </Route>
          </Routes>
      </HashRouter>
  </StrictMode>
)
