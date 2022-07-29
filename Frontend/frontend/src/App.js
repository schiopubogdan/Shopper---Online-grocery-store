import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import Home from "./Home";
import HomeAdmin from "./HomeAdmin";
import { AuthProvider } from "./AuthContex";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import Products from "./Products";
import Product from "./Product";

const defaultRoute =
  window.location.pathname === "/" ? <Navigate to="/home" /> : undefined;
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route exact path="/home" element={<Home />} />

        <Route exact path="/homeadmin" element={<PrivateRoute />}>
          <Route exact path="/homeadmin" element={<HomeAdmin />} />
        </Route>
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/products/:id" element={<Product />} />
      </Routes>
      {defaultRoute}
    </AuthProvider>
  );
}

export default App;
