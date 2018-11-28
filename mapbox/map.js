function myFunction() {
  document.getElementsByClassName("topnav")[0].classList.toggle("responsive");
}
var mymap, popup;

function map() {
  mymap = L.map("mapid").setView([-6.201506, 106.781571], 16);

  L.tileLayer(
    "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
    {
      attribution:
        "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>,Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
      maxZoom: 20,
      id: "mapbox.streets",
      accessToken:
        "pk.eyJ1IjoiZmVsaXh3aW5hdGEiLCJhIjoiY2puOXlsdXprMDZ4MjN3bjh0MWZxa2pxcCJ9.etmhC8K9TghVsUeUcmpUjQ"
    }
  ).addTo(mymap);

  /*
        var marker = L.marker([-6.201506, 106.781571]).addTo(mymap);
        var circle = L.circle([-6.221028, 106.791434], { color: 'red', fillColor: '#f03', fillOpacity: 0.5, radius: 1000 }).addTo(mymap);
    */

  let places = [
    { lokasi: [-6.201506, 106.781571], sponsor: "Binus" },
    { lokasi: [-6.202316, 106.779554], sponsor: "Makaroni" },
    { lokasi: [-6.200482, 106.782493], sponsor: "What's Up Cafe" },
    { lokasi: [-6.202562, 106.782869], sponsor: "D'Cost Seafood" },
    { lokasi: [-6.200087, 106.782944], sponsor: "KFC" }
  ];

  for (var p of places) {
    var marker = L.marker(p.lokasi)
      .addTo(mymap)
      .bindPopup(p.sponsor);
  }

  popup = L.popup();
}

map();

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("Location: " + e.latlng.toString())
    .openOn(mymap);
}
mymap.on("click", onMapClick);
