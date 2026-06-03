import { useContext, useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { AuthContext } from '../context/AuthContext'
import './Header.css'

export default function Header({ onOpenRecords }) {
  const { user, login, logout } = useContext(AuthContext)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef()

  const handleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential)
      
      // Optionally verify with backend, but for now we trust the decoded JWT
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

  // Close menu when clicking outside
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
    <header className="app-header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          <span className="logo-icon">🎓</span>
          <span className="logo-text">AU GPA Calculator</span>
        </Link>
        
        <div className="header-actions">
          {user ? (
            <div className="user-menu-container" ref={menuRef}>
              <button 
                className="user-profile-btn" 
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <img src={user.picture} alt={user.name} className="user-avatar" />
                <span className="user-name">{user.name.split(' ')[0]}</span>
              </button>
              
              {menuOpen && (
                <div className="user-dropdown">
                  <div className="user-info">
                    <p className="user-full-name">{user.name}</p>
                    <p className="user-email">{user.email}</p>
                  </div>
                  <div className="dropdown-divider"></div>
                  <button 
                    className="dropdown-item" 
                    onClick={() => { setMenuOpen(false); onOpenRecords(); }}
                  >
                    📂 My Records
                  </button>
                  <button className="dropdown-item text-danger" onClick={handleLogout}>
                    🚪 Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="google-login-wrap">
              <GoogleLogin
                onSuccess={handleSuccess}
                onError={() => console.error('Login Failed')}
                theme="filled_black"
                shape="pill"
                text="signin_with"
                size="medium"
              />
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
