const map = L.map('map').setView([1.3521, 103.8198], 12);

// OneMap base layer
L.tileLayer('https://maps-{s}.onemap.sg/v3/Default/{z}/{x}/{y}.png', {
  attribution: 'Map data © Singapore Land Authority',
  subdomains: ['a', 'b', 'c']
}).addTo(map);

// Add address search control using OneMap API (via Nominatim fallback for demo)
L.Control.geocoder({
  defaultMarkGeocode: false
})
  .on('markgeocode', function(e) {
    const bbox = e.geocode.bbox;
    const poly = L.polygon([
      [bbox.getSouthEast().lat, bbox.getSouthEast().lng],
      [bbox.getNorthEast().lat, bbox.getNorthEast().lng],
      [bbox.getNorthWest().lat, bbox.getNorthWest().lng],
      [bbox.getSouthWest().lat, bbox.getSouthWest().lng]
    ]).addTo(map);
    map.fitBounds(poly.getBounds());
    L.marker(e.geocode.center).addTo(map).bindPopup(e.geocode.name).openPopup();
  })
  .addTo(map);

// Add routing button (opens OneMap routing in new tab)
const routingButton = L.control({position: 'topright'});
routingButton.onAdd = function () {
  const div = L.DomUtil.create('div', 'leaflet-bar');
  div.innerHTML = '<a href="https://www.onemap.gov.sg/routes" target="_blank" title="Open Routing">🧭</a>';
  return div;
};
routingButton.addTo(map);

// Example marker
L.marker([1.3521, 103.8198]).addTo(map)
  .bindPopup("Example Hotspot: Central SG");