import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// 1. Import ThemeProvider
import { ThemeProvider } from './components/ThemeContext' 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. Bọc ThemeProvider ở đây thay vì trong App.jsx */}
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)