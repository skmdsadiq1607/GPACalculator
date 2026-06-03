import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import { useContext, useState, useRef, useEffect } from 'react'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { AuthContext } from './context/AuthContext'
import Home from './pages/Home'
import Calculator from './pages/Calculator'
import Records from './pages/Records'

export default function App() {
  const navigate = useNavigate()
  const { user, login, logout } = useContext(AuthContext)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef()

  const handleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential)
      login({
        userId: decoded.sub,
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
        token: credentialResponse.credential
      })
    } catch (err) {
      console.error('Login failed', err)
    }
  }

  const handleLogout = () => {
    googleLogout()
    logout()
    setMenuOpen(false)
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

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
          <div className="navbar-nav" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Home</NavLink>
            <NavLink to="/calculator" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Calculator</NavLink>
            <NavLink to="/records" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Records</NavLink>
            
            {user ? (
              <div style={{ position: 'relative' }} ref={menuRef}>
                <button 
                  onClick={() => setMenuOpen(!menuOpen)}
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '8px', 
                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                    padding: '4px 12px 4px 4px', borderRadius: '24px', cursor: 'pointer', color: 'white'
                  }}
                >
                  <img src={user.picture} alt={user.name} style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} />
                  <span style={{ fontSize: '14px', fontWeight: 500 }}>{user.name.split(' ')[0]}</span>
                </button>
                
                {menuOpen && (
                  <div style={{
                    position: 'absolute', top: 'calc(100% + 8px)', right: 0, width: '220px',
                    background: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', overflow: 'hidden', zIndex: 1000
                  }}>
                    <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)' }}>
                      <p style={{ margin: '0 0 4px 0', fontWeight: 600, fontSize: '14px' }}>{user.name}</p>
                      <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.email}</p>
                    </div>
                    <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                    <button 
                      onClick={() => { setMenuOpen(false); navigate('/records'); }}
                      style={{ width: '100%', textAlign: 'left', padding: '12px 16px', background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '14px', display: 'flex', gap: '8px' }}
                    >
                      📂 My Records
                    </button>
                    <button 
                      onClick={handleLogout}
                      style={{ width: '100%', textAlign: 'left', padding: '12px 16px', background: 'none', border: 'none', color: '#ff5b5b', cursor: 'pointer', fontSize: '14px', display: 'flex', gap: '8px' }}
                    >
                      🚪 Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ transform: 'scale(0.85)', transformOrigin: 'right' }}>
                <GoogleLogin
                  onSuccess={handleSuccess}
                  onError={() => console.error('Login Failed')}
                  theme="filled_black"
                  shape="pill"
                  text="signin_with"
                />
              </div>
            )}
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
