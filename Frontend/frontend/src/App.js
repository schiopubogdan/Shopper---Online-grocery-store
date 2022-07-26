import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import HomeUser from "./HomeUser";
import Home from "./Home";
import HomeAdmin from "./HomeAdmin";
import { AuthProvider } from "./AuthContex";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import Products from "./Products";

const defaultRoute =
  window.location.pathname === "/" ? <Navigate to="/home" /> : undefined;
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/homeuser" element={<PrivateRoute />}>
          <Route exact path="/homeuser" element={<HomeUser />} />
        </Route>
        <Route exact path="/homeadmin" element={<PrivateRoute />}>
          <Route exact path="/homeadmin" element={<HomeAdmin />} />
        </Route>
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route exact path="/products" element={<Products />} />
      </Routes>
      {defaultRoute}
    </AuthProvider>
  );
}

export default App;
