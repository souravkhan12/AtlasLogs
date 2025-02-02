import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useCities } from "./contexts/CitiesContext";
import { useEffect, useRef, useState } from "react";
import styles from "./Map.module.css";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import useUrlPosition from "../hooks/useUrlPosition";

function Map() {
  const { cities } = useCities();
  const navigate = useNavigate();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const isChanged = useRef(null);
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
    cnt: DoesUseCurrentClicked,
  } = useGeolocation();

  const [mapLat, mapLng] = useUrlPosition();
  useEffect(() => {
    if (
      isChanged.current === null &&
      DoesUseCurrentClicked === 1 &&
      geoLocationPosition
    ) {
      navigate(
        `form?lat=${geoLocationPosition.lat}&lng=${geoLocationPosition.lng}`
      );
      isChanged.current = "changed";
    }
  }, [DoesUseCurrentClicked, geoLocationPosition, navigate]);

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geoLocationPosition) {
      setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
    }
  }, [geoLocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use Your current Location"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        className={styles.map}
        zoom={15}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;
