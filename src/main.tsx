import React from 'react'
import ReactDOM from 'react-dom/client'
// ❌ BrowserRouter raus
// import { BrowserRouter } from 'react-router-dom'
// ✅ HashRouter rein
import { HashRouter } from 'react-router-dom'
import App from './App'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* ❌ <BrowserRouter> … </BrowserRouter> */}
    {/* ✅ HashRouter vermeidet 404 auf GitHub Pages */}
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
)
