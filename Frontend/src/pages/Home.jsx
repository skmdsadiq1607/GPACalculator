import { useNavigate } from 'react-router-dom'
import { BRANCH_INFO } from '../utils'

const features = [
  { icon: '📚', title: 'Pre-loaded Curriculum', desc: 'All 10 branches from Anurag University AY 2025-26 loaded automatically.' },
  { icon: '🔢', title: '10-Point Grading', desc: 'Follows AU\'s official grading scale: O, A+, A, B+, B, C, F.' },
  { icon: '💾', title: 'Save & Load', desc: 'Save your GPA records to MongoDB and access them anytime.' },
  { icon: '📊', title: 'SGPA Tracking', desc: 'Track semester-wise GPA with live calculation as you enter grades.' },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="container page-enter">
      {/* Hero */}
      <div className="hero">
        <div className="hero-badge">
          <span></span>
          Anurag University • AY 2025-26 Academic Regulations
        </div>
        <h1 className="hero-title">
          Calculate Your <br/>
          <span className="gradient-text">GPA Instantly</span>
        </h1>
        <p className="hero-subtitle">
          A smart GPA calculator tailored for Anurag University B.Tech students.
          Select your branch, enter grades, get your SGPA in seconds.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={() => navigate('/calculator')}>
            🚀 Start Calculating
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/records')}>
            📋 View Saved Records
          </button>
        </div>
      </div>

      {/* Features */}
      <div style={{ marginBottom: '60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {features.map((f, i) => (
            <div key={i} className="card" style={{ animation: `fadeInUp 0.5s ease ${i * 0.1}s both` }}>
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>{f.icon}</div>
              <div style={{ fontWeight: '700', marginBottom: '6px', fontSize: '15px' }}>{f.title}</div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Branch Quick Select */}
      <div style={{ marginBottom: '80px' }}>
        <div className="section-header" style={{ textAlign: 'center' }}>
          <h2 className="section-title">Select Your Branch</h2>
          <p className="section-subtitle">Click your branch to jump straight into the calculator</p>
        </div>
        <div className="branch-grid">
          {Object.entries(BRANCH_INFO).map(([key, info]) => (
            <div
              key={key}
              className="branch-card"
              onClick={() => navigate(`/calculator?branch=${key}`)}
              id={`branch-${key}`}
            >
              <span className="branch-emoji">{info.emoji}</span>
              <div className="branch-name">{info.name}</div>
              <div className="branch-code">{info.short}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Grading Reference */}
      <div style={{ marginBottom: '80px' }}>
        <div className="section-header" style={{ textAlign: 'center' }}>
          <h2 className="section-title">Grading Scale</h2>
          <p className="section-subtitle">Anurag University 10-point absolute grading system</p>
        </div>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div className="grade-ref-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {[
              { g: 'O',  pts: 10, label: '≥90%',   color: '#22c55e' },
              { g: 'A+', pts: 9,  label: '≥80%',   color: 'var(--accent)' },
              { g: 'A',  pts: 8,  label: '≥70%',   color: '#FDE68A' },
              { g: 'B+', pts: 7,  label: '≥60%',   color: '#f97316' },
              { g: 'B',  pts: 6,  label: '≥50%',   color: '#ca8a04' },
              { g: 'C',  pts: 5,  label: '≥40%',   color: '#71717a' },
              { g: 'F',  pts: 0,  label: '<40%',   color: '#ef4444' },
              { g: 'Ab', pts: 0,  label: 'Absent', color: '#52525b' },
            ].map(item => (
              <div key={item.g} className="grade-ref-item">
                <div className="grade-ref-letter" style={{ color: item.color }}>{item.g}</div>
                <div className="grade-ref-points" style={{ color: 'var(--text-primary)', fontWeight: '700' }}>
                  {item.pts} pts
                </div>
                <div className="grade-ref-label">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="card" style={{ marginTop: '20px', background: 'rgba(250,200,0,0.05)', borderColor: 'var(--accent-border)' }}>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', textAlign: 'center' }}>
              <strong style={{ color: 'var(--accent)' }}>SGPA Formula:</strong>{' '}
              Σ(Course Credits × Grade Points) ÷ Σ(Course Credits) &nbsp;|&nbsp;
              <strong style={{ color: 'var(--accent)' }}>Percentage:</strong>{' '}
              (CGPA − 0.5) × 10
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
