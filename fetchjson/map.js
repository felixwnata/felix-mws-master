let mymap, popup;
let places = [];

let jdl = document.getElementById("judul");
let judul = document.createElement("h2");
jdl.appendChild(judul);

let loc = document.getElementById("loc");
let loca = document.createElement("p");
loc.appendChild(loca);

let phn = document.getElementById("phone");
let phone = document.createElement("p");
phn.appendChild(phone);

let rev = document.getElementById("review");
let par = document.createElement("p");
rev.appendChild(par);

let gmb = document.getElementById("gmb");
let img = document.createElement("img");
gmb.appendChild(img);

function map() {
  mymap = L.map("mapid").setView([-6.219912, 106.789352], 16);

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

*/
  popup = L.popup();
}

map();
/*
function onMapClick(e) {
popup
  .setLatLng(e.latlng)
  .setContent("Location: " + e.latlng.toString())
  .openOn(mymap);
}
mymap.on("click", onMapClick);
*/

function findLocation(x, y) {
  // console.log(x,y);
  for (var i = 0; i < places.length; i++) {
    if (places[i].lokasi[0] == x && places[i].lokasi[1] == y) {
      return i;
    }
  }
  return -1;
}

function showLocation(e) {
  //console.log("you clicked " + e.latlng.lat + " dan "+ e.latlng.lng);
  let ix = findLocation(e.latlng.lat, e.latlng.lng);

  if (ix >= 0) {
    judul.textContent = places[ix].sponsor;
    loca.textContent = places[ix].location;
    phone.textContent = places[ix].phone;
    par.textContent = places[ix].review;
    img.src = places[ix].gambar;

    /* 
      SCRIPT TAMBAHAN KHUSUS 
      UNTUK NAMPILIN POP UP MODAL BOX KETIKA MAP DI CLICK
      */

    // Get the modal
    let modal = document.getElementById("myModal");

    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[0];

    // When the user clicks the area, open the modal
    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  }
}

const URL = "data.json";

fetch(URL)
  .then(res => res.json())
  .then(
    data => {
      places = data.places;
      for (var p of places) {
        var marker = L.marker(p.lokasi)
          .addTo(mymap)
          .bindPopup(p.sponsor);
        marker.on("click", showLocation);
      }
    }
    //Untuk memasukkan data ke dalam local storage ( hanya bisa untuk 1 objek string )
    //stringify untuk ngubah format dari JSON jadi string
    //Pakai cara ini karena saat set places hasilnya tetep kosong

    //localStorage.setItem("places", JSON.stringify(data.places))
  )
  .catch(err => {
    alert("Some errors happened when retriving data");
    console.log(err);
  });

//Untuk ngambil dari local stroge dan di convert jadi JSON
//places = JSON.parse(localStorage.getItem("places"));
