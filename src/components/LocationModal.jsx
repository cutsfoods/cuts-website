import React from "react";

import LocationPicker from "./LocationPicker";

export default function LocationModal({
  isOpen,
  onClose,
  onSave,
}) {

  const [selectedAddress,
    setSelectedAddress] =
    React.useState("");

  const [coordinates,
    setCoordinates] =
    React.useState(null);

  if (!isOpen) return null;

  return (

    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-6">

      <div className="w-full max-w-3xl bg-[#0d0d0d] border border-green-900 rounded-[35px] p-8 relative">

        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white text-2xl"
        >

          ✕

        </button>

        <h1 className="text-4xl font-black text-green-400">

          Select Delivery Location

        </h1>

        <p className="text-gray-400 mt-3">

          Search and pin your exact delivery location

        </p>

        <LocationPicker
          onLocationSelect={async (
            location
          ) => {

            setCoordinates(location);

            try {

              const response =
                await fetch(

`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`

                );

              const data =
                await response.json();
console.log(data);
              if (
                data.results &&
                data.results.length > 0
              ) {

                const address =
                  data.results[0]
                    .formatted_address;

                setSelectedAddress(
                  address
                );

                localStorage.setItem(
                  "selectedAddress",
                  address
                );
const existingAddresses =
  JSON.parse(
    sessionStorage.getItem(
      "savedAddresses"
    )
  ) || [];

const updatedAddresses = [

  {
    type: "Home",
    fullAddress: address,
  },

  ...existingAddresses.filter(
    (item) =>
      item.fullAddress !== address
  ),

];

sessionStorage.setItem(
  "savedAddresses",
  JSON.stringify(updatedAddresses)
);
              }

            } catch (error) {

              console.log(error);

            }

          }}
        />

        <div className="mt-8">

          <p className="text-gray-400">

            Selected Address

          </p>

          <div className="mt-3 bg-black border border-green-900 rounded-2xl p-4">

            <p className="text-white break-words">

              {selectedAddress
                ? selectedAddress
                : "No location selected"}

            </p>

          </div>

        </div>

        <button
          onClick={() => {

            if (!selectedAddress)
              return;

            localStorage.setItem(
              "selectedAddress",
              selectedAddress
            );

            localStorage.setItem(
              "userCoordinates",

              JSON.stringify(
                coordinates
              )
            );

            onSave(selectedAddress);

            onClose();

          }}
          className="mt-8 w-full bg-green-500 hover:bg-green-600 text-black py-4 rounded-2xl font-black"
        >

          Save Location

        </button>

      </div>

    </div>

  );

}