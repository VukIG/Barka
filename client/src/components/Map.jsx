import { useRef, useEffect } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

function Map({ ports, onPortSelect }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: "https://tiles.openfreemap.org/styles/dark",
      center: [16.4, 43.5],
      zoom: 7,
      attributionControl: false,
    });
    mapRef.current = map;

    const maxBoats = Math.max(...ports.map((p) => p.boats), 1);

    const portData = {
      type: "FeatureCollection",
      features: ports.map((port) => ({
        type: "Feature",
        properties: {
          name: port.name,
          boats: port.boats,
          color: port.color ?? "#53d8fb",
        },
        geometry: {
          type: "Point",
          coordinates: [port.longitude, port.latitude],
        },
      })),
    };

    map.on("load", () => {
      map.resize();
      map.fitBounds(
        [
          [13.0, 42.0],
          [19.5, 45.9],
        ],
        { padding: 30, duration: 0 },
      );

      map.addSource("ports", { type: "geojson", data: portData });

      map.addLayer({
        id: "heat",
        type: "heatmap",
        source: "ports",
        paint: {
          "heatmap-weight": [
            "interpolate",
            ["linear"],
            ["get", "boats"],
            0,
            0,
            maxBoats,
            1,
          ],
          "heatmap-intensity": 1.6,
          "heatmap-radius": 80,
          "heatmap-opacity": 0.65,
          "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0,
            "rgba(6,20,29,0)",
            0.15,
            "#0d5a63",
            0.4,
            "#278c91",
            0.65,
            "#53d8fb",
            0.85,
            "#ffbf69",
            1,
            "#ff735c",
          ],
        },
      });

      map.addLayer({
        id: "glow",
        type: "circle",
        source: "ports",
        paint: {
          "circle-radius": 16,
          "circle-color": ["get", "color"],
          "circle-opacity": 0.28,
          "circle-blur": 1,
        },
      });

      map.addLayer({
        id: "dots",
        type: "circle",
        source: "ports",
        paint: {
          "circle-radius": 5,
          "circle-color": ["get", "color"],
          "circle-stroke-color": "#eafbff",
          "circle-stroke-width": 1.5,
        },
      });

      map.addLayer({
        id: "labels",
        type: "symbol",
        source: "ports",
        layout: {
          "text-field": ["get", "name"],
          "text-font": ["Noto Sans Regular"],
          "text-size": 12,
          "text-offset": [0, -1.4],
          "text-anchor": "bottom",
        },
        paint: {
          "text-color": "#d7ecee",
          "text-halo-color": "#06141d",
          "text-halo-width": 1.4,
        },
      });

      map.on("click", "dots", (e) => {
        const clicked = e.features[0];
        const port = ports.find((p) => p.name === clicked.properties.name);
        if (port) onPortSelect(port);
      });
      map.on(
        "mouseenter",
        "dots",
        () => (map.getCanvas().style.cursor = "pointer"),
      );
      map.on("mouseleave", "dots", () => (map.getCanvas().style.cursor = ""));
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [ports]);

  return <div ref={containerRef} className="absolute inset-0 h-full w-full" />;
}

export default Map;
