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
      ],
      "Sem 3": [
        { code: "AI301", title: "Advanced Data Structures", credits: 3, category: "Theoretical" },
        { code: "AI302", title: "Python Programming", credits: 3, category: "Theoretical" },
        { code: "AI303", title: "Communicative English", credits: 1, category: "Practical" },
        { code: "AI304", title: "Python Programming Lab", credits: 2, category: "Practical" },
        { code: "AI305", title: "Advanced Data Structures Lab", credits: 1, category: "Practical" },
        { code: "AI306", title: "Integrated Project - I", credits: 1, category: "Exploratory" },
        { code: "AI307", title: "Computer Oriented Statistical Methods", credits: 3, category: "Theoretical" },
        { code: "AI308", title: "Computer Organization and Architecture", credits: 3, category: "Theoretical" },
        { code: "AI309", title: "Artificial Intelligence", credits: 3, category: "Theoretical" },
        { code: "AI310", title: "Technical Training", credits: 0, category: "Training" },
      ],
      "Sem 4": [
        { code: "AI401", title: "Quantitative Aptitude and Logical Reasoning - I", credits: 1, category: "Practical" },
        { code: "AI402", title: "Discrete Mathematics", credits: 3, category: "Theoretical" },
        { code: "AI403", title: "Integrated Project - II", credits: 1, category: "Exploratory" },
        { code: "AI404", title: "Database Management Systems Lab", credits: 1, category: "Practical" },
        { code: "AI405", title: "Essentials of Machine Learning", credits: 3, category: "Theoretical" },
        { code: "AI406", title: "Design and Analysis of Algorithms", credits: 3, category: "Theoretical" },
        { code: "AI407", title: "Java Programming", credits: 3, category: "Theoretical" },
        { code: "AI408", title: "Essentials of Machine Learning Lab", credits: 1, category: "Practical" },
        { code: "AI409", title: "Database Management Systems", credits: 3, category: "Theoretical" },
        { code: "AI410", title: "Java Programming Lab", credits: 1, category: "Practical" },
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
      ],
      "Sem 3": [
        { code: "AI301", title: "Advanced Data Structures", credits: 3, category: "Theoretical" },
        { code: "AI302", title: "Python Programming", credits: 3, category: "Theoretical" },
        { code: "AI303", title: "Communicative English", credits: 1, category: "Practical" },
        { code: "AI304", title: "Python Programming Lab", credits: 2, category: "Practical" },
        { code: "AI305", title: "Advanced Data Structures Lab", credits: 1, category: "Practical" },
        { code: "AI306", title: "Integrated Project - I", credits: 1, category: "Exploratory" },
        { code: "AI307", title: "Computer Oriented Statistical Methods", credits: 3, category: "Theoretical" },
        { code: "AI308", title: "Computer Organization and Architecture", credits: 3, category: "Theoretical" },
        { code: "AI309", title: "Artificial Intelligence", credits: 3, category: "Theoretical" },
        { code: "AI310", title: "Technical Training", credits: 0, category: "Training" },
      ],
      "Sem 4": [
        { code: "AI401", title: "Quantitative Aptitude and Logical Reasoning - I", credits: 1, category: "Practical" },
        { code: "AI402", title: "Discrete Mathematics", credits: 3, category: "Theoretical" },
        { code: "AI403", title: "Integrated Project - II", credits: 1, category: "Exploratory" },
        { code: "AI404", title: "Database Management Systems Lab", credits: 1, category: "Practical" },
        { code: "AI405", title: "Essentials of Machine Learning", credits: 3, category: "Theoretical" },
        { code: "AI406", title: "Design and Analysis of Algorithms", credits: 3, category: "Theoretical" },
        { code: "AI407", title: "Java Programming", credits: 3, category: "Theoretical" },
        { code: "AI408", title: "Essentials of Machine Learning Lab", credits: 1, category: "Practical" },
        { code: "AI409", title: "Database Management Systems", credits: 3, category: "Theoretical" },
        { code: "AI410", title: "Java Programming Lab", credits: 1, category: "Practical" },
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
      ],
      "Sem 3": [
        { code: "CSE301", title: "Computer Organization and Architecture", credits: 3, category: "Theoretical" },
        { code: "CSE302", title: "Advanced Data Structures", credits: 3, category: "Theoretical" },
        { code: "CSE303", title: "Advanced Data Structures Lab", credits: 1, category: "Practical" },
        { code: "CSE304", title: "Integrated Project - I", credits: 1, category: "Exploratory" },
        { code: "CSE305", title: "Discrete Mathematics", credits: 3, category: "Theoretical" },
        { code: "CSE306", title: "Quantitative Aptitude and Logical Reasoning - I", credits: 1, category: "Practical" },
        { code: "CSE307", title: "Programming in Java", credits: 3, category: "Theoretical" },
        { code: "CSE308", title: "Foundations of Software Engineering", credits: 3, category: "Theoretical" },
        { code: "CSE309", title: "Programming in Java Lab", credits: 1, category: "Practical" },
        { code: "CSE310", title: "Dynamics of Group Discussion", credits: 1, category: "Practical" },
      ],
      "Sem 4": [
        { code: "CSE401", title: "Database Management Systems", credits: 3, category: "Theoretical" },
        { code: "CSE402", title: "Integrated Project - II", credits: 1, category: "Exploratory" },
        { code: "CSE403", title: "Database Management Systems Lab", credits: 1, category: "Practical" },
        { code: "CSE404", title: "Computer Oriented Statistical Methods", credits: 3, category: "Theoretical" },
        { code: "CSE405", title: "Web Technologies", credits: 3, category: "Theoretical" },
        { code: "CSE406", title: "Programming in Python", credits: 3, category: "Theoretical" },
        { code: "CSE407", title: "Fundamentals of Computer Algorithms", credits: 2, category: "Theoretical" },
        { code: "CSE408", title: "Quantitative Aptitude and Logical Reasoning - II", credits: 1, category: "Practical" },
        { code: "CSE409", title: "Advanced Reading Comprehension Skills", credits: 1, category: "Practical" },
        { code: "CSE410", title: "Programming in Python Lab", credits: 1, category: "Practical" },
        { code: "CSE411", title: "Web Technologies Lab", credits: 1, category: "Practical" },
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
      ],
      "Sem 3": [
        { code: "IT301", title: "Discrete Mathematics", credits: 3, category: "Theoretical" },
        { code: "IT302", title: "Computer Organization", credits: 3, category: "Theoretical" },
        { code: "IT303", title: "Data Structures and Algorithms", credits: 3, category: "Theoretical" },
        { code: "IT304", title: "Object Oriented Programming through Java", credits: 3, category: "Theoretical" },
        { code: "IT305", title: "Integrated Project - I", credits: 1, category: "Exploratory" },
        { code: "IT306", title: "Computer Oriented Statistical Methods", credits: 3, category: "Theoretical" },
        { code: "IT307", title: "Data Structures and Algorithms Lab", credits: 2, category: "Practical" },
        { code: "IT308", title: "Object Oriented Programming through Java Lab", credits: 2, category: "Practical" },
      ],
      "Sem 4": [
        { code: "IT401", title: "Operating Systems", credits: 3, category: "Theoretical" },
        { code: "IT402", title: "Design and Analysis of Algorithms", credits: 3, category: "Theoretical" },
        { code: "IT403", title: "Database Systems", credits: 3, category: "Theoretical" },
        { code: "IT404", title: "Advanced Java Programming", credits: 2, category: "Theoretical" },
        { code: "IT405", title: "English through Theatre Arts", credits: 2, category: "Practical" },
        { code: "IT406", title: "Software Engineering", credits: 3, category: "Theoretical" },
        { code: "IT407", title: "Database Systems Lab", credits: 1, category: "Practical" },
        { code: "IT408", title: "Advanced Java Programming Lab", credits: 2, category: "Practical" },
        { code: "IT409", title: "Integrated Project - II", credits: 1, category: "Exploratory" },
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

export { curriculum, gradingScale };
