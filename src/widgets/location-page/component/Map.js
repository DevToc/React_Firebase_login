import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Circle,
} from "react-google-maps";
import { globalUtils } from "../../../utils";

const Map = ({ longitude = -97.137123, latitude = 49.88446, radius = 0, countryCode = 'IN' }) => {
  if (longitude === "") longitude = globalUtils.getCountryProperty('longitude', countryCode);
  if (latitude === "") latitude = globalUtils.getCountryProperty('latitude', countryCode);
  if (radius === "") radius = 0;

  return (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={{ lat: latitude, lng: longitude }}
      center={{ lat: latitude, lng: longitude }}
      zoom={12}
    >
      <Circle
        defaultCenter={{ lat: latitude, lng: longitude }}
        center={{ lat: latitude, lng: longitude }}
        defaultRadius={radius * 1000}
        radius={radius * 1000}
        options={{
          strokeColor: "rgba(140, 69, 11, 1)",
          fillColor: "rgba(140, 69, 11, 0.7)",
          strokeWeight: 1,
        }}
      />
    </GoogleMap>
  );
};

export default withScriptjs(withGoogleMap(Map));
