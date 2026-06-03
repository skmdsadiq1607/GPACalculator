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
            <div className="logo-text" style={{ flexDirection: 'column', alignItems: 'center' }}>
              <span className="logo-brand" style={{ fontFamily: 'var(--font-main)', fontWeight: 800, fontSize: '20px', letterSpacing: '-0.5px', lineHeight: '1.2' }}>
                <span style={{ color: '#ffffff' }}>Ignite</span>
                <span style={{ color: 'var(--accent)' }}>XT</span>
              </span>
              <span className="logo-sub" style={{ fontSize: '10px', color: 'var(--text-secondary)', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600 }}>GPA Calculator</span>
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
          <Route path="/calculator" element={<ProtectedRoute><Calculator /></ProtectedRoute>} />
          <Route path="/calculator/:id" element={<ProtectedRoute><Calculator /></ProtectedRoute>} />
          <Route path="/records" element={<ProtectedRoute><Records /></ProtectedRoute>} />
        </Routes>
      </main>

      <footer style={{ 
        padding: '32px 20px', 
        textAlign: 'center', 
        borderTop: '1px solid rgba(255,255,255,0.05)',
        marginTop: 'auto',
        fontFamily: 'var(--font-main)'
      }}>
        <div style={{ fontSize: '11px', color: 'var(--text-secondary)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px', fontWeight: 600 }}>
          © 2026 IGNITEXT STUDENT COMMUNITY. ALL RIGHTS RESERVED.
        </div>
        <div style={{ fontSize: '14px', color: '#ffffff', marginBottom: '12px' }}>
          Made with ❤️ by <span style={{ color: 'var(--accent)', fontWeight: 600 }}>IgniteXT Technical Team</span>
        </div>
        <div style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 600, display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <span style={{ color: 'var(--accent)' }}>Sadiq</span> | 
          <span style={{ color: 'var(--accent)' }}>Mrudhula</span> | 
          <span style={{ color: 'var(--accent)' }}>Santhoshini</span> | 
          <span style={{ color: 'var(--accent)' }}>Rohit</span> | 
          <span style={{ color: 'var(--accent)' }}>Tehnaaz</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <a href="https://github.com/skmdsadiq1607/GPACalculator.git" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
          <a href="mailto:ignitext@gmail.com" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M2 5.5a2.5 2.5 0 0 1 2.5-2.5h15A2.5 2.5 0 0 1 22 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 18.5v-13zM4.5 5a.5.5 0 0 0-.5.5v.726l7.53 4.96a.998.998 0 0 0 1.036-.091L20 6.226V5.5a.5.5 0 0 0-.5-.5h-15zm15.5 2.525-7.43 4.908a3 3 0 0 1-3.136.275L4 7.747V18.5a.5.5 0 0 0 .5.5h15a.5.5 0 0 0 .5-.5V7.525z"/></svg>
          </a>
        </div>
      </footer>
    </div>
  )
}
