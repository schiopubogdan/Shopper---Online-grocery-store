import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import HomeUser from "./HomeUser";
import Home from "./Home";
import HomeAdmin from "./HomeAdmin";
import { AuthProvider } from "./AuthContex";

const defaultRoute =
  window.location.pathname === "/" ? <Navigate to="/home" /> : undefined;
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/homeuser" element={<HomeUser />} />
          <Route exact path="/homeadmin" element={<HomeAdmin />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/register" element={<RegisterPage />} />
        </Routes>
        {defaultRoute}
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
