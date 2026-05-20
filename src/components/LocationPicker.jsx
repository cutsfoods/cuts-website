import React from "react";

import {
  GoogleMap,
  Marker,
  StandaloneSearchBox,
  useLoadScript,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 12.9759,
  lng: 77.7437,
};
const STORE_LOCATION = {
  lat: 12.9759,
  lng: 77.7437,
};

const MAX_DISTANCE_KM = 5;
function calculateDistance(
  lat1,
  lon1,
  lat2,
  lon2
) {

  const R = 6371;

  const dLat =
    (lat2 - lat1) *
    (Math.PI / 180);

  const dLon =
    (lon2 - lon1) *
    (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) *
      Math.sin(dLat / 2) +

    Math.cos(
      lat1 *
        (Math.PI / 180)
    ) *

      Math.cos(
        lat2 *
          (Math.PI / 180)
      ) *

      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return R * c;

}
export default function LocationPicker({
  
  onLocationSelect,
  selectedAddress,
}) {

const [selectedLocation,
  setSelectedLocation] =
  React.useState(defaultCenter);

React.useEffect(() => {

  if (!selectedAddress)
    return;

  if (
    !window.google ||
    !window.google.maps
  ) return;

  const geocoder =
    new window.google.maps.Geocoder();

  geocoder.geocode(

    {
      address:
        selectedAddress
    },

    (
      results,
      status
    ) => {

      if (
        status === "OK" &&
        results[0]
      ) {

        const location =
          results[0]
            .geometry
            .location;

        setSelectedLocation({

          lat:
            location.lat(),

          lng:
            location.lng(),

        });

      }

    }

  );

}, [selectedAddress]);

  const [searchBox,
    setSearchBox] =
    React.useState(null);

  const { isLoaded } =
    useLoadScript({

      googleMapsApiKey:
        import.meta.env
          .VITE_GOOGLE_MAPS_API_KEY,

      libraries: ["places"],

    });

  React.useEffect(() => {

    navigator.geolocation.getCurrentPosition(

      (position) => {

        setSelectedLocation({

          lat:
            position.coords.latitude,

          lng:
            position.coords.longitude,

        });

      }

    );

  }, []);

  const updateLocation =
  async (location) => {

    const distance =
      calculateDistance(
        STORE_LOCATION.lat,
        STORE_LOCATION.lng,
        location.lat,
        location.lng
      );

    if (
      distance >
      MAX_DISTANCE_KM
    ) {

     alert(
  "Sorry, we’re not delivering to your location yet. We’ll be launching there soon 🚀 Stay tuned with CUTS."
);

      return;

    }

    setSelectedLocation(
      location
    );

    localStorage.setItem(
      "userCoordinates",
      JSON.stringify(location)
    );

    if (onLocationSelect) {

      await onLocationSelect(
        location
      );

    }

  };

  const handlePlacesChanged =
    async () => {

      if (!searchBox) return;

      const places =
        searchBox.getPlaces();

      if (
        !places ||
        places.length === 0
      ) return;

      const place =
        places[0];

      const lat =
        place.geometry.location.lat();

      const lng =
        place.geometry.location.lng();

      await updateLocation({
        lat,
        lng,
      });

    };

  if (!isLoaded) {

    return (
      <p className="text-white">
        Loading Map...
      </p>
    );

  }

  return (

    <div className="mt-6">

      <StandaloneSearchBox
        onLoad={(ref) =>
          setSearchBox(ref)
        }
        onPlacesChanged={
          handlePlacesChanged
        }
      >

        <input
          type="text"
          placeholder="Search delivery location"
          className="w-full mb-4 bg-black border border-green-900 rounded-2xl px-6 py-4 text-white outline-none"
        />

      </StandaloneSearchBox>

      <GoogleMap
        mapContainerStyle={
          containerStyle
        }
        center={selectedLocation}
        zoom={17}
        onClick={async (event) => {

          const location = {

            lat:
              event.latLng.lat(),

            lng:
              event.latLng.lng(),

          };

          await updateLocation(
            location
          );

        }}
      >

        <Marker
          position={
            selectedLocation
          }
          draggable={true}
          onDragEnd={async (
            event
          ) => {

            const location = {

              lat:
                event.latLng.lat(),

              lng:
                event.latLng.lng(),

            };

            await updateLocation(
              location
            );

          }}
        />

      </GoogleMap>

    </div>

  );

}