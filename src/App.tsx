import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { ApplyForm } from "./pages/ApplyForm";
import { ColorModeProvider } from "./context/ThemeContext";
import { ApplicationProvider } from "./context/ApplicationContext";

function App() {
  return (
    <ColorModeProvider>
      <ApplicationProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/apply" element={<ApplyForm />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ApplicationProvider>
    </ColorModeProvider>
  );
}

export default App;
