import React, { useEffect, useState } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { defaultRoutes } from "../router/index";
import { Header } from "../components/UI/Header/Header";
import { Footer } from "./UI/Footer/Footer";
import { ProtectedRoute } from "./ProtectedRoute";
import { Admin } from "../pages/Admin";
import { NotificationContainer } from "react-notifications";
import { GoogleOAuthProvider } from "@react-oauth/google";

import {
  loadBasketItems,
  loadFavoriteItems,
  loadRecentItems,
} from "../rtk/toolkitReducer";

import { useDispatch } from "react-redux";
import { Profile } from "../pages/Profile";
import config from "../utils/config";

export const AppRouter = () => {
  const [routes, setRoutes] = useState(defaultRoutes);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadBasketItems());
    dispatch(loadFavoriteItems());
    dispatch(loadRecentItems());
  });

  return (
    <GoogleOAuthProvider clientId={config.clientID}>
      <BrowserRouter>
        <NotificationContainer />
        <Routes>
          {routes.map((route) => (
            <Route
              path={route.path}
              element={route.component}
              exact={route.exact}
              key={route.path}
            />
          ))}
          <Route
            path={"/protected"}
            element={<ProtectedRoute />}
            exact={true}
          />
          <Route
            path={"/profile"}
            element={<ProtectedRoute admin={false} Component={Profile} />}
            exact={true}
          />
          <Route
            path={"/admin"}
            element={<ProtectedRoute admin={true} Component={Admin} />}
            exact={true}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};
