import { Routes, Route, NavLink } from 'react-router-dom'
import Home from './pages/Home'
import Calculator from './pages/Calculator'
import Records from './pages/Records'

export default function App() {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-inner">
          <NavLink to="/" className="navbar-logo" style={{ textDecoration: 'none' }}>
            <div className="logo-icon">⚡</div>
            <div className="logo-text">
              <span className="logo-brand">IgniteXT</span>
              <span className="logo-sub">GPA Calculator • AU 2025-26</span>
            </div>
          </NavLink>
          <div className="navbar-nav">
            <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Home</NavLink>
            <NavLink to="/calculator" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Calculator</NavLink>
            <NavLink to="/records" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Records</NavLink>
          </div>
        </div>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/calculator/:id" element={<Calculator />} />
          <Route path="/records" element={<Records />} />
        </Routes>
      </main>
    </div>
  )
}
