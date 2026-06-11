import React from "react";

import {
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  auth,
} from "../firebase";

import {
  useNavigate,
} from "react-router-dom";

export default function AdminLogin() {

  const navigate =
    useNavigate();

  const [email,
    setEmail] =
    React.useState("");

  const [password,
    setPassword] =
    React.useState("");

  const [loading,
    setLoading] =
    React.useState(false);

  const handleLogin =
    async () => {

      try {

        setLoading(true);

        await signInWithEmailAndPassword(

          auth,

          email,

          password

        );

        localStorage.setItem(
          "cutsAdminLoggedIn",
          "true"
        );

        navigate("/admin");

      } catch (error) {

        alert(
          "Invalid admin credentials"
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="min-h-screen bg-black flex items-center justify-center px-6">

      <div className="bg-[#111111] border border-green-900 rounded-[35px] p-10 w-full max-w-md">

        <h1 className="text-4xl font-black text-green-400 text-center">

          Admin Login

        </h1>

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="w-full mt-8 bg-black border border-green-900 rounded-2xl p-4 text-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="w-full mt-5 bg-black border border-green-900 rounded-2xl p-4 text-white"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full mt-8 bg-green-500 hover:bg-green-600 text-black py-4 rounded-2xl font-black"
        >

          {loading
            ? "Signing In..."
            : "Login"}

        </button>

      </div>

    </div>

  );

}