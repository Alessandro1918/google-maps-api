"use client"
import { useState, useEffect, useRef } from "react"
import { Loader } from "@googlemaps/js-api-loader"
import { MarkerClusterer } from "@googlemaps/markerclusterer"

import { PlaceProps } from "../../../interfaces/PlaceProps"
import { readCsv } from "../../../utils/readCsv.js"
import { getCenter } from "../../../utils/getCenter.js"

//https://developers.google.com/maps/documentation/javascript/marker-clustering?hl=pt-br
export default function Map() {

  const mapRef = useRef<HTMLDivElement>(null)

  const [ places, setPlaces ] = useState<PlaceProps[]>([])

  const [ center, setCenter ] = useState<{lat: number, lng:number}>({lat: 0, lng:0})
  
  // Load data to state (async):
  useEffect(() => {  
    async function loadData() {
      const places = await readCsv()
      setPlaces(places)
      const center = getCenter(places)
      setCenter(center)
    }
    loadData()
  }, [])

  // Load map when I get the data:
  useEffect(() => {

    if (center.lat == 0 && center.lng == 0) return

    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY',
      version: "weekly",
    })

    loader
      .load()
      .then((google) => {
        // Init the map
        const map = new google.maps.Map(
          mapRef.current!, 
          {
            center: center,
            zoom: 6.5
          }
        )

        // Create an info window to share between markers.
        const infoWindow = new google.maps.InfoWindow()

        //Add a Marker for each place
        const markers: google.maps.Marker[] = []
        places.map((place, i) => {
          const marker = new google.maps.Marker({
            map: map,
            position: {
              lat: Number(place["Lat"]),
              lng: Number(place["Lng"])
            },
            // title: place["Name"],
            // label: String(place["Id"])
          })

          // Add a click listener for each marker, and set up the info window.
          const markerInfo = 
          `
          <h3>${place["Name"]}</h3>
          <p>${place["Address"]}</p>
          `
          marker.addListener("click", () => {
            infoWindow.close()
            // infoWindow.setContent(marker.getTitle())
            infoWindow.setContent(markerInfo)
            infoWindow.open(marker.getMap(), marker)
          })

          markers.push(marker)
        })

        // Add a marker clusterer to manage the markers.
        new MarkerClusterer({
          // algorithm?: Algorithm;
          map,
          markers,
          // renderer?: Renderer;
          // onClusterClick?: onClusterClickHandler;
        })
      })
      .catch(e => {
        console.log("Error:", e)
      })
  }, [places])

  return (
    <div 
      ref={mapRef} 
      style={{ 
        height: "400px", 
        width:"100%", 
        backgroundColor:"#CCC" 
      }}
    />
  )
}