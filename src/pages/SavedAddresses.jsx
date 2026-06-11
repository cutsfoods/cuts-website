import React from "react";

export default function SavedAddresses() {

  const addresses =
    JSON.parse(
      localStorage.getItem(
        "savedAddresses"
      )
    ) || [];

  return (

    <div className="min-h-screen bg-black text-white p-8">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-black text-green-400 mb-8">

          Saved Addresses

        </h1>

        {addresses.length === 0 ? (

          <div className="bg-[#111111] border border-green-900 rounded-3xl p-8">

            No Saved Addresses

          </div>

        ) : (

          <div className="space-y-5">

            {addresses.map(
              (address, index) => (

                <div

                  key={index}

                  className="bg-[#111111] border border-green-900 rounded-3xl p-6"

                >

                  <h2 className="text-xl font-black text-green-400">

                    {address.type}

                  </h2>

                  <p className="mt-3">

                    {address.receiverName}

                  </p>

                  <p>

                    {address.phoneNumber}

                  </p>

                  <p className="mt-3 text-gray-300">

                    {address.fullAddress}

                  </p>

<div className="flex gap-3 mt-5">

  <button

    onClick={() => {

      localStorage.setItem(
        "selectedAddress",
        address.fullAddress
      );

      localStorage.setItem(
        "cutsUserName",
        address.receiverName
      );

      localStorage.setItem(
        "cutsUserPhone",
        address.phoneNumber
      );

      alert(
        "Address Selected"
      );

    }}

    className="bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded-xl font-bold"

  >

    Use

  </button>

 <button

  onClick={() => {

    localStorage.setItem(
      "editAddress",
      JSON.stringify(address)
    );

    window.location.href =
      "/checkout";

  }}

  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl font-bold"

>

  Edit

</button>

  <button

    onClick={() => {

      const updatedAddresses =
        addresses.filter(
          (_, i) =>
            i !== index
        );

      localStorage.setItem(
        "savedAddresses",
        JSON.stringify(
          updatedAddresses
        )
      );

      window.location.reload();

    }}

    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-bold"

  >

    Delete

  </button>

</div>
                </div>

              )
            )}

          </div>

        )}

      </div>

    </div>

  );

}