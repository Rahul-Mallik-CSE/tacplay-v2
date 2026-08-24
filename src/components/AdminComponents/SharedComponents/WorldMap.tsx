"use client"

import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps"

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

interface WorldMapProps {
  highlightedCountries?: string[]
}

export default function WorldMap({
  highlightedCountries = [],
}: WorldMapProps) {
  return (
    <div className="w-full h-[200px] sm:h-[250px]">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 120,
          center: [10, 40],
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const isHighlighted = highlightedCountries.includes(
                geo.properties.iso_a3 || geo.id
              )
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={isHighlighted ? "#EAB308" : "#2a2a3e"}
                  stroke="#3a3a4e"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none", fill: isHighlighted ? "#EAB308" : "#3a3a5e" },
                    pressed: { outline: "none" },
                  }}
                />
              )
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  )
}
