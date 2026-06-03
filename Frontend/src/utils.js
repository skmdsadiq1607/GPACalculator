// Anurag University grading scale
export const GRADES = [
  { grade: '',   label: '-- Select --', points: null },
  { grade: 'O',  label: 'O - Outstanding (≥90%)',  points: 10 },
  { grade: 'A+', label: 'A+ - Excellent (≥80%)',   points: 9  },
  { grade: 'A',  label: 'A - Very Good (≥70%)',    points: 8  },
  { grade: 'B+', label: 'B+ - Good (≥60%)',        points: 7  },
  { grade: 'B',  label: 'B - Average (≥50%)',      points: 6  },
  { grade: 'C',  label: 'C - Pass (≥40%)',         points: 5  },
  { grade: 'F',  label: 'F - Fail (<40%)',         points: 0  },
  { grade: 'Ab', label: 'Ab - Absent',             points: 0  },
]

export const GRADE_POINTS = {
  'O': 10, 'A+': 9, 'A': 8, 'B+': 7,
  'B': 6,  'C': 5,  'F': 0, 'Ab': 0,
}

export function calculateSGPA(courses) {
  let totalCredits = 0
  let totalPoints = 0

  for (const c of courses) {
    if (c.isTheoryPractical) {
      // Theory component
      if (c.theoryGrade && c.theoryGrade !== '') {
        const tc = c.theoryCredits ?? c.defaultTheoryCredits ?? 0
        totalCredits += tc
        totalPoints += tc * (GRADE_POINTS[c.theoryGrade] || 0)
      }
      // Practical component
      if (c.practicalGrade && c.practicalGrade !== '') {
        const pc = c.practicalCredits ?? (c.credits - (c.theoryCredits ?? c.defaultTheoryCredits ?? 0))
        totalCredits += pc
        totalPoints += pc * (GRADE_POINTS[c.practicalGrade] || 0)
      }
    } else {
      if (c.grade && c.grade !== '') {
        totalCredits += c.credits
        totalPoints += c.credits * (GRADE_POINTS[c.grade] || 0)
      }
    }
  }

  if (totalCredits === 0) return 0
  return Math.round((totalPoints / totalCredits) * 100) / 100
}

export function calculateCGPA(semesters) {
  const allCourses = semesters.flatMap(s => s.courses)
  let totalCredits = 0
  let totalPoints = 0

  for (const c of allCourses) {
    if (c.isTheoryPractical) {
      if (c.theoryGrade && c.theoryGrade !== '') {
        const tc = c.theoryCredits ?? c.defaultTheoryCredits ?? 0
        totalCredits += tc
        totalPoints += tc * (GRADE_POINTS[c.theoryGrade] || 0)
      }
      if (c.practicalGrade && c.practicalGrade !== '') {
        const pc = c.practicalCredits ?? (c.credits - (c.theoryCredits ?? c.defaultTheoryCredits ?? 0))
        totalCredits += pc
        totalPoints += pc * (GRADE_POINTS[c.practicalGrade] || 0)
      }
    } else {
      if (c.grade && c.grade !== '') {
        totalCredits += c.credits
        totalPoints += c.credits * (GRADE_POINTS[c.grade] || 0)
      }
    }
  }

  if (totalCredits === 0) return 0
  return Math.round((totalPoints / totalCredits) * 100) / 100
}

export function getClassification(cgpa) {
  if (cgpa >= 8.0) return { label: '🥇 First Class with Distinction', className: 'class-distinction' }
  if (cgpa >= 6.5) return { label: '🥈 First Class', className: 'class-first' }
  if (cgpa >= 5.5) return { label: '🥉 Second Class', className: 'class-second' }
  if (cgpa >= 5.0) return { label: 'Pass Class', className: 'class-pass' }
  return null
}

export function cgpaToPercentage(cgpa) {
  return ((cgpa - 0.5) * 10).toFixed(2)
}

export const BRANCH_INFO = {
  'AI':     { name: 'Artificial Intelligence', emoji: '🤖', short: 'AI' },
  'AI_ML':  { name: 'AI & Machine Learning', emoji: '🧠', short: 'AI & ML' },
  'CIVIL':  { name: 'Civil Engineering', emoji: '🏗️', short: 'Civil' },
  'CSE':    { name: 'Computer Science & Engg.', emoji: '💻', short: 'CSE' },
  'CSE_DS': { name: 'CSE (Data Science)', emoji: '📊', short: 'CSE-DS' },
  'CSE_CS': { name: 'CSE (Cyber Security)', emoji: '🔐', short: 'CSE-CS' },
  'EEE':    { name: 'Electrical & Electronics', emoji: '⚡', short: 'EEE' },
  'ECE':    { name: 'Electronics & Communication', emoji: '📡', short: 'ECE' },
  'IT':     { name: 'Information Technology', emoji: '🌐', short: 'IT' },
  'MECH':   { name: 'Mechanical Engineering', emoji: '⚙️', short: 'Mech' },
}
