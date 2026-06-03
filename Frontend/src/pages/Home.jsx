import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { AuthContext } from '../context/AuthContext'
import { BRANCH_INFO } from '../utils'

const features = [
  { icon: '🏛️', title: 'Curriculum Intelligence', desc: 'Pre-configured with the exact Anurag University AY 2025-26 academic regulations.' },
  { icon: '⚖️', title: 'Absolute Grading', desc: 'Precision calculation using the official 10-point scale system.' },
  { icon: '🔒', title: 'Secure Persistence', desc: 'Your academic records are encrypted and securely linked to your account.' },
  { icon: '📈', title: 'Real-time Analytics', desc: 'Dynamic SGPA projection and classification as you input your data.' },
]

export default function Home() {
  const navigate = useNavigate()
  const { user, login } = useContext(AuthContext)

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

  return (
    <div className="container page-enter">
      {/* Hero */}
      <div className="hero" style={{ padding: '80px 24px 60px' }}>
        <div className="hero-badge">
          <span></span>
          Anurag University • AY 2025-26
        </div>
        <h1 className="hero-title">
          Calculate Your GPA <br/>
          <span className="gradient-text">Instantly</span>
        </h1>
        <p className="hero-subtitle">
          An advanced academic tracking suite engineered specifically for Anurag University students. Authenticate to secure your records and project your performance.
        </p>
        
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '40px' }}>
          {!user ? (
            <div style={{ padding: '4px', background: 'rgba(255,255,255,0.03)', borderRadius: '99px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <GoogleLogin
                onSuccess={handleSuccess}
                onError={() => console.error('Login Failed')}
                theme="filled_black"
                shape="pill"
                text="continue_with"
                size="large"
              />
            </div>
          ) : (
            <>
              <button className="btn btn-primary" onClick={() => navigate('/calculator')}>
                Launch Calculator
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/records')}>
                View Archive
              </button>
            </>
          )}
        </div>
      </div>

      {/* Features */}
      <div style={{ marginBottom: '80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {features.map((f, i) => (
            <div key={i} className="card" style={{ animation: `fadeInUp 0.5s ease ${i * 0.1}s both`, border: '1px solid rgba(255,255,255,0.04)', background: 'rgba(10,10,10,0.4)' }}>
              <div style={{ fontSize: '28px', marginBottom: '16px', opacity: 0.9 }}>{f.icon}</div>
              <div style={{ fontWeight: '600', marginBottom: '8px', fontSize: '16px', color: 'var(--text-primary)' }}>{f.title}</div>
              <div style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Branch Quick Select (Only show if logged in) */}
      {user && (
        <div style={{ marginBottom: '80px' }}>
          <div className="section-header" style={{ textAlign: 'center' }}>
            <h2 className="section-title" style={{ fontFamily: 'var(--font-main)', fontWeight: 800 }}>Academic Disciplines</h2>
            <p className="section-subtitle">Select your enrolled department to initialize the calculation suite.</p>
          </div>
          <div className="branch-grid">
            {Object.entries(BRANCH_INFO).map(([key, info]) => (
              <div
                key={key}
                className="branch-card"
                onClick={() => navigate(`/calculator?branch=${key}`)}
                id={`branch-${key}`}
                style={{ padding: '28px 20px' }}
              >
                <div className="branch-name" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{info.name}</div>
                <div className="branch-code" style={{ fontSize: '11px', letterSpacing: '1px', opacity: 0.7 }}>{info.short}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grading Reference */}
      <div style={{ marginBottom: '80px', opacity: user ? 1 : 0.4, transition: 'opacity 0.3s' }}>
        <div className="section-header" style={{ textAlign: 'center' }}>
          <h2 className="section-title" style={{ fontFamily: 'var(--font-main)', fontWeight: 800 }}>Evaluation Matrix</h2>
          <p className="section-subtitle">Institutional 10-point absolute grading framework.</p>
        </div>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="grade-ref-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '12px' }}>
            {[
              { g: 'O',  pts: 10, label: 'Outstanding', color: '#22c55e' },
              { g: 'A+', pts: 9,  label: 'Excellent',   color: 'var(--accent)' },
              { g: 'A',  pts: 8,  label: 'Very Good',   color: '#FDE68A' },
              { g: 'B+', pts: 7,  label: 'Good',        color: '#f97316' },
              { g: 'B',  pts: 6,  label: 'Above Avg',   color: '#ca8a04' },
              { g: 'C',  pts: 5,  label: 'Average',     color: '#71717a' },
              { g: 'P',  pts: 4,  label: 'Pass',        color: '#a1a1aa' },
              { g: 'F',  pts: 0,  label: 'Fail',        color: '#ef4444' },
            ].map(item => (
              <div key={item.g} className="grade-ref-item" style={{ border: '1px solid rgba(255,255,255,0.03)', background: 'rgba(255,255,255,0.01)' }}>
                <div className="grade-ref-letter" style={{ color: item.color, fontSize: '24px', fontFamily: 'var(--font-main)', fontWeight: 800 }}>{item.g}</div>
                <div className="grade-ref-points" style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '13px' }}>
                  {item.pts} pts
                </div>
                <div className="grade-ref-label" style={{ fontSize: '11px', opacity: 0.6 }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
