//Given a list of places, get the coordinates of the point between all of them, to center the map view
//"place" type: src / interfaces / PlaceProps
export function getCenter(places) {

  let minLat = 180
  let maxLat = 0
  let minLng = 180
  let maxLng = 0

  places.map(place => {
    const lat = place["Lat"]
    if (Math.abs(lat) < Math.abs(minLat)) {minLat = lat}
    if (Math.abs(lat) > Math.abs(maxLat)) {maxLat = lat}

    const long = place["Lng"]
    if (Math.abs(long) < Math.abs(minLng)) {minLng = long}
    if (Math.abs(long) > Math.abs(maxLng)) {maxLng = long}
  })
  // console.log(minLat, (minLat + maxLat) / 2, maxLat, minLng, (minLng + maxLng) / 2, maxLng)

  return { 
    lat: (minLat + maxLat) / 2, 
    lng: (minLng + maxLng) / 2 
  }
}