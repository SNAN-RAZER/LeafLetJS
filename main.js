// https://geo.ipify.org/api/v1?apiKey=at_NT0UkHgUrWvFt09q49wAgoBvFzoap&ipAddress=8.8.8.8

const apikey="at_NT0UkHgUrWvFt09q49wAgoBvFzoap";
const leafletAPIKey="pk.eyJ1IjoibmF5YWFiMSIsImEiOiJja3U4NDY5c2cwZWhpMnFuejdpdGhtaDlwIn0.rZBtxLMoVWrvbSJsK642qw";

// imput data
const inputAddress=document.querySelector('.ip-address');
const button= document.querySelector('.btn');

// Data points
const ipAddressData=document.querySelector('.ip');
const locationData=document.querySelector('.location');
const timezoneData=document.querySelector('.utc');
const ispData=document.querySelector('.isp');

var mymap;

// function reuse

function reuse(mymap,lat,long,data){
    L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${leafletAPIKey}`, {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'your.mapbox.access.token'
    }).addTo(mymap);

    var locationIcon = L.icon({
        iconUrl: './images/icon-location.svg',
        
    
        iconSize:     [40, 57], // size of the icon
        
        iconAnchor:   [20, 28], // point of the icon which will correspond to marker's location
        
    });
    L.marker([lat,long],{icon:locationIcon}).addTo(mymap).bindPopup(`${data.isp}`);
    ipAddressData.textContent=`${data.ip}`;
    locationData.textContent=`${data.location.region},${data.location.country} ${data.location.postalCode}`;
    timezoneData.textContent=`utc${data.location.timezone}`;
    ispData.textContent=`${data.isp}`;
}

// Intialize function
try{
(async function(){
    const res= await fetch(`https://geo.ipify.org/api/v1?apiKey=${apikey}&ipAddress=192.212.174.101`)
    const data = await res.json();
    const lat = data.location.lat;
    const long = data.location.lng;
    

    console.log(data);
//  Leaflet map
    mymap=L.map('mapid').setView([lat,long], 15);
    mymap.removeControl(mymap.zoomControl);
    mymap.scrollWheelZoom.disable();
 
    reuse(mymap,lat,long,data)
})();
}
catch(err){
    alert("Something went wrong!")
    console.log(err);
}




try{
async function getData(){
    
    const res= await fetch(`https://geo.ipify.org/api/v1?apiKey=${apikey}&ipAddress=${inputAddress.value}`)
    const data = await res.json();
    const lat = data.location.lat;
    const long = data.location.lng;
   


//  Leaflet map
    mymap.setView(new L.LatLng(lat,long), 15);
    
   
    reuse(mymap,lat,long,data);
}
button.addEventListener('click',getData);
}
catch(err){
    alert("something went wrong Refresh please");
    console.log(err);
}

// function to fetch data
