import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const features = [
  { icon: '🚀', title: 'Lightning Fast Calculations', desc: 'Instantly calculate your SGPA & CGPA without manual math. Built exclusively for the Anurag University 2025-26 curriculum.' },
  { icon: '🎯', title: 'Target Your Grades', desc: 'Input your CIE marks and instantly see exactly what you need in the SEE to hit your target grades.' },
  { icon: '📄', title: 'Professional PDF Reports', desc: 'Generate beautifully formatted, printable academic scorecards with a single click.' },
  { icon: '🔐', title: 'Secure Cloud Sync', desc: 'Log in with Google to securely back up your grade history forever. Access it from anywhere.' },
]

export default function Home() {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  return (
    <div className="container page-enter">
      {/* Hero */}
      <div className="hero" style={{ padding: '100px 24px 80px', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(144, 97, 249, 0.15) 0%, rgba(0,0,0,0) 70%)', pointerEvents: 'none', zIndex: -1 }}></div>
        <div className="hero-badge" style={{ display: 'inline-block', marginBottom: '24px', padding: '6px 16px', borderRadius: '30px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', fontSize: '12px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--accent)' }}>
          Built for Anuragians by IgniteXT
        </div>
        <h1 className="hero-title" style={{ fontSize: 'clamp(40px, 6vw, 64px)', lineHeight: '1.1', fontWeight: '800', letterSpacing: '-1.5px', marginBottom: '24px' }}>
          Curious About Your Grades?<br/>
          <span className="gradient-text">Calculate Them Now.</span>
        </h1>
        <p className="hero-subtitle" style={{ maxWidth: '650px', margin: '0 auto 40px', fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          Stop guessing and start planning. Track your CIE marks, predict your SEE requirements, and automatically calculate your SGPA based on the official Anurag University curriculum.
        </p>
        
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {user ? (
            <>
              <button className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '16px', fontWeight: '700', borderRadius: '12px', boxShadow: '0 8px 30px rgba(144, 97, 249, 0.4)' }} onClick={() => navigate('/calculator')}>
                Open Calculator →
              </button>
              <button className="btn btn-secondary" style={{ padding: '16px 32px', fontSize: '16px', fontWeight: '700', borderRadius: '12px' }} onClick={() => navigate('/records')}>
                View My History
              </button>
            </>
          ) : (
            <div style={{ padding: '16px 32px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)', fontSize: '15px' }}>
              <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>Ready to start?</span> Sign in with Google using the button in the top right.
            </div>
          )}
        </div>
      </div>

      {/* Features */}
      <div style={{ marginBottom: '100px', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>Everything You Need</h2>
          <p style={{ color: 'var(--text-secondary)' }}>A powerful toolset designed to take the stress out of academics.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px', maxWidth: '1000px', margin: '0 auto' }}>
          {features.map((f, i) => (
            <div key={i} className="card" style={{ animation: `fadeInUp 0.5s ease ${i * 0.1}s both`, background: 'transparent', padding: '16px', border: 'none', boxShadow: 'none' }}>
              <div style={{ fontSize: '36px', marginBottom: '20px', background: 'rgba(255,255,255,0.03)', width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '16px' }}>{f.icon}</div>
              <div style={{ fontWeight: '700', marginBottom: '12px', fontSize: '18px', color: 'var(--text-primary)' }}>{f.title}</div>
              <div style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* How it Works Step-by-Step */}
      <div style={{ marginBottom: '100px', padding: '0 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '48px 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px' }}>How It Works</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Three simple steps to grade clarity.</p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {[
              { num: '1', title: 'Select Your Branch', desc: 'Pick your engineering branch and current semester. The calculator instantly loads your exact curriculum subjects.' },
              { num: '2', title: 'Enter Your Marks', desc: 'Type in your mid-term and assignment marks. Watch as the system calculates your CIE total and tells you what you need in the SEE.' },
              { num: '3', title: 'Save & Download', desc: 'Hit save to permanently store your record in the cloud, and instantly download a professional PDF scorecard.' }
            ].map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '18px', flexShrink: 0, boxShadow: '0 4px 12px rgba(144, 97, 249, 0.3)' }}>
                  {step.num}
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '6px', color: 'var(--text-primary)' }}>{step.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grading Reference */}
      <div style={{ marginBottom: '80px', opacity: user ? 1 : 0.4, transition: 'opacity 0.3s' }}>
        <div className="section-header" style={{ textAlign: 'center' }}>
          <h2 className="section-title" style={{ fontFamily: 'var(--font-main)', fontWeight: 800 }}>Evaluation Matrix</h2>
          <p className="section-subtitle">Institutional 10-point absolute grading framework.</p>
        </div>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="grade-ref-grid">
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
              <div key={item.g} className="grade-ref-item" style={{ 
                border: `1px solid ${item.color}33`, 
                background: `linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.2) 100%)`,
                boxShadow: `0 8px 24px ${item.color}11`,
                borderRadius: '12px',
                padding: '24px 16px',
                transition: 'all 0.3s ease'
              }}>
                <div className="grade-ref-letter" style={{ color: item.color, fontSize: '28px', fontFamily: 'var(--font-main)', fontWeight: 900, textShadow: `0 0 16px ${item.color}44` }}>{item.g}</div>
                <div className="grade-ref-points" style={{ color: 'var(--text-primary)', fontWeight: '700', fontSize: '14px', marginTop: '8px' }}>
                  {item.pts} pts
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
