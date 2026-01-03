import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { ApplyForm } from './pages/ApplyForm';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/apply" element={<ApplyForm />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;