import React from "react";

import {
  Navigate,
} from "react-router-dom";

export default function AdminRoute({
  children,
}) {

  const isAdminLoggedIn =
    localStorage.getItem(
      "cutsAdminLoggedIn"
    ) === "true";

  if (!isAdminLoggedIn) {

    return (
      <Navigate
        to="/admin-login"
      />
    );

  }

  return children;

}