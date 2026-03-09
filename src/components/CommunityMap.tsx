import { useEffect, useRef } from "react";
import L from "leaflet";
import { CURRICULA_LABELS, type Community } from "@/data/communities";
import "leaflet/dist/leaflet.css";

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

interface CommunityMapProps {
  communities: Community[];
}

const CommunityMap = ({ communities }: CommunityMapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);

  // Initialize map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    mapRef.current = L.map(containerRef.current).setView([-29, 25], 6);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(mapRef.current);

    markersRef.current = L.layerGroup().addTo(mapRef.current);

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // Update markers when communities change
  useEffect(() => {
    if (!mapRef.current || !markersRef.current) return;

    markersRef.current.clearLayers();

    if (communities.length === 0) return;

    communities.forEach((c) => {
      const curricula = c.curricula
        .map((cur) => `<span style="display:inline-block;border:1px solid #ddd;border-radius:4px;padding:1px 6px;margin:2px 2px 0 0;font-size:10px;background:#f9f9f9">${CURRICULA_LABELS[cur]}</span>`)
        .join("");

      const popup = `
        <div style="font-family:system-ui;max-width:260px">
          <div style="margin-bottom:4px">
            <span style="font-size:10px;font-weight:600;padding:2px 8px;border-radius:12px;background:${c.spots.includes("Waitlist") ? "#fef2f2" : "#f0fdf4"};color:${c.spots.includes("Waitlist") ? "#dc2626" : "#16a34a"}">${c.spots}</span>
          </div>
          <div style="font-weight:700;font-size:14px;margin-bottom:2px">${c.name}</div>
          <div style="font-size:12px;color:#888;margin-bottom:6px">📍 ${c.location}</div>
          <div style="font-size:12px;color:#555;line-height:1.5;margin-bottom:6px">${c.description.slice(0, 120)}…</div>
          <div style="font-size:11px;color:#666;margin-bottom:4px">👥 ${c.ages} &nbsp;·&nbsp; 📅 ${c.days}</div>
          <div style="margin-bottom:6px">${curricula}</div>
          <div style="font-weight:700;font-size:15px;border-top:1px solid #eee;padding-top:6px">${c.price}</div>
        </div>
      `;

      L.marker([c.lat, c.lng])
        .bindPopup(popup, { minWidth: 240, maxWidth: 300 })
        .addTo(markersRef.current!);
    });

    const bounds = L.latLngBounds(communities.map((c) => [c.lat, c.lng] as [number, number]));
    mapRef.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
  }, [communities]);

  return (
    <div className="overflow-hidden rounded-xl border" style={{ height: 540 }}>
      <div ref={containerRef} style={{ height: "100%", width: "100%" }} />
    </div>
  );
};

export default CommunityMap;
