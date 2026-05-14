import React from "react";

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

import {
  doc,
  setDoc,
} from "firebase/firestore";

import {
  auth,
  db,
} from "../firebase";

import { useNavigate }
  from "react-router-dom";

export default function Signup() {

  const navigate =
    useNavigate();

  const [name, setName] =
    React.useState("");

  const [email, setEmail] =
    React.useState("");

  const [password, setPassword] =
    React.useState("");

  const [location, setLocation] =
    React.useState("");

  const [coordinates,
    setCoordinates] =
    React.useState({

      latitude: null,
      longitude: null,

    });

  const [loading,
    setLoading] =
    React.useState(false);

  const getCurrentLocation =
    () => {

      if (
        !navigator.geolocation
      ) {

        alert(
          "Geolocation not supported"
        );

        return;

      }

      navigator.geolocation.getCurrentPosition(

        (position) => {

          const latitude =
            position.coords.latitude;

          const longitude =
            position.coords.longitude;

          setCoordinates({

            latitude,
            longitude,

          });

          localStorage.setItem(

            "userCoordinates",

            JSON.stringify({

              latitude,
              longitude,

            })

          );

          setLocation(
            `Lat: ${latitude}, Lng: ${longitude}`
          );

        },

        () => {

          alert(
            "Unable to fetch location"
          );

        }

      );

    };

  const handleSignup =
    async () => {

      if (
        !name ||
        !email ||
        !password
      ) {

        alert(
          "Fill all fields"
        );

        return;

      }

      try {

        setLoading(true);

        const userCredential =
          await createUserWithEmailAndPassword(

            auth,

            email,

            password

          );

        const user =
          userCredential.user;
await sendEmailVerification(
  user
);
        await setDoc(

          doc(
            db,
            "users",
            user.uid
          ),

          {

            uid:
              user.uid,

            name,

            email,

            location,

            coordinates,

            createdAt:
              new Date(),

          }

        );

        alert(
  "Verification email sent 📩 Please verify your email before login."
);

        navigate("/menu");

      } catch (error) {

        alert(
          error.message
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">

      <div className="w-full max-w-xl bg-[#0d0d0d] border border-green-900 rounded-[35px] p-10">

        <h1 className="text-5xl font-black text-green-400 text-center">

          Create Account

        </h1>

        <p className="text-gray-400 text-center mt-5 text-lg">

          Signup to continue ordering

        </p>

        <div className="mt-10 space-y-6">

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            className="w-full bg-black border border-green-900 rounded-2xl px-6 py-4 outline-none"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="w-full bg-black border border-green-900 rounded-2xl px-6 py-4 outline-none"
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
            className="w-full bg-black border border-green-900 rounded-2xl px-6 py-4 outline-none"
          />

          <button
            onClick={
              getCurrentLocation
            }
            className="w-full bg-[#1a1a1a] border border-green-900 text-white py-4 rounded-2xl font-bold"
          >

            Use Current Location 📍

          </button>

          {location && (

            <p className="text-green-400 text-sm">

              {location}

            </p>

          )}

          <button
            onClick={
              handleSignup
            }
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 text-black py-4 rounded-2xl font-black text-xl"
          >

            {loading
              ? "Creating..."
              : "Create Account"}

          </button>

        </div>

      </div>

    </div>

  );

}