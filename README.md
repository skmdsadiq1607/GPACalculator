# IgniteXT GPA Calculator

An advanced academic tracking suite and GPA calculation platform engineered specifically for Anurag University students (AY 2025-26). Built by the IgniteXT Student Community.

![IgniteXT GPA Calculator](https://github.com/skmdsadiq1607/GPACalculator/assets/YOUR_IMAGE_LINK_HERE)

## 🌟 Features

- **Curriculum Intelligence**: Pre-configured with the exact Anurag University academic regulations, meaning you don't have to manually enter course credits or types.
- **Precision Calculation**: Full support for the official 10-point absolute grading system. Handles theory, practicals, exploratory courses, and split-credit subjects perfectly.
- **Secure Persistence**: Integrated with Google OAuth. Your academic records are encrypted and securely linked to your account.
- **Real-time Analytics**: Dynamic SGPA projection and target setting as you type in your marks (Mid-1, Mid-2, Assignments, SEE expected).
- **Fully Responsive**: Sleek, dark-mode-first design that works seamlessly on desktop, tablet, and mobile devices.

## 🛠 Tech Stack

- **Frontend**: React (Vite), React Router, Google OAuth
- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose)
- **Deployment**: Vercel (Frontend), Render (Backend)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB connection string
- Google OAuth Client ID

### 1. Clone the repository
```bash
git clone https://github.com/skmdsadiq1607/GPACalculator.git
cd GPACalculator
```

### 2. Setup Backend
```bash
cd Backend
npm install
```
Create a `.env` file in the `Backend` directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
FRONTEND_URL=http://localhost:5173
```
Start the server:
```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd ../Frontend
npm install
```
Create a `.env` file in the `Frontend` directory:
```env
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```
Start the client:
```bash
npm run dev
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/skmdsadiq1607/GPACalculator/issues).

## 📄 License

© 2026 IgniteXT Student Community. All Rights Reserved.
