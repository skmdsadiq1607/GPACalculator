import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import { useContext, useState, useRef, useEffect } from 'react'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { AuthContext } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Calculator from './pages/Calculator'
import Records from './pages/Records'
import { logUserSignIn } from './api'

export default function App() {
  const navigate = useNavigate()
  const { user, login, logout } = useContext(AuthContext)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef()

  const handleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential)
      
      const userData = {
        userId: decoded.sub,
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
        token: credentialResponse.credential
      }
      
      login(userData)

      // Fire and forget to log the user in backend
      logUserSignIn(userData).catch(err => {
        console.error('Failed to log sign in:', err);
        if (err.response && err.response.data) {
          console.error('Backend error details:', err.response.data);
        }
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
              <span className="logo-sub hide-on-mobile" style={{ fontSize: '10px', color: 'var(--text-secondary)', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600 }}>GPA Calculator</span>
            </div>
          </NavLink>
          <div className="navbar-nav">
            {user && (
              <>
                <NavLink to="/calculator" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} style={{ padding: '6px 12px', fontSize: '13px' }}>Calculator</NavLink>
                <NavLink to="/records" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} style={{ padding: '6px 12px', fontSize: '13px' }}>Records</NavLink>
              </>
            )}
            
            {user ? (
              <div style={{ position: 'relative', marginLeft: '4px' }} ref={menuRef}>
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
                  <span className="hide-on-mobile" style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.2px' }}>{user.name.split(' ')[0]}</span>
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
              <div style={{ transform: 'scale(0.85)', transformOrigin: 'right', borderRadius: '20px', overflow: 'hidden', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', colorScheme: 'light' }}>
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
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '16px' }}>
          <a href="https://github.com/skmdsadiq1607" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
          <a href="https://www.linkedin.com/company/ignitext/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a href="https://www.instagram.com/ignite.xt/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.98a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/></svg>
          </a>
          <a href="mailto:ignitext@gmail.com" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M2 5.5a2.5 2.5 0 0 1 2.5-2.5h15A2.5 2.5 0 0 1 22 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 18.5v-13zM4.5 5a.5.5 0 0 0-.5.5v.726l7.53 4.96a.998.998 0 0 0 1.036-.091L20 6.226V5.5a.5.5 0 0 0-.5-.5h-15zm15.5 2.525-7.43 4.908a3 3 0 0 1-3.136.275L4 7.747V18.5a.5.5 0 0 0 .5.5h15a.5.5 0 0 0 .5-.5V7.525z"/></svg>
          </a>
        </div>
      </footer>
    </div>
  )
}
