import React, { useEffect, useRef } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { StadiaMaps } from "ol/source";
import { useGeographic } from "ol/proj";

import "ol/ol.css";
import { Draw } from "ol/interaction";

useGeographic();

const map = new Map({
  view: new View({ center: [10.8, 59.9], zoom: 13 }),
  layers: [
    new TileLayer({
      source: new StadiaMaps({
        layer: "outdoors",
      }),
    }),
  ],
});

interface DrawPointButtonProps {
  map: Map;
}

function DrawPointButton({ map }: DrawPointButtonProps) {
  function handleClick() {
    map.addInteraction(
      new Draw({
        type: "Point",
      }),
    );
  }

  return <button onClick={handleClick}> Add point</button>;
}

// A functional React component
export function Application() {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    map.setTarget(mapRef.current!);
  }, []);

  return (
    <>
      <DrawPointButton map={map} />
      <div ref={mapRef}></div>
    </>
  );
}
