//Given a list of places, get the coordinates of the point between all of them, to center the map view
export function getCenter(places) {

  let minLat = 180
  let maxLat = 0
  let minLong = 180
  let maxLong = 0

  places.map(place => {
    const lat = Number(place["Lat"])
    if (Math.abs(lat) < Math.abs(minLat)) {minLat = lat}
    if (Math.abs(lat) > Math.abs(maxLat)) {maxLat = lat}

    const long = Number(place["Long"])
    if (Math.abs(long) < Math.abs(minLong)) {minLong = long}
    if (Math.abs(long) > Math.abs(maxLong)) {maxLong = long}
  })
  // console.log(minLat, (minLat + maxLat) / 2, maxLat, minLong, (minLong + maxLong) / 2, maxLong)

  return { 
    lat: (minLat + maxLat) / 2, 
    lng: (minLong + maxLong) / 2 
  }
}