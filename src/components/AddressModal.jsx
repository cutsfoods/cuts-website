import React from "react";

import AddAddressModal
  from "./AddAddressModal";

export default function AddressModal({
  isOpen,
  onClose,
  onSelectAddress,
}) {

  const [isAddAddressOpen,
    setIsAddAddressOpen] =
    React.useState(false);

  const [savedAddresses,
    setSavedAddresses] =
    React.useState([]);

  React.useEffect(() => {

    const addresses =
      JSON.parse(
        sessionStorage.getItem(
          "savedAddresses"
        )
      ) || [];

    setSavedAddresses(addresses);

  }, [isOpen]);

  if (!isOpen) return null;

  return (

    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">

      <div className="w-full max-w-3xl bg-[#111111] rounded-3xl border border-green-900 overflow-hidden">

        {/* HEADER */}

        <div className="flex items-center justify-between px-6 py-5 border-b border-green-900">

          <h2 className="text-3xl font-black text-white">

            Select Address

          </h2>

          <button
            onClick={onClose}
            className="text-white text-3xl"
          >

            ×

          </button>

        </div>

        {/* BODY */}

        <div className="p-6">

          {/* ADD ADDRESS */}

          <button
            onClick={() =>
              setIsAddAddressOpen(
                true
              )
            }
            className="w-full border border-green-900 rounded-2xl p-5 text-left hover:bg-[#181818] transition"
          >

            <p className="text-green-400 font-bold text-xl">

              + Add New Address

            </p>

          </button>

          {/* SAVED ADDRESSES */}

          <div className="mt-8">

            <h3 className="text-gray-400 font-bold mb-4 tracking-wide">

              SAVED ADDRESSES

            </h3>

            <div className="space-y-4">

              {savedAddresses.length === 0 ? (

                <div className="border border-green-900 rounded-2xl p-5">

                  <p className="text-gray-400">

                    No saved addresses

                  </p>

                </div>

              ) : (

  savedAddresses.map(
  (
    address,
    index
  ) => (

    <div
      key={index}

      onClick={() => {

  onSelectAddress(
    address.fullAddress
  );

  onClose();

}}

      className="border border-green-900 rounded-2xl p-5 cursor-pointer hover:bg-[#181818] transition"
    >

      <p className="text-white font-bold">
        {address.type}
      </p>

      <p className="text-gray-400 mt-2">
        {address.fullAddress}
      </p>

    </div>

  )
)

              )}

            </div>

          </div>

        </div>

      </div>

      <AddAddressModal
        isOpen={
          isAddAddressOpen
        }
        onClose={() =>
          setIsAddAddressOpen(
            false
          )
        }
      />

    </div>

  );

}