'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

// Fix for default marker icons in Next.js
const DefaultIcon = L.icon({
  iconUrl: '/images/location.svg',
  iconRetinaUrl: '/images/location.svg',
  shadowUrl: '/images/location.svg',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function LeafletMap({ center }: { center: [number, number] }) {
  useEffect(() => {
    // Set the default icon when component mounts
    L.Marker.prototype.options.icon = DefaultIcon;
  }, []);

  return (
    <div className="border border-gray-200 rounded-md overflow-hidden">
      <MapContainer 
        center={center} 
        zoom={19} 
        style={{ height: '300px', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={center}>
          <Popup>Our Location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}