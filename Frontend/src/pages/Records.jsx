import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { getRecords, getUserRecords, deleteRecord } from '../api'
import { getClassification, cgpaToPercentage, BRANCH_INFO } from '../utils'
import { AuthContext } from '../context/AuthContext'

export default function Records() {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(null)
  const [toast, setToast] = useState(null)
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  const loadRecords = () => {
    const fetchFunc = user ? () => getUserRecords(user.userId) : getRecords
    fetchFunc()
      .then(res => {
        setRecords(res.data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
        showToast('Server not connected', 'error')
      })
  }

  useEffect(() => {
    loadRecords()
  }, [user])

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleDelete = async (id, e) => {
    e.stopPropagation()
    if (!window.confirm('Delete this record? This cannot be undone.')) return
    setDeleting(id)
    try {
      await deleteRecord(id)
      setRecords(prev => prev.filter(r => r._id !== id))
      showToast('Record deleted', 'success')
    } catch {
      showToast('Failed to delete record', 'error')
    } finally {
      setDeleting(null)
    }
  }

  const formatDate = (dateStr) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  return (
    <div className="container page-enter" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="section-title" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>Academic Archive</h1>
          <p className="section-subtitle">
            {records.length} stored record{records.length !== 1 ? 's' : ''} retrieved
          </p>
        </div>
        <button className="btn btn-primary" id="new-calculation-btn" onClick={() => navigate('/calculator')}>
          Initialize New Calculation
        </button>
      </div>

      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          {[1, 2, 3].map(i => (
            <div key={i} className="card" style={{ height: '180px' }}>
              <div className="skeleton" style={{ height: '18px', width: '60%', marginBottom: '8px' }}></div>
              <div className="skeleton" style={{ height: '14px', width: '40%', marginBottom: '24px' }}></div>
              <div className="skeleton" style={{ height: '48px', width: '80px' }}></div>
            </div>
          ))}
        </div>
      ) : records.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon" style={{ opacity: 0.5 }}>🗄️</div>
          <div className="empty-state-title" style={{ fontFamily: 'var(--font-display)', fontSize: '24px' }}>Archive Empty</div>
          <p style={{ marginBottom: '24px', fontSize: '14px', maxWidth: '400px', margin: '0 auto 24px' }}>
            There are no academic records associated with your account. Initialize a calculation to securely store your data here.
          </p>
          <button className="btn btn-primary" onClick={() => navigate('/calculator')}>
            Launch Calculation Suite
          </button>
        </div>
      ) : (
        <div className="records-grid">
          {records.map((record) => {
            const classification = getClassification(record.cgpa)
            const percentage = cgpaToPercentage(record.cgpa)
            const branchInfo = BRANCH_INFO[record.branch]

            return (
              <div
                key={record._id}
                className="record-card"
                onClick={() => navigate(`/calculator/${record._id}`)}
                id={`record-${record._id}`}
              >
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <div className="record-name">{record.studentName}</div>
                    <div className="record-branch">
                      {branchInfo?.emoji} {record.branchName}
                      {record.rollNumber && ` • ${record.rollNumber}`}
                    </div>
                  </div>
                  <button
                    className="btn btn-danger"
                    style={{ padding: '6px 10px', fontSize: '12px' }}
                    onClick={(e) => handleDelete(record._id, e)}
                    disabled={deleting === record._id}
                    id={`delete-${record._id}`}
                  >
                    {deleting === record._id ? '⏳' : '🗑️'}
                  </button>
                </div>

                <div className="divider" style={{ margin: '12px 0' }}></div>

                {/* GPA Display */}
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px' }}>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>CGPA</div>
                    <div className="record-cgpa">{record.cgpa.toFixed(2)}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    {classification && (
                      <div className={`class-badge ${classification.className}`} style={{ margin: '0 0 8px', fontSize: '12px', padding: '6px' }}>
                        {classification.label}
                      </div>
                    )}
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>≈ {percentage}%</div>
                  </div>
                </div>

                {/* Semester SGPAs */}
                {record.semesters && record.semesters.length > 0 && (
                  <>
                    <div className="divider" style={{ margin: '12px 0' }}></div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {record.semesters.map((sem, i) => (
                        <div key={i} style={{ padding: '4px 10px', borderRadius: '20px', background: 'rgba(250,200,0,0.1)', border: '1px solid var(--accent-border)', fontSize: '12px' }}>
                          <span style={{ color: 'var(--text-muted)' }}>{sem.semesterName}: </span>
                          <span style={{ fontWeight: '700', color: 'var(--accent)' }}>{sem.sgpa?.toFixed(2) || '—'}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                <div style={{ marginTop: '12px', fontSize: '11px', color: 'var(--text-muted)' }}>
                  Last updated: {formatDate(record.updatedAt || record.createdAt)}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {toast && (
        <div className={`toast toast-${toast.type}`}>
          {toast.type === 'success' ? '✅' : '❌'} {toast.message}
        </div>
      )}
    </div>
  )
}
