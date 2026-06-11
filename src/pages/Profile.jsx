import React from "react";

export default function Profile() {

  const name =
    localStorage.getItem(
      "cutsUserName"
    ) || "Customer";

  const phone =
    localStorage.getItem(
      "cutsUserPhone"
    ) || "Not Available";

  return (

    <div className="min-h-screen bg-black text-white p-10">

      <div className="max-w-2xl mx-auto bg-[#111111] border border-green-900 rounded-3xl p-8">

        <h1 className="text-4xl font-black text-green-400 mb-8">

          My Profile

        </h1>

        <div className="space-y-6">

          <div>

            <p className="text-gray-400">

              Name

            </p>

            <h2 className="text-2xl font-bold">

              {name}

            </h2>

          </div>

          <div>

            <p className="text-gray-400">

              Phone Number

            </p>

            <h2 className="text-2xl font-bold">

              {phone}

            </h2>

          </div>

        </div>

      </div>

    </div>

  );

}