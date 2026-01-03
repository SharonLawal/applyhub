import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { ApplyForm } from './pages/ApplyForm';
import { ColorModeProvider } from './context/ThemeContext';

function App() {
  return (
    <ColorModeProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/apply" element={<ApplyForm />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ColorModeProvider>
  );
}

export default App;