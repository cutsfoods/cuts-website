import React from "react";

import {
  auth,
} from "../firebase";

import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

import {
  useNavigate,
} from "react-router-dom";

export default function Signup() {

  const navigate =
    useNavigate();

  const [phone,
    setPhone] =
    React.useState("");

  const [otp,
    setOtp] =
    React.useState("");

  const [confirmationResult,
    setConfirmationResult] =
    React.useState(null);

  const [loading,
    setLoading] =
    React.useState(false);

  // SETUP RECAPTCHA

  const setupRecaptcha =
    () => {

      if (
        !window.recaptchaVerifier
      ) {
if (window.recaptchaVerifier) {

  window.recaptchaVerifier.clear();

}
        window.recaptchaVerifier =
          new RecaptchaVerifier(

            auth,

            "recaptcha-container",

            {

              size: "invisible",

              callback: () => {},

            }

          );

      }

    };

  // SEND OTP

  const sendOTP =
    async () => {

      if (
        phone.length < 10
      ) {

        alert(
          "Enter valid phone number"
        );

        return;

      }

      try {

        setLoading(true);

        setupRecaptcha();

        const appVerifier =
          window.recaptchaVerifier;

        const result =
          await signInWithPhoneNumber(

            auth,

            `+91${phone}`,

            appVerifier

          );

        setConfirmationResult(
          result
        );

        alert(
          "OTP Sent Successfully"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Failed to send OTP"
        );

      }

      setLoading(false);

    };

  // VERIFY OTP

  const verifyOTP =
    async () => {

      if (!otp) {

        alert(
          "Enter OTP"
        );

        return;

      }

      try {

        setLoading(true);

      await confirmationResult.confirm(
  otp
);

localStorage.setItem(
  "cutsUserLoggedIn",
  "true"
);

localStorage.setItem(
  "cutsUserPhone",
  phone
);

navigate("/menu");

      } catch (error) {

        console.log(error);

        alert(
          "Invalid OTP"
        );

      }

      setLoading(false);

    };

  return (

    <div className="min-h-screen bg-black flex items-center justify-center px-4">

      <div className="w-full max-w-xl bg-[#111111] border border-green-900 rounded-[40px] p-10">

        <h1 className="text-6xl font-black text-green-400 text-center">

          Login

        </h1>

        <p className="text-gray-400 text-center mt-5">

          Continue with Phone Number

        </p>

        {/* PHONE */}

        <input
          type="text"
          placeholder="Enter Phone Number"
          value={phone}
          onChange={(e) =>
            setPhone(
              e.target.value
            )
          }
          className="w-full mt-10 bg-black border border-green-900 rounded-2xl px-6 py-5 text-white outline-none"
        />

        {/* SEND OTP */}

        {!confirmationResult && (

          <button
            onClick={sendOTP}
            disabled={loading}
            className="w-full mt-6 bg-green-500 hover:bg-green-600 text-black py-5 rounded-2xl text-xl font-bold transition"
          >

            {loading
              ? "Sending..."
              : "Send OTP"}

          </button>

        )}

        {/* OTP INPUT */}

        {confirmationResult && (

          <>

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) =>
                setOtp(
                  e.target.value
                )
              }
              className="w-full mt-8 bg-black border border-green-900 rounded-2xl px-6 py-5 text-white outline-none"
            />

            <button
              onClick={verifyOTP}
              disabled={loading}
              className="w-full mt-6 bg-green-500 hover:bg-green-600 text-black py-5 rounded-2xl text-xl font-bold transition"
            >

              {loading
                ? "Verifying..."
                : "Verify OTP"}

            </button>

          </>

        )}

        <div
          id="recaptcha-container"
        />

      </div>

    </div>

  );

}