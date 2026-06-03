// Anurag University B.Tech Curriculum AY 2025-26
// Extracted from Academic Regulations PDF
// Only Year 1 Sem 1 & Sem 2 available (higher years TBA on anurag.edu.in)
//
// isTheoryPractical: true  => course has separate Theory + Practical components
// defaultTheoryCredits     => suggested split based on L/T hours from PDF
//   Credit formula: 1 Lecture hr = 1cr, 1 Tutorial hr = 1cr, 2 Practical hrs = 1cr
//   e.g. 3L+0T+2P = 4cr => theory=3, practical=1

const curriculum = {
  "AI": {
    name: "Artificial Intelligence",
    semesters: {
      "Sem 1": [
        { code: "EMI1101", title: "Linear Algebra and Calculus",               credits: 4, category: "Theoretical (BS)" },
        { code: "EMD1X06", title: "Engineering Chemistry",                      credits: 4, category: "Theoretical & Practical (BS)", isTheoryPractical: true, defaultTheoryCredits: 3 },
        { code: "EMI1X04", title: "Basic Electrical and Electronics Engineering",credits: 3, category: "Theoretical & Practical (ES)", isTheoryPractical: true, defaultTheoryCredits: 2 },
        { code: "EMA1102", title: "Programming in C",                           credits: 4, category: "Theoretical & Practical (ES)", isTheoryPractical: true, defaultTheoryCredits: 3 },
        { code: "EAE1X23", title: "Effective Communication Skills",             credits: 1, category: "Practical (HS)" },
        { code: "EVA1121", title: "Joy of Engineering - I",                     credits: 3, category: "Exploratory (ES)" },
        { code: "ESE1125", title: "Data Analytics Practices",                   credits: 1, category: "Practical (PC)" },
      ],
      "Sem 2": [
        { code: "EMI1201", title: "Ordinary Differential Equations and Numerical Techniques", credits: 4, category: "Theoretical (BS)" },
        { code: "EMD1X07", title: "Engineering Physics",                         credits: 4, category: "Theoretical & Practical (BS)", isTheoryPractical: true, defaultTheoryCredits: 3 },
        { code: "EMA1204", title: "Data Structures",                             credits: 4, category: "Theoretical & Practical (ES)", isTheoryPractical: true, defaultTheoryCredits: 3 },
        { code: "EAE1X02", title: "Empowering with English Language Skills",     credits: 3, category: "Theoretical & Practical (HS)", isTheoryPractical: true, defaultTheoryCredits: 2 },
        { code: "EVA1221", title: "Joy of Engineering - II",                     credits: 3, category: "Exploratory (ES)" },
        { code: "EMA1224", title: "Generative AI",                               credits: 2, category: "Practical (PC)" },
      ]
    }
  },
  "AI_ML": {
    name: "AI & Machine Learning",
    semesters: {
      "Sem 1": [
        { code: "EMI1101", title: "Linear Algebra and Calculus",               credits: 4, category: "Theoretical (BS)" },
        { code: "EMD1X06", title: "Engineering Chemistry",                      credits: 4, category: "Theoretical & Practical (BS)", isTheoryPractical: true, defaultTheoryCredits: 3 },
        { code: "EMI1X04", title: "Basic Electrical and Electronics Engineering",credits: 3, category: "Theoretical & Practical (ES)", isTheoryPractical: true, defaultTheoryCredits: 2 },
        { code: "EMA1102", title: "Programming in C",                           credits: 4, category: "Theoretical & Practical (ES)", isTheoryPractical: true, defaultTheoryCredits: 3 },
        { code: "EAE1X23", title: "Effective Communication Skills",             credits: 1, category: "Practical (HS)" },
        { code: "EVA1121", title: "Joy of Engineering - I",                     credits: 3, category: "Exploratory (ES)" },
        { code: "ESE1125", title: "Data Analytics Practices",                   credits: 1, category: "Practical (PC)" },
      ],
      "Sem 2": [
        { code: "EMI1201", title: "Ordinary Differential Equations and Numerical Techniques", credits: 4, category: "Theoretical (BS)" },
        { code: "EMD1X07", title: "Engineering Physics",                         credits: 4, category: "Theoretical & Practical (BS)", isTheoryPractical: true, defaultTheoryCredits: 3 },
        { code: "EMA1204", title: "Data Structures",                             credits: 4, category: "Theoretical & Practical (ES)", isTheoryPractical: true, defaultTheoryCredits: 3 },
        { code: "EAE1X02", title: "Empowering with English Language Skills",     credits: 3, category: "Theoretical & Practical (HS)", isTheoryPractical: true, defaultTheoryCredits: 2 },
        { code: "EVA1221", title: "Joy of Engineering - II",                     credits: 3, category: "Exploratory (ES)" },
        { code: "EMA1224", title: "Generative AI",                               credits: 2, category: "Practical (PC)" },
      ]
    }
  },
  "CIVIL": {
    name: "Civil Engineering",
    semesters: {
      "Sem 1": [
        { code: "EMI1101", title: "Linear Algebra and Calculus",               credits: 4, category: "Theoretical (BS)" },
        { code: "EMD1X06", title: "Engineering Chemistry",                      credits: 4, category: "Theoretical & Practical (BS)", isTheoryPractical: true, defaultTheoryCredits: 3 },
        { code: "EMI1X04", title: "Basic Electrical and Electronics Engineering",credits: 3, category: "Theoretical & Practical (ES)", isTheoryPractical: true, defaultTheoryCredits: 2 },
        { code: "EMA1102", title: "Programming in C",                           credits: 4, category: "Theoretical & Practical (ES)", isTheoryPractical: true, defaultTheoryCredits: 3 },
        { code: "EVA1121", title: "Joy of Engineering - I",                     credits: 3, category: "Exploratory (ES)" },
        { code: "EMA1101", title: "Engineering Mechanics - I",                  credits: 2, category: "Theoretical (PC)" },
      ],
      "Sem 2": [
        { code: "EMI1202", title: "Ordinary Differential Equations and Vector Calculus", credits: 4, category: "Theoretical (BS)" },
        { code: "EMD1X07", title: "Engineering Physics",                         credits: 4, category: "Theoretical & Practical (BS)", isTheoryPractical: true, defaultTheoryCredits: 3 },
        { code: "EMA1204", title: "Data Structures",                             credits: 4, category: "Theoretical & Practical (ES)", isTheoryPractical: true, defaultTheoryCredits: 3 },
        { code: "EAE1X02", title: "Empowering with English Language Skills",     credits: 3, category: "Theoretical & Practical (HS)", isTheoryPractical: true, defaultTheoryCredits: 2 },
        { code: "EVA1221", title: "Joy of Engineering - II",                     credits: 3, category: "Exploratory (ES)" },
        { code: "EMA1201", title: "Engineering Mechanics - II",                  credits: 2, category: "Theoretical (PC)" },
      ]
    }
  },
  "CSE": {
    name: "Computer Science and Engineering",
    semesters: {
      "Sem 1": [
        { code: "EMI1101", title: "Linear Algebra and Calculus",               credits: 4, category: "Theoretical (BS)" },
        { code: "EMD1X07", title: "Engineering Physics",                        credits: 4, category: "Theoretical & Practical (BS)", isTheoryPractical: true, defaultTheoryCredits: 3 },
        { code: "EAE1X02", title: "Empowering with English Language Skills",    credits: 3, category: "Theoretical & Practical (HS)", isTheoryPractical: true, defaultTheoryCredits: 2 },
        { code: "EMA1102", title: "Programming in C",                           credits: 4, category: "Theoretical & Practical (ES)", isTheoryPractical: true, defaultTheoryCredits: 3 },
        { code: "EVA1121", title: "Joy of Engineering - I",                     credits: 3, category: "Exploratory (ES)" },
        { code: "EMI1X24", title: "Emerging Technologies",                      credits: 2, category: "MOOCs (PC)" },
      ],
      "Sem 2": [
        { code: "EMI1202", title: "Ordinary Differential Equations and Vector Calculus", credits: 4, category: "Theoretical (BS)" },
        { code: "EMD1X06", title: "Engineering Chemistry",                       credits: 4, category: "Theoretical & Practical (BS)", isTheoryPractical: true, defaultTheoryCredits: 3 },
        { code: "EMI1X04", title: "Basic Electrical and Electronics Engineering",credits: 3, category: "Theoretical & Practical (ES)", isTheoryPractical: true, defaultTheoryCredits: 2 },
        { code: "EMA1204", title: "Data Structures",                             credits: 4, category: "Theoretical & Practical (ES)", isTheoryPractical: true, defaultTheoryCredits: 3 },
        { code: "EAE1X23", title: "Effective Communication Skills",              credits: 1, category: "Practical (HS)" },
        { code: "EVA1221", title: "Joy of Engineering - II",                     credits: 3, category: "Exploratory (ES)" },
        { code: "EVA1222", title: "Problem Solving using Global Coding Platform",credits: 1, category: "Exploratory (PC)" },
      ]
    }
  },
  "CSE_DS": {
    name: "CSE (Data Science)",
    semesters: {
      "Sem 1": [
        { code: "EMI1101", title: "Linear Algebra and Calculus",               credits: 4, category: "Theoretical (BS)" },
        { code: "EMD1X06", title: "Engineering Chemistry",                      credits: 4, category: "Theoretical & Practical (BS)", isTheoryPractical: true, defaultTheoryCredits: 3 },
        { code: "EMI1X04", title: "Basic Electrical and Electronics Engineering",credits: 3, category: "Theoretical & Practical (ES)", isTheoryPractical: true, defaultTheoryCredits: 2 },
        { code: "EMA1102", title: "Programming in C",                           credits: 4, category: "Theoretical & Practical (ES)", isTheoryPractical: true, defaultTheoryCredits: 3 },
        { code: "EAE1X23", title: "Effective Communication Skills",             credits: 1, category: "Practical (HS)" },
        { code: "EVA1121", title: "Joy of Engineering - I",                     credits: 3, category: "Exploratory (ES)" },
        { code: "ESE1125", title: "Data Analytics Practices",                   credits: 1, category: "Practical (PC)" },
      ],
      "Sem 2": [
        { code: "EMI1201", title: "Ordinary Differential Equations and Numerical Techniques", credits: 4, category: "Theoretical (BS)" },
        { code: "EMD1X07", title: "Engineering Physics",                         credits: 4, category: "Theoretical & Practical (BS)", isTheoryPractical: true, defaultTheoryCredits: 3 },
        { code: "EMA1204", title: "Data Structures",                             credits: 4, category: "Theoretical & Practical (ES)", isTheoryPractical: true, defaultTheoryCredits: 3 },
        { code: "EAE1X02", title: "Empowering with English Language Skills",     credits: 3, category: "Theoretical & Practical (HS)", isTheoryPractical: true, defaultTheoryCredits: 2 },
        { code: "EVA1221", title: "Joy of Engineering - II",                     credits: 3, category: "Exploratory (ES)" },
        { code: "EMI1206", title: "Statistical Foundations for Data Science",    credits: 2, category: "Theoretical (BS)" },
      ]
    }
  },
  "CSE_CS": {
    name: "CSE (Cyber Security)",
    semesters: {
      "Sem 1": [
        { code: "EMI1101", title: "Linear Algebra and Calculus",               credits: 4, category: "Theoretical (BS)" },
        { code: "EMD1X06", title: "Engineering Chemistry",                      credits: 4, category: "Theoretical & Practical (BS)", isTheoryPractical: true, defaultTheoryCredits: 3 },
        { code: "EMI1X04", title: "Basic Electrical and Electronics Engineering",credits: 3, category: "Theoretical & Practical (ES)", isTheoryPractical: true, defaultTheoryCredits: 2 },
        { code: "EMA1102", title: "Programming in C",                           credits: 4, category: "Theoretical & Practical (ES)", isTheoryPractical: true, defaultTheoryCredits: 3 },
        { code: "EAE1X23", title: "Effective Communication Skills",             credits: 1, category: "Practical (HS)" },
        { code: "EVA1121", title: "Joy of Engineering - I",                     credits: 3, category: "Exploratory (ES)" },
        { code: "EMA1120", title: "Essentials of Cyber Security",               credits: 1, category: "Exploratory (PC)" },
      ],
      "Sem 2": [
        { code: "EMI1201", title: "Ordinary Differential Equations and Numerical Techniques", credits: 4, category: "Theoretical (BS)" },
        { code: "EMD1X07", title: "Engineering Physics",                         credits: 4, category: "Theoretical & Practical (BS)", isTheoryPractical: true, defaultTheoryCredits: 3 },
        { code: "EAE1X02", title: "Empowering with English Language Skills",     credits: 3, category: "Theoretical & Practical (HS)", isTheoryPractical: true, defaultTheoryCredits: 2 },
        { code: "EMA1204", title: "Data Structures",                             credits: 4, category: "Theoretical & Practical (ES)", isTheoryPractical: true, defaultTheoryCredits: 3 },
        { code: "EVA1221", title: "Joy of Engineering - II",                     credits: 3, category: "Exploratory (ES)" },
        { code: "EMA1207", title: "Linux Programming",                           credits: 2, category: "Practical (PC)" },
      ]
    }
  },
  "EEE": {
    name: "Electrical and Electronics Engineering",
    semesters: {
      "Sem 1": [
        { code: "EMI1101", title: "Linear Algebra and Calculus",               credits: 4, category: "Theoretical (BS)" },
        { code: "EMD1X06", title: "Engineering Chemistry",                      credits: 4, category: "Theoretical & Practical (BS)", isTheoryPractical: true, defaultTheoryCredits: 3 },
        { code: "EMA1102", title: "Programming in C",                           credits: 4, category: "Theoretical & Practical (ES)", isTheoryPractical: true, defaultTheoryCredits: 3 },
        { code: "EMI1X04", title: "Basic Electrical and Electronics Engineering",credits: 3, category: "Theoretical & Practical (ES)", isTheoryPractical: true, defaultTheoryCredits: 2 },
        { code: "EVA1121", title: "Joy of Engineering - I",                     credits: 3, category: "Exploratory (ES)" },
        { code: "EMA1107", title: "Energy, Environment and Sustainability",      credits: 2, category: "Theoretical (PC)" },
      ],
      "Sem 2": [
        { code: "EMI1202", title: "Ordinary Differential Equations and Vector Calculus", credits: 4, category: "Theoretical (BS)" },
        { code: "EMD1X07", title: "Engineering Physics",                         credits: 4, category: "Theoretical & Practical (BS)", isTheoryPractical: true, defaultTheoryCredits: 3 },
        { code: "EMA1204", title: "Data Structures",                             credits: 4, category: "Theoretical & Practical (ES)", isTheoryPractical: true, defaultTheoryCredits: 3 },
        { code: "EAE1X02", title: "Empowering with English Language Skills",     credits: 3, category: "Theoretical & Practical (HS)", isTheoryPractical: true, defaultTheoryCredits: 2 },
        { code: "EVA1221", title: "Joy of Engineering - II",                     credits: 3, category: "Exploratory (ES)" },
        { code: "EMA1206", title: "Electrical Circuits",                         credits: 2, category: "Theoretical (PC)" },
      ]
    }
  },
  "ECE": {
    name: "Electronics and Communication Engineering",
    semesters: {
      "Sem 1": [
        { code: "EMI1101", title: "Linear Algebra and Calculus",               credits: 4, category: "Theoretical (BS)" },
        { code: "EMD1X07", title: "Engineering Physics",                        credits: 4, category: "Theoretical & Practical (BS)", isTheoryPractical: true, defaultTheoryCredits: 3 },
        { code: "EAE1X02", title: "Empowering with English Language Skills",    credits: 3, category: "Theoretical & Practical (HS)", isTheoryPractical: true, defaultTheoryCredits: 2 },
        { code: "EMA1102", title: "Programming in C",                           credits: 4, category: "Theoretical & Practical (ES)", isTheoryPractical: true, defaultTheoryCredits: 3 },
        { code: "EVA1121", title: "Joy of Engineering - I",                     credits: 3, category: "Exploratory (ES)" },
        { code: "EMA1107", title: "Energy, Environment and Sustainability",      credits: 2, category: "Theoretical (PC)" },
      ],
      "Sem 2": [
        { code: "EMI1202", title: "Ordinary Differential Equations and Vector Calculus", credits: 4, category: "Theoretical (BS)" },
        { code: "EMD1X06", title: "Engineering Chemistry",                       credits: 4, category: "Theoretical & Practical (BS)", isTheoryPractical: true, defaultTheoryCredits: 3 },
        { code: "EMA1204", title: "Data Structures",                             credits: 4, category: "Theoretical & Practical (ES)", isTheoryPractical: true, defaultTheoryCredits: 3 },
        { code: "EMI1X04", title: "Basic Electrical and Electronics Engineering",credits: 3, category: "Theoretical & Practical (ES)", isTheoryPractical: true, defaultTheoryCredits: 2 },
        { code: "EAE1X23", title: "Effective Communication Skills",              credits: 1, category: "Practical (HS)" },
        { code: "EVA1221", title: "Joy of Engineering - II",                     credits: 3, category: "Exploratory (ES)" },
        { code: "EMA1223", title: "Familiarization of Electronic Components and Instruments", credits: 1, category: "Exploratory (PC)" },
      ]
    }
  },
  "IT": {
    name: "Information Technology",
    semesters: {
      "Sem 1": [
        { code: "EMI1101", title: "Linear Algebra and Calculus",               credits: 4, category: "Theoretical (BS)" },
        { code: "EMD1X06", title: "Engineering Chemistry",                      credits: 4, category: "Theoretical & Practical (BS)", isTheoryPractical: true, defaultTheoryCredits: 3 },
        { code: "EMI1X04", title: "Basic Electrical and Electronics Engineering",credits: 3, category: "Theoretical & Practical (ES)", isTheoryPractical: true, defaultTheoryCredits: 2 },
        { code: "EMA1102", title: "Programming in C",                           credits: 4, category: "Theoretical & Practical (ES)", isTheoryPractical: true, defaultTheoryCredits: 3 },
        { code: "EAE1X23", title: "Effective Communication Skills",             credits: 1, category: "Practical (HS)" },
        { code: "EVA1121", title: "Joy of Engineering - I",                     credits: 3, category: "Exploratory (ES)" },
        { code: "EMA1119", title: "Essentials of Information Technology",       credits: 1, category: "Exploratory (PC)" },
      ],
      "Sem 2": [
        { code: "EMI1201", title: "Ordinary Differential Equations and Numerical Techniques", credits: 4, category: "Theoretical (BS)" },
        { code: "EMD1X07", title: "Engineering Physics",                         credits: 4, category: "Theoretical & Practical (BS)", isTheoryPractical: true, defaultTheoryCredits: 3 },
        { code: "EAE1X02", title: "Empowering with English Language Skills",     credits: 3, category: "Theoretical & Practical (HS)", isTheoryPractical: true, defaultTheoryCredits: 2 },
        { code: "EMA1204", title: "Data Structures",                             credits: 4, category: "Theoretical & Practical (ES)", isTheoryPractical: true, defaultTheoryCredits: 3 },
        { code: "EVA1221", title: "Joy of Engineering - II",                     credits: 3, category: "Exploratory (ES)" },
        { code: "EMA1207", title: "Linux Programming",                           credits: 2, category: "Practical (PC)" },
      ]
    }
  },
  "MECH": {
    name: "Mechanical Engineering",
    semesters: {
      "Sem 1": [
        { code: "EMI1101", title: "Linear Algebra and Calculus",               credits: 4, category: "Theoretical (BS)" },
        { code: "EMD1X06", title: "Engineering Chemistry",                      credits: 4, category: "Theoretical & Practical (BS)", isTheoryPractical: true, defaultTheoryCredits: 3 },
        { code: "EAE1X02", title: "Empowering with English Language Skills",    credits: 3, category: "Theoretical & Practical (HS)", isTheoryPractical: true, defaultTheoryCredits: 2 },
        { code: "EMA1102", title: "Programming in C",                           credits: 4, category: "Theoretical & Practical (ES)", isTheoryPractical: true, defaultTheoryCredits: 3 },
        { code: "EVA1121", title: "Joy of Engineering - I",                     credits: 3, category: "Exploratory (ES)" },
        { code: "EMA1105", title: "Engineering Mechanics",                      credits: 2, category: "Theoretical (PC)" },
      ],
      "Sem 2": [
        { code: "EMI1202", title: "Ordinary Differential Equations and Vector Calculus", credits: 4, category: "Theoretical (BS)" },
        { code: "EMD1X07", title: "Engineering Physics",                         credits: 4, category: "Theoretical & Practical (BS)", isTheoryPractical: true, defaultTheoryCredits: 3 },
        { code: "EMA1204", title: "Data Structures",                             credits: 4, category: "Theoretical & Practical (ES)", isTheoryPractical: true, defaultTheoryCredits: 3 },
        { code: "EAE1X23", title: "Effective Communication Skills",              credits: 1, category: "Practical (HS)" },
        { code: "EMI1X04", title: "Basic Electrical and Electronics Engineering",credits: 3, category: "Theoretical & Practical (ES)", isTheoryPractical: true, defaultTheoryCredits: 2 },
        { code: "EVA1221", title: "Joy of Engineering - II",                     credits: 3, category: "Exploratory (ES)" },
        { code: "ESE1222", title: "Engineering Graphics",                        credits: 1, category: "Practical (PC)" },
      ]
    }
  }
};

// Grading scale (Anurag University 10-point system)
const gradingScale = [
  { grade: "O",  label: "Outstanding", points: 10, minPercent: 90 },
  { grade: "A+", label: "Excellent",   points: 9,  minPercent: 80 },
  { grade: "A",  label: "Very Good",   points: 8,  minPercent: 70 },
  { grade: "B+", label: "Good",        points: 7,  minPercent: 60 },
  { grade: "B",  label: "Average",     points: 6,  minPercent: 50 },
  { grade: "C",  label: "Pass",        points: 5,  minPercent: 40 },
  { grade: "F",  label: "Fail",        points: 0,  minPercent: 0  },
  { grade: "Ab", label: "Absent",      points: 0,  minPercent: 0  },
];

module.exports = { curriculum, gradingScale };
