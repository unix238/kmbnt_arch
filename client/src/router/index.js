import { Navigate } from "react-router-dom";
import { Home } from "../pages/Home";
import { Items } from "../pages/Items";
import { Detail } from "../pages/Detail";
import { Basket } from "../pages/Basket";
import { WishList } from "../pages/WishList";
import { Login } from "../pages/Login";
import { Payment } from "../pages/Payment";
import { NewsDetail } from "../pages/NewsDetail";

export const defaultRoutes = [
  { path: "/", component: <Home />, exact: true },
  { path: "/items", component: <Items />, exact: true },
  { path: "/item/:id", component: <Detail />, exact: true },
  { path: "/basket", component: <Basket />, exact: true },
  { path: "/wishlist", component: <WishList />, exact: true },
  { path: "/login", component: <Login />, exact: true },
  { path: "/payment", component: <Payment />, exact: true },
  { path: "/news/:id", component: <NewsDetail />, exact: true },
  { path: "/*", component: <Navigate to='/' />, exact: true },
];
