import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

interface Village {
  id: string;
  name: string;
  subdomain: string;
  lat: number;
  lng: number;
  population?: number;
  district?: string;
  regency?: string;
  province?: string;
}

interface IndonesiaMapProps {
  villages: Village[];
  onVillageClick?: (village: Village) => void;
  center?: [number, number];
  zoom?: number;
  height?: string;
  interactive?: boolean;
}

export default function IndonesiaMap({ 
  villages, 
  onVillageClick, 
  center = [-2.5, 118.0], 
  zoom = 5,
  height = '100%',
  interactive = true 
}: IndonesiaMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: center,
      zoom: zoom,
      zoomControl: interactive,
      scrollWheelZoom: interactive,
      dragging: interactive,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 20,
    }).addTo(map);

    mapInstanceRef.current = map;
    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;
    
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) map.removeLayer(layer);
    });

    villages.forEach((village) => {
      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="width:32px;height:32px;background:linear-gradient(135deg,#10b981,#3b82f6);border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid white;box-shadow:0 4px 12px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;"><div style="transform:rotate(45deg);color:white;font-size:12px;">🏘</div></div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      const marker = L.marker([village.lat, village.lng], { icon: customIcon }).addTo(map);
      marker.bindPopup(`
        <div style="font-family:Inter,sans-serif;padding:4px;">
          <h3 style="font-weight:700;font-size:14px;margin:0 0 4px 0;">Desa ${village.name}</h3>
          <p style="font-size:12px;color:#64748b;margin:0;">${village.district || ''}, ${village.regency || ''}</p>
          <p style="font-size:12px;color:#64748b;margin:0;">${village.province || ''}</p>
          <p style="font-size:11px;color:#94a3b8;margin:0;">${village.subdomain}.tanahair.id</p>
          ${village.population ? `<p style="font-size:12px;color:#059669;margin:4px 0 0 0;font-weight:600;">👥 ${village.population.toLocaleString()} penduduk</p>` : ''}
        </div>
      `);
      if (onVillageClick) marker.on('click', () => onVillageClick(village));
    });
  }, [villages]);

  return <div ref={mapRef} style={{ width: '100%', height, borderRadius: 'inherit' }} />;
}
