import React from "react";

import {
  Navigate,
} from "react-router-dom";

import {
  onAuthStateChanged,
} from "firebase/auth";

import {
  auth,
} from "../firebase";

export default function ProtectedRoute({
  children,
}) {

  const [user, setUser] =
    React.useState(null);

  const [loading, setLoading] =
    React.useState(true);

  React.useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser) => {

          setUser(currentUser);

          setLoading(false);

        }
      );

    return () => unsubscribe();

  }, []);

  if (loading) {

    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">

        Loading...

      </div>
    );

  }

  if (
  !user ||
  !user.emailVerified
) {

    return (
      <Navigate
        to="/signup"
        replace
      />
    );

  }

  return children;

}