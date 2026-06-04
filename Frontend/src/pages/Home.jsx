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
      <div className="hero" style={{ padding: '80px 24px', minHeight: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(253, 230, 138, 0.08) 0%, rgba(0,0,0,0) 70%)', pointerEvents: 'none', zIndex: -1 }}></div>
        <div className="hero-badge" style={{ display: 'inline-block', marginBottom: '32px', padding: '6px 16px', borderRadius: '30px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', fontSize: '13px', fontWeight: '600', letterSpacing: '0.5px', color: 'var(--accent)' }}>
          Built for Anuragians by IgniteXT
        </div>
        <h1 className="hero-title" style={{ fontSize: 'clamp(44px, 7vw, 72px)', lineHeight: '1.1', fontWeight: '800', letterSpacing: '-1.5px', marginBottom: '28px' }}>
          Curious About Your Grades?<br/>
          <span className="gradient-text">Calculate Them Now.</span>
        </h1>
        <p className="hero-subtitle" style={{ maxWidth: '650px', margin: '0 auto 48px', fontSize: '19px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          Stop guessing and start planning. Track your CIE marks, predict your SEE requirements, and automatically calculate your SGPA based on the official Anurag University curriculum.
        </p>
        
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {user ? (
            <>
              <button className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '16px', fontWeight: '700', borderRadius: '12px', boxShadow: '0 8px 30px rgba(253, 230, 138, 0.3)' }} onClick={() => navigate('/calculator')}>
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
        
        <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', opacity: 0.5, animation: 'bounce 2s infinite' }}>
          <span style={{ fontSize: '24px' }}>↓</span>
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
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '18px', flexShrink: 0, boxShadow: '0 4px 12px rgba(253, 230, 138, 0.3)' }}>
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

      {/* About GPA Calculation */}
      <div style={{ marginBottom: '80px', padding: '0 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', background: 'linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.2) 100%)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '48px 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px' }}>How is SGPA Calculated?</h2>
            <p style={{ color: 'var(--text-secondary)' }}>The math behind your academic performance.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.8' }}>
            <p>
              Your Semester Grade Point Average (SGPA) is the weighted average of the grade points you earn in all registered courses during a semester. 
            </p>
            <div style={{ padding: '24px', background: 'rgba(250, 200, 0, 0.05)', borderRadius: '16px', border: '1px solid rgba(250, 200, 0, 0.2)', textAlign: 'center' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '18px', color: 'var(--accent)', fontWeight: 'bold' }}>
                SGPA = Σ (Course Credits × Grade Points) / Σ (Course Credits)
              </span>
            </div>
            <div style={{ overflowX: 'auto', marginTop: '8px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'center', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)' }}>
                    <th colSpan="2" style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Letter Grade</th>
                    <th style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Grade Points</th>
                    <th style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>% Marks secured Range</th>
                  </tr>
                </thead>
                <tbody style={{ color: 'var(--text-secondary)' }}>
                  {[
                    { grade: 'O', label: 'Outstanding', pts: 10, range: '≥90 to 100' },
                    { grade: 'A+', label: 'Excellent', pts: 9, range: '≥80 to <90' },
                    { grade: 'A', label: 'Very Good', pts: 8, range: '≥70 to <80' },
                    { grade: 'B+', label: 'Good', pts: 7, range: '≥60 to <70' },
                    { grade: 'B', label: 'Average', pts: 6, range: '≥50 to <60' },
                    { grade: 'C', label: 'Pass', pts: 5, range: '≥40 to <50' },
                    { grade: 'F', label: 'Fail', pts: 0, range: '<40' },
                    { grade: 'Ab', label: 'Absent', pts: 0, range: '-' },
                  ].map((row, idx) => (
                    <tr key={row.grade} style={{ borderBottom: idx !== 7 ? '1px solid rgba(255,255,255,0.03)' : 'none' }}>
                      <td style={{ padding: '10px 16px', fontWeight: 'bold', color: 'var(--text-primary)', borderRight: '1px solid rgba(255,255,255,0.03)' }}>{row.grade}</td>
                      <td style={{ padding: '10px 16px', borderRight: '1px solid rgba(255,255,255,0.03)' }}>{row.label}</td>
                      <td style={{ padding: '10px 16px', fontWeight: 'bold', borderRight: '1px solid rgba(255,255,255,0.03)' }}>{row.pts}</td>
                      <td style={{ padding: '10px 16px' }}>{row.range}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              Our calculator uses the official Anurag University curriculum to automatically map your subjects to their exact credit values, ensuring your predicted SGPA is 100% accurate.
            </p>
          </div>
        </div>
      </div>

      {/* IgniteXT Community */}
      <div style={{ marginBottom: '60px', padding: '0 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', background: 'rgba(250, 200, 0, 0.08)', border: '1px solid rgba(250, 200, 0, 0.2)', borderRadius: '24px', padding: '48px 32px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '16px', color: 'var(--text-primary)' }}>Join the IgniteXT Community 🚀</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px' }}>
            Connect with fellow Anuragians, get instant updates, collaborate on cool projects, and grow together.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a 
              href="https://chat.whatsapp.com/GKMymI4MPt7Cnkfs2rH1HF" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn"
              style={{ background: '#25D366', color: '#fff', padding: '14px 28px', borderRadius: '12px', fontWeight: '700', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 8px 24px rgba(37, 211, 102, 0.2)' }}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.299-.018-.461.13-.611.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Join WhatsApp Group
            </a>
            <a 
              href="https://ignitext2026.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ padding: '14px 28px', borderRadius: '12px', fontWeight: '700', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              Visit IgniteXT Website 🌐
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
