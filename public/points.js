import { readCsv } from "./readCsv.js"

// Initialize and add the map
async function initMap() {

  const center = { lat: -25.344, lng: 131.031 }

  // const places = [
  //   { lat: -25.344, lng: 131.031 }, 
  //   { lat: -24.344, lng: 132.031 }
  // ]
  const places = await readCsv()

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: center,
  })

  // const marker = new google.maps.Marker({
  //   position: center,
  //   map: map,
  // })
  places.map(place => {
    new google.maps.Marker({
      map: map,
      position: {
        lat: Number(place["Lat"]),
        lng: Number(place["Long"])
      }
    })
  }) 
}

window.initMap = initMap;