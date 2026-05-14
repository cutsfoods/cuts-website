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
  lat: 0,
  lng: 0,
};

export default function LocationPicker({
  onLocationSelect,
}) {

  const [selectedLocation,
    
    setSelectedLocation] =
    React.useState(defaultCenter);
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

 const handleMapClick = async (
  event
) => {

    const lat =
      event.latLng.lat();

    const lng =
      event.latLng.lng();

    const location = {
      lat,
      lng,
    };

    setSelectedLocation(location);

   await onLocationSelect(location);

  };
const handlePlacesChanged =
  async () => {

  if (!searchBox) return;

  const places =
    searchBox.getPlaces();

  if (places.length === 0)
    return;

  const place =
    places[0];

  const lat =
    place.geometry.location.lat();

  const lng =
    place.geometry.location.lng();

  const location = {
    lat,
    lng,
  };

  setSelectedLocation(location);

 await onLocationSelect(location);

};

  if (!isLoaded)
    return (
      <p>Loading Map...</p>
    );

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

  const lat =
    event.latLng.lat();

  const lng =
    event.latLng.lng();

  const location = {
    lat,
    lng,
  };

  setSelectedLocation(location);

  await onLocationSelect(
    location
  );

}}
      >

        <Marker
          position={
            selectedLocation
          }
          draggable={true}
         onDragEnd={async (event) => {

  const lat =
    event.latLng.lat();

  const lng =
    event.latLng.lng();

  const location = {
    lat,
    lng,
  };

  setSelectedLocation(location);

  await onLocationSelect(
    location
  );

}}
        />

      </GoogleMap>

    </div>

  );

}