import React from "react";

import LocationPicker
  from "./LocationPicker";

export default function AddAddressModal({
  isOpen,
  onClose,
}) {

  if (!isOpen) return null;
  const [selectedAddress,
  setSelectedAddress] =
  React.useState("");

const [flatNo,
  setFlatNo] =
  React.useState("");

const [landmark,
  setLandmark] =
  React.useState("");

const [addressType,
  setAddressType] =
  React.useState("Home");
  const [showAddressForm,
  setShowAddressForm] =
  React.useState(false);

  return (

    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">

      <div className="w-full max-w-4xl bg-[#111111] rounded-3xl border border-green-900 overflow-hidden max-h-[95vh] overflow-y-auto">

        <div className="flex items-center justify-between px-6 py-5 border-b border-green-900">

          <h2 className="text-3xl font-semibold text-white">

            Add Address Details

          </h2>

          <button
            onClick={onClose}
            className="text-white text-3xl"
          >

            ×

          </button>

        </div>

        <div className="p-6">

<div
  className={
    showAddressForm
      ? "h-[220px] overflow-hidden rounded-2xl"
      : ""
  }
>

  <LocationPicker
    onLocationSelect={
      async (location) => {

        try {

          const response =
            await fetch(

`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`

            );

          const data =
            await response.json();

          if (
            data.results &&
            data.results.length > 0
          ) {

            setSelectedAddress(

              data.results[0]
                .formatted_address

            );

          }

        } catch (error) {

          console.log(error);

        }

      }
    }
  />

</div>

<div className="mt-8 border border-green-900 rounded-2xl p-5">

  <p className="text-gray-400">

    Selected Address

  </p>

  <p className="text-white mt-3">

    {selectedAddress ||
      "No address selected"}

  </p>

</div>
<button
  className="w-full mt-6 bg-green-500 hover:bg-green-600 text-black py-5 rounded-3xl text-lg font-semibold transition"
>

  <button
  onClick={() =>
    setShowAddressForm(
      true
    )
  }
  className="w-full mt-6 bg-green-500 hover:bg-green-600 text-black py-5 rounded-3xl text-lg font-semibold transition"
>

  Proceed With This Location

</button>
{showAddressForm && (

  <div className="mt-8 bg-black">

    <div className="border border-green-900 rounded-2xl p-5">

      <p className="text-gray-400 text-sm">

        Selected Address

      </p>

     <p className="text-sm text-white mt-2 leading-6">

        {selectedAddress}

      </p>

    </div>

    <div className="mt-8">

      <p className="text-gray-400 mb-4">

        Save Address As

      </p>

      <div className="flex gap-4 flex-wrap">

        {[
          "Home",
          "Work",
          "Other",
        ].map((type) => (

          <button
            key={type}
            onClick={() =>
              setAddressType(type)
            }
            className={`px-6 py-3 rounded-2xl border transition ${
              addressType === type
                ? "bg-[#161616] text-black border-green-500"
                : "border-green-900 text-white bg-[#111111]"
            }`}
          >

            {type}

          </button>

        ))}

      </div>

    </div>

    <div className="mt-8 space-y-5">

      <input
        type="text"
        placeholder="Flat No / Floor *"
        value={flatNo}
        onChange={(e) =>
          setFlatNo(
            e.target.value
          )
        }
        className="w-full bg-[#111111] border border-green-900 rounded-2xl px-6 py-5 text-white outline-none"
      />

      <input
        type="text"
        placeholder="Building Name *"
        className="w-full bg-[#111111] border border-green-900 rounded-2xl px-6 py-5 text-white outline-none"
      />

      <input
        type="text"
        placeholder="Landmark"
        value={landmark}
        onChange={(e) =>
          setLandmark(
            e.target.value
          )
        }
        className="w-full bg-[#111111] border border-green-900 rounded-2xl px-6 py-5 text-white outline-none"
      />

    </div>

   <div className="mt-8">

      <p className="text-gray-400 mb-5">

        Receiver Details

      </p>

      <div className="space-y-5">

        <input
          type="text"
          placeholder="Receiver Name"
          className="w-full bg-[#111111] border border-green-900 rounded-2xl px-6 py-5 text-white outline-none"
        />

        <input
          type="text"
          placeholder="Phone Number"
          className="w-full bg-[#111111] border border-green-900 rounded-2xl px-6 py-5 text-white outline-none"
        />

      </div>

    </div>

   <button
  onClick={() => {

    const savedAddresses =
      JSON.parse(
        localStorage.getItem(
          "savedAddresses"
        )
      ) || [];

    const newAddress = {

      type: addressType,

      fullAddress:
        selectedAddress,

      flatNo,

      landmark,

    };

    localStorage.setItem(

      "savedAddresses",

      JSON.stringify([
        ...savedAddresses,
        newAddress,
      ])

    );

    alert(
      "Address Saved"
    );

    onClose();

  }}
  className="w-full mt-10 bg-green-500 hover:bg-green-600 text-black py-5 rounded-3xl text-lg font-semibold transition"
>

  Save Address

</button>

  </div>

)}
</button>
        </div>

      </div>

    </div>

  );

}