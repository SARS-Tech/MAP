import React, { useState, useEffect } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  CircleMarker,
  Circle,
  Tooltip,
} from "react-leaflet";
import leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
// import CustomImageMarker from "./CustomImageMarker";

const Map = () => {
  const [windData, setWindData] = useState({
    lat: "",
    lng: "",
    a_10_speed: 0,
    a_50_speed: 0,
    a_100_speed: 0,
    a_10_direction: "",
    a_50_direction: "",
    a_100_direction: "",
  });
  // const [display, setDisplay] = useState("none");
  const zoomLevel = 12;

  const markericon = new leaflet.Icon({
    // iconUrl: require("C:/Users/Lenovo/Desktop/Learn React/locationmap/src/images/placeholder.png"),
    iconUrl: '/icons8-location-48.png',
    iconSize: [48, 48],
    iconAnchor: [24, 48],
    // popupAnchor: [0, -46],
  });

  const onSuccess = (windData) => {
    setWindData({
      lat: windData.coords.latitude,
      lng: windData.coords.longitude,
      a_10_speed: 10 * 10,
      a_50_speed: 50 * 10,
      a_100_speed: 100 * 10,
      // possible values: N|S|E|W   NE|NW|NS SE|SW|SN so on...
      a_10_direction: "",
      a_50_direction: "",
      a_100_direction: "",
    });
  };

  const onError = (error) => {
    setWindData({
      error: {
        code: error.code,
        message: error.message,
      },
    });
    console.log("Error:", error.message);
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);
  let circleAdjusment = 0.00001;

  const imageIcon = new leaflet.DivIcon({
    className: "my-custom-icon", // Optional, can style in CSs
    // https://cdn-icons-png.flaticon.com/512/20/20825.png
    // style: { display: { display } },
    html: `<img src="https://cdn-icons-png.flaticon.com/512/20/20902.png" alt="my-icon" style="width:50px;height:50px" />`,
    iconSize: [50, 50],
  });
  const imageIcon1 = new leaflet.DivIcon({
    className: "my-custom-icon", // Optional, can style in CSs
    // https://cdn-icons-png.flaticon.com/512/20/20825.png
    // style: { display: { display } },
    html: `<img src="https://cdn-icons-png.flaticon.com/512/20/20902.png" alt="my-icon" style="width:50px;height:50px" />`,
    iconSize: [50, 50],
  });

  return (
    <>
      {windData.lat == "" && windData.lng == "" ? (
        "..."
      ) : (
        <MapContainer
          center={[windData.lat, windData.lng]}
          zoom={zoomLevel}
          style={{ height: "600px", width: "100%" }}
        >
          <TileLayer
            url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=YqUn4ZF2ivinZYoKFv3X"
            // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            // url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={[windData.lat, windData.lng]} icon={markericon}>
            <Popup>⛅</Popup>
          </Marker>

          <Circle
            center={[
              windData.lat - circleAdjusment,
              windData.lng + circleAdjusment,
            ]}
            pathOptions={{ color: "green" }}
            radius={parseInt(windData.a_10_speed)}
            style={{display:"none"}}
          ></Circle>
          <Marker
            position={[
              windData.lat - circleAdjusment,
              windData.lng + circleAdjusment,
            ]}
            icon={imageIcon}
          />

          <Circle
            center={[
              windData.lat - circleAdjusment,
              windData.lng + circleAdjusment,
            ]}
            pathOptions={{ color: "blue" }}
            radius={parseInt(windData.a_50_speed)}
          ></Circle>

          <Marker
            position={[
              windData.lat - circleAdjusment,
              windData.lng + circleAdjusment,
            ]}
            icon={imageIcon}
          />

          <Circle
            center={[
              windData.lat - circleAdjusment,
              windData.lng + circleAdjusment,
            ]}
            pathOptions={{ color: "red" }}
            radius={parseInt(windData.a_100_speed)}
          >
          </Circle>
          <Marker
            position={[
              windData.lat - circleAdjusment,
              windData.lng + circleAdjusment,
            ]}
            icon={imageIcon}
          />
        </MapContainer>
      )}
      {/* <button onClick={() => setDisplay("block")}> a_10</button>
      <button onClick={() => setDisplay("block")}> a_50</button>
      <button onClick={() => setDisplay("block")}> a_100</button> */}
    </>
  );
};

export default Map;