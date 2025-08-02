const token = 'YOUR_ONEMAP_TOKEN_HERE';  eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo4MTI0LCJmb3JldmVyIjpmYWxzZSwiaXNzIjoiT25lTWFwIiwiaWF0IjoxNzU0MTQ0Mzc2LCJuYmYiOjE3NTQxNDQzNzYsImV4cCI6MTc1NDQwMzU3NiwianRpIjoiYTljNzc5YzktMjk3NS00Zjg2LThiMTgtZjhmZGZiZjc2MjY1In0.JJeGkgNtX1XnFusye2Z1yetH9--8v47_H_IFTmXD60-NhCoHCuHJ1kZChqyNpjGPhREns1wgDphfzBIxlZNXfaASxuxSKGFRSRoIaawMw4iVqPLnaWrusc6AoX4QyUUt8ZvXBW0IEFRPutqwE1hi_AHFA-aGC6ik_1cLYLUrBRYABxXV1FTA99F0azYdp-wakXvwdmq2nW4MBHM6Mr7MKgJA0k8QOCDZrzgw8PAEmH-EsJLctO6LiYbmcG9GgyNUCcrEC4Q8m9SSZGT8GAKrw26OBeDC6G5Ta1ST3FiNVV4r-H5UIQacVNAAEWiIHPl3KLv5QtgCfkhfAbMvdZKHYw
const map = L.map('map').setView([1.3521, 103.8198], 12);

const tileUrl = `https://tiles.onemap.sg/v3/Default/{z}/{x}/{y}.png?token=${token}`;

L.tileLayer(tileUrl, {
  maxZoom: 18,
  crossOrigin: 'anonymous',
  attribution: 'Map data © SLA OneMap'
}).addTo(map);

L.marker([1.353, 103.82]).addTo(map)
  .bindPopup('Example Hotspot')
  .openPopup();
