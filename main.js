const map = L.map('map').setView([1.3521, 103.8198], 12);

// Replace <YOUR_TOKEN> with your OneMap API token
const tileUrl = `https://tiles.onemap.sg/v3/Default/{z}/{x}/{y}.png?token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo4MTI0LCJmb3JldmVyIjpmYWxzZSwiaXNzIjoiT25lTWFwIiwiaWF0IjoxNzU0MTQ0Mzc2LCJuYmYiOjE3NTQxNDQzNzYsImV4cCI6MTc1NDQwMzU3NiwianRpIjoiYTljNzc5YzktMjk3NS00Zjg2LThiMTgtZjhmZGZiZjc2MjY1In0.JJeGkgNtX1XnFusye2Z1yetH9--8v47_H_IFTmXD60-NhCoHCuHJ1kZChqyNpjGPhREns1wgDphfzBIxlZNXfaASxuxSKGFRSRoIaawMw4iVqPLnaWrusc6AoX4QyUUt8ZvXBW0IEFRPutqwE1hi_AHFA-aGC6ik_1cLYLUrBRYABxXV1FTA99F0azYdp-wakXvwdmq2nW4MBHM6Mr7MKgJA0k8QOCDZrzgw8PAEmH-EsJLctO6LiYbmcG9GgyNUCcrEC4Q8m9SSZGT8GAKrw26OBeDC6G5Ta1ST3FiNVV4r-H5UIQacVNAAEWiIHPl3KLv5QtgCfkhfAbMvdZKHYw`;

L.tileLayer(tileUrl, {
  maxZoom: 18,
  attribution: 'Map data © SLA OneMap'
}).addTo(map);

L.marker([1.353,103.82]).addTo(map)
  .bindPopup("Example Hotspot")
  .openPopup();

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
