import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import Home from "./Home";
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
import ClientAnalytics from "./ClientAnalytics";
import WorkerPaid from "./WorkerPaid";
import WorkerInprogress from "./WorkerInprogress";
import WorkerReady from "./WorkerReady";
import WorkerDelivered from "./WorkerDelivered";
import AdminAnalytics from "./AdminAnalytics";
import AdminProductManagement from "./AdminProductManagement";
import AdminEmployeeManagement from "./AdminEmployeeManagement";
import PaymentPage from "./PaymentPage";
import Alcohol from "./Categories/Alcohol";
import Beauty from "./Categories/Beauty";
import Beverage from "./Categories/Beverage";
import Canned from "./Categories/Canned";
import Dairy from "./Categories/Dairy";
import Fruits from "./Categories/Fruits";
import Household from "./Categories/Household";
import Meat from "./Categories/Meat";
import Others from "./Categories/Others";
import Pantry from "./Categories/Pantry";
import Snacks from "./Categories/Snacks";
import Sweets from "./Categories/Sweets";
import Vegetables from "./Categories/Vegetables";

const defaultRoute =
  window.location.pathname === "/" ? <Navigate to="/home" /> : undefined;
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route exact path="/home" element={<Home />} />
        {/* <Route exact path="/homeadmin" element={<PrivateRoute />}>
          <Route exact path="/homeadmin" element={<HomeAdmin />} />
        </Route> */}
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
        <Route exact path="/info" element={<ClientAnalytics />} />

        <Route exact path="/worker-paid" element={<PrivateRoute />}>
          <Route exact path="/worker-paid" element={<WorkerPaid />} />
        </Route>
        <Route exact path="/worker-inprogress" element={<PrivateRoute />}>
          {" "}
          <Route
            exact
            path="/worker-inprogress"
            element={<WorkerInprogress />}
          />
        </Route>
        <Route exact path="/worker-ready" element={<PrivateRoute />}>
          <Route exact path="/worker-ready" element={<WorkerReady />} />
        </Route>
        <Route exact path="/worker-delivered" element={<PrivateRoute />}>
          <Route exact path="/worker-delivered" element={<WorkerDelivered />} />
        </Route>

        <Route exact path="/payment" element={<PaymentPage />} />
        <Route exact path="/alcohol" element={<Alcohol />} />
        <Route exact path="/beauty" element={<Beauty />} />
        <Route exact path="/beverage" element={<Beverage />} />
        <Route exact path="/canned" element={<Canned />} />
        <Route exact path="/dairy" element={<Dairy />} />
        <Route exact path="/fruits" element={<Fruits />} />
        <Route exact path="/household" element={<Household />} />
        <Route exact path="/meat" element={<Meat />} />
        <Route exact path="/others" element={<Others />} />
        <Route exact path="/pantry" element={<Pantry />} />
        <Route exact path="/snacks" element={<Snacks />} />
        <Route exact path="/sweets" element={<Sweets />} />
        <Route exact path="/vegetables" element={<Vegetables />} />
        <Route exact path="/admin-prod-man" element={<PrivateRoute />}>
          <Route
            exact
            path="/admin-prod-man"
            element={<AdminProductManagement />}
          />{" "}
        </Route>
        <Route exact path="/admin-empl-man" element={<PrivateRoute />}>
          <Route
            exact
            path="/admin-empl-man"
            element={<AdminEmployeeManagement />}
          />{" "}
        </Route>
        <Route exact path="/admin-analytics" element={<PrivateRoute />}>
          <Route exact path="/admin-analytics" element={<AdminAnalytics />} />
        </Route>
      </Routes>
      <ToastContainer />

      {defaultRoute}
    </AuthProvider>
  );
}

export default App;
