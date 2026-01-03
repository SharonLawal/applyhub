# ApplyHub - Grant Application Portal

A comprehensive, multi-step grant application portal built with React, TypeScript, and Material UI.

## Features

- **Multi-Step Application Form:** 3-stage process (Personal, Organization, Grant details)
- **Advanced Validation:** Powered by Zod and React Hook Form with real-time feedback
- **UI/UX:** Responsive Material UI design, step progress indicators, and loading states
- **Dashboard:** Overview of application status
- **Mock Submission:** Generates unique application reference IDs

## Tech Stack

- React 18
- TypeScript
- Vite
- Material UI v5
- Zod & React Hook Form
- React Router DOM

## Installation & Setup

### 1. Clone or Extract the project
```bash
cd applyhub
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Access the App

Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure
```
src/
├── components/     # Reusable UI parts (Layout, Form Steps)
├── pages/          # Main views (Login, Dashboard, Form)
└── utils/          # Zod schemas and TypeScript interfaces
```

## How to Run

1. Run `npm run dev`
2. Click the link in the terminal
3. On the **Login Page**, click the "Login as Demo User" button
4. On the **Dashboard**, click "New Application"
5. Fill out the form. Try entering invalid data to see Zod error messages in real-time
6. Submit to see the success screen with your Reference ID

## Author

**Sharon Lawal**
- Email: sharonayolawal@gmail.com
- GitHub: [Sharon Lawal](https://github.com/sharonlawal)
- LinkedIn: [Sharon Lawal](https://linkedin.com/in/sharon-lawal)

## License

MIT License