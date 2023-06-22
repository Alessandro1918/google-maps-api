// Initialize and add the map
function initMap() {

  const point1 = { lat: -25.344, lng: 131.031 };

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: point1,
  });

  const marker = new google.maps.Marker({
    position: point1,
    map: map,
  });
}

window.initMap = initMap;