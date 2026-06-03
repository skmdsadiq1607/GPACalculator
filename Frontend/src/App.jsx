import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import { useContext, useState, useRef, useEffect } from 'react'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { AuthContext } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
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
      <nav className="navbar" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(32px)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="navbar-inner">
          <NavLink to="/" className="navbar-logo" style={{ textDecoration: 'none' }}>
            <div className="logo-text" style={{ flexDirection: 'row', alignItems: 'baseline', gap: '8px' }}>
              <span className="logo-brand" style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '24px', letterSpacing: '-0.5px' }}>IgniteXT</span>
              <span className="logo-sub" style={{ fontSize: '10px', color: 'var(--text-secondary)', letterSpacing: '2px' }}>INSTITUTE</span>
            </div>
          </NavLink>
          <div className="navbar-nav" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            {user && (
              <>
                <NavLink to="/calculator" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Calculator</NavLink>
                <NavLink to="/records" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Records</NavLink>
              </>
            )}
            
            {user ? (
              <div style={{ position: 'relative', marginLeft: '8px' }} ref={menuRef}>
                <button 
                  onClick={() => setMenuOpen(!menuOpen)}
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '10px', 
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                    padding: '4px 14px 4px 4px', borderRadius: '32px', cursor: 'pointer', color: 'white',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <img src={user.picture} alt={user.name} style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }} />
                  <span style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.2px' }}>{user.name.split(' ')[0]}</span>
                </button>
                
                {menuOpen && (
                  <div style={{
                    position: 'absolute', top: 'calc(100% + 12px)', right: 0, width: '240px',
                    background: 'var(--bg-secondary)', border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.8)', overflow: 'hidden', zIndex: 1000
                  }}>
                    <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)' }}>
                      <p style={{ margin: '0 0 4px 0', fontWeight: 600, fontSize: '14px', letterSpacing: '0.2px' }}>{user.name}</p>
                      <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.email}</p>
                    </div>
                    <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)' }}></div>
                    <button 
                      onClick={() => { setMenuOpen(false); navigate('/records'); }}
                      style={{ width: '100%', textAlign: 'left', padding: '14px 20px', background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', fontSize: '13px', fontWeight: 500, display: 'flex', gap: '10px', transition: 'background 0.2s' }}
                      onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.04)'}
                      onMouseOut={(e) => e.target.style.background = 'none'}
                    >
                      My Records
                    </button>
                    <button 
                      onClick={handleLogout}
                      style={{ width: '100%', textAlign: 'left', padding: '14px 20px', background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', fontSize: '13px', fontWeight: 500, display: 'flex', gap: '10px', transition: 'background 0.2s' }}
                      onMouseOver={(e) => e.target.style.background = 'rgba(248,113,113,0.1)'}
                      onMouseOut={(e) => e.target.style.background = 'none'}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculator" element={<ProtectedRoute><Calculator /></ProtectedRoute>} />
          <Route path="/calculator/:id" element={<ProtectedRoute><Calculator /></ProtectedRoute>} />
          <Route path="/records" element={<ProtectedRoute><Records /></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  )
}
