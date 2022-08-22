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
import TodaysDeal from "./TodaysDeal";
import Favorites from "./Favorites";
import ShoppingCart from "./ShoppingCart";
import ClientProfile from "./ClientProfile";
import ClientHistory from "./ClientHistory";
import ClientCoupons from "./ClientCoupons";
import WorkerPaid from "./WorkerPaid";
import WorkerInprogress from "./WorkerInprogress";
import WorkerReady from "./WorkerReady";
import WorkerDelivered from "./WorkerDelivered";
import Admin from "./Admin";
import AdminProductManagement from "./AdminProductManagement";
import AdminEmployeeManagement from "./AdminEmployeeManagement";
import PaymentPage from "./PaymentPage";
import Beverage from "./Categories/Beverage";

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
        <Route exact path="/deals" element={<TodaysDeal />} />
        <Route exact path="/favorites" element={<Favorites />} />
        <Route exact path="/shopping" element={<ShoppingCart />} />
        <Route exact path="/profile" element={<ClientProfile />} />
        <Route exact path="/history" element={<ClientHistory />} />
        <Route exact path="/coupons" element={<ClientCoupons />} />
        <Route exact path="/worker-paid" element={<WorkerPaid />} />
        <Route exact path="/worker-inprogress" element={<WorkerInprogress />} />
        <Route exact path="/worker-ready" element={<WorkerReady />} />
        <Route exact path="/worker-delivered" element={<WorkerDelivered />} />
        <Route exact path="/admin" element={<Admin />} />
        <Route exact path="/payment" element={<PaymentPage />} />
        <Route exact path="/beverage" element={<Beverage />} />
        <Route
          exact
          path="/admin-prod-man"
          element={<AdminProductManagement />}
        />
        <Route
          exact
          path="/admin-empl-man"
          element={<AdminEmployeeManagement />}
        />
      </Routes>
      {defaultRoute}
    </AuthProvider>
  );
}

export default App;
