"use client"
import { useState, useEffect, useRef } from "react"
import { Loader } from "@googlemaps/js-api-loader"

import { PlaceProps } from "../../../interfaces/PlaceProps"
import { readCsv } from "../../../utils/readCsv.js"
import { getCenter } from "../../../utils/getCenter.js"

export function Map() {

  const mapRef = useRef<HTMLDivElement>(null)

  // const places = [
  //   { lat: -25.344, lng: 131.031 }, 
  //   { lat: -24.344, lng: 132.031 }
  // ]
  const [ places, setPlaces ] = useState<PlaceProps[]>([])

  // const center = { lat: -25.344, lng: 131.031 }
  const [ center, setCenter ] = useState<{lat: number, lng:number}>({lat: 0, lng:0})
  
  //load data to state (async):
  useEffect(() => {  
    async function loadData() {
      const places = await readCsv()
      setPlaces(places)
      const center = getCenter(places)
      setCenter(center)
    }
    loadData()
  }, [])

  //load map when I get the data:
  useEffect(() => {

    if (center.lat == 0 && center.lng == 0) return

    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY',
      version: "weekly",
    })

    loader
      .load()
      .then((google) => {
        const map = new google.maps.Map(
          mapRef.current!, 
          {
            center: center,
            zoom: 6.5
          }
        )
        places.map(place => {
          const marker = new google.maps.Marker({
            map: map,
            position: {
              lat: Number(place["Lat"]),
              lng: Number(place["Long"])
            }
          })
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