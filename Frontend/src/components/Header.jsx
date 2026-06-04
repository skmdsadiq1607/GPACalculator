import { useContext, useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useGoogleLogin, googleLogout } from '@react-oauth/google'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import './Header.css'

export default function Header({ onOpenRecords }) {
  const { user, login, logout } = useContext(AuthContext)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const menuRef = useRef()

  const googleSignIn = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setIsLoading(true)
        const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        
        login({
          userId: userInfo.data.sub,
          email: userInfo.data.email,
          name: userInfo.data.name,
          picture: userInfo.data.picture,
          token: tokenResponse.access_token
        })
      } catch (err) {
        console.error('Login failed', err)
      } finally {
        setIsLoading(false)
      }
    },
    onError: () => console.error('Login Failed')
  })

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
            <button 
              onClick={() => googleSignIn()} 
              disabled={isLoading}
              className="custom-google-btn"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {isLoading ? 'Signing in...' : 'Sign in with Google'}
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
