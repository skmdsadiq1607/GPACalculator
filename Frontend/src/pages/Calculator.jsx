import React, { useState, useEffect, useCallback, Fragment } from 'react'
import { useSearchParams, useParams, useNavigate } from 'react-router-dom'
import { saveRecord, getRecord, updateRecord, getLikes, addLike } from '../api'
import { calculateSGPA, calculateCGPA, getClassification, cgpaToPercentage, BRANCH_INFO, GRADE_POINTS } from '../utils'
import { curriculum as localCurriculum } from '../data/curriculum'
import html2pdf from 'html2pdf.js'

// ============================================================
// CONSTANTS & HELPERS
// ============================================================

const GRADE_THRESHOLDS = [
  { grade: 'O',  label: 'O',  min: 90 },
  { grade: 'A+', label: 'A+', min: 80 },
  { grade: 'A',  label: 'A',  min: 70 },
  { grade: 'B+', label: 'B+', min: 60 },
  { grade: 'B',  label: 'B',  min: 50 },
  { grade: 'C',  label: 'C',  min: 40 },
]

function predictGrade(cie, expectedSEE) {
  if (expectedSEE === '' || expectedSEE === null || expectedSEE === undefined) return null
  const total = cie + Number(expectedSEE)
  if (total >= 90) return 'O'
  if (total >= 80) return 'A+'
  if (total >= 70) return 'A'
  if (total >= 60) return 'B+'
  if (total >= 50) return 'B'
  if (total >= 40) return 'C'
  return 'F'
}

function seeNeeded(cie, threshold, maxSee = 50) {
  const needed = threshold - cie
  if (needed <= 0) return { status: 'achieved', needed: 0 }
  if (needed > maxSee)  return { status: 'impossible', needed }
  return { status: 'possible', needed }
}

function clamp(v, min, max) {
  const n = Number(v)
  if (isNaN(n)) return min
  return Math.min(Math.max(n, min), max)
}

// Turn a grade string into a CSS class suffix
function gradeClass(g) {
  if (!g) return 'none'
  if (g === 'A+') return 'Ap'
  if (g === 'B+') return 'Bp'
  return g
}

// Initialise a fresh course object from curriculum data
function initCourse(c) {
  const base = {
    code: c.code, title: c.title, credits: c.credits,
    category: c.category, isTheoryPractical: !!c.isTheoryPractical,
    defaultTheoryCredits: c.defaultTheoryCredits,
  }
  if (c.isTheoryPractical) {
    const tc = c.defaultTheoryCredits ?? Math.max(1, c.credits - 1)
    return {
      ...base,
      theoryCredits: tc,
      practicalCredits: c.credits - tc,
      theory:    { mid1: '', mid2: '', assignment: '', expectedSEE: '' },
      practical: { mid1: '', mid2: '', assignment: '', expectedSEE: '' },
    }
  }
  return { ...base, mid1: '', mid2: '', assignment: '', expectedSEE: '' }
}

// Compute CIE total from a mark set
function cieTot(marks, mode) {
  if (!marks) return 0;
  if (mode === 'practical') {
    return (Number(marks.dayToDay) || 0) + (Number(marks.skillTest) || 0)
  }
  if (mode === 'exploratory') {
    return (Number(marks.mid1) || 0) + (Number(marks.mid2) || 0)
  }
  return (Number(marks.mid1) || 0) + (Number(marks.mid2) || 0) + (Number(marks.assignment) || 0)
}

// Get predicted grade from a mark set
function getGrade(marks, mode) {
  if (!marks) return 'F';
  const cie = cieTot(marks, mode)
  return predictGrade(cie, marks.expectedSEE)
}

// Convert a CIE/SEE course to a grade-based course for SGPA calc
function toCourseForSGPA(course) {
  if (course.isTheoryPractical) {
    return {
      ...course,
      theoryGrade:    getGrade(course.theory, 'theory'),
      practicalGrade: getGrade(course.practical, 'practical'),
    }
  }
  const isPrac = course.category && course.category.includes('Practical')
  const mode = isPrac ? 'practical' : 'theory'
  return { ...course, grade: getGrade(course, mode) }
}

// ============================================================
// PRINTABLE TABULAR SCORECARD (Hidden until PDF Export)
// ============================================================
function PrintableScorecard({ courses, sgpa }) {
  const gradeableCourses = courses.map(toCourseForSGPA)
  
  return (
    <div className="pdf-table-view">
      <div style={{ marginBottom: '24px', padding: '16px', border: '2px solid var(--accent)', borderRadius: '8px', background: 'rgba(253, 230, 138, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '18px', color: '#111' }}>Semester Performance Summary</h2>
          <div style={{ fontSize: '13px', color: '#555', marginTop: '4px' }}>Based on official Anurag University grading criteria</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '14px', color: '#555', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700' }}>Predicted SGPA</div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: '#d97706', lineHeight: 1 }}>{sgpa.toFixed(2)}</div>
        </div>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', border: '2px solid #333' }}>
        <thead>
          <tr style={{ background: '#222', color: '#fff' }}>
            <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #444', width: '40%' }}>Course Name & Code</th>
            <th style={{ padding: '12px', textAlign: 'center', border: '1px solid #444' }}>Type</th>
            <th style={{ padding: '12px', textAlign: 'center', border: '1px solid #444' }}>Credits</th>
            <th style={{ padding: '12px', textAlign: 'center', border: '1px solid #444' }}>CIE Total</th>
            <th style={{ padding: '12px', textAlign: 'center', border: '1px solid #444' }}>SEE Target</th>
            <th style={{ padding: '12px', textAlign: 'center', border: '1px solid #444' }}>Predicted Grade</th>
          </tr>
        </thead>
        <tbody>
          {gradeableCourses.map((c, i) => {
            if (c.isTheoryPractical) {
              const tc = c.theoryCredits ?? c.defaultTheoryCredits ?? 0
              const pc = c.practicalCredits ?? (c.credits - tc)
              return (
                <React.Fragment key={i}>
                  <tr style={{ background: '#fff' }}>
                    <td style={{ padding: '12px', border: '1px solid #ccc', borderBottom: '1px dashed #ccc' }}>
                      <strong style={{ fontSize: '13px', color: '#111' }}>{c.title} (Theory)</strong><br/>
                      <span style={{ color: '#666', fontSize: '11px' }}>{c.code}</span>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center', border: '1px solid #ccc', borderBottom: '1px dashed #ccc', color: '#555' }}>Theory</td>
                    <td style={{ padding: '12px', textAlign: 'center', border: '1px solid #ccc', borderBottom: '1px dashed #ccc', fontWeight: 'bold' }}>{tc}</td>
                    <td style={{ padding: '12px', textAlign: 'center', border: '1px solid #ccc', borderBottom: '1px dashed #ccc', whiteSpace: 'nowrap' }}>{cieTot(c.theory, 'theory')}/50</td>
                    <td style={{ padding: '12px', textAlign: 'center', border: '1px solid #ccc', borderBottom: '1px dashed #ccc', whiteSpace: 'nowrap' }}>{c.theory?.expectedSEE || '-'}/50</td>
                    <td style={{ padding: '12px', textAlign: 'center', border: '1px solid #ccc', borderBottom: '1px dashed #ccc', fontWeight: 'bold', color: c.theoryGrade === 'F' ? '#e11d48' : '#16a34a' }}>{c.theoryGrade || '-'}</td>
                  </tr>
                  <tr style={{ borderBottom: '2px solid #ccc', background: '#fafafa' }}>
                    <td style={{ padding: '12px', border: '1px solid #ccc', borderTop: 'none', paddingLeft: '24px' }}>
                      <strong style={{ fontSize: '13px', color: '#444' }}>{c.title} (Practical)</strong>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center', border: '1px solid #ccc', borderTop: 'none', color: '#555' }}>Practical</td>
                    <td style={{ padding: '12px', textAlign: 'center', border: '1px solid #ccc', borderTop: 'none', fontWeight: 'bold' }}>{pc}</td>
                    <td style={{ padding: '12px', textAlign: 'center', border: '1px solid #ccc', borderTop: 'none', whiteSpace: 'nowrap' }}>{cieTot(c.practical, 'practical')}/50</td>
                    <td style={{ padding: '12px', textAlign: 'center', border: '1px solid #ccc', borderTop: 'none', whiteSpace: 'nowrap' }}>{c.practical?.expectedSEE || '-'}/50</td>
                    <td style={{ padding: '12px', textAlign: 'center', border: '1px solid #ccc', borderTop: 'none', fontWeight: 'bold', color: c.practicalGrade === 'F' ? '#e11d48' : '#16a34a' }}>{c.practicalGrade || '-'}</td>
                  </tr>
                </React.Fragment>
              )
            }

            const isPrac = c.category?.includes('Practical')
            const mode = isPrac ? 'practical' : 'theory'
            return (
              <tr key={i} style={{ borderBottom: '2px solid #ccc', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                <td style={{ padding: '12px', border: '1px solid #ccc' }}>
                  <strong style={{ fontSize: '13px', color: '#111' }}>{c.title}</strong><br/>
                  <span style={{ color: '#666', fontSize: '11px' }}>{c.code}</span>
                </td>
                <td style={{ padding: '12px', textAlign: 'center', border: '1px solid #ccc', color: '#555' }}>{isPrac ? 'Practical' : 'Theory'}</td>
                <td style={{ padding: '12px', textAlign: 'center', border: '1px solid #ccc', fontWeight: 'bold' }}>{c.credits}</td>
                <td style={{ padding: '12px', textAlign: 'center', border: '1px solid #ccc', whiteSpace: 'nowrap' }}>{cieTot(c.marks, mode)}/50</td>
                <td style={{ padding: '12px', textAlign: 'center', border: '1px solid #ccc', whiteSpace: 'nowrap' }}>{c.marks?.expectedSEE || '-'}/50</td>
                <td style={{ padding: '12px', textAlign: 'center', border: '1px solid #ccc', fontWeight: 'bold', color: c.grade === 'F' ? '#e11d48' : '#16a34a' }}>{c.grade || '-'}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

// ============================================================
// CIE INPUT BLOCK (shared by normal & split courses)
// ============================================================
function CIEBlock({ marks = {}, onChange, prefix, mode = 'theory' }) {
  const cie = cieTot(marks, mode)
  const grade = predictGrade(cie, marks.expectedSEE)

  const handleNum = (field, max) => (e) => {
    const raw = e.target.value
    if (raw === '') { onChange(field, ''); return }
    onChange(field, clamp(raw, 0, max))
  }

  return (
    <div>
      {/* CIE inputs */}
      <div className="cie-row">
        {mode === 'exploratory' ? (
          <>
            <div className="cie-field">
              <span className="cie-label">Assessment 1 <span style={{ color: 'var(--text-muted)' }}>/40</span></span>
              <input
                id={`${prefix}-mid1`}
                type="number" min={0} max={40}
                className="cie-input"
                value={marks.mid1 ?? ''}
                onChange={handleNum('mid1', 40)}
                placeholder="0"
              />
            </div>
            <span className="cie-divider">+</span>

            <div className="cie-field">
              <span className="cie-label">Assessment 2 <span style={{ color: 'var(--text-muted)' }}>/40</span></span>
              <input
                id={`${prefix}-mid2`}
                type="number" min={0} max={40}
                className="cie-input"
                value={marks.mid2 ?? ''}
                onChange={handleNum('mid2', 40)}
                placeholder="0"
              />
            </div>
          </>
        ) : mode === 'theory' ? (
          <>
            <div className="cie-field">
              <span className="cie-label">Mid-1 <span style={{ color: 'var(--text-muted)' }}>/20</span></span>
              <input
                id={`${prefix}-mid1`}
                type="number" min={0} max={20}
                className="cie-input"
                value={marks.mid1 ?? ''}
                onChange={handleNum('mid1', 20)}
                placeholder="0"
              />
            </div>
            <span className="cie-divider">+</span>

            <div className="cie-field">
              <span className="cie-label">Mid-2 <span style={{ color: 'var(--text-muted)' }}>/20</span></span>
              <input
                id={`${prefix}-mid2`}
                type="number" min={0} max={20}
                className="cie-input"
                value={marks.mid2 ?? ''}
                onChange={handleNum('mid2', 20)}
                placeholder="0"
              />
            </div>
            <span className="cie-divider">+</span>

            <div className="cie-field">
              <span className="cie-label">Assignment <span style={{ color: 'var(--text-muted)' }}>/10</span></span>
              <input
                id={`${prefix}-asgn`}
                type="number" min={0} max={10}
                className="cie-input"
                value={marks.assignment ?? ''}
                onChange={handleNum('assignment', 10)}
                placeholder="0"
              />
            </div>
          </>
        ) : (
          <>
            <div className="cie-field">
              <span className="cie-label">Day-to-day <span style={{ color: 'var(--text-muted)' }}>/20</span></span>
              <input
                id={`${prefix}-day`}
                type="number" min={0} max={20}
                className="cie-input"
                value={marks.dayToDay ?? ''}
                onChange={handleNum('dayToDay', 20)}
                placeholder="0"
              />
            </div>
            <span className="cie-divider">+</span>

            <div className="cie-field">
              <span className="cie-label">Skill Test <span style={{ color: 'var(--text-muted)' }}>/30</span></span>
              <input
                id={`${prefix}-skill`}
                type="number" min={0} max={30}
                className="cie-input"
                value={marks.skillTest ?? ''}
                onChange={handleNum('skillTest', 30)}
                placeholder="0"
              />
            </div>
          </>
        )}

        <span className="cie-divider">=</span>

        <div className="cie-total">
          <span className="cie-label">CIE Total</span>
          <span className="cie-total-value" style={{
            color: cie >= (mode === 'exploratory' ? 32 : 20) ? 'var(--accent)' : cie > 0 ? 'var(--orange)' : 'var(--text-muted)'
          }}>
            {cie}<span style={{ fontSize: '13px', fontWeight: 400, color: 'var(--text-muted)' }}>/{mode === 'exploratory' ? '80' : '50'}</span>
          </span>
        </div>
      </div>

      {/* SEE needed chips */}
      {cie > 0 && (
        <div className="see-needed-row">
          <span className="see-needed-label">SEE needed →</span>
          {GRADE_THRESHOLDS.map(({ grade: g, label, min }) => {
            const maxSee = mode === 'exploratory' ? 20 : 50
            const { status, needed } = seeNeeded(cie, min, maxSee)
            return (
              <span
                key={g}
                className={`see-chip ${
                  status === 'achieved'   ? 'see-chip-achieved'  :
                  status === 'impossible' ? 'see-chip-impossible' : 'see-chip-possible'
                }`}
              >
                <strong>{label}:</strong>{' '}
                {status === 'achieved'   ? '✓ Done' :
                 status === 'impossible' ? `${needed}/${maxSee} ✗` :
                 `${needed}/${maxSee}`}
              </span>
            )
          })}
        </div>
      )}

      {/* Expected SEE + predicted grade */}
      <div className="see-input-row">
        <div className="see-input-wrap">
          <span className="see-label">Expected SEE:</span>
          <input
            id={`${prefix}-see`}
            type="number" min={0} max={mode === 'exploratory' ? 20 : 50}
            className="see-input"
            value={marks.expectedSEE ?? ''}
            onChange={(e) => {
              const raw = e.target.value
              if (raw === '') { onChange('expectedSEE', ''); return }
              onChange('expectedSEE', clamp(raw, 0, mode === 'exploratory' ? 20 : 50))
            }}
            placeholder="—"
          />
          <span className="see-max">/{mode === 'exploratory' ? 20 : 50}</span>
        </div>

        {grade && (
          <div className={`predicted-grade grade-${gradeClass(grade)}`}>
            <span style={{ fontSize: '12px', fontWeight: 500, opacity: 0.7 }}>Predicted:</span>
            <strong>{grade}</strong>
            <span style={{ fontSize: '11px', opacity: 0.7 }}>
              {Math.min(cie + Number(marks.expectedSEE || 0), 100)}/100
            </span>
          </div>
        )}
        {marks.expectedSEE !== '' && !grade && (
          <div className="predicted-grade grade-F">
            <span style={{ fontSize: '12px', fontWeight: 500, opacity: 0.7 }}>Predicted:</span>
            <strong>F</strong>
            <span style={{ fontSize: '11px', opacity: 0.7 }}>
              {Math.min(cie + Number(marks.expectedSEE || 0), 100)}/100
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================================
// COURSE CARD
// ============================================================
function CourseCard({ course, onChange }) {
  const handleChange = useCallback((field, value) => {
    onChange({ ...course, [field]: value })
  }, [course, onChange])

  const handleSplitChange = useCallback((part, field, value) => {
    onChange({ ...course, [part]: { ...course[part], [field]: value } })
  }, [course, onChange])

  return (
    <div className="course-card">
      {/* Header */}
      <div className="course-header">
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
            <span className="course-code">{course.code}</span>
            <span className="course-category-badge">{course.category}</span>
            {course.isTheoryPractical && (
              <span style={{ fontSize: '10px', color: 'var(--accent)', background: 'var(--accent-dim)', border: '1px solid var(--accent-border)', padding: '2px 8px', borderRadius: '4px', fontWeight: '700' }}>
                T+P Split
              </span>
            )}
          </div>
          <div className="course-title">{course.title}</div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Credits</div>
          <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--accent)' }}>{course.credits}</div>
        </div>
      </div>

      {/* Theory + Practical OR single */}
      {course.isTheoryPractical ? (
        <>
          {/* Theory */}
          <div className="split-section" style={{ marginBottom: '10px' }}>
            <div className="split-section-header">
              <span>📚</span>
              <span className="split-theory-label">Theory Component</span>
              <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <select
                  value={course.theoryCredits}
                  onChange={(e) => {
                    const tc = Number(e.target.value)
                    onChange({
                      ...course,
                      theoryCredits: tc,
                      practicalCredits: course.credits - tc
                    })
                  }}
                  style={{ background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border)', borderRadius: '4px', padding: '2px 4px', fontSize: '12px', outline: 'none', cursor: 'pointer' }}
                >
                  {Array.from({ length: course.credits }).map((_, i) => {
                    const val = i + 1; // 1 to credits
                    return <option key={val} value={val}>{val}</option>
                  })}
                </select>
                <span style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: '12px' }}>
                  credits
                </span>
              </span>
            </div>
            <div className="split-section-body">
              <CIEBlock
                marks={course.theory}
                onChange={(f, v) => handleSplitChange('theory', f, v)}
                prefix={`${course.code}-theory`}
                mode="theory"
              />
            </div>
          </div>

          {/* Practical */}
          <div className="split-section">
            <div className="split-section-header">
              <span>🔬</span>
              <span className="split-practical-label">Practical Component</span>
              <span style={{ marginLeft: 'auto', color: 'var(--text-muted)', fontWeight: 400, fontSize: '12px' }}>
                {course.practicalCredits} credits (Auto)
              </span>
            </div>
            <div className="split-section-body">
              <CIEBlock
                marks={course.practical}
                onChange={(f, v) => handleSplitChange('practical', f, v)}
                prefix={`${course.code}-practical`}
                mode="practical"
              />
            </div>
          </div>
        </>
      ) : (
        <CIEBlock
          marks={course}
          onChange={handleChange}
          prefix={course.code}
          mode={
            course.category && course.category.includes('Practical') ? 'practical' :
            course.category && course.category.includes('Exploratory') ? 'exploratory' : 'theory'
          }
        />
      )}
    </div>
  )
}

// ============================================================
// GPA SUMMARY SIDEBAR
// ============================================================
function GPASummary({ courses, onSave, saving, savedId, isFullyFilled, likeCount, hasLiked, onLike, showShower }) {
  // Build grade-compatible courses for calculation
  const gradeableCourses = courses.map(toCourseForSGPA)
  const sgpa = calculateSGPA(gradeableCourses)
  const fakeSemesters = [{ courses: gradeableCourses }]
  const cgpa = calculateCGPA(fakeSemesters)
  const classification = getClassification(cgpa)
  const percentage = cgpaToPercentage(cgpa)

  const totalCredits = courses.reduce((a, c) => a + c.credits, 0)
  const gradedCredits = gradeableCourses.reduce((a, c) => {
    if (c.isTheoryPractical) {
      const tc = c.theoryCredits ?? 0
      const pc = c.practicalCredits ?? 0
      return a + (c.theoryGrade ? tc : 0) + (c.practicalGrade ? pc : 0)
    }
    return a + (c.grade ? c.credits : 0)
  }, 0)
  const progress = totalCredits > 0 ? (gradedCredits / totalCredits) * 100 : 0

  return (
    <div className="gpa-summary-panel">
      <div className="gpa-header">
        <div className="gpa-score">{sgpa > 0 ? sgpa.toFixed(2) : '—'}</div>
        <div className="gpa-label">Predicted SGPA</div>
      </div>

      {classification && (
        <div style={{ padding: '14px 20px 0' }}>
          <div className={`class-badge ${classification.className}`}>{classification.label}</div>
        </div>
      )}

      <div className="gpa-details">
        <div className="gpa-stat">
          <span className="gpa-stat-label">CGPA</span>
          <span className="gpa-stat-value" style={{ color: 'var(--accent)', fontSize: '17px' }}>{cgpa > 0 ? cgpa.toFixed(2) : '—'}</span>
        </div>

        <div className="gpa-stat">
          <span className="gpa-stat-label">Credits Graded</span>
          <span className="gpa-stat-value">{gradedCredits} / {totalCredits}</span>
        </div>
      </div>

      {/* Progress */}
      <div style={{ padding: '12px 20px 0' }}>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px' }}>Completion: {Math.round(progress)}%</div>
        <div className="progress-bar"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
      </div>

      {/* Per-subject grades */}
      <div style={{ padding: '16px 20px 0' }}>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Subject Grades</div>
      </div>
      <div className="subject-grade-list">
        {gradeableCourses.map((c, i) => (
          c.isTheoryPractical ? (
            <div key={i}>
              <div className="subject-grade-item" style={{ marginBottom: '2px' }}>
                <span className="subject-grade-item-name" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '70%' }} title={c.title}>📚 {c.title} (Theory)</span>
                <span className={`subject-grade-item-grade grade-${gradeClass(c.theoryGrade)}`} style={{ padding: '2px 8px', borderRadius: '5px', border: '1px solid transparent' }}>
                  {c.theoryGrade || '—'}
                </span>
              </div>
              <div className="subject-grade-item">
                <span className="subject-grade-item-name" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '70%' }} title={c.title}>🔬 {c.title} (Practical)</span>
                <span className={`subject-grade-item-grade grade-${gradeClass(c.practicalGrade)}`} style={{ padding: '2px 8px', borderRadius: '5px', border: '1px solid transparent' }}>
                  {c.practicalGrade || '—'}
                </span>
              </div>
            </div>
          ) : (
            <div key={i} className="subject-grade-item">
              <span className="subject-grade-item-name" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '70%' }} title={c.title}>{c.title}</span>
              <span className={`subject-grade-item-grade grade-${gradeClass(c.grade)}`} style={{ padding: '2px 8px', borderRadius: '5px', border: '1px solid transparent' }}>
                {c.grade || '—'}
              </span>
            </div>
          )
        ))}
      </div>

      <div className="divider" style={{ margin: '12px 0' }} />

      <div style={{ padding: '0 20px 20px' }}>
        <button className="btn btn-primary hide-on-print" style={{ width: '100%', justifyContent: 'center' }} onClick={() => onSave(false)} disabled={saving}>
          {saving ? '⏳ Generating PDF...' : '📄 Generate Official PDF Report'}
        </button>
      </div>

      {isFullyFilled && (
        <LikeBanner 
          hasLiked={hasLiked} 
          onLike={onLike} 
          showShower={showShower} 
          likeCount={likeCount} 
          scale={0.55} 
        />
      )}
    </div>
  )
}

// ============================================================
// LIKE BANNER COMPONENT
// ============================================================
function LikeBanner({ hasLiked, onLike, showShower, likeCount, scale = 1 }) {
  return (
    <div className="page-enter hide-on-print" style={{ 
      margin: '10px auto', 
      display: 'flex', 
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: "'Dancing Script', cursive",
      width: 'fit-content',
      transform: `scale(${scale})`,
      transformOrigin: 'top center'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <div style={{ fontSize: '32px', color: '#fff', lineHeight: '1.2' }}>Find this tool helpful?</div>
        <div style={{ fontSize: '32px', color: '#fff', lineHeight: '1.2' }}>Click the heart to show</div>
        <div style={{ fontSize: '32px', color: '#f472b6', lineHeight: '1.2', display: 'flex', alignItems: 'center', gap: '8px' }}>
          your support! ♡
        </div>
      </div>
      
      {!hasLiked && (
        <svg width="90" height="120" viewBox="0 0 120 150" fill="none" style={{ marginLeft: '-20px', marginRight: '10px' }}>
          <path d="M 0 95 C 40 95, 85 110, 115 80" stroke="#f472b6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          <path d="M 100 80 L 115 80 L 115 95" stroke="#f472b6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      )}
      
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: hasLiked ? '30px' : '0' }}>
        <button 
          onClick={onLike}
          disabled={hasLiked}
          className={`like-btn ${hasLiked ? 'liked' : ''}`}
        >
          <svg viewBox="-2 -2 36 34" width="34" height="34" style={{ transform: 'translateY(2px)' }}>
            <path 
              d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2 c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z" 
              fill={hasLiked ? "#f472b6" : "transparent"}
              stroke="#f472b6"
              strokeWidth={hasLiked ? "0" : "2"}
              style={{ transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
            />
          </svg>
        </button>
        
        <div style={{ marginTop: '16px', fontSize: '20px', color: '#f472b6', textAlign: 'center', whiteSpace: 'nowrap', position: 'absolute', top: '100%', fontWeight: 600 }}>
          {likeCount.toLocaleString()} people liked this!
        </div>
      </div>
    </div>
  )
}

// ============================================================
// HEART SHOWER ANIMATION
// ============================================================
function HeartShower() {
  const [hearts, setHearts] = useState([])
  useEffect(() => {
    const arr = Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + 'vw',
      delay: Math.random() * 1.2 + 's',
      duration: Math.random() * 2 + 2 + 's',
      size: Math.random() * 12 + 14 + 'px'
    }))
    setHearts(arr)
  }, [])
  
  return (
    <div className="heart-shower-container">
      {hearts.map(h => (
        <div key={h.id} className="falling-heart" style={{ left: h.left, animationDelay: h.delay, animationDuration: h.duration, width: h.size, height: h.size }}>
          <svg viewBox="0 0 24 24" fill="#ef4444" stroke="#ef4444" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 4px 6px rgba(239,68,68,0.4))' }}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </div>
      ))}
    </div>
  )
}

// ============================================================
// TOAST
// ============================================================
function Toast({ message, type, onDismiss }) {
  useEffect(() => { const t = setTimeout(onDismiss, 3000); return () => clearTimeout(t) }, [onDismiss])
  return <div className={`toast toast-${type}`}>{type === 'success' ? '✅' : '❌'} {message}</div>
}

// ============================================================
// BRANCH + SEMESTER SELECTOR
// ============================================================
function BranchSemSelector({ curriculum, onSelect, onBackHome }) {
  const [branch, setBranch] = useState(null)

  if (!branch) {
    return (
      <div className="page-enter">
        <button className="btn btn-ghost hide-on-print" style={{ marginBottom: '16px', fontSize: '13px', paddingLeft: 0 }} onClick={onBackHome}>
          ← Home
        </button>
        <div className="section-header">
          <h1 className="section-title">Select Your Branch</h1>
          <p className="section-subtitle">Choose your B.Tech branch — courses will be pre-loaded from the AU 2025-26 curriculum</p>
        </div>
        <div className="branch-grid">
          {Object.entries(BRANCH_INFO).map(([key, info]) => (
            <div key={key} className="branch-card" id={`branch-${key}`} onClick={() => setBranch(key)}>
              <span className="branch-emoji">{info.emoji}</span>
              <div className="branch-name">{info.name}</div>
              <div className="branch-code">{info.short}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const branchData = curriculum[branch]
  const semesters = branchData ? Object.keys(branchData.semesters) : []

  return (
    <div className="page-enter">
      <button className="btn btn-ghost" style={{ marginBottom: '24px', fontSize: '13px' }} onClick={() => setBranch(null)}>
        ← Back
      </button>
      <div className="section-header">
        <h1 className="section-title">{BRANCH_INFO[branch]?.emoji} {BRANCH_INFO[branch]?.name}</h1>
        <p className="section-subtitle">Select your semester</p>
      </div>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {semesters.map(sem => (
          <button
            key={sem}
            id={`sem-select-${sem}`}
            className="btn btn-secondary"
            style={{ padding: '16px 32px', fontSize: '16px', fontWeight: '700', borderRadius: '12px' }}
            onClick={() => onSelect(branch, sem)}
          >
            {sem}
          </button>
        ))}
      </div>
    </div>
  )
}

// ============================================================
// MAIN CALCULATOR PAGE
// ============================================================
export default function Calculator() {
  const [searchParams] = useSearchParams()
  const { id: recordId } = useParams()
  const navigate = useNavigate()

  const [curriculum, setCurriculum] = useState(localCurriculum)
  const [selectedBranch, setSelectedBranch] = useState(null)
  const [selectedSem, setSelectedSem] = useState(null)
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [savedId, setSavedId] = useState(recordId || null)
  const [studentName, setStudentName] = useState('Student')
  const [rollNumber, setRollNumber] = useState('')
  const [toast, setToast] = useState(null)

  const showToast = (msg, type = 'success') => setToast({ message: msg, type })

  useEffect(() => {
    if (recordId) {
      setLoading(true)
      getRecord(recordId).then(res => {
        const data = res.data
        if (data) {
          setStudentName(data.studentName || 'Student')
          setRollNumber(data.rollNumber || '')
          setSelectedBranch(data.branch)
          if (data.semesters && data.semesters.length > 0) {
            setSelectedSem(data.semesters[0].semesterName)
            setCourses(data.semesters[0].courses)
          }
        }
      }).catch(err => {
        console.error('Failed to load record', err)
        showToast('Failed to load record', 'error')
      }).finally(() => {
        setLoading(false)
      })
    } else {
      try {
        const user = JSON.parse(localStorage.getItem('gpa_user'))
        if (user) {
          setStudentName(user.name || 'Anonymous Student')
          setRollNumber(user.email ? user.email.split('@')[0].toUpperCase() : 'N/A')
        }
      } catch (e) {}
    }
  }, [recordId])

  const handleSelect = useCallback((branch, sem) => {
    if (!curriculum) return
    const rawCourses = curriculum[branch]?.semesters[sem] || []
    setCourses(rawCourses.map(initCourse))
    setSelectedBranch(branch)
    setSelectedSem(sem)
    setSavedId(null) // Ensure a new record is created for a new semester
  }, [curriculum])

  const handleCourseChange = useCallback((idx, updatedCourse) => {
    setCourses(prev => {
      const next = [...prev]
      next[idx] = updatedCourse
      return next
    })
  }, [])

  const handleSave = async (silent = false) => {
    const gradeableCourses = courses.map(toCourseForSGPA)
    const sgpa = calculateSGPA(gradeableCourses)
    const cgpa = calculateCGPA([{ courses: gradeableCourses }])

    const payload = {
      studentName, rollNumber,
      branch: selectedBranch,
      branchName: BRANCH_INFO[selectedBranch]?.name || selectedBranch,
      semesters: [{
        semesterName: selectedSem,
        courses: gradeableCourses,
        sgpa,
        totalCredits: courses.reduce((a, c) => a + c.credits, 0),
        earnedCredits: gradeableCourses.reduce((a, c) => {
          if (c.isTheoryPractical) {
            const tc = c.theoryCredits ?? 0
            const pc = c.practicalCredits ?? 0
            return a
              + (c.theoryGrade && c.theoryGrade !== 'F' && c.theoryGrade !== 'Ab' ? tc : 0)
              + (c.practicalGrade && c.practicalGrade !== 'F' && c.practicalGrade !== 'Ab' ? pc : 0)
          }
          return a + (c.grade && c.grade !== 'F' && c.grade !== 'Ab' ? c.credits : 0)
        }, 0),
      }],
      cgpa,
    }

    if (!silent) setSaving(true)
    try {
      const res = await saveRecord(payload)
      if (!silent) {
        await generatePDF()
        showToast('Record saved!', 'success')
        navigate(`/calculator/${res.data._id}`, { replace: true })
      } else {
        // Even on silent save, update the URL if we didn't have one, but don't force a reload
        if (!recordId) {
          window.history.replaceState(null, '', `/calculator/${res.data._id}`)
        }
      }
    } catch {
      if (!silent) showToast('Could not save — is the server running?', 'error')
    } finally {
      if (!silent) setSaving(false)
    }
  }

  const [likeCount, setLikeCount] = useState(0)
  const [hasLiked, setHasLiked] = useState(false)
  const [showShower, setShowShower] = useState(false)

  useEffect(() => {
    getLikes().then(res => setLikeCount(res.data.count)).catch(() => {})
  }, [])

  useEffect(() => {
    setHasLiked(false)
  }, [recordId, selectedSem, selectedBranch])

  const handleLike = () => {
    if (hasLiked) return
    setHasLiked(true)
    setShowShower(true)
    setTimeout(() => setShowShower(false), 3500)
    setLikeCount(prev => prev + 1)
    handleSave(true) // Silently save to DB when they like
    const gpaData = {
      studentName,
      rollNumber,
      branch: selectedBranch,
      branchName: branchInfo?.name,
      semesterName: selectedSem,
      courses: courses.map(toCourseForSGPA),
      sgpa: calculateSGPA(courses.map(toCourseForSGPA)),
      cgpa: calculateCGPA([{ courses: courses.map(toCourseForSGPA) }])
    }
    
    addLike(gpaData).then(res => setLikeCount(res.data.count)).catch(() => {})
  }

  const isFullyFilled = courses.length > 0 && courses.every(c => {
    if (c.isTheoryPractical) {
      const tCie = (Number(c.theory?.mid1) || 0) + (Number(c.theory?.mid2) || 0) + (Number(c.theory?.assignment) || 0)
      const pCie = (Number(c.practical?.mid1) || Number(c.practical?.dayToDay) || 0) + (Number(c.practical?.mid2) || Number(c.practical?.skillTest) || 0)
      return tCie > 0 && pCie > 0
    }
    const cie = (Number(c.mid1) || 0) + (Number(c.mid2) || 0) + (Number(c.assignment) || 0) + (Number(c.dayToDay) || 0) + (Number(c.skillTest) || 0)
    return cie > 0
  })

  const generatePDF = async () => {
    try {
      const element = document.getElementById('pdf-content')
      element.classList.add('pdf-export-mode')
      
      const isMobile = window.innerWidth <= 768;
      const opt = {
        margin:       0.5,
        filename:     `${studentName.replace(/\s+/g, '_')}_GPA_Report.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: isMobile ? 1 : 2, useCORS: true, backgroundColor: '#ffffff' },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
      }

      await html2pdf().set(opt).from(element).save()
      element.classList.remove('pdf-export-mode')
      showToast('PDF Downloaded Successfully!', 'success')
    } catch (err) {
      console.error(err)
      showToast('Error generating PDF.', 'error')
      document.getElementById('pdf-content')?.classList.remove('pdf-export-mode')
    }
  }

  if (loading) return (
    <div className="container" style={{ paddingTop: '80px', textAlign: 'center' }}>
      <div style={{ width: '40px', height: '40px', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--text-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }}></div>
      <div style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-main)', fontWeight: 500 }}>Initializing Curriculum Matrix...</div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )

  if (!selectedBranch || !selectedSem) {
    return (
      <div className="container" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
        <BranchSemSelector curriculum={curriculum || {}} onSelect={handleSelect} onBackHome={() => navigate('/')} />
      </div>
    )
  }

  const branchInfo = BRANCH_INFO[selectedBranch]

  return (
    <div className="container page-enter" style={{ paddingTop: '32px', paddingBottom: '80px' }}>
      <div id="pdf-content">
        <div className="pdf-header-brand">
          <div>
            <div style={{ fontSize: '24px', fontWeight: '800', letterSpacing: '-0.5px' }}>
              Ignite<span style={{ color: 'var(--accent)' }}>XT</span>
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-secondary)', letterSpacing: '1px', textTransform: 'uppercase' }}>Student Community</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)' }}>Academic Report</div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Generated automatically</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <button className="btn btn-ghost hide-on-print" style={{ fontSize: '13px', paddingLeft: 0 }} onClick={() => { setSelectedBranch(null); setSelectedSem(null) }}>
              ← Back
            </button>
            <h1 style={{ fontSize: '20px', fontWeight: '800', letterSpacing: '-0.3px', marginTop: '10px' }}>
              {branchInfo?.emoji} {branchInfo?.name} — {selectedSem}
            </h1>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Anurag University • AY 2025-26 • {courses.length} subjects • Enter CIE marks + Expected SEE to predict grades
            </div>
          </div>
        </div>

      <div className="hide-on-print" style={{ padding: '16px', borderRadius: '10px', background: 'rgba(250,200,0,0.04)', border: '1px solid var(--accent-border)', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '12px', overflow: 'hidden' }}>
        <span style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}>📝 <strong style={{ color: 'var(--accent)' }}>CIE</strong> = Continuous Internal Evaluation (Max 50 Marks)</span>
        <span style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}>📄 <strong style={{ color: 'var(--accent)' }}>SEE</strong> = Semester End Examination (Max 50 Marks)</span>
        <span style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}>🎯 <strong style={{ color: 'var(--accent)' }}>Total</strong> = CIE + SEE (Max 100 Marks) → Grade determined</span>
      </div>

      <PrintableScorecard courses={courses} sgpa={calculateSGPA(courses.map(toCourseForSGPA))} />

      <div className="calculator-layout">
        {/* Left: course cards */}
        <div>
          {courses.map((course, idx) => (
            <div key={course.code + idx} style={{ animation: `fadeInUp 0.3s ease ${idx * 0.04}s both` }}>
              <CourseCard
                course={course}
                onChange={(updated) => handleCourseChange(idx, updated)}
              />
            </div>
          ))}

          <div style={{ padding: '16px 20px', borderRadius: '8px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', fontSize: '13px', color: 'var(--text-secondary)', marginTop: '16px', lineHeight: '1.6' }}>
            <strong style={{ color: 'var(--text-primary)' }}>Institution Notice:</strong> Year II, III, and IV curriculum structures will be integrated upon official release by Anurag University. Current Year I matrices are strictly calibrated against the official AY 2025-26 B.Tech Curriculum Directive.
          </div>

          {isFullyFilled && (
            <LikeBanner 
              hasLiked={hasLiked} 
              onLike={handleLike} 
              showShower={showShower} 
              likeCount={likeCount} 
              scale={1} 
            />
          )}
        </div>

        {/* Right: GPA summary */}
        <div>
          <GPASummary
            courses={courses}
            onSave={handleSave}
            saving={saving}
            savedId={savedId}
            isFullyFilled={isFullyFilled}
            likeCount={likeCount}
            hasLiked={hasLiked}
            onLike={handleLike}
            showShower={showShower}
          />
        </div>
      </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />}
      {showShower && <HeartShower />}
    </div>
  )
}
