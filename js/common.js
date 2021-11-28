
const wayFromTo = {
  from: "",
  to: ""
}

// Layer map
var map = L.map('mapid', {

}).setView([50.80925310310907, -0.1361937699561519], 3);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidmVyc3N0YWNoaSIsImEiOiJja3Q1bjI1OG0wYTB1MndwaG0wZTI0eG0yIn0.KW23CHoSsSdBk52ntlTaRA', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox/dark-v10',
  // tileSize: 256,
  zoomControl: false,
  accessToken: 'pk.eyJ1IjoidmVyc3N0YWNoaSIsImEiOiJja3Q1bjI1OG0wYTB1MndwaG0wZTI0eG0yIn0.KW23CHoSsSdBk52ntlTaRA',
  style: 'mapbox://styles/mapbox/dark-v10',
}).addTo(map);



map.options.maxZoom = 20;
map.options.minZoom = 3;
map.removeControl(map.zoomControl);

function clickZoom(e) {
  map.setView(e.target.getLatLng(), 5);
}



var markers = [
  [23.135044427508504, -82.42811672821004, "MSC SEASIDE", "stay", "notification_warning", "2"],
  [42.33975833769053, -70.98629466906411, "BUNGA LOTUS", "anchor", "notification_status", "1"]
];

//Loop through the markers array
for (var i = 0; i < markers.length; i++) {
  var lon = markers[i][0];
  var lat = markers[i][1];
  var marker;
  var markerIcon = L.divIcon(
    {
      html: `
    <div class='marker__image ${markers[i][3]}'><img src='img/marker-icon-${markers[i][5]}.png' alt=''></div>
    <div class='marker__image_container ${markers[i][3]} ${markers[i][4]}'>
      <div class='marker__image_label'>
        <div class='marker__image_title'>${markers[i][2]}</div>
        <div class='marker__label__status'>Under way</div>  
      </div>
      <div class='popup'>Catanzaro<img src='img/arrow-forward-poup.svg' alt=''>Taranto<div class='popup_status'>Normal</div></div>
    </div>
    `,
      className: 'marker-label',
    });
  var markerLocation = new L.LatLng(lon, lat);
  marker = new L.marker(markerLocation, { icon: markerIcon }).addTo(map).on('click', clickZoom);
  map.addLayer(marker);
  marker.addTo(map).on('click', function () {
    sidebar.toggle();
    document.querySelector(".notification_panel").classList.remove('active');
    document.querySelector(".all_vessel_tab").classList.remove('active');
    document.querySelector(".voyage_panel").classList.remove('active');
  });
}

var markerIconOne = L.divIcon(
  {
    html: `
  <div class='marker__image' style="margin-top: -28px;"><img src='img/marker-icon-3.png' alt=''></div>
  <div class='marker__image_container normal'>
    <div class='marker__image_label'>
      <div class='marker__image_title'>MSC SEASIDE</div>
      <div class='marker__label__status'>Under way</div>  
    </div>
    <div class='popup'>Catanzaro<img src='img/arrow-forward-poup.svg' alt=''>Taranto<div class='popup_status'>Normal</div></div>
  </div>
  `,
    className: 'marker-label',
    iconAnchor: [53.5, 9.9]
  });
// var markerOne = L.marker([53.5, 9.9],
//  {icon: markerIconOne}).addTo(map).on('click', clickZoom);

// // zoom in function
var zoomIn = document.getElementById('in');
zoomIn.addEventListener('click', function zoomInFunc() {
  map.setZoom(map.getZoom() + 1)
}, false);

// // zoom out function
var zoomOut = document.getElementById('out');
zoomOut.addEventListener('click', function zoomInFunc() {
  map.setZoom(map.getZoom() - 1)
}, false);

//  map sidebar
var sidebar = L.control.sidebar('sidebar', {
  closeButton: true,
  position: 'left',
  container: 'sidebar',
});
map.addControl(sidebar);
map.on('click', function () {
  sidebar.hide();
});
// marker.addTo(map).on('click', function () {
//   sidebar.toggle(); 
//   document.querySelector(".notification_panel").classList.remove('active');  
//   document.querySelector(".all_vessel_tab").classList.remove('active'); 
//   document.querySelector(".voyage_panel").classList.remove('active');   
// });
// markerAnchor.addTo(map).on('click', function () {
//   sidebar.toggle(); 
//   document.querySelector(".notification_panel").classList.remove('active');  
//   document.querySelector(".all_vessel_tab").classList.remove('active'); 
//   document.querySelector(".voyage_panel").classList.remove('active');   
// });
// markerStay.addTo(map).on('click', function () {
//   sidebar.toggle(); 
//   document.querySelector(".notification_panel").classList.remove('active');  
//   document.querySelector(".all_vessel_tab").classList.remove('active'); 
//   document.querySelector(".voyage_panel").classList.remove('active');   
// });
// end map sidebar


// panel open
var voyagePanelOpen = document.querySelector(".voyage_link_open");
voyagePanelOpen.addEventListener('click', function voyagePanelOpenFucn() {
  document.querySelector(".voyage_panel").classList.toggle('active');
  sidebar.hide();
  document.getElementById('weather_panel').classList.remove("weather_panel_open");
  document.getElementById('voyage_way_form').classList.remove("voyage_form_close");
  document.getElementById('voyage_way_result').classList.remove("voyage_form_open");
}, false);

var notificationOpen = document.querySelector(".notification_link_open");
notificationOpen.addEventListener('click', function notificationOpenFucn() {
  document.querySelector(".notification_panel").classList.toggle('active');
  sidebar.hide();
}, false);

var allVesselTabOpen = document.querySelector(".all_vessel_tab_open");
allVesselTabOpen.addEventListener('click', function allVesselTabOpenFunc() {
  document.querySelector(".all_vessel_tab").classList.toggle('active');
  sidebar.hide();
}, false);

var allVesselTabClose = document.querySelector(".all_vessel_tab_close");
allVesselTabClose.addEventListener('click', function allVesselTabCloseFunc() {
  document.querySelector(".all_vessel_tab").classList.toggle('active');
}, false);

var allTabClose = document.querySelector(".voyage_link_map");
allTabClose.addEventListener('click', function allTabCloseFunc() {
  document.querySelector(".all_vessel_tab").classList.remove('active');
  document.querySelector(".all_vessel_tab").classList.remove('active');
  document.querySelector(".notification_panel").classList.remove('active');
  document.querySelector(".voyage_panel").classList.remove('active');
  document.getElementById('weather_panel').classList.remove("weather_panel_open");
  sidebar.hide();
}, false);
// end panel open






var yourApiKey = 'faeeb9b8701d5f1c36c00e9f016cc027';

var time = 1631311395;
// var time = 1631314995;
// var time = 1631318595;
// var time = 1631322195;
// var time = 1631325795;
// var time = 1631336595;

var cloudsLayer = L.tileLayer('https://maps.openweathermap.org/maps/2.0/weather/CL/{z}/{x}/{y}?date=' + time + '&palette=0:FFFFFF00;10:FDFDFF19;20:FCFBFF26;30:FAFAFF33;40:F9F8FF4C;50:F7F7FF66;60:F6F5FF8C;70:F4F4FFBF;80:E9E9DFCC;90:DEDEDED8;100:D2D2D2FF;200:D2D2D2FF &opacity=0.3&appid=faeeb9b8701d5f1c36c00e9f016cc027', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox/dark-v10',
  // tileSize: 256,
  zoomControl: false,
  edgeBufferTiles: 5,
  accessToken: 'pk.eyJ1IjoidmVyc3N0YWNoaSIsImEiOiJja3Q1bjI1OG0wYTB1MndwaG0wZTI0eG0yIn0.KW23CHoSsSdBk52ntlTaRA',
  style: 'mapbox://styles/mapbox/dark-v10',
});
var windLayer = L.tileLayer('https://maps.openweathermap.org/maps/2.0/weather/WS10/{z}/{x}/{y}?date=' + time + '&opacity=0.3&palette=1:FFFFFF;5:9EB2F6;15:557BFF;25:406AFF;50:2455FF;100:1343EC;200:11225E&appid=faeeb9b8701d5f1c36c00e9f016cc027', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox/dark-v10',
  // tileSize: 256,
  zoomControl: false,
  edgeBufferTiles: 5,
  accessToken: 'pk.eyJ1IjoidmVyc3N0YWNoaSIsImEiOiJja3Q1bjI1OG0wYTB1MndwaG0wZTI0eG0yIn0.KW23CHoSsSdBk52ntlTaRA',
  style: 'mapbox://styles/mapbox/dark-v10',
});
var tempLayer = L.tileLayer('https://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?date=' + time + '&opacity=0.3&palette=-65:C322DB;-55:C322DB;-45:C322DB;-40:C322DB;-30:9765FF;-20:2698FD;-10:20C4E8;0:23DDDD;10:C2FF28;20:FFF028;25:FFC228;30:FC8014&appid=faeeb9b8701d5f1c36c00e9f016cc027', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox/dark-v10',
  // tileSize: 256,
  zoomControl: false,
  edgeBufferTiles: 5,
  accessToken: 'pk.eyJ1IjoidmVyc3N0YWNoaSIsImEiOiJja3Q1bjI1OG0wYTB1MndwaG0wZTI0eG0yIn0.KW23CHoSsSdBk52ntlTaRA',
  style: 'mapbox://styles/mapbox/dark-v10',
});
var rainLayer = L.tileLayer('https://maps.openweathermap.org/maps/2.0/weather/PAC0/{z}/{x}/{y}?date=' + time + '&opacity=0.6&appid=faeeb9b8701d5f1c36c00e9f016cc027', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox/dark-v10',
  // tileSize: 256,
  zoomControl: false,
  edgeBufferTiles: 5,
  accessToken: 'pk.eyJ1IjoidmVyc3N0YWNoaSIsImEiOiJja3Q1bjI1OG0wYTB1MndwaG0wZTI0eG0yIn0.KW23CHoSsSdBk52ntlTaRA',
  style: 'mapbox://styles/mapbox/dark-v10',
});


// rainLayer.addTo(map); 
var weatherCloudsPanel = document.getElementById("weather_clouds_panel");
weatherCloudsPanel.addEventListener('click', function weatherCloudsPanelFunc() {
  if (weatherCloudsPanel.classList.contains('panel_open')) {
    weatherCloudsPanel.classList.remove('panel_open')
    cloudsLayer.remove(map);
  }
  else {
    weatherCloudsPanel.classList.add('panel_open')
    cloudsLayer.addTo(map);
  }
}, false);

var weatherWindPanel = document.getElementById("weather_wind_panel");
weatherWindPanel.addEventListener('click', function weatherWindPanelFunc() {
  if (weatherWindPanel.classList.contains('panel_open')) {
    weatherWindPanel.classList.remove('panel_open')
    windLayer.remove(map);
  }
  else {
    weatherWindPanel.classList.add('panel_open')
    windLayer.addTo(map);
  }
}, false);

var weatherTempPanel = document.getElementById("weather_temp_panel");
weatherTempPanel.addEventListener('click', function weatherTempPanelFunc() {
  if (weatherTempPanel.classList.contains('panel_open')) {
    weatherTempPanel.classList.remove('panel_open')
    tempLayer.remove(map);
  }
  else {
    weatherTempPanel.classList.add('panel_open')
    tempLayer.addTo(map);
  }
}, false);

var weatherRainPanel = document.getElementById("weather_rain_panel");
weatherRainPanel.addEventListener('click', function weatherRainPanelFunc() {
  if (weatherRainPanel.classList.contains('panel_open')) {
    weatherRainPanel.classList.remove('panel_open')
    rainLayer.remove(map);
  }
  else {
    weatherRainPanel.classList.add('panel_open')
    rainLayer.addTo(map);
  }
}, false);

var removeAllPanel = document.getElementById("remove_all_panel");
removeAllPanel.addEventListener('click', function removeAllPanelFunc() {
  weatherRainPanel.classList.remove('panel_open');
  weatherTempPanel.classList.remove('panel_open');
  weatherCloudsPanel.classList.remove('panel_open');
  weatherWindPanel.classList.remove('panel_open');
  rainLayer.remove(map);
  tempLayer.remove(map);
  windLayer.remove(map);
  cloudsLayer.remove(map);
}, false);


// function voyage_check_result(){
//   var wayFrom = document.getElementById('way_from').value;
//   var wayTo = document.getElementById('way_to').value;
//   // var wayVessel = document.getElementById('way_vessel').value; 
//   // if(!wayFrom == '0' && !wayTo == '0' && !wayVessel == '0'){   
//   if(!wayFrom == '0' && !wayTo == '0'){   
//     document.getElementById('voyage_check_result_btn').classList.add("voyage_check_result_btn_true");  
//   }
//  };

var wayFromPort = document.getElementById('way_from');
wayFromPort.addEventListener('keyup', wayFromPortFunc);

function wayFromPortFunc(e) {
  if (this.value.length >= 3) {
    var way_from_result = document.getElementById('way_from_result');
    // way_from.addEventListener('change', (event) => { 
    // function way_from_result() {
    const keyName = wayFromPort.value;
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    fetch("https://demo2-2021-api.marine-digital.com/port/autocomplete?term=" + keyName, requestOptions)
      .then(response => response.json())
      .then(autComplResultArray => {

        console.log('autComplResultArray', autComplResultArray);
        way_from_result.innerHTML = '';

        for (let i = 0; i < autComplResultArray.length; ++i) {
          console.log(autComplResultArray[i].locode);
          // console.log(autComplResultArray[i].id); 
          let div = document.createElement('div');
          div.classList.add('result_item')
          var autComplRepeatArray = [];

          autComplRepeatArray.push(autComplResultArray[i].locode);
          div.innerHTML = autComplResultArray[i].name + " - " + autComplResultArray[i].locode;
          way_from_result.append(div);

          div.addEventListener('click', wayResultItemFunction, false);
          function wayResultItemFunction() {
            var wayFromPort = document.getElementById('way_from');
            wayFromPort.value = this.innerHTML;
            way_from_result.innerHTML = '';
            wayFromTo.from = autComplResultArray[i].locode

            const { lat, lon } = autComplResultArray[i];
            map.flyTo([lat, lon], 10)
          }
        }
      })
      .catch(error => console.log('error', error));

    // };

  }
};

var wayToPort = document.getElementById('way_to');
wayToPort.addEventListener('keyup', wayToPortFunc);

function wayToPortFunc(e) {
  if (this.value.length >= 3) {
    var way_to_result = document.getElementById('way_to_result');
    // way_to.addEventListener('change', (event) => {
    const keyName = wayToPort.value;
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    fetch("https://demo2-2021-api.marine-digital.com/port/autocomplete?term=" + keyName, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        var autComplResultArray = JSON.parse(result);
        way_to_result.innerHTML = '';
        for (let i = 0; i < autComplResultArray.length; ++i) {
          console.log(autComplResultArray[i].locode);
          console.log(autComplResultArray[i].id);
          let div = document.createElement('div');
          div.classList.add('result_item')
          div.innerHTML = autComplResultArray[i].name + " - " + autComplResultArray[i].locode;
          way_to_result.append(div);
          div.addEventListener('click', wayResultItemFunction, false);
          function wayResultItemFunction() {
            console.log(this.innerHTML);
            var wayToPort = document.getElementById('way_to');
            wayToPort.value = this.innerHTML;
            way_to_result.innerHTML = '';
            wayFromTo.to = autComplResultArray[i].locode

            const { lat, lon } = autComplResultArray[i];
            map.flyTo([lat, lon], 10)
          }
        }
      })
      .catch(error => console.log('error', error));

    // });

  }
};

// set today date to input date
var path = [];
var wayLine;
const spinner = document.getElementById("spinner");

function waySearchFunc() {

  if (wayFromTo.to === "" || wayFromTo.from === "") {
    alert("Empty from or to value ")
    return;
  }

  document.getElementById('voyage_way_form').classList.add("voyage_form_close");
  document.querySelector(".voyage_panel").classList.remove('active');
  document.getElementById('voyage_form_back_link').classList.add("voyage_form_back_link_open");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("port_from", wayFromTo.from);
  urlencoded.append("port_to", wayFromTo.to);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };
  spinner.removeAttribute('hidden');
  fetch("https://demo2-2021-api.marine-digital.com/route/simple", requestOptions)
    .then(response => response.json())
    .then(resultArray => {
      console.log('resultArray', resultArray);
      addRoute(resultArray)
      spinner.setAttribute('hidden', '');
    })
    .catch(error => console.log('error', error));
}

const r = { "points": [{ "properties": { "name": "Klaipeda", "port": "LTKLJ" }, "type": "Feature", "geometry": { "coordinates": [21.142501831054688, 55.676605224609375], "type": "Point" } }, { "properties": { "name": "Tokyo", "port": "JPTYO" }, "type": "Feature", "geometry": { "coordinates": [139.7632293701172, 35.61231994628906], "type": "Point" } }], "waypoints": [{ "properties": { "distance": 27.993067591841548, "course": 106.27798415330568 }, "type": "Feature", "geometry": { "coordinates": [168.5269775390625, 70.28317260742188], "type": "Point" } }, { "properties": { "distance": 159.9255688091234, "course": 95.7263462117754 }, "type": "Feature", "geometry": { "coordinates": [176.32376098632812, 70.0177001953125], "type": "Point" } }, { "properties": { "distance": 88.15132760592543, "course": 119.38847489134284 }, "type": "Feature", "geometry": { "coordinates": [-179.99998474121094, 69.29801940917969], "type": "Point" } }, { "properties": { "distance": 13.569716030764825, "course": 121.35720286005834 }, "type": "Feature", "geometry": { "coordinates": [-179.45611572265625, 69.1805419921875], "type": "Point" } }, { "properties": { "distance": 158.61695196714152, "course": 113.53061175222726 }, "type": "Feature", "geometry": { "coordinates": [-172.80801391601562, 68.12699890136719], "type": "Point" } }, { "properties": { "distance": 133.3368702057387, "course": 142.85070217193652 }, "type": "Feature", "geometry": { "coordinates": [-169.34320068359375, 66.35887145996094], "type": "Point" } }, { "properties": { "distance": 30.189600936729097, "course": 180.0176244015306 }, "type": "Feature", "geometry": { "coordinates": [-169.3435821533203, 65.85661315917969], "type": "Point" } }, { "properties": { "distance": 117.7805928518284, "course": 213.29601839362806 }, "type": "Feature", "geometry": { "coordinates": [-171.89337158203125, 64.21878051757812], "type": "Point" } }, { "properties": { "distance": 26.05270093077972, "course": 231.71062462435955 }, "type": "Feature", "geometry": { "coordinates": [-172.67178344726562, 63.95021057128906], "type": "Point" } }, { "properties": { "distance": 45.01163473587416, "course": 248.29737957527954 }, "type": "Feature", "geometry": { "coordinates": [-174.24835205078125, 63.67329406738281], "type": "Point" } }, { "properties": { "distance": 1133.5577580965435, "course": 218.90197552338964 }, "type": "Feature", "geometry": { "coordinates": [158.54588317871094, 51.350494384765625], "type": "Point" } }, { "properties": { "distance": 77.33903348223379, "course": 219.70046395407383 }, "type": "Feature", "geometry": { "coordinates": [157.24386596679688, 50.36053466796875], "type": "Point" } }, { "properties": { "distance": 9.506232163475918, "course": 220.04165835670415 }, "type": "Feature", "geometry": { "coordinates": [157.08457946777344, 50.23945617675781], "type": "Point" } }, { "properties": { "distance": 53.96460018760822, "course": 223.1959193695116 }, "type": "Feature", "geometry": { "coordinates": [156.1302490234375, 49.58494567871094], "type": "Point" } }, { "properties": { "distance": 207.65867547384732, "course": 221.62613831054975 }, "type": "Feature", "geometry": { "coordinates": [152.67987060546875, 47.00251770019531], "type": "Point" } }, { "properties": { "distance": 863.3934304302505, "course": 213.85475699951724 }, "type": "Feature", "geometry": { "coordinates": [141.01962280273438, 35.57762145996094], "type": "Point" } }, { "properties": { "distance": 0.7583688621250676, "course": 323.0740946952663 }, "type": "Feature", "geometry": { "coordinates": [139.7672882080078, 35.61216735839844], "type": "Point" } }, { "properties": { "distance": 0.19855173597110315, "course": 272.6476087786225 }, "type": "Feature", "geometry": { "coordinates": [139.7632293701172, 35.61231994628906], "type": "Point" } }], "totalDistance": 7220.008581129174 }
const p = { "points": [{ "properties": { "name": "Odessa / Odesa", "port": "UAODS" }, "type": "Feature", "geometry": { "coordinates": [30.733261108398438, 46.50996398925781], "type": "Point" } }, { "properties": { "name": "Tokyo", "port": "JPTYO" }, "type": "Feature", "geometry": { "coordinates": [139.7632293701172, 35.61231994628906], "type": "Point" } }], "waypoints": [{ "properties": {}, "type": "Feature", "geometry": { "coordinates": [30.733261108398438, 46.50996398925781], "type": "Point" } }, { "properties": { "distance": 0.142101541328468, "course": 144.41431961580147 }, "type": "Feature", "geometry": { "coordinates": [30.735260009765625, 46.50804138183594], "type": "Point" } }, { "properties": { "distance": 0.591723224852632, "course": 147.97858463220473 }, "type": "Feature", "geometry": { "coordinates": [30.742843627929688, 46.49969482421875], "type": "Point" } }, { "properties": { "distance": 0.3786134654472554, "course": 94.3067296254154 }, "type": "Feature", "geometry": { "coordinates": [30.751968383789062, 46.49922180175781], "type": "Point" } }, { "properties": { "distance": 0.7248781314242008, "course": 94.86300024046088 }, "type": "Feature", "geometry": { "coordinates": [30.769424438476562, 46.498199462890625], "type": "Point" } }, { "properties": { "distance": 1.4624086313154976, "course": 94.53239520349919 }, "type": "Feature", "geometry": { "coordinates": [30.804656982421875, 46.49627685546875], "type": "Point" } }, { "properties": { "distance": 2.3375248530994126, "course": 156.88395749111513 }, "type": "Feature", "geometry": { "coordinates": [30.826828002929688, 46.46051025390625], "type": "Point" } }, { "properties": { "distance": 9.905631101826925, "course": 166.80352754553297 }, "type": "Feature", "geometry": { "coordinates": [30.881362915039062, 46.30006408691406], "type": "Point" } }, { "properties": { "distance": 2.4621558569150186, "course": 163.50282204037856 }, "type": "Feature", "geometry": { "coordinates": [30.898193359375, 46.26078796386719], "type": "Point" } }, { "properties": { "distance": 1.3839968713234534, "course": 163.52083849162346 }, "type": "Feature", "geometry": { "coordinates": [30.907638549804688, 46.23870849609375], "type": "Point" } }, { "properties": { "distance": 2.7474426038195916, "course": 174.9643328601635 }, "type": "Feature", "geometry": { "coordinates": [30.913436889648438, 46.19317626953125], "type": "Point" } }, { "properties": { "distance": 12.38038750430139, "course": 208.05803467206854 }, "type": "Feature", "geometry": { "coordinates": [30.773712158203125, 46.01141357421875], "type": "Point" } }, { "properties": { "distance": 5.392207756942422, "course": 208.6978686496605 }, "type": "Feature", "geometry": { "coordinates": [30.71173095703125, 45.93272399902344], "type": "Point" } }, { "properties": { "distance": 22.44932841358117, "course": 211.86469728069184 }, "type": "Feature", "geometry": { "coordinates": [30.429046630859375, 45.61552429199219], "type": "Point" } }, { "properties": { "distance": 27.029554204428734, "course": 211.91722270290302 }, "type": "Feature", "geometry": { "coordinates": [30.090301513671875, 45.23382568359375], "type": "Point" } }, { "properties": { "distance": 13.309558939776911, "course": 189.46449177619186 }, "type": "Feature", "geometry": { "coordinates": [30.0386962890625, 45.015411376953125], "type": "Point" } }, { "properties": { "distance": 5.4305044420098305, "course": 187.7390074555649 }, "type": "Feature", "geometry": { "coordinates": [30.021499633789062, 44.92588806152344], "type": "Point" } }, { "properties": { "distance": 218.12540882584136, "course": 190.05544106002833 }, "type": "Feature", "geometry": { "coordinates": [29.152786254882812, 41.35272216796875], "type": "Point" } }, { "properties": { "distance": 7.6075327100255405, "course": 187.58432180768716 }, "type": "Feature", "geometry": { "coordinates": [29.13055419921875, 41.227264404296875], "type": "Point" } }, { "properties": { "distance": 1.671736887059279, "course": 210.0950060045327 }, "type": "Feature", "geometry": { "coordinates": [29.112014770507812, 41.20320129394531], "type": "Point" } }, { "properties": { "distance": 1.854532576045188, "course": 224.54859013495292 }, "type": "Feature", "geometry": { "coordinates": [29.083251953125, 41.18121337890625], "type": "Point" } }, { "properties": { "distance": 1.9096804225892001, "course": 218.74254479290022 }, "type": "Feature", "geometry": { "coordinates": [29.056838989257812, 41.15643310546875], "type": "Point" } }, { "properties": { "distance": 0.5026329365918731, "course": 180.55106228214999 }, "type": "Feature", "geometry": { "coordinates": [29.056732177734375, 41.1480712890625], "type": "Point" } }, { "properties": { "distance": 0.8727391425013338, "course": 145.37244010126864 }, "type": "Feature", "geometry": { "coordinates": [29.06768798828125, 41.13612365722656], "type": "Point" } }, { "properties": { "distance": 0.9185028146674742, "course": 146.6978054399489 }, "type": "Feature", "geometry": { "coordinates": [29.078826904296875, 41.12335205078125], "type": "Point" } }, { "properties": { "distance": 0.23146143760739155, "course": 183.08002341334236 }, "type": "Feature", "geometry": { "coordinates": [29.07855224609375, 41.1195068359375], "type": "Point" } }, { "properties": { "distance": 1.1169454393490175, "course": 222.21146164274177 }, "type": "Feature", "geometry": { "coordinates": [29.061981201171875, 41.105743408203125], "type": "Point" } }, { "properties": { "distance": 0.4030204540565812, "course": 194.19505780305377 }, "type": "Feature", "geometry": { "coordinates": [29.059799194335938, 41.0992431640625], "type": "Point" } }, { "properties": { "distance": 1.0299943602552883, "course": 180.26916535336218 }, "type": "Feature", "geometry": { "coordinates": [29.0596923828125, 41.08210754394531], "type": "Point" } }, { "properties": { "distance": 0.5544009633713024, "course": 223.01115640067266 }, "type": "Feature", "geometry": { "coordinates": [29.051345825195312, 41.07536315917969], "type": "Point" } }, { "properties": { "distance": 1.5024036399295324, "course": 197.98992783527763 }, "type": "Feature", "geometry": { "coordinates": [29.041107177734375, 41.05158996582031], "type": "Point" } }, { "properties": { "distance": 2.5853179810864626, "course": 232.9336414799473 }, "type": "Feature", "geometry": { "coordinates": [28.99560546875, 41.025665283203125], "type": "Point" } }, { "properties": { "distance": 0.4313936643881549, "course": 198.1303465377076 }, "type": "Feature", "geometry": { "coordinates": [28.992645263671875, 41.01884460449219], "type": "Point" } }, { "properties": { "distance": 1.6821235913675663, "course": 180.35363636874527 }, "type": "Feature", "geometry": { "coordinates": [28.992416381835938, 40.99085998535156], "type": "Point" } }, { "properties": { "distance": 0.5274576966835284, "course": 203.84587803124992 }, "type": "Feature", "geometry": { "coordinates": [28.987716674804688, 40.98283386230469], "type": "Point" } }, { "properties": { "distance": 2.3191074668273597, "course": 229.14618685777762 }, "type": "Feature", "geometry": { "coordinates": [28.949066162109375, 40.95759582519531], "type": "Point" } }, { "properties": { "distance": 1.7957376844634203, "course": 235.21444894681548 }, "type": "Feature", "geometry": { "coordinates": [28.916580200195312, 40.9405517578125], "type": "Point" } }, { "properties": { "distance": 1.932116626075023, "course": 235.17574638654634 }, "type": "Feature", "geometry": { "coordinates": [28.88165283203125, 40.92219543457031], "type": "Point" } }, { "properties": { "distance": 17.148131575692243, "course": 261.06768999621755 }, "type": "Feature", "geometry": { "coordinates": [28.5087890625, 40.877899169921875], "type": "Point" } }, { "properties": { "distance": 12.23674554785632, "course": 261.0614018543865 }, "type": "Feature", "geometry": { "coordinates": [28.242874145507812, 40.84626770019531], "type": "Point" } }, { "properties": { "distance": 3.5286805901889604, "course": 261.0732504985305 }, "type": "Feature", "geometry": { "coordinates": [28.166213989257812, 40.837158203125], "type": "Point" } }, { "properties": { "distance": 6.142056952991132, "course": 261.0658386986677 }, "type": "Feature", "geometry": { "coordinates": [28.032806396484375, 40.8212890625], "type": "Point" } }, { "properties": { "distance": 11.401504811511899, "course": 261.06375202873755 }, "type": "Feature", "geometry": { "coordinates": [27.785247802734375, 40.79182434082031], "type": "Point" } }, { "properties": { "distance": 6.565339252365673, "course": 261.0631811936263 }, "type": "Feature", "geometry": { "coordinates": [27.642745971679688, 40.77485656738281], "type": "Point" } }, { "properties": { "distance": 10.883000959261729, "course": 243.36778983968514 }, "type": "Feature", "geometry": { "coordinates": [27.429153442382812, 40.693695068359375], "type": "Point" } }, { "properties": { "distance": 2.9763051998239156, "course": 243.36089469418482 }, "type": "Feature", "geometry": { "coordinates": [27.37078857421875, 40.67149353027344], "type": "Point" } }, { "properties": { "distance": 11.325663235758, "course": 243.36440796540592 }, "type": "Feature", "geometry": { "coordinates": [27.14886474609375, 40.58702087402344], "type": "Point" } }, { "properties": { "distance": 5.809491475745452, "course": 243.36124602642658 }, "type": "Feature", "geometry": { "coordinates": [27.035140991210938, 40.54368591308594], "type": "Point" } }, { "properties": { "distance": 3.9767304870833886, "course": 243.36191568419508 }, "type": "Feature", "geometry": { "coordinates": [26.95733642578125, 40.51402282714844], "type": "Point" } }, { "properties": { "distance": 3.718064038247354, "course": 243.3548397762895 }, "type": "Feature", "geometry": { "coordinates": [26.884628295898438, 40.48628234863281], "type": "Point" } }, { "properties": { "distance": 6.817460246039285, "course": 243.36771999681716 }, "type": "Feature", "geometry": { "coordinates": [26.751373291015625, 40.43544006347656], "type": "Point" } }, { "properties": { "distance": 3.812122566985792, "course": 234.23931466928985 }, "type": "Feature", "geometry": { "coordinates": [26.68377685546875, 40.39837646484375], "type": "Point" } }, { "properties": { "distance": 4.17652529920616, "course": 213.82391066234828 }, "type": "Feature", "geometry": { "coordinates": [26.633010864257812, 40.34065246582031], "type": "Point" } }, { "properties": { "distance": 10.564239368550204, "course": 229.00446113161237 }, "type": "Feature", "geometry": { "coordinates": [26.459121704101562, 40.22535705566406], "type": "Point" } }, { "properties": { "distance": 3.461347015664302, "course": 248.74705066178535 }, "type": "Feature", "geometry": { "coordinates": [26.388839721679688, 40.20448303222656], "type": "Point" } }, { "properties": { "distance": 0.8467123397556738, "course": 220.68983169352424 }, "type": "Feature", "geometry": { "coordinates": [26.376815795898438, 40.19380187988281], "type": "Point" } }, { "properties": { "distance": 0.5611272531025364, "course": 177.06551257530498 }, "type": "Feature", "geometry": { "coordinates": [26.37744140625, 40.184478759765625], "type": "Point" } }, { "properties": { "distance": 1.8616124011064545, "course": 168.64450188136456 }, "type": "Feature", "geometry": { "coordinates": [26.385421752929688, 40.15411376953125], "type": "Point" } }, { "properties": { "distance": 0.3587627324269272, "course": 168.27469068236343 }, "type": "Feature", "geometry": { "coordinates": [26.387008666992188, 40.14826965332031], "type": "Point" } }, { "properties": { "distance": 0.32959358493308083, "course": 188.93313216503188 }, "type": "Feature", "geometry": { "coordinates": [26.385894775390625, 40.142852783203125], "type": "Point" } }, { "properties": { "distance": 0.4121338953451444, "course": 201.87481859866415 }, "type": "Feature", "geometry": { "coordinates": [26.382553100585938, 40.13648986816406], "type": "Point" } }, { "properties": { "distance": 4.8707414216467075, "course": 224.75797981101744 }, "type": "Feature", "geometry": { "coordinates": [26.307952880859375, 40.078948974609375], "type": "Point" } }, { "properties": { "distance": 3.7447037813236705, "course": 235.3222370889411 }, "type": "Feature", "geometry": { "coordinates": [26.241012573242188, 40.04350280761719], "type": "Point" } }, { "properties": { "distance": 2.695922570513285, "course": 249.75774515158682 }, "type": "Feature", "geometry": { "coordinates": [26.186050415039062, 40.027984619140625], "type": "Point" } }, { "properties": { "distance": 9.482897928029566, "course": 262.34094373929963 }, "type": "Feature", "geometry": { "coordinates": [25.981887817382812, 40.0069580078125], "type": "Point" } }, { "properties": { "distance": 9.565353819390598, "course": 226.83973761138776 }, "type": "Feature", "geometry": { "coordinates": [25.830459594726562, 39.898101806640625], "type": "Point" } }, { "properties": { "distance": 126.07515287950613, "course": 206.18956542649534 }, "type": "Feature", "geometry": { "coordinates": [24.639892578125, 38.01594543457031], "type": "Point" } }, { "properties": { "distance": 5.706905003320248, "course": 208.4470044584327 }, "type": "Feature", "geometry": { "coordinates": [24.58251953125, 37.932464599609375], "type": "Point" } }, { "properties": { "distance": 20.46230658101621, "course": 230.16322909687872 }, "type": "Feature", "geometry": { "coordinates": [24.2515869140625, 37.714385986328125], "type": "Point" } }, { "properties": { "distance": 5.133275546655601, "course": 218.91167570870272 }, "type": "Feature", "geometry": { "coordinates": [24.183807373046875, 37.64793395996094], "type": "Point" } }, { "properties": { "distance": 52.309683893389135, "course": 174.11355314679952 }, "type": "Feature", "geometry": { "coordinates": [24.295883178710938, 36.782257080078125], "type": "Point" } }, { "properties": { "distance": 6.464028725650786, "course": 192.56480051509803 }, "type": "Feature", "geometry": { "coordinates": [24.266693115234375, 36.67729187011719], "type": "Point" } }, { "properties": { "distance": 4.363004044771489, "course": 192.2903269451525 }, "type": "Feature", "geometry": { "coordinates": [24.2474365234375, 36.60636901855469], "type": "Point" } }, { "properties": { "distance": 165.3064126765173, "course": 125.73930549905548 }, "type": "Feature", "geometry": { "coordinates": [27, 35], "type": "Point" } }, { "properties": { "distance": 303.20905931441195, "course": 127.95678615456045 }, "type": "Feature", "geometry": { "coordinates": [31.767990112304688, 31.8973388671875], "type": "Point" } }, { "properties": { "distance": 7.54816120656705, "course": 129.3844668442781 }, "type": "Feature", "geometry": { "coordinates": [31.88226318359375, 31.817657470703125], "type": "Point" } }, { "properties": { "distance": 4.161620757639652, "course": 144.5650375393284 }, "type": "Feature", "geometry": { "coordinates": [31.929489135742188, 31.761245727539062], "type": "Point" } }, { "properties": { "distance": 1.8355924508263268, "course": 132.14757904196816 }, "type": "Feature", "geometry": { "coordinates": [31.95611572265625, 31.740753173828125], "type": "Point" } }, { "properties": { "distance": 0.7638741455134966, "course": 132.06562213395983 }, "type": "Feature", "geometry": { "coordinates": [31.967208862304688, 31.73223876953125], "type": "Point" } }, { "properties": { "distance": 17.51394269778834, "course": 135.45739952245953 }, "type": "Feature", "geometry": { "coordinates": [32.207244873046875, 31.524566650390625], "type": "Point" } }, { "properties": { "distance": 0.49838616185870416, "course": 138.1860861199101 }, "type": "Feature", "geometry": { "coordinates": [32.21372985839844, 31.518386840820312], "type": "Point" } }, { "properties": { "distance": 7.416568364173074, "course": 144.01209063393335 }, "type": "Feature", "geometry": { "coordinates": [32.298736572265625, 31.418548583984375], "type": "Point" } }, { "properties": { "distance": 1.0319834437197715, "course": 173.9916032197896 }, "type": "Feature", "geometry": { "coordinates": [32.30084228515625, 31.401473999023438], "type": "Point" } }, { "properties": { "distance": 2.4928299999086, "course": 109.471551247234 }, "type": "Feature", "geometry": { "coordinates": [32.346649169921875, 31.387649536132812], "type": "Point" } }, { "properties": { "distance": 1.4702269348762835, "course": 180.0915488798321 }, "type": "Feature", "geometry": { "coordinates": [32.34660339355469, 31.363189697265625], "type": "Point" } }, { "properties": { "distance": 2.483390491404457, "course": 143.58639183862846 }, "type": "Feature", "geometry": { "coordinates": [32.37532043457031, 31.329940795898438], "type": "Point" } }, { "properties": { "distance": 4.2514567816933875, "course": 193.9852490727721 }, "type": "Feature", "geometry": { "coordinates": [32.355316162109375, 31.261306762695312], "type": "Point" } }, { "properties": { "distance": 4.279231962768714, "course": 193.90299218155258 }, "type": "Feature", "geometry": { "coordinates": [32.33531188964844, 31.19219970703125], "type": "Point" } }, { "properties": { "distance": 4.790671340098767, "course": 194.05243756601388 }, "type": "Feature", "geometry": { "coordinates": [32.31269836425781, 31.114883422851562], "type": "Point" } }, { "properties": { "distance": 0.9075063015421838, "course": 194.9433830558402 }, "type": "Feature", "geometry": { "coordinates": [32.30815124511719, 31.100296020507812], "type": "Point" } }, { "properties": { "distance": 17.640275086725907, "course": 178.3110851721938 }, "type": "Feature", "geometry": { "coordinates": [32.3182373046875, 30.80694580078125], "type": "Point" } }, { "properties": { "distance": 0.43951221676442026, "course": 188.451812288364 }, "type": "Feature", "geometry": { "coordinates": [32.316986083984375, 30.799713134765625], "type": "Point" } }, { "properties": { "distance": 0.3928462393349118, "course": 187.14259955103603 }, "type": "Feature", "geometry": { "coordinates": [32.3160400390625, 30.793228149414062], "type": "Point" } }, { "properties": { "distance": 0.38889325984611506, "course": 180.4643285133095 }, "type": "Feature", "geometry": { "coordinates": [32.31597900390625, 30.786758422851562], "type": "Point" } }, { "properties": { "distance": 2.262013730112191, "course": 170.4339623561959 }, "type": "Feature", "geometry": { "coordinates": [32.32325744628906, 30.749649047851562], "type": "Point" } }, { "properties": { "distance": 0.31432430651849447, "course": 162.03398138610046 }, "type": "Feature", "geometry": { "coordinates": [32.32513427734375, 30.744674682617188], "type": "Point" } }, { "properties": { "distance": 0.24819846764703643, "course": 156.41071243604992 }, "type": "Feature", "geometry": { "coordinates": [32.327056884765625, 30.740890502929688], "type": "Point" } }, { "properties": { "distance": 0.9416557340895493, "course": 146.68779943442198 }, "type": "Feature", "geometry": { "coordinates": [32.337066650390625, 30.727798461914062], "type": "Point" } }, { "properties": { "distance": 0.3979149760546051, "course": 147.52318473255553 }, "type": "Feature", "geometry": { "coordinates": [32.34120178222656, 30.722213745117188], "type": "Point" } }, { "properties": { "distance": 0.3279172674049056, "course": 162.50874288409534 }, "type": "Feature", "geometry": { "coordinates": [32.343109130859375, 30.717010498046875], "type": "Point" } }, { "properties": { "distance": 0.3914198366792231, "course": 171.4267517666299 }, "type": "Feature", "geometry": { "coordinates": [32.34423828125, 30.7105712890625], "type": "Point" } }, { "properties": { "distance": 0.26513746992140275, "course": 178.6366135344864 }, "type": "Feature", "geometry": { "coordinates": [32.3443603515625, 30.706161499023438], "type": "Point" } }, { "properties": { "distance": 0.31847184794307787, "course": 184.82951130192572 }, "type": "Feature", "geometry": { "coordinates": [32.343841552734375, 30.700881958007812], "type": "Point" } }, { "properties": { "distance": 0.6823699288099053, "course": 190.72414442833693 }, "type": "Feature", "geometry": { "coordinates": [32.34138488769531, 30.689727783203125], "type": "Point" } }, { "properties": { "distance": 4.0066928993319495, "course": 191.35667727026984 }, "type": "Feature", "geometry": { "coordinates": [32.32612609863281, 30.624374389648438], "type": "Point" } }, { "properties": { "distance": 0.34092860384595325, "course": 192.43318334188297 }, "type": "Feature", "geometry": { "coordinates": [32.32470703125, 30.61883544921875], "type": "Point" } }, { "properties": { "distance": 0.44390043159432213, "course": 200.61422341378207 }, "type": "Feature", "geometry": { "coordinates": [32.321685791015625, 30.611923217773438], "type": "Point" } }, { "properties": { "distance": 0.3892864418906974, "course": 207.93108098537652 }, "type": "Feature", "geometry": { "coordinates": [32.31816101074219, 30.606201171875], "type": "Point" } }, { "properties": { "distance": 0.3946191647637993, "course": 209.08536252124557 }, "type": "Feature", "geometry": { "coordinates": [32.314453125, 30.6004638671875], "type": "Point" } }, { "properties": { "distance": 0.5626276886577524, "course": 202.43718622792517 }, "type": "Feature", "geometry": { "coordinates": [32.310302734375, 30.591812133789062], "type": "Point" } }, { "properties": { "distance": 0.31963109727705985, "course": 202.05284982277342 }, "type": "Feature", "geometry": { "coordinates": [32.3079833984375, 30.586883544921875], "type": "Point" } }, { "properties": { "distance": 0.4781873670752279, "course": 197.58801527675845 }, "type": "Feature", "geometry": { "coordinates": [32.30519104003906, 30.579299926757812], "type": "Point" } }, { "properties": { "distance": 0.35650479913519345, "course": 188.9194905139476 }, "type": "Feature", "geometry": { "coordinates": [32.30412292480469, 30.573440551757812], "type": "Point" } }, { "properties": { "distance": 0.38645184787315146, "course": 182.3422588853033 }, "type": "Feature", "geometry": { "coordinates": [32.30381774902344, 30.5670166015625], "type": "Point" } }, { "properties": { "distance": 0.2179226055114893, "course": 173.3407138277449 }, "type": "Feature", "geometry": { "coordinates": [32.30430603027344, 30.56341552734375], "type": "Point" } }, { "properties": { "distance": 0.6515736556768148, "course": 163.739760491145 }, "type": "Feature", "geometry": { "coordinates": [32.307830810546875, 30.553009033203125], "type": "Point" } }, { "properties": { "distance": 0.3770075486276745, "course": 157.58570026889876 }, "type": "Feature", "geometry": { "coordinates": [32.31060791015625, 30.547210693359375], "type": "Point" } }, { "properties": { "distance": 1.69095655529362, "course": 143.34129986285686 }, "type": "Feature", "geometry": { "coordinates": [32.330108642578125, 30.524642944335938], "type": "Point" } }, { "properties": { "distance": 0.28453940527317606, "course": 146.2660379576505 }, "type": "Feature", "geometry": { "coordinates": [32.333160400390625, 30.520706176757812], "type": "Point" } }, { "properties": { "distance": 0.43274430921504764, "course": 154.82278588393652 }, "type": "Feature", "geometry": { "coordinates": [32.33671569824219, 30.514190673828125], "type": "Point" } }, { "properties": { "distance": 0.3312466817628731, "course": 162.79485072349775 }, "type": "Feature", "geometry": { "coordinates": [32.33860778808594, 30.508926391601562], "type": "Point" } }, { "properties": { "distance": 8.832066589988104, "course": 169.98673205040416 }, "type": "Feature", "geometry": { "coordinates": [32.36824035644531, 30.364227294921875], "type": "Point" } }, { "properties": { "distance": 0.433008035968746, "course": 163.21568287271256 }, "type": "Feature", "geometry": { "coordinates": [32.37065124511719, 30.357330322265625], "type": "Point" } }, { "properties": { "distance": 0.9441394844062676, "course": 143.1743537263574 }, "type": "Feature", "geometry": { "coordinates": [32.381561279296875, 30.344757080078125], "type": "Point" } }, { "properties": { "distance": 0.9206087746983138, "course": 142.3757421144595 }, "type": "Feature", "geometry": { "coordinates": [32.39239501953125, 30.332626342773438], "type": "Point" } }, { "properties": { "distance": 3.6922313998558924, "course": 142.8808225177083 }, "type": "Feature", "geometry": { "coordinates": [32.435333251953125, 30.283645629882812], "type": "Point" } }, { "properties": { "distance": 0.3178342882866374, "course": 129.19531465742253 }, "type": "Feature", "geometry": { "coordinates": [32.44007873535156, 30.280303955078125], "type": "Point" } }, { "properties": { "distance": 0.4498366405086268, "course": 118.09828044574822 }, "type": "Feature", "geometry": { "coordinates": [32.447723388671875, 30.276779174804688], "type": "Point" } }, { "properties": { "distance": 4.23735272037825, "course": 108.42213620128784 }, "type": "Feature", "geometry": { "coordinates": [32.52516174316406, 30.254501342773438], "type": "Point" } }, { "properties": { "distance": 0.2533436468720654, "course": 122.3981219732056 }, "type": "Feature", "geometry": { "coordinates": [32.52928161621094, 30.252243041992188], "type": "Point" } }, { "properties": { "distance": 0.3022841366329788, "course": 132.34382347806982 }, "type": "Feature", "geometry": { "coordinates": [32.53358459472656, 30.248855590820312], "type": "Point" } }, { "properties": { "distance": 0.2402754636512281, "course": 136.17383599999238 }, "type": "Feature", "geometry": { "coordinates": [32.53678894042969, 30.2459716796875], "type": "Point" } }, { "properties": { "distance": 0.2294666850485071, "course": 143.07223175878096 }, "type": "Feature", "geometry": { "coordinates": [32.53944396972656, 30.242919921875], "type": "Point" } }, { "properties": { "distance": 2.451156920853474, "course": 150.62903118316137 }, "type": "Feature", "geometry": { "coordinates": [32.562591552734375, 30.207382202148438], "type": "Point" } }, { "properties": { "distance": 0.25331541879688785, "course": 153.41928969402068 }, "type": "Feature", "geometry": { "coordinates": [32.56477355957031, 30.20361328125], "type": "Point" } }, { "properties": { "distance": 0.3743311925182693, "course": 161.4797694844599 }, "type": "Feature", "geometry": { "coordinates": [32.56706237792969, 30.197708129882812], "type": "Point" } }, { "properties": { "distance": 0.455811757505251, "course": 170.38884099868557 }, "type": "Feature", "geometry": { "coordinates": [32.56852722167969, 30.190231323242188], "type": "Point" } }, { "properties": { "distance": 3.6007347971719588, "course": 178.76328828572588 }, "type": "Feature", "geometry": { "coordinates": [32.57002258300781, 30.130340576171875], "type": "Point" } }, { "properties": { "distance": 3.541869911429776, "course": 178.88320029891892 }, "type": "Feature", "geometry": { "coordinates": [32.57135009765625, 30.071426391601562], "type": "Point" } }, { "properties": { "distance": 0.6079159370805961, "course": 177.1559899989122 }, "type": "Feature", "geometry": { "coordinates": [32.571929931640625, 30.061325073242188], "type": "Point" } }, { "properties": { "distance": 0.6794510613706777, "course": 172.81837311865763 }, "type": "Feature", "geometry": { "coordinates": [32.57356262207031, 30.05010986328125], "type": "Point" } }, { "properties": { "distance": 1.3475940489600446, "course": 170.9490849831235 }, "type": "Feature", "geometry": { "coordinates": [32.57763671875, 30.027969360351562], "type": "Point" } }, { "properties": { "distance": 2.8575641128814753, "course": 170.85190466762884 }, "type": "Feature", "geometry": { "coordinates": [32.58636474609375, 29.981033325195312], "type": "Point" } }, { "properties": { "distance": 0.24916710188167185, "course": 175.97760833231786 }, "type": "Feature", "geometry": { "coordinates": [32.586700439453125, 29.976898193359375], "type": "Point" } }, { "properties": { "distance": 0.41826693690739397, "course": 180.7618634265215 }, "type": "Feature", "geometry": { "coordinates": [32.58659362792969, 29.969940185546875], "type": "Point" } }, { "properties": { "distance": 0.24736994338437207, "course": 186.45481997687287 }, "type": "Feature", "geometry": { "coordinates": [32.5860595703125, 29.965850830078125], "type": "Point" } }, { "properties": { "distance": 0.44824817040379566, "course": 191.45153426640303 }, "type": "Feature", "geometry": { "coordinates": [32.5843505859375, 29.958541870117188], "type": "Point" } }, { "properties": { "distance": 0.3290070039851955, "course": 198.59143521944227 }, "type": "Feature", "geometry": { "coordinates": [32.58233642578125, 29.953353881835938], "type": "Point" } }, { "properties": { "distance": 0.29432597937455784, "course": 205.76634229001155 }, "type": "Feature", "geometry": { "coordinates": [32.57987976074219, 29.948944091796875], "type": "Point" } }, { "properties": { "distance": 0.30551238127622854, "course": 211.1748831311791 }, "type": "Feature", "geometry": { "coordinates": [32.57684326171875, 29.944595336914062], "type": "Point" } }, { "properties": { "distance": 0.3464810137062752, "course": 219.61853459818838 }, "type": "Feature", "geometry": { "coordinates": [32.572601318359375, 29.940155029296875], "type": "Point" } }, { "properties": { "distance": 0.6383021908714753, "course": 225.01265393730856 }, "type": "Feature", "geometry": { "coordinates": [32.563934326171875, 29.932647705078125], "type": "Point" } }, { "properties": { "distance": 0.8441585635125168, "course": 227.82079737463027 }, "type": "Feature", "geometry": { "coordinates": [32.55192565917969, 29.9232177734375], "type": "Point" } }, { "properties": { "distance": 0.7642575365265114, "course": 201.92665543039124 }, "type": "Feature", "geometry": { "coordinates": [32.54644775390625, 29.911422729492188], "type": "Point" } }, { "properties": { "distance": 0.36357285714174065, "course": 188.55134731408026 }, "type": "Feature", "geometry": { "coordinates": [32.54541015625, 29.905441284179688], "type": "Point" } }, { "properties": { "distance": 0.693124839811236, "course": 172.35322949043535 }, "type": "Feature", "geometry": { "coordinates": [32.54718017578125, 29.894012451171875], "type": "Point" } }, { "properties": { "distance": 0.6879585633510015, "course": 172.69536275113677 }, "type": "Feature", "geometry": { "coordinates": [32.548858642578125, 29.882659912109375], "type": "Point" } }, { "properties": { "distance": 0.9399370336827295, "course": 171.2887944947066 }, "type": "Feature", "geometry": { "coordinates": [32.55158996582031, 29.867202758789062], "type": "Point" } }, { "properties": { "distance": 0.8355525586966636, "course": 172.3962166477612 }, "type": "Feature", "geometry": { "coordinates": [32.5537109375, 29.853424072265625], "type": "Point" } }, { "properties": { "distance": 0.48304254410646247, "course": 194.0096814526492 }, "type": "Feature", "geometry": { "coordinates": [32.55146789550781, 29.845626831054688], "type": "Point" } }, { "properties": { "distance": 3.086364148132692, "course": 208.6885468855713 }, "type": "Feature", "geometry": { "coordinates": [32.52305603027344, 29.800582885742188], "type": "Point" } }, { "properties": { "distance": 7.606640633718673, "course": 180.68386312922942 }, "type": "Feature", "geometry": { "coordinates": [32.52131652832031, 29.674041748046875], "type": "Point" } }, { "properties": { "distance": 3.4100462157048175, "course": 179.9062478872544 }, "type": "Feature", "geometry": { "coordinates": [32.52142333984375, 29.6173095703125], "type": "Point" } }, { "properties": { "distance": 1.4035182974580853, "course": 178.92567170178123 }, "type": "Feature", "geometry": { "coordinates": [32.52192687988281, 29.593963623046875], "type": "Point" } }, { "properties": { "distance": 8.46528118125119, "course": 157.43197127141852 }, "type": "Feature", "geometry": { "coordinates": [32.58404541015625, 29.463912963867188], "type": "Point" } }, { "properties": { "distance": 18.75477190771903, "course": 156.1129817691796 }, "type": "Feature", "geometry": { "coordinates": [32.72895812988281, 29.178619384765625], "type": "Point" } }, { "properties": { "distance": 10.760336261887417, "course": 159.30390225810154 }, "type": "Feature", "geometry": { "coordinates": [32.801361083984375, 29.011154174804688], "type": "Point" } }, { "properties": { "distance": 16.148682036883418, "course": 161.37539739509842 }, "type": "Feature", "geometry": { "coordinates": [32.89935302734375, 28.756561279296875], "type": "Point" } }, { "properties": { "distance": 5.696323832834045, "course": 149.0599529626677 }, "type": "Feature", "geometry": { "coordinates": [32.95491027832031, 28.675277709960938], "type": "Point" } }, { "properties": { "distance": 17.486564085199394, "course": 151.12862297156806 }, "type": "Feature", "geometry": { "coordinates": [33.11482238769531, 28.420516967773438], "type": "Point" } }, { "properties": { "distance": 4.772769240880794, "course": 151.12877592323113 }, "type": "Feature", "geometry": { "coordinates": [33.15840148925781, 28.350982666015625], "type": "Point" } }, { "properties": { "distance": 7.2251312322488825, "course": 147.43341099386942 }, "type": "Feature", "geometry": { "coordinates": [33.23188781738281, 28.249679565429688], "type": "Point" } }, { "properties": { "distance": 6.274378108211628, "course": 143.11879632296566 }, "type": "Feature", "geometry": { "coordinates": [33.302978515625, 28.166183471679688], "type": "Point" } }, { "properties": { "distance": 2.4947683707764003, "course": 134.95892715448386 }, "type": "Feature", "geometry": { "coordinates": [33.33628845214844, 28.136856079101562], "type": "Point" } }, { "properties": { "distance": 6.54058427304855, "course": 131.59322948647653 }, "type": "Feature", "geometry": { "coordinates": [33.42854309082031, 28.064620971679688], "type": "Point" } }, { "properties": { "distance": 15.690779753301104, "course": 131.83187879811166 }, "type": "Feature", "geometry": { "coordinates": [33.64878845214844, 27.890518188476562], "type": "Point" } }, { "properties": { "distance": 14.52013103013585, "course": 137.50987365679546 }, "type": "Feature", "geometry": { "coordinates": [33.833251953125, 27.712387084960938], "type": "Point" } }, { "properties": { "distance": 18.77826563245651, "course": 135.29605518915702 }, "type": "Feature", "geometry": { "coordinates": [34.08123779296875, 27.490341186523438], "type": "Point" } }, { "properties": { "distance": 183.34591924872782, "course": 148.29381798492125 }, "type": "Feature", "geometry": { "coordinates": [35.8680419921875, 24.895294189453125], "type": "Point" } }, { "properties": { "distance": 774.4596361839705, "course": 151.76739363599938 }, "type": "Feature", "geometry": { "coordinates": [42.51441955566406, 13.633697509765625], "type": "Point" } }, { "properties": { "distance": 8.729124222434832, "course": 153.06497399654515 }, "type": "Feature", "geometry": { "coordinates": [42.58209228515625, 13.504226684570312], "type": "Point" } }, { "properties": { "distance": 29.925420599484646, "course": 121.36403835180018 }, "type": "Feature", "geometry": { "coordinates": [43.01905822753906, 13.245101928710938], "type": "Point" } }, { "properties": { "distance": 42.25751088556896, "course": 154.8006412656782 }, "type": "Feature", "geometry": { "coordinates": [43.326171875, 12.608978271484375], "type": "Point" } }, { "properties": { "distance": 9.172990025100285, "course": 120.21390953023582 }, "type": "Feature", "geometry": { "coordinates": [43.46128845214844, 12.532180786132812], "type": "Point" } }, { "properties": { "distance": 99.46066879526349, "course": 114.68795506995251 }, "type": "Feature", "geometry": { "coordinates": [44.999420166015625, 11.841049194335938], "type": "Point" } }, { "properties": { "distance": 6.465774508108601, "course": 83.95009561803508 }, "type": "Feature", "geometry": { "coordinates": [45.10871887207031, 11.852386474609375], "type": "Point" } }, { "properties": { "distance": 6.531440612367298, "course": 83.94642137397395 }, "type": "Feature", "geometry": { "coordinates": [45.21913146972656, 11.863845825195312], "type": "Point" } }, { "properties": { "distance": 366.9493506026417, "course": 87.86040719062412 }, "type": "Feature", "geometry": { "coordinates": [51.45552062988281, 12.091766357421875], "type": "Point" } }, { "properties": { "distance": 6.051156828928607, "course": 122.80008668753511 }, "type": "Feature", "geometry": { "coordinates": [51.54205322265625, 12.0372314453125], "type": "Point" } }, { "properties": { "distance": 6.959470095238738, "course": 125.0342655692045 }, "type": "Feature", "geometry": { "coordinates": [51.63897705078125, 11.97076416015625], "type": "Point" } }, { "properties": { "distance": 25.668043155806355, "course": 118.1074547027982 }, "type": "Feature", "geometry": { "coordinates": [52.02388000488281, 11.769577026367188], "type": "Point" } }, { "properties": { "distance": 30.38750789174724, "course": 102.75868957898335 }, "type": "Feature", "geometry": { "coordinates": [52.527435302734375, 11.657928466796875], "type": "Point" } }, { "properties": { "distance": 1701.0830739843861, "course": 103.96005705530945 }, "type": "Feature", "geometry": { "coordinates": [80.53762817382812, 5.713226318359375], "type": "Point" } }, { "properties": { "distance": 6.605807961704298, "course": 90.5409565098048 }, "type": "Feature", "geometry": { "coordinates": [80.6480712890625, 5.712188720703125], "type": "Point" } }, { "properties": { "distance": 848.7738258977623, "course": 89.49736613136463 }, "type": "Feature", "geometry": { "coordinates": [94.84031677246094, 6.0193023681640625], "type": "Point" } }, { "properties": { "distance": 19.59649345041527, "course": 95.39261794113673 }, "type": "Feature", "geometry": { "coordinates": [95.16668701171875, 5.9886627197265625], "type": "Point" } }, { "properties": { "distance": 151.85556359622785, "course": 102.4178487864454 }, "type": "Feature", "geometry": { "coordinates": [97.64631652832031, 5.4453887939453125], "type": "Point" } }, { "properties": { "distance": 171.80394214110473, "course": 124.83996326848772 }, "type": "Feature", "geometry": { "coordinates": [100, 3.8125], "type": "Point" } }, { "properties": { "distance": 43.3456970354041, "course": 133.01261765030705 }, "type": "Feature", "geometry": { "coordinates": [100.5283203125, 3.3205718994140625], "type": "Point" } }, { "properties": { "distance": 17.78771011122681, "course": 146.2201850190809 }, "type": "Feature", "geometry": { "coordinates": [100.693115234375, 3.0746002197265625], "type": "Point" } }, { "properties": { "distance": 11.961335174089573, "course": 130.32797753763765 }, "type": "Feature", "geometry": { "coordinates": [100.84503173828125, 2.9458160400390625], "type": "Point" } }, { "properties": { "distance": 11.70455488159425, "course": 134.963166134067 }, "type": "Feature", "geometry": { "coordinates": [100.98298645019531, 2.8082122802734375], "type": "Point" } }, { "properties": { "distance": 7.979477822599103, "course": 119.93880840358261 }, "type": "Feature", "geometry": { "coordinates": [101.09815979003906, 2.7419586181640625], "type": "Point" } }, { "properties": { "distance": 6.095879767210493, "course": 119.93833214856726 }, "type": "Feature", "geometry": { "coordinates": [101.18614196777344, 2.69134521484375], "type": "Point" } }, { "properties": { "distance": 5.372096667710274, "course": 118.35721340666719 }, "type": "Feature", "geometry": { "coordinates": [101.26487731933594, 2.648895263671875], "type": "Point" } }, { "properties": { "distance": 9.52815656341439, "course": 118.30544672574166 }, "type": "Feature", "geometry": { "coordinates": [101.40458679199219, 2.57373046875], "type": "Point" } }, { "properties": { "distance": 17.45715614409144, "course": 127.42422115511437 }, "type": "Feature", "geometry": { "coordinates": [101.63545227050781, 2.3972320556640625], "type": "Point" } }, { "properties": { "distance": 12.443643087153127, "course": 126.28904375634622 }, "type": "Feature", "geometry": { "coordinates": [101.80245971679688, 2.2747039794921875], "type": "Point" } }, { "properties": { "distance": 16.132864269552524, "course": 131.38979185431901 }, "type": "Feature", "geometry": { "coordinates": [102.00396728515625, 2.0972442626953125], "type": "Point" } }, { "properties": { "distance": 17.750840133033943, "course": 132.35037031788315 }, "type": "Feature", "geometry": { "coordinates": [102.22235107421875, 1.8983001708984375], "type": "Point" } }, { "properties": { "distance": 38.05994865649285, "course": 115.15634738068145 }, "type": "Feature", "geometry": { "coordinates": [102.79576110839844, 1.6291351318359375], "type": "Point" } }, { "properties": { "distance": 27.36896870921827, "course": 122.61079210843234 }, "type": "Feature", "geometry": { "coordinates": [103.179443359375, 1.3837432861328125], "type": "Point" } }, { "properties": { "distance": 14.256598978975127, "course": 131.30425301539563 }, "type": "Feature", "geometry": { "coordinates": [103.357666015625, 1.2271881103515625], "type": "Point" } }, { "properties": { "distance": 5.056202855459917, "course": 126.8219106893027 }, "type": "Feature", "geometry": { "coordinates": [103.42501831054688, 1.1767730712890625], "type": "Point" } }, { "properties": { "distance": 1.9589617343118895, "course": 120.74819981444666 }, "type": "Feature", "geometry": { "coordinates": [103.45303344726562, 1.1601104736328125], "type": "Point" } }, { "properties": { "distance": 5.583245283751772, "course": 80.65953453734055 }, "type": "Feature", "geometry": { "coordinates": [103.54470825195312, 1.1751861572265625], "type": "Point" } }, { "properties": { "distance": 3.6537296344211923, "course": 46.68203972376896 }, "type": "Feature", "geometry": { "coordinates": [103.58894348144531, 1.216888427734375], "type": "Point" } }, { "properties": { "distance": 4.195549693351151, "course": 102.72985643096641 }, "type": "Feature", "geometry": { "coordinates": [103.65704345703125, 1.201507568359375], "type": "Point" } }, { "properties": { "distance": 1.7454026314320834, "course": 63.73952756007023 }, "type": "Feature", "geometry": { "coordinates": [103.68309020996094, 1.21435546875], "type": "Point" } }, { "properties": { "distance": 0.8526054953170569, "course": 63.76052696164981 }, "type": "Feature", "geometry": { "coordinates": [103.69581604003906, 1.2206268310546875], "type": "Point" } }, { "properties": { "distance": 1.0169397262722397, "course": 50.11520471938811 }, "type": "Feature", "geometry": { "coordinates": [103.70880126953125, 1.231475830078125], "type": "Point" } }, { "properties": { "distance": 0.9064823394343312, "course": 53.92366720784226 }, "type": "Feature", "geometry": { "coordinates": [103.72099304199219, 1.2403564453125], "type": "Point" } }, { "properties": { "distance": 3.0703240772172906, "course": 83.22360430829855 }, "type": "Feature", "geometry": { "coordinates": [103.771728515625, 1.2463836669921875], "type": "Point" } }, { "properties": { "distance": 1.8779319534048706, "course": 75.75015637558595 }, "type": "Feature", "geometry": { "coordinates": [103.80201721191406, 1.2540740966796875], "type": "Point" } }, { "properties": { "distance": 1.7490598061928542, "course": 126.26352410001687 }, "type": "Feature", "geometry": { "coordinates": [103.82548522949219, 1.2368621826171875], "type": "Point" } }, { "properties": { "distance": 0.3732903833885356, "course": 107.14787573787754 }, "type": "Feature", "geometry": { "coordinates": [103.8314208984375, 1.2350311279296875], "type": "Point" } }, { "properties": { "distance": 0.46428982829855975, "course": 74.53303491751072 }, "type": "Feature", "geometry": { "coordinates": [103.8388671875, 1.237091064453125], "type": "Point" } }, { "properties": { "distance": 0.7459458759661176, "course": 49.98037994069534 }, "type": "Feature", "geometry": { "coordinates": [103.84837341308594, 1.2450714111328125], "type": "Point" } }, { "properties": { "distance": 0.2200460896460097, "course": 74.28064878830452 }, "type": "Feature", "geometry": { "coordinates": [103.85189819335938, 1.246063232421875], "type": "Point" } }, { "properties": { "distance": 0.5512997070499275, "course": 77.50967312433144 }, "type": "Feature", "geometry": { "coordinates": [103.86085510253906, 1.248046875], "type": "Point" } }, { "properties": { "distance": 0.42647867754082736, "course": 77.45494495567982 }, "type": "Feature", "geometry": { "coordinates": [103.86778259277344, 1.2495880126953125], "type": "Point" } }, { "properties": { "distance": 1.1808127595181357, "course": 59.62547129564571 }, "type": "Feature", "geometry": { "coordinates": [103.88473510742188, 1.259521484375], "type": "Point" } }, { "properties": { "distance": 0.5211292277783046, "course": 82.92330785927118 }, "type": "Feature", "geometry": { "coordinates": [103.89334106445312, 1.260589599609375], "type": "Point" } }, { "properties": { "distance": 1.1374113477055887, "course": 102.71714959575014 }, "type": "Feature", "geometry": { "coordinates": [103.91180419921875, 1.2564239501953125], "type": "Point" } }, { "properties": { "distance": 2.274862864309446, "course": 96.69118713707692 }, "type": "Feature", "geometry": { "coordinates": [103.94940185546875, 1.25201416015625], "type": "Point" } }, { "properties": { "distance": 1.1255807008789478, "course": 155.1941324862667 }, "type": "Feature", "geometry": { "coordinates": [103.95726013183594, 1.235015869140625], "type": "Point" } }, { "properties": { "distance": 7.2375019108151655, "course": 80.870905714421 }, "type": "Feature", "geometry": { "coordinates": [104.076171875, 1.254119873046875], "type": "Point" } }, { "properties": { "distance": 2.6579440279529405, "course": 84.03819776516313 }, "type": "Feature", "geometry": { "coordinates": [104.12016296386719, 1.2587127685546875], "type": "Point" } }, { "properties": { "distance": 7.51192342822686, "course": 82.02028950393361 }, "type": "Feature", "geometry": { "coordinates": [104.24395751953125, 1.27606201171875], "type": "Point" } }, { "properties": { "distance": 4.907707321472729, "course": 86.8181920023978 }, "type": "Feature", "geometry": { "coordinates": [104.32550048828125, 1.2805938720703125], "type": "Point" } }, { "properties": { "distance": 10.77550356613628, "course": 48.84988651935816 }, "type": "Feature", "geometry": { "coordinates": [104.46052551269531, 1.3985595703125], "type": "Point" } }, { "properties": { "distance": 13.664082720554719, "course": 44.3079548097298 }, "type": "Feature", "geometry": { "coordinates": [104.61936950683594, 1.5612335205078125], "type": "Point" } }, { "properties": { "distance": 52.90690526445944, "course": 25.250918762559394 }, "type": "Feature", "geometry": { "coordinates": [104.99507141113281, 2.357330322265625], "type": "Point" } }, { "properties": { "distance": 54.60983615312082, "course": 25.25161455906562 }, "type": "Feature", "geometry": { "coordinates": [105.38310241699219, 3.179046630859375], "type": "Point" } }, { "properties": { "distance": 284.47845669110086, "course": 36.1638512010433 }, "type": "Feature", "geometry": { "coordinates": [108.1875, 7], "type": "Point" } }, { "properties": { "distance": 1140.1353251850946, "course": 46.644552842852534 }, "type": "Feature", "geometry": { "coordinates": [121.92106628417969, 20.523345947265625], "type": "Point" } }, { "properties": { "distance": 7.300745388067158, "course": 57.99316391390437 }, "type": "Feature", "geometry": { "coordinates": [122.03106689453125, 20.587722778320312], "type": "Point" } }, { "properties": { "distance": 417.8971866594065, "course": 44.31246057533517 }, "type": "Feature", "geometry": { "coordinates": [127.3125, 25.5625], "type": "Point" } }, { "properties": { "distance": 326.825314685897, "course": 46.39544571621789 }, "type": "Feature", "geometry": { "coordinates": [131.75, 29.3125], "type": "Point" } }, { "properties": { "distance": 346.6869206462501, "course": 48.62368157626587 }, "type": "Feature", "geometry": { "coordinates": [136.8125, 33.125], "type": "Point" } }, { "properties": { "distance": 135.72443038643385, "course": 50.27276307574472 }, "type": "Feature", "geometry": { "coordinates": [138.90359497070312, 34.56817626953125], "type": "Point" } }, { "properties": { "distance": 1.2995359838319764, "course": 2.9644908491119946 }, "type": "Feature", "geometry": { "coordinates": [138.9049530029297, 34.58976745605469], "type": "Point" } }, { "properties": { "distance": 1.6301020866560347, "course": 78.2808057063622 }, "type": "Feature", "geometry": { "coordinates": [138.9372100830078, 34.59527587890625], "type": "Point" } }, { "properties": { "distance": 1.8089870972395705, "course": 57.456789728845656 }, "type": "Feature", "geometry": { "coordinates": [138.96803283691406, 34.61146545410156], "type": "Point" } }, { "properties": { "distance": 3.330356212821191, "course": 48.205465013540355 }, "type": "Feature", "geometry": { "coordinates": [139.0182342529297, 34.64839172363281], "type": "Point" } }, { "properties": { "distance": 16.506487442063968, "course": 32.45057672773381 }, "type": "Feature", "geometry": { "coordinates": [139.19760131835938, 34.880126953125], "type": "Point" } }, { "properties": { "distance": 30.115517532251012, "course": 65.37826315017998 }, "type": "Feature", "geometry": { "coordinates": [139.75352478027344, 35.0888671875], "type": "Point" } }, { "properties": { "distance": 3.952864075554189, "course": 13.6000336889072 }, "type": "Feature", "geometry": { "coordinates": [139.77243041992188, 35.15278625488281], "type": "Point" } }, { "properties": { "distance": 3.5892257583789835, "course": 7.259105443475248 }, "type": "Feature", "geometry": { "coordinates": [139.7816619873047, 35.21202087402344], "type": "Point" } }, { "properties": { "distance": 2.686514506500632, "course": 359.45676926171825 }, "type": "Feature", "geometry": { "coordinates": [139.78114318847656, 35.2567138671875], "type": "Point" } }, { "properties": { "distance": 4.139107888182883, "course": 324.2378664450256 }, "type": "Feature", "geometry": { "coordinates": [139.73184204101562, 35.312591552734375], "type": "Point" } }, { "properties": { "distance": 2.150420545253286, "course": 17.830742391097655 }, "type": "Feature", "geometry": { "coordinates": [139.74526977539062, 35.346649169921875], "type": "Point" } }, { "properties": { "distance": 3.899249501938297, "course": 20.887361521116404 }, "type": "Feature", "geometry": { "coordinates": [139.7736358642578, 35.407257080078125], "type": "Point" } }, { "properties": { "distance": 1.0464052750272677, "course": 46.177024678712215 }, "type": "Feature", "geometry": { "coordinates": [139.78904724121094, 35.4193115234375], "type": "Point" } }, { "properties": { "distance": 4.8151805577847115, "course": 46.63354834244807 }, "type": "Feature", "geometry": { "coordinates": [139.86053466796875, 35.47431945800781], "type": "Point" } }, { "properties": { "distance": 1.8980993342799735, "course": 25.494471701683434 }, "type": "Feature", "geometry": { "coordinates": [139.87722778320312, 35.50282287597656], "type": "Point" } }, { "properties": { "distance": 2.684727715210292, "course": 343.87341972340096 }, "type": "Feature", "geometry": { "coordinates": [139.8619842529297, 35.54573059082031], "type": "Point" } }, { "properties": { "distance": 1.0591504663247127, "course": 295.6014690037866 }, "type": "Feature", "geometry": { "coordinates": [139.8424530029297, 35.5533447265625], "type": "Point" } }, { "properties": { "distance": 0.780425058702714, "course": 301.37400760778775 }, "type": "Feature", "geometry": { "coordinates": [139.82882690429688, 35.56010437011719], "type": "Point" } }, { "properties": { "distance": 1.568699448875706, "course": 305.4911336992209 }, "type": "Feature", "geometry": { "coordinates": [139.80270385742188, 35.57525634765625], "type": "Point" } }, { "properties": { "distance": 1.414776498323463, "course": 318.3713975527005 }, "type": "Feature", "geometry": { "coordinates": [139.78347778320312, 35.59284973144531], "type": "Point" } }, { "properties": { "distance": 0.6484813067266687, "course": 328.83424813785183 }, "type": "Feature", "geometry": { "coordinates": [139.776611328125, 35.602081298828125], "type": "Point" } }, { "properties": { "distance": 0.7583688621250676, "course": 323.0740946952663 }, "type": "Feature", "geometry": { "coordinates": [139.7672882080078, 35.61216735839844], "type": "Point" } }, { "properties": { "distance": 0.19855173597110315, "course": 272.6476087786225 }, "type": "Feature", "geometry": { "coordinates": [139.7632293701172, 35.61231994628906], "type": "Point" } }], "totalDistance": 9218.46834318174 }
const l = {"points":[{"properties":{"name":"Mariupol / ex Zhdanov","port":"UAMPW"},"type":"Feature","geometry":{"coordinates":[37.502197265625,47.05216979980469],"type":"Point"}},{"properties":{"name":"Los Angeles, CA","port":"USLAX"},"type":"Feature","geometry":{"coordinates":[-118.21841430664062,33.75691223144531],"type":"Point"}}],"waypoints":[{"properties":{},"type":"Feature","geometry":{"coordinates":[37.502197265625,47.05216979980469],"type":"Point"}},{"properties":{"distance":0.16972972730471902,"course":173.87068426190592},"type":"Feature","geometry":{"coordinates":[37.50263977050781,47.04936218261719],"type":"Point"}},{"properties":{"distance":0.14666472048051227,"course":173.88489769999813},"type":"Feature","geometry":{"coordinates":[37.503021240234375,47.04693603515625],"type":"Point"}},{"properties":{"distance":0.6222207250444863,"course":192.2365813428738},"type":"Feature","geometry":{"coordinates":[37.49980163574219,47.03681945800781],"type":"Point"}},{"properties":{"distance":0.8971756756977225,"course":192.22967741870823},"type":"Feature","geometry":{"coordinates":[37.49516296386719,47.02223205566406],"type":"Point"}},{"properties":{"distance":4.322019316357316,"course":192.25246277961122},"type":"Feature","geometry":{"coordinates":[37.47279357910156,46.95196533203125],"type":"Point"}},{"properties":{"distance":3.7767934911183105,"course":192.2574419630837},"type":"Feature","geometry":{"coordinates":[37.45326232910156,46.89056396484375],"type":"Point"}},{"properties":{"distance":3.1706922384070513,"course":123.3596842900619},"type":"Feature","geometry":{"coordinates":[37.51771545410156,46.86155700683594],"type":"Point"}},{"properties":{"distance":1.021071848294916,"course":201.89245722271966},"type":"Feature","geometry":{"coordinates":[37.508453369140625,46.845794677734375],"type":"Point"}},{"properties":{"distance":87.88015897227389,"course":200.27807031918832},"type":"Feature","geometry":{"coordinates":[36.77684020996094,45.474365234375],"type":"Point"}},{"properties":{"distance":4.541076062246259,"course":238.40471610880599},"type":"Feature","geometry":{"coordinates":[36.68510437011719,45.434783935546875],"type":"Point"}},{"properties":{"distance":0.7839992732312797,"course":194.1132606833852},"type":"Feature","geometry":{"coordinates":[36.680572509765625,45.42213439941406],"type":"Point"}},{"properties":{"distance":4.00452444182373,"course":194.29402221340746},"type":"Feature","geometry":{"coordinates":[36.65715026855469,45.357574462890625],"type":"Point"}},{"properties":{"distance":0.35886354380207464,"course":218.5500417027726},"type":"Feature","geometry":{"coordinates":[36.65185546875,45.3529052734375],"type":"Point"}},{"properties":{"distance":5.402219040218457,"course":246.60250781142807},"type":"Feature","geometry":{"coordinates":[36.534515380859375,45.31721496582031],"type":"Point"}},{"properties":{"distance":2.3148075918435573,"course":246.65797248384638},"type":"Feature","geometry":{"coordinates":[36.48423767089844,45.30195617675781],"type":"Point"}},{"properties":{"distance":1.657887353113233,"course":217.24272734081987},"type":"Feature","geometry":{"coordinates":[36.46051025390625,45.279998779296875],"type":"Point"}},{"properties":{"distance":0.3568465671596882,"course":201.0947390048433},"type":"Feature","geometry":{"coordinates":[36.45747375488281,45.27445983886719],"type":"Point"}},{"properties":{"distance":0.18896191012642896,"course":189.83352765991856},"type":"Feature","geometry":{"coordinates":[36.45671081542969,45.2713623046875],"type":"Point"}},{"properties":{"distance":4.347207538505227,"course":176.71237302031406},"type":"Feature","geometry":{"coordinates":[36.46260070800781,45.19915771484375],"type":"Point"}},{"properties":{"distance":2.8366003746154522,"course":178.72006748639387},"type":"Feature","geometry":{"coordinates":[36.46409606933594,45.1519775390625],"type":"Point"}},{"properties":{"distance":2.7426793599229726,"course":150.3957165703883},"type":"Feature","geometry":{"coordinates":[36.49604797363281,45.1123046875],"type":"Point"}},{"properties":{"distance":17.764057650631905,"course":184.37034010004714},"type":"Feature","geometry":{"coordinates":[36.46421813964844,44.817626953125],"type":"Point"}},{"properties":{"distance":18.622452810798592,"course":239.5104044823313},"type":"Feature","geometry":{"coordinates":[36.08836364746094,44.660430908203125],"type":"Point"}},{"properties":{"distance":12.695602458477005,"course":237.8740494398582},"type":"Feature","geometry":{"coordinates":[35.837127685546875,44.54811096191406],"type":"Point"}},{"properties":{"distance":34.81498252159051,"course":243.94821912098948},"type":"Feature","geometry":{"coordinates":[35.108551025390625,44.293731689453125],"type":"Point"}},{"properties":{"distance":6.2143771064644335,"course":248.5387406638614},"type":"Feature","geometry":{"coordinates":[34.97416687011719,44.25590515136719],"type":"Point"}},{"properties":{"distance":8.176678864856525,"course":245.67669415278294},"type":"Feature","geometry":{"coordinates":[34.801177978515625,44.19987487792969],"type":"Point"}},{"properties":{"distance":171.65015137178096,"course":226.937255783797},"type":"Feature","geometry":{"coordinates":[31.9375,42.25],"type":"Point"}},{"properties":{"distance":135.93132564287444,"course":246.62365891671493},"type":"Feature","geometry":{"coordinates":[29.152786254882812,41.35272216796875],"type":"Point"}},{"properties":{"distance":7.6075327100255405,"course":187.58432180768716},"type":"Feature","geometry":{"coordinates":[29.13055419921875,41.227264404296875],"type":"Point"}},{"properties":{"distance":1.671736887059279,"course":210.0950060045327},"type":"Feature","geometry":{"coordinates":[29.112014770507812,41.20320129394531],"type":"Point"}},{"properties":{"distance":1.854532576045188,"course":224.54859013495292},"type":"Feature","geometry":{"coordinates":[29.083251953125,41.18121337890625],"type":"Point"}},{"properties":{"distance":1.9096804225892001,"course":218.74254479290022},"type":"Feature","geometry":{"coordinates":[29.056838989257812,41.15643310546875],"type":"Point"}},{"properties":{"distance":0.5026329365918731,"course":180.55106228214999},"type":"Feature","geometry":{"coordinates":[29.056732177734375,41.1480712890625],"type":"Point"}},{"properties":{"distance":0.8727391425013338,"course":145.37244010126864},"type":"Feature","geometry":{"coordinates":[29.06768798828125,41.13612365722656],"type":"Point"}},{"properties":{"distance":0.9185028146674742,"course":146.6978054399489},"type":"Feature","geometry":{"coordinates":[29.078826904296875,41.12335205078125],"type":"Point"}},{"properties":{"distance":0.23146143760739155,"course":183.08002341334236},"type":"Feature","geometry":{"coordinates":[29.07855224609375,41.1195068359375],"type":"Point"}},{"properties":{"distance":1.1169454393490175,"course":222.21146164274177},"type":"Feature","geometry":{"coordinates":[29.061981201171875,41.105743408203125],"type":"Point"}},{"properties":{"distance":0.4030204540565812,"course":194.19505780305377},"type":"Feature","geometry":{"coordinates":[29.059799194335938,41.0992431640625],"type":"Point"}},{"properties":{"distance":1.0299943602552883,"course":180.26916535336218},"type":"Feature","geometry":{"coordinates":[29.0596923828125,41.08210754394531],"type":"Point"}},{"properties":{"distance":0.5544009633713024,"course":223.01115640067266},"type":"Feature","geometry":{"coordinates":[29.051345825195312,41.07536315917969],"type":"Point"}},{"properties":{"distance":1.5024036399295324,"course":197.98992783527763},"type":"Feature","geometry":{"coordinates":[29.041107177734375,41.05158996582031],"type":"Point"}},{"properties":{"distance":2.5853179810864626,"course":232.9336414799473},"type":"Feature","geometry":{"coordinates":[28.99560546875,41.025665283203125],"type":"Point"}},{"properties":{"distance":0.4313936643881549,"course":198.1303465377076},"type":"Feature","geometry":{"coordinates":[28.992645263671875,41.01884460449219],"type":"Point"}},{"properties":{"distance":1.6821235913675663,"course":180.35363636874527},"type":"Feature","geometry":{"coordinates":[28.992416381835938,40.99085998535156],"type":"Point"}},{"properties":{"distance":0.5274576966835284,"course":203.84587803124992},"type":"Feature","geometry":{"coordinates":[28.987716674804688,40.98283386230469],"type":"Point"}},{"properties":{"distance":2.3191074668273597,"course":229.14618685777762},"type":"Feature","geometry":{"coordinates":[28.949066162109375,40.95759582519531],"type":"Point"}},{"properties":{"distance":1.7957376844634203,"course":235.21444894681548},"type":"Feature","geometry":{"coordinates":[28.916580200195312,40.9405517578125],"type":"Point"}},{"properties":{"distance":1.932116626075023,"course":235.17574638654634},"type":"Feature","geometry":{"coordinates":[28.88165283203125,40.92219543457031],"type":"Point"}},{"properties":{"distance":17.148131575692243,"course":261.06768999621755},"type":"Feature","geometry":{"coordinates":[28.5087890625,40.877899169921875],"type":"Point"}},{"properties":{"distance":12.23674554785632,"course":261.0614018543865},"type":"Feature","geometry":{"coordinates":[28.242874145507812,40.84626770019531],"type":"Point"}},{"properties":{"distance":3.5286805901889604,"course":261.0732504985305},"type":"Feature","geometry":{"coordinates":[28.166213989257812,40.837158203125],"type":"Point"}},{"properties":{"distance":6.142056952991132,"course":261.0658386986677},"type":"Feature","geometry":{"coordinates":[28.032806396484375,40.8212890625],"type":"Point"}},{"properties":{"distance":11.401504811511899,"course":261.06375202873755},"type":"Feature","geometry":{"coordinates":[27.785247802734375,40.79182434082031],"type":"Point"}},{"properties":{"distance":6.565339252365673,"course":261.0631811936263},"type":"Feature","geometry":{"coordinates":[27.642745971679688,40.77485656738281],"type":"Point"}},{"properties":{"distance":10.883000959261729,"course":243.36778983968514},"type":"Feature","geometry":{"coordinates":[27.429153442382812,40.693695068359375],"type":"Point"}},{"properties":{"distance":2.9763051998239156,"course":243.36089469418482},"type":"Feature","geometry":{"coordinates":[27.37078857421875,40.67149353027344],"type":"Point"}},{"properties":{"distance":11.325663235758,"course":243.36440796540592},"type":"Feature","geometry":{"coordinates":[27.14886474609375,40.58702087402344],"type":"Point"}},{"properties":{"distance":5.809491475745452,"course":243.36124602642658},"type":"Feature","geometry":{"coordinates":[27.035140991210938,40.54368591308594],"type":"Point"}},{"properties":{"distance":3.9767304870833886,"course":243.36191568419508},"type":"Feature","geometry":{"coordinates":[26.95733642578125,40.51402282714844],"type":"Point"}},{"properties":{"distance":3.718064038247354,"course":243.3548397762895},"type":"Feature","geometry":{"coordinates":[26.884628295898438,40.48628234863281],"type":"Point"}},{"properties":{"distance":6.817460246039285,"course":243.36771999681716},"type":"Feature","geometry":{"coordinates":[26.751373291015625,40.43544006347656],"type":"Point"}},{"properties":{"distance":3.812122566985792,"course":234.23931466928985},"type":"Feature","geometry":{"coordinates":[26.68377685546875,40.39837646484375],"type":"Point"}},{"properties":{"distance":4.17652529920616,"course":213.82391066234828},"type":"Feature","geometry":{"coordinates":[26.633010864257812,40.34065246582031],"type":"Point"}},{"properties":{"distance":10.564239368550204,"course":229.00446113161237},"type":"Feature","geometry":{"coordinates":[26.459121704101562,40.22535705566406],"type":"Point"}},{"properties":{"distance":3.461347015664302,"course":248.74705066178535},"type":"Feature","geometry":{"coordinates":[26.388839721679688,40.20448303222656],"type":"Point"}},{"properties":{"distance":0.8467123397556738,"course":220.68983169352424},"type":"Feature","geometry":{"coordinates":[26.376815795898438,40.19380187988281],"type":"Point"}},{"properties":{"distance":0.5611272531025364,"course":177.06551257530498},"type":"Feature","geometry":{"coordinates":[26.37744140625,40.184478759765625],"type":"Point"}},{"properties":{"distance":1.8616124011064545,"course":168.64450188136456},"type":"Feature","geometry":{"coordinates":[26.385421752929688,40.15411376953125],"type":"Point"}},{"properties":{"distance":0.3587627324269272,"course":168.27469068236343},"type":"Feature","geometry":{"coordinates":[26.387008666992188,40.14826965332031],"type":"Point"}},{"properties":{"distance":0.32959358493308083,"course":188.93313216503188},"type":"Feature","geometry":{"coordinates":[26.385894775390625,40.142852783203125],"type":"Point"}},{"properties":{"distance":0.4121338953451444,"course":201.87481859866415},"type":"Feature","geometry":{"coordinates":[26.382553100585938,40.13648986816406],"type":"Point"}},{"properties":{"distance":4.8707414216467075,"course":224.75797981101744},"type":"Feature","geometry":{"coordinates":[26.307952880859375,40.078948974609375],"type":"Point"}},{"properties":{"distance":3.7447037813236705,"course":235.3222370889411},"type":"Feature","geometry":{"coordinates":[26.241012573242188,40.04350280761719],"type":"Point"}},{"properties":{"distance":2.695922570513285,"course":249.75774515158682},"type":"Feature","geometry":{"coordinates":[26.186050415039062,40.027984619140625],"type":"Point"}},{"properties":{"distance":9.482897928029566,"course":262.34094373929963},"type":"Feature","geometry":{"coordinates":[25.981887817382812,40.0069580078125],"type":"Point"}},{"properties":{"distance":9.565353819390598,"course":226.83973761138776},"type":"Feature","geometry":{"coordinates":[25.830459594726562,39.898101806640625],"type":"Point"}},{"properties":{"distance":126.07515287950613,"course":206.18956542649534},"type":"Feature","geometry":{"coordinates":[24.639892578125,38.01594543457031],"type":"Point"}},{"properties":{"distance":5.706905003320248,"course":208.4470044584327},"type":"Feature","geometry":{"coordinates":[24.58251953125,37.932464599609375],"type":"Point"}},{"properties":{"distance":24.01377591457811,"course":251.06749666975895},"type":"Feature","geometry":{"coordinates":[24.10382080078125,37.80284118652344],"type":"Point"}},{"properties":{"distance":4.194204618882856,"course":184.48130561887746},"type":"Feature","geometry":{"coordinates":[24.096923828125,37.7332763671875],"type":"Point"}},{"properties":{"distance":2.2894105973746806,"course":212.2532982593728},"type":"Feature","geometry":{"coordinates":[24.07122802734375,37.70106506347656],"type":"Point"}},{"properties":{"distance":0.5595172826145184,"course":148.834048355737},"type":"Feature","geometry":{"coordinates":[24.077316284179688,37.69309997558594],"type":"Point"}},{"properties":{"distance":0.8046118653213854,"course":161.10448437416628},"type":"Feature","geometry":{"coordinates":[24.082794189453125,37.68043518066406],"type":"Point"}},{"properties":{"distance":0.9541122543987677,"course":189.50355332627294},"type":"Feature","geometry":{"coordinates":[24.079483032226562,37.66477966308594],"type":"Point"}},{"properties":{"distance":4.7743834411743675,"course":234.186822526165},"type":"Feature","geometry":{"coordinates":[23.998138427734375,37.61830139160156],"type":"Point"}},{"properties":{"distance":4.566789501982646,"course":279.6889742859579},"type":"Feature","geometry":{"coordinates":[23.903579711914062,37.63108825683594],"type":"Point"}},{"properties":{"distance":7.19385650200528,"course":289.22726943959685},"type":"Feature","geometry":{"coordinates":[23.760848999023438,37.670501708984375],"type":"Point"}},{"properties":{"distance":11.534410165340264,"course":334.1322958667647},"type":"Feature","geometry":{"coordinates":[23.654953002929688,37.843170166015625],"type":"Point"}},{"properties":{"distance":6.612214318464545,"course":259.45797678137546},"type":"Feature","geometry":{"coordinates":[23.518020629882812,37.82304382324219],"type":"Point"}},{"properties":{"distance":1.184822934820459,"course":280.1205958929709},"type":"Feature","geometry":{"coordinates":[23.493453979492188,37.826507568359375],"type":"Point"}},{"properties":{"distance":20.16032415624032,"course":280.93582539640613},"type":"Feature","geometry":{"coordinates":[23.07635498046875,37.89013671875],"type":"Point"}},{"properties":{"distance":1.1983874536969674,"course":285.037396558336},"type":"Feature","geometry":{"coordinates":[23.051956176757812,37.89530944824219],"type":"Point"}},{"properties":{"distance":2.3437042487252993,"course":301.9171293640281},"type":"Feature","geometry":{"coordinates":[23.010009765625,37.915924072265625],"type":"Point"}},{"properties":{"distance":0.11980291241003123,"course":313.55178107283155},"type":"Feature","geometry":{"coordinates":[23.0081787109375,37.91729736328125],"type":"Point"}},{"properties":{"distance":0.647011742327843,"course":312.4350040323216},"type":"Feature","geometry":{"coordinates":[22.99810791015625,37.924560546875],"type":"Point"}},{"properties":{"distance":0.15084305961980526,"course":311.9770539201462},"type":"Feature","geometry":{"coordinates":[22.995742797851562,37.926239013671875],"type":"Point"}},{"properties":{"distance":0.47831460641110335,"course":312.30247689916143},"type":"Feature","geometry":{"coordinates":[22.98828125,37.93159484863281],"type":"Point"}},{"properties":{"distance":1.1254227191112018,"course":312.12184768973407},"type":"Feature","geometry":{"coordinates":[22.970672607421875,37.94415283203125],"type":"Point"}},{"properties":{"distance":0.5653643740422231,"course":312.31763021480066},"type":"Feature","geometry":{"coordinates":[22.96185302734375,37.95048522949219],"type":"Point"}},{"properties":{"distance":0.45452005815910795,"course":311.59687592246854},"type":"Feature","geometry":{"coordinates":[22.954681396484375,37.95550537109375],"type":"Point"}},{"properties":{"distance":0.7941492679980008,"course":302.325151651454},"type":"Feature","geometry":{"coordinates":[22.940521240234375,37.96257019042969],"type":"Point"}},{"properties":{"distance":7.027627762537723,"course":302.8291467460945},"type":"Feature","geometry":{"coordinates":[22.81585693359375,38.02595520019531],"type":"Point"}},{"properties":{"distance":11.56686616711208,"course":301.65747615070035},"type":"Feature","geometry":{"coordinates":[22.607772827148438,38.126953125],"type":"Point"}},{"properties":{"distance":17.347361602224364,"course":295.595078718681},"type":"Feature","geometry":{"coordinates":[22.276611328125,38.25163269042969],"type":"Point"}},{"properties":{"distance":6.491530451913512,"course":292.76708780538223},"type":"Feature","geometry":{"coordinates":[22.149765014648438,38.293426513671875],"type":"Point"}},{"properties":{"distance":4.976868882308794,"course":291.38933476189754},"type":"Feature","geometry":{"coordinates":[22.051513671875,38.32362365722656],"type":"Point"}},{"properties":{"distance":3.4536419820447626,"course":291.38435545297324},"type":"Feature","geometry":{"coordinates":[21.983306884765625,38.344573974609375],"type":"Point"}},{"properties":{"distance":6.471418823741753,"course":273.99844467763137},"type":"Feature","geometry":{"coordinates":[21.846359252929688,38.352081298828125],"type":"Point"}},{"properties":{"distance":3.2564201240711577,"course":239.74349948202456},"type":"Feature","geometry":{"coordinates":[21.786697387695312,38.32478332519531],"type":"Point"}},{"properties":{"distance":0.8987199373933359,"course":246.80107201636827},"type":"Feature","geometry":{"coordinates":[21.769180297851562,38.31889343261719],"type":"Point"}},{"properties":{"distance":0.7780188822759988,"course":247.10634436586508},"type":"Feature","geometry":{"coordinates":[21.753982543945312,38.31385803222656],"type":"Point"}},{"properties":{"distance":12.941204941996507,"course":255.46577516182674},"type":"Feature","geometry":{"coordinates":[21.48846435546875,38.25982666015625],"type":"Point"}},{"properties":{"distance":7.588196249701078,"course":258.38313342411095},"type":"Feature","geometry":{"coordinates":[21.331008911132812,38.234405517578125],"type":"Point"}},{"properties":{"distance":27.555336639925756,"course":241.52100583512822},"type":"Feature","geometry":{"coordinates":[20.818771362304688,38.01580810546875],"type":"Point"}},{"properties":{"distance":228.86082014001224,"course":267.18078970421857},"type":"Feature","geometry":{"coordinates":[15.9979248046875,37.82853698730469],"type":"Point"}},{"properties":{"distance":13.90037049283003,"course":275.3268009314408},"type":"Feature","geometry":{"coordinates":[15.70635986328125,37.850006103515625],"type":"Point"}},{"properties":{"distance":5.135860206396729,"course":313.4075005821522},"type":"Feature","geometry":{"coordinates":[15.627716064453125,37.908721923828125],"type":"Point"}},{"properties":{"distance":5.133202514080237,"course":339.3152738528797},"type":"Feature","geometry":{"coordinates":[15.589462280273438,37.988616943359375],"type":"Point"}},{"properties":{"distance":7.574983612701908,"course":6.185026619872574},"type":"Feature","geometry":{"coordinates":[15.606704711914062,38.11390686035156],"type":"Point"}},{"properties":{"distance":0.6408068502200797,"course":5.881319613311664},"type":"Feature","geometry":{"coordinates":[15.60809326171875,38.12451171875],"type":"Point"}},{"properties":{"distance":1.1213116192828916,"course":5.9455235554565675},"type":"Feature","geometry":{"coordinates":[15.610549926757812,38.14306640625],"type":"Point"}},{"properties":{"distance":3.978082709473009,"course":3.5537729064880317},"type":"Feature","geometry":{"coordinates":[15.615768432617188,38.20912170410156],"type":"Point"}},{"properties":{"distance":0.742463413569493,"course":3.5055945161302726},"type":"Feature","geometry":{"coordinates":[15.616729736328125,38.22145080566406],"type":"Point"}},{"properties":{"distance":0.7592241225594044,"course":2.501938274005117},"type":"Feature","geometry":{"coordinates":[15.617431640625,38.23406982421875],"type":"Point"}},{"properties":{"distance":3.500873483469586,"course":65.28369413541374},"type":"Feature","geometry":{"coordinates":[15.684799194335938,38.2584228515625],"type":"Point"}},{"properties":{"distance":1.1484144335394135,"course":24.210058922103688},"type":"Feature","geometry":{"coordinates":[15.694778442382812,38.275848388671875],"type":"Point"}},{"properties":{"distance":1.6706002716733692,"course":14.80501316258136},"type":"Feature","geometry":{"coordinates":[15.703826904296875,38.30271911621094],"type":"Point"}},{"properties":{"distance":7.376787904162812,"course":282.5523987959841},"type":"Feature","geometry":{"coordinates":[15.5511474609375,38.32939147949219],"type":"Point"}},{"properties":{"distance":106.29419924342365,"course":268.3505110875554},"type":"Feature","geometry":{"coordinates":[13.298583984375,38.27848815917969],"type":"Point"}},{"properties":{"distance":606.0502833155912,"course":256.7291996493392},"type":"Feature","geometry":{"coordinates":[0.7641754150390625,36.60820007324219],"type":"Point"}},{"properties":{"distance":281.5967851231458,"course":262.5406812501725},"type":"Feature","geometry":{"coordinates":[-5,36],"type":"Point"}},{"properties":{"distance":15.582294745817576,"course":274.6455366668797},"type":"Feature","geometry":{"coordinates":[-5.319427490234375,36.02099609375],"type":"Point"}},{"properties":{"distance":5.265523269287839,"course":252.3782239539788},"type":"Feature","geometry":{"coordinates":[-5.422637939453125,35.994476318359375],"type":"Point"}},{"properties":{"distance":3.5872403773860926,"course":252.42504198057844},"type":"Feature","geometry":{"coordinates":[-5.492950439453125,35.97645568847656],"type":"Point"}},{"properties":{"distance":1.8067457655091856,"course":252.3890747808597},"type":"Feature","geometry":{"coordinates":[-5.528350830078125,35.96736145019531],"type":"Point"}},{"properties":{"distance":1.2765027152073944,"course":252.39279568116356},"type":"Feature","geometry":{"coordinates":[-5.5533599853515625,35.9609375],"type":"Point"}},{"properties":{"distance":1.4387713759318461,"course":252.3743017844101},"type":"Feature","geometry":{"coordinates":[-5.58154296875,35.95368957519531],"type":"Point"}},{"properties":{"distance":1.4022990281888652,"course":252.37268640077681},"type":"Feature","geometry":{"coordinates":[-5.6090087890625,35.946624755859375],"type":"Point"}},{"properties":{"distance":6.533606103547969,"course":270.56302154167076},"type":"Feature","geometry":{"coordinates":[-5.7432708740234375,35.94769287109375],"type":"Point"}},{"properties":{"distance":2.9731006757533773,"course":270.5656142560591},"type":"Feature","geometry":{"coordinates":[-5.8043670654296875,35.94818115234375],"type":"Point"}},{"properties":{"distance":7.484642987310497,"course":270.5616927060894},"type":"Feature","geometry":{"coordinates":[-5.9581756591796875,35.94940185546875],"type":"Point"}},{"properties":{"distance":12.114766659230092,"course":270.55523219908605},"type":"Feature","geometry":{"coordinates":[-6.2071380615234375,35.95135498046875],"type":"Point"}},{"properties":{"distance":3253.9008458624476,"course":238.4252728356401},"type":"Feature","geometry":{"coordinates":[-64.64881896972656,18.204803466796875],"type":"Point"}},{"properties":{"distance":27.87503159076177,"course":245.2335503620132},"type":"Feature","geometry":{"coordinates":[-65.09185791015625,18.010528564453125],"type":"Point"}},{"properties":{"distance":105.81074435095661,"course":243.7479341185009},"type":"Feature","geometry":{"coordinates":[-66.74838256835938,17.231887817382812],"type":"Point"}},{"properties":{"distance":884.5562788885242,"course":238.24061828605988},"type":"Feature","geometry":{"coordinates":[-79.79574584960938,9.754791259765625],"type":"Point"}},{"properties":{"distance":11.668865466742778,"course":201.03312122043866},"type":"Feature","geometry":{"coordinates":[-79.86642456054688,9.573593139648438],"type":"Point"}},{"properties":{"distance":8.621287559142424,"course":200.95802241734964},"type":"Feature","geometry":{"coordinates":[-79.91844177246094,9.439651489257812],"type":"Point"}},{"properties":{"distance":1.6270917329098533,"course":180.35047118659799},"type":"Feature","geometry":{"coordinates":[-79.91860961914062,9.412582397460938],"type":"Point"}},{"properties":{"distance":0.21187422151101779,"course":180.4893790325931},"type":"Feature","geometry":{"coordinates":[-79.91864013671875,9.4090576171875],"type":"Point"}},{"properties":{"distance":0.6035093486665507,"course":180.34361753023154},"type":"Feature","geometry":{"coordinates":[-79.918701171875,9.399017333984375],"type":"Point"}},{"properties":{"distance":0.8052888177424904,"course":180.3219082013903},"type":"Feature","geometry":{"coordinates":[-79.91877746582031,9.3856201171875],"type":"Point"}},{"properties":{"distance":0.689727406651638,"course":180.37585699631086},"type":"Feature","geometry":{"coordinates":[-79.91885375976562,9.3741455078125],"type":"Point"}},{"properties":{"distance":0.7236620374181358,"course":180.3582438616079},"type":"Feature","geometry":{"coordinates":[-79.91893005371094,9.362106323242188],"type":"Point"}},{"properties":{"distance":0.5273857284297401,"course":180.3932690316694},"type":"Feature","geometry":{"coordinates":[-79.91899108886719,9.35333251953125],"type":"Point"}},{"properties":{"distance":0.16601041150067128,"course":180.31234082143587},"type":"Feature","geometry":{"coordinates":[-79.91900634765625,9.350570678710938],"type":"Point"}},{"properties":{"distance":2.031573200485481,"course":180.35734119805684},"type":"Feature","geometry":{"coordinates":[-79.91921997070312,9.3167724609375],"type":"Point"}},{"properties":{"distance":1.0171426010111033,"course":180},"type":"Feature","geometry":{"coordinates":[-79.91921997070312,9.299850463867188],"type":"Point"}},{"properties":{"distance":0.502752176263245,"course":187.86422714314216},"type":"Feature","geometry":{"coordinates":[-79.92037963867188,9.29156494140625],"type":"Point"}},{"properties":{"distance":0.5699032864370887,"course":189.4153242788665},"type":"Feature","geometry":{"coordinates":[-79.92195129394531,9.282211303710938],"type":"Point"}},{"properties":{"distance":1.1514122741530541,"course":187.7257829953637},"type":"Feature","geometry":{"coordinates":[-79.924560546875,9.263229370117188],"type":"Point"}},{"properties":{"distance":1.7857465550921108,"course":179.76763974649177},"type":"Feature","geometry":{"coordinates":[-79.9244384765625,9.2335205078125],"type":"Point"}},{"properties":{"distance":1.1226205473753408,"course":179.86138539242796},"type":"Feature","geometry":{"coordinates":[-79.92439270019531,9.21484375],"type":"Point"}},{"properties":{"distance":0.22654303756158323,"course":179.7710268530692},"type":"Feature","geometry":{"coordinates":[-79.92437744140625,9.211074829101562],"type":"Point"}},{"properties":{"distance":3.7296579824364615,"course":119.93103614576395},"type":"Feature","geometry":{"coordinates":[-79.86990356445312,9.18011474609375],"type":"Point"}},{"properties":{"distance":0.12031922090364765,"course":119.20002602673453},"type":"Feature","geometry":{"coordinates":[-79.86813354492188,9.17913818359375],"type":"Point"}},{"properties":{"distance":1.0389157389634278,"course":73.64319472516776},"type":"Feature","geometry":{"coordinates":[-79.85133361816406,9.184005737304688],"type":"Point"}},{"properties":{"distance":0.3731270481070404,"course":73.4330414099545},"type":"Feature","geometry":{"coordinates":[-79.84530639648438,9.185775756835938],"type":"Point"}},{"properties":{"distance":2.417110531715757,"course":130.39846144570146},"type":"Feature","geometry":{"coordinates":[-79.81428527832031,9.159713745117188],"type":"Point"}},{"properties":{"distance":2.207799520292204,"course":169.00530112705633},"type":"Feature","geometry":{"coordinates":[-79.80718994140625,9.1236572265625],"type":"Point"}},{"properties":{"distance":0.2520736295297556,"course":169.2333461841966},"type":"Feature","geometry":{"coordinates":[-79.806396484375,9.119537353515625],"type":"Point"}},{"properties":{"distance":2.254867172229792,"course":101.94874542856678},"type":"Feature","geometry":{"coordinates":[-79.76922607421875,9.111770629882812],"type":"Point"}},{"properties":{"distance":0.8279932959922498,"course":57.95467831959296},"type":"Feature","geometry":{"coordinates":[-79.75740051269531,9.11907958984375],"type":"Point"}},{"properties":{"distance":0.5382913581082158,"course":77.80273466252889},"type":"Feature","geometry":{"coordinates":[-79.74853515625,9.1209716796875],"type":"Point"}},{"properties":{"distance":2.6245583438334865,"course":99.18959777927489},"type":"Feature","geometry":{"coordinates":[-79.70487976074219,9.113998413085938],"type":"Point"}},{"properties":{"distance":0.12569625344273758,"course":99.23754134918741},"type":"Feature","geometry":{"coordinates":[-79.70278930664062,9.113662719726562],"type":"Point"}},{"properties":{"distance":0.7670262343550234,"course":121.26218974693268},"type":"Feature","geometry":{"coordinates":[-79.69174194335938,9.107040405273438],"type":"Point"}},{"properties":{"distance":0.3308745169969298,"course":142.18631837296414},"type":"Feature","geometry":{"coordinates":[-79.68832397460938,9.102691650390625],"type":"Point"}},{"properties":{"distance":1.335625479176226,"course":151.35415618067026},"type":"Feature","geometry":{"coordinates":[-79.67753601074219,9.08319091796875],"type":"Point"}},{"properties":{"distance":0.7758154890713901,"course":158.496209882204},"type":"Feature","geometry":{"coordinates":[-79.67274475097656,9.071182250976562],"type":"Point"}},{"properties":{"distance":0.41086362742346944,"course":144.56656136574736},"type":"Feature","geometry":{"coordinates":[-79.66873168945312,9.06561279296875],"type":"Point"}},{"properties":{"distance":0.8397889252454452,"course":127.86370968660655},"type":"Feature","geometry":{"coordinates":[-79.65756225585938,9.057037353515625],"type":"Point"}},{"properties":{"distance":1.411052963100127,"course":143.89496879578425},"type":"Feature","geometry":{"coordinates":[-79.6435546875,9.038070678710938],"type":"Point"}},{"properties":{"distance":0.7448464169290941,"course":127.19975468645079},"type":"Feature","geometry":{"coordinates":[-79.63356018066406,9.03057861328125],"type":"Point"}},{"properties":{"distance":0.1888925188162186,"course":133.2063579769672},"type":"Feature","geometry":{"coordinates":[-79.63124084472656,9.028427124023438],"type":"Point"}},{"properties":{"distance":1.4240147734583062,"course":131.90556090364723},"type":"Feature","geometry":{"coordinates":[-79.61338806152344,9.012603759765625],"type":"Point"}},{"properties":{"distance":1.9701559519441858,"course":142.0993410252381},"type":"Feature","geometry":{"coordinates":[-79.59300231933594,8.986740112304688],"type":"Point"}},{"properties":{"distance":0.4107367533987757,"course":142.02184114544974},"type":"Feature","geometry":{"coordinates":[-79.5887451171875,8.981353759765625],"type":"Point"}},{"properties":{"distance":1.3043627495747188,"course":141.56521326035067},"type":"Feature","geometry":{"coordinates":[-79.57508850097656,8.96435546875],"type":"Point"}},{"properties":{"distance":0.5593881463257058,"course":160.80546019679048},"type":"Feature","geometry":{"coordinates":[-79.57199096679688,8.95556640625],"type":"Point"}},{"properties":{"distance":0.1407879428683358,"course":160.84085827090829},"type":"Feature","geometry":{"coordinates":[-79.57121276855469,8.953353881835938],"type":"Point"}},{"properties":{"distance":0.2476852349491032,"course":160.77926968367572},"type":"Feature","geometry":{"coordinates":[-79.56983947753906,8.949462890625],"type":"Point"}},{"properties":{"distance":0.1468449216650965,"course":141.9038764528824},"type":"Feature","geometry":{"coordinates":[-79.56831359863281,8.947540283203125],"type":"Point"}},{"properties":{"distance":4.379541841545236,"course":141.9066502632524},"type":"Feature","geometry":{"coordinates":[-79.52281188964844,8.89019775390625],"type":"Point"}},{"properties":{"distance":0.42046528702024144,"course":141.94858036458916},"type":"Feature","geometry":{"coordinates":[-79.51844787597656,8.884689331054688],"type":"Point"}},{"properties":{"distance":0.5038286709404501,"course":141.51518096770354},"type":"Feature","geometry":{"coordinates":[-79.51316833496094,8.878128051757812],"type":"Point"}},{"properties":{"distance":1.1461138158003588,"course":141.5765436125205},"type":"Feature","geometry":{"coordinates":[-79.50117492675781,8.863189697265625],"type":"Point"}},{"properties":{"distance":2.4512415217212213,"course":141.5479824120419},"type":"Feature","geometry":{"coordinates":[-79.47550964355469,8.831253051757812],"type":"Point"}},{"properties":{"distance":1.215968475724668,"course":170.60547604735106},"type":"Feature","geometry":{"coordinates":[-79.47216796875,8.811294555664062],"type":"Point"}},{"properties":{"distance":4.724906272777453,"course":170.5704850181673},"type":"Feature","geometry":{"coordinates":[-79.45913696289062,8.733749389648438],"type":"Point"}},{"properties":{"distance":59.20279315953174,"course":179.51069749887847},"type":"Feature","geometry":{"coordinates":[-79.45063781738281,7.74884033203125],"type":"Point"}},{"properties":{"distance":66.10855349740858,"course":224.8484708239997},"type":"Feature","geometry":{"coordinates":[-80.23272705078125,6.969085693359375],"type":"Point"}},{"properties":{"distance":97.08254804905927,"course":270.05900085956955},"type":"Feature","geometry":{"coordinates":[-81.85989379882812,6.9707489013671875],"type":"Point"}},{"properties":{"distance":1439.73247409003,"course":294.5662325270522},"type":"Feature","geometry":{"coordinates":[-103.67025756835938,18.024627685546875],"type":"Point"}},{"properties":{"distance":121.02400183239442,"course":305.87162855577674},"type":"Feature","geometry":{"coordinates":[-105.39192199707031,19.204452514648438],"type":"Point"}},{"properties":{"distance":379.56230272697803,"course":304.865904812349},"type":"Feature","geometry":{"coordinates":[-110.9432373046875,22.814300537109375],"type":"Point"}},{"properties":{"distance":57.05236833319935,"course":303.97729232369795},"type":"Feature","geometry":{"coordinates":[-111.798828125,23.344757080078125],"type":"Point"}},{"properties":{"distance":364.3249392074275,"course":322.0607126430424},"type":"Feature","geometry":{"coordinates":[-115.9375,28.125],"type":"Point"}},{"properties":{"distance":330.5747977358502,"course":340.79255353439123},"type":"Feature","geometry":{"coordinates":[-118.04345703125,33.31855773925781],"type":"Point"}},{"properties":{"distance":17.435125605083943,"course":340.515246098506},"type":"Feature","geometry":{"coordinates":[-118.159423828125,33.592010498046875],"type":"Point"}},{"properties":{"distance":5.241910070501952,"course":349.1429368781012},"type":"Feature","geometry":{"coordinates":[-118.17915344238281,33.67765808105469],"type":"Point"}},{"properties":{"distance":2.8281212145029846,"course":355.26429416475884},"type":"Feature","geometry":{"coordinates":[-118.18382263183594,33.72454833984375],"type":"Point"}},{"properties":{"distance":0.7440987208299075,"course":298.41020948161633},"type":"Feature","geometry":{"coordinates":[-118.19691467285156,33.730438232421875],"type":"Point"}},{"properties":{"distance":0.5549213136500883,"course":303.1665777204274},"type":"Feature","geometry":{"coordinates":[-118.20620727539062,33.73548889160156],"type":"Point"}},{"properties":{"distance":0.18010448908844665,"course":303.01720698660307},"type":"Feature","geometry":{"coordinates":[-118.209228515625,33.73712158203125],"type":"Point"}},{"properties":{"distance":0.15561872962127304,"course":323.27779274704494},"type":"Feature","geometry":{"coordinates":[-118.21109008789062,33.73919677734375],"type":"Point"}},{"properties":{"distance":0.5198176848968603,"course":323.2296884944198},"type":"Feature","geometry":{"coordinates":[-118.21731567382812,33.746124267578125],"type":"Point"}},{"properties":{"distance":0.3907632620254676,"course":4.028739838416467},"type":"Feature","geometry":{"coordinates":[-118.21676635742188,33.75260925292969],"type":"Point"}},{"properties":{"distance":0.1706006169005629,"course":359.48778287769716},"type":"Feature","geometry":{"coordinates":[-118.216796875,33.75544738769531],"type":"Point"}},{"properties":{"distance":0.11952393766115604,"course":317.44760602313625},"type":"Feature","geometry":{"coordinates":[-118.21841430664062,33.75691223144531],"type":"Point"}}],"totalDistance":9695.501344534432}




let snakeLine;
const geojsonGroup = new L.LayerGroup();
geojsonGroup.addTo(map);
addRoute(r)
addRoute(p)
addRoute(l)



function addRoute(data) {

  
  if (snakeLine) snakeLine.remove();

  const path = data.waypoints
  const tCoords = getCoordinatesFromPoints(path)
  const coords = antimeridian(tCoords)

  const line = turf.lineString(coords)
  var [lat, lng, lat1, lng1] = turf.bbox(line);
  const bounds = new L.LatLngBounds([lng1, lat1], [lng, lat]);
  map.fitBounds(bounds)

  var myStyle = {
    "color": "white",
    "weight": 15,
    "opacity": 0.25
  };
  //clear everything
  geojsonGroup.eachLayer(i => i.remove())

  const popupText = `
    <div>
      <div class="item">From: ${data.points[0].properties.name}</div>
      <div class="item">To: ${data.points[1].properties.name}</div>
      <div class="item">Total distance: ${data.totalDistance}</div>
    </div>
  `

  //1. snake line over main path 
  const pline = getCoordinatesFromPoints(data.waypoints)
  const polyline = antimeridian(pline).map(i => i.reverse())
  snakeLine = L.polyline(polyline, {
    color: 'red',
    snakingSpeed: 200,
  })
  snakeLine.addTo(map).snakeIn()
  snakeLine.on("snakeend", ev => {
    //console.log(ev.type);
    //snakestart snake
    snakeLine.snakeIn()
  });
  console.log('snakeLine', snakeLine);

  //2. maine line path
  const geojson = L.geoJSON(line, {
    style: myStyle,
  })
  geojson.eachLayer(function (layer) {
    var popup = L.popup({
      offset: [0, -5]
    });
    popup.setContent(popupText);

    layer.bindPopup(popup);
    layer.on('mouseover', function (e) {
      const segment = hightlightSegment(findClosestPoint(coords, e))
      console.log('segment', segment);

      const add = path[segment.index + 1]?.properties
      console.log('add', add);

      var popup = e.target.getPopup();
      popup.setContent(popupText + `
        <div><b>From API</b></div>
        <div>Distance: ${add.distance}</div>
        <div>Bearing: ${add.course}</div>

        <div>Calculated</div>
        <div>Distance: ${segment.pathDistance}</div>
        <div>Bearing: ${segment.bearing}</div>
      `);
      popup.setLatLng(e.latlng).openOn(map);

    });
    layer.on('mouseout', function (e) {
      e.target.closePopup();
    });
    // update popup location
    layer.on('mousemove', function (e) {
      popup.setLatLng(e.latlng).openOn(map);
      hightlightSegment(findClosestPoint(coords, e))
    });
    // layer.on('click', function (e) {
    //   hightlightSegment(findClosestPoint(coords, e))
    // });
  });
  geojsonGroup.addLayer(geojson);
}

let hSegment;

function hightlightSegment(segment) {
  if (hSegment) hSegment.remove();
  // console.log('segment', segment);
  const line = turf.lineString(segment.coord)
  var myStyle = {
    "color": "blue",
    "weight": 12,
    "opacity": 1
  };
  hSegment = L.geoJSON(line, {
    style: myStyle,
  }).addTo(map)

  hSegment.bringToBack()
  return segment
}

function findClosestPoint(coords, point) {
  // console.log('path', path);
  const segments = []
  const { lat, lng } = point.latlng
  const pt = turf.point([lng, lat]);

  for (let i = 0; i < coords.length - 1; i++) {
    const line = turf.lineString([coords[i], coords[i + 1]]);
    const distance = turf.pointToLineDistance(pt, line, { units: 'kilometers' });

    const from = turf.point(coords[i]);
    const to = turf.point(coords[i + 1]);
    const bearing = turf.bearing(from, to);
    const pathDistance = turf.distance(from, to, { units: 'kilometers' }) / 1.852;

    segments.push({
      index: i,
      distance,
      coord: [coords[i], coords[i + 1]],
      pathDistance,
      bearing
    });
  }
  // console.log('segments', segments);
  segments.sort((a, b) =>
    a.distance < b.distance ? -1 : 1
  );
  return segments[0];
}

function getCoordinatesFromPoints(path) {
  const coords = path.map(i => i.geometry.coordinates)
  return coords
}

function antimeridian(data) {
  const elem = JSON.parse(JSON.stringify(data))
  for (var i = 0; i < elem.length; i++) {
    if (elem[i - 1]) {
      elem[i][0] += elem[i][0] - elem[i - 1][0] > 180 ? -360 : elem[i - 1][0] - elem[i][0] > 180 ? 360 : 0;
    }
  }
  return elem
};

function waySearchSnipetFunc() {
  document.querySelector(".voyage_panel").classList.remove('active');
  document.getElementById('weather_panel').classList.remove("weather_panel_open");
  sidebar.show();
}


var voyageFormBackLink = document.getElementById("voyage_form_back_link");
voyageFormBackLink.addEventListener('click', function voyageFormBackLinkFunc() {
  document.getElementById('voyage_way_form').classList.remove("voyage_form_close");
  document.getElementById('voyage_way_result').classList.remove("voyage_form_open");
  document.getElementById('voyage_form_back_link').classList.remove("voyage_form_back_link_open");
  document.getElementById('weather_panel').classList.remove("weather_panel_open");
}, false);



// PLAYBACK START
function playBackFunc() {
  console.log(path);
  // const convertedCoords = coords.map(({ lon, lat }) => [lon, lat]);
  const convertedCoords = path;

  const curvePath = [];
  for (let i = 1; i < convertedCoords.length; i++) {
    const [lon, lat] = convertedCoords[i];
    curvePath.push('L', [lat, lon]);
  }

  const startPoint = convertedCoords[0];
  // L.curve([
  //     'M', [startPoint[1], startPoint[0]],
  //     ...curvePath
  // ]).addTo(map);

  function createTimestamps(isPlaybackTimestamps = true) {
    let start = new Date('09.01.2021 10:00:00').getTime();
    const end = new Date('09.01.2021 18:00:00').getTime();
    const intervalValue = isPlaybackTimestamps ?
      Math.ceil((end - start) / (convertedCoords.length - 1)) : 60000 * 10;
    const timestamps = isPlaybackTimestamps ? [start] : [];
    while (start < end) {
      start += intervalValue;
      if (isPlaybackTimestamps) {
        timestamps.push(start);
      } else {
        const timestamp = { playbackInterval: start };
        const { length } = timestamps;
        timestamp.apiInterval = length ? timestamps[length - 1].apiInterval : start;
        timestamp.apiInterval = timestamp.apiInterval + (3 * 3600000);
        timestamps.push(timestamp);
      }
    }

    return timestamps;
  }

  const timestamps = createTimestamps();
  const timestampsIntervals = createTimestamps(false);

  const demoRoute = {
    type: 'Feature',
    geometry: {
      type: 'MultiPoint',
      coordinates: convertedCoords,
    },
    properties: {
      time: timestamps,
    }
  };
  const numberOfIntervals = timestampsIntervals.length;
  const realStartDate = new Date('09.01.2021 10:00:00').getTime();
  const realEndDate = new Date('09.12.2021 12:53:00').getTime();
  const realIntervalValue = (realEndDate - realStartDate) / numberOfIntervals;
  const realTimestampsIntervals = [];
  for (let i = 1; i <= numberOfIntervals; i++) {
    realTimestampsIntervals.push(realStartDate + i * realIntervalValue);
  }

  function onPlaybackTimeChange(event) {
    const findTimestampIndex = timestampsIntervals.findIndex(item => item.playbackInterval === event);
    if (findTimestampIndex !== -1) {
      const { apiInterval } = timestampsIntervals[findTimestampIndex];
      console.log('real interval date: ', new Date(realTimestampsIntervals[findTimestampIndex]));
      var refreshTime = apiInterval / 1000;


      if ($("#weather_clouds_panel").hasClass("panel_open")) {
        cloudsLayer.remove(map);
        cloudsLayer = L.tileLayer('https://maps.openweathermap.org/maps/2.0/weather/CL/{z}/{x}/{y}?date=' + refreshTime + '&palette=0:FFFFFF00;10:FDFDFF19;20:FCFBFF26;30:FAFAFF33;40:F9F8FF4C;50:F7F7FF66;60:F6F5FF8C;70:F4F4FFBF;80:E9E9DFCC;90:DEDEDED8;100:D2D2D2FF;200:D2D2D2FF &opacity=0.3&appid=faeeb9b8701d5f1c36c00e9f016cc027', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          id: 'mapbox/dark-v10',
          // tileSize: 256,
          zoomControl: false,
          edgeBufferTiles: 5,
          accessToken: 'pk.eyJ1IjoidmVyc3N0YWNoaSIsImEiOiJja3Q1bjI1OG0wYTB1MndwaG0wZTI0eG0yIn0.KW23CHoSsSdBk52ntlTaRA',
          style: 'mapbox://styles/mapbox/dark-v10',
        });
        cloudsLayer.addTo(map);
      }
      if ($("#weather_rain_panel").hasClass("panel_open")) {
        rainLayer.remove(map);
        rainLayer = L.tileLayer('https://maps.openweathermap.org/maps/2.0/weather/PAC0/{z}/{x}/{y}?date=' + refreshTime + '&opacity=0.6&appid=faeeb9b8701d5f1c36c00e9f016cc027', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          id: 'mapbox/dark-v10',
          // tileSize: 256,
          zoomControl: false,
          edgeBufferTiles: 15,
          accessToken: 'pk.eyJ1IjoidmVyc3N0YWNoaSIsImEiOiJja3Q1bjI1OG0wYTB1MndwaG0wZTI0eG0yIn0.KW23CHoSsSdBk52ntlTaRA',
          style: 'mapbox://styles/mapbox/dark-v10',
        });
        rainLayer.addTo(map);
      }

      if ($("#weather_temp_panel").hasClass("panel_open")) {
        tempLayer.remove(map);
        tempLayer = L.tileLayer('https://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?date=' + refreshTime + '&opacity=0.3&palette=-65:C322DB;-55:C322DB;-45:C322DB;-40:C322DB;-30:9765FF;-20:2698FD;-10:20C4E8;0:23DDDD;10:C2FF28;20:FFF028;25:FFC228;30:FC8014&appid=faeeb9b8701d5f1c36c00e9f016cc027', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          id: 'mapbox/dark-v10',
          // tileSize: 256,
          zoomControl: false,
          edgeBufferTiles: 5,
          accessToken: 'pk.eyJ1IjoidmVyc3N0YWNoaSIsImEiOiJja3Q1bjI1OG0wYTB1MndwaG0wZTI0eG0yIn0.KW23CHoSsSdBk52ntlTaRA',
          style: 'mapbox://styles/mapbox/dark-v10',
        });
        tempLayer.addTo(map);
      }

      if ($("#weather_wind_panel").hasClass("panel_open")) {
        windLayer.remove(map);
        windLayer = L.tileLayer('https://maps.openweathermap.org/maps/2.0/weather/WS10/{z}/{x}/{y}?date=' + refreshTime + '&opacity=0.3&palette=1:FFFFFF;5:9EB2F6;15:557BFF;25:406AFF;50:2455FF;100:1343EC;200:11225E&appid=faeeb9b8701d5f1c36c00e9f016cc027', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          id: 'mapbox/dark-v10',
          // tileSize: 256,
          zoomControl: false,
          edgeBufferTiles: 5,
          accessToken: 'pk.eyJ1IjoidmVyc3N0YWNoaSIsImEiOiJja3Q1bjI1OG0wYTB1MndwaG0wZTI0eG0yIn0.KW23CHoSsSdBk52ntlTaRA',
          style: 'mapbox://styles/mapbox/dark-v10',
        });
        windLayer.addTo(map);
      }
    }
  }


  function callback() {
  }
  const playbackOptions = {
    playControl: true,
    orientIcons: true,
    speed: 5,
    marker: function () {
      return {
        icon: markerIconOne,
      };
    },
    clickCallback: function () {
      sidebar.toggle();
    },
  };

  new L.Playback(map, [demoRoute], onPlaybackTimeChange, playbackOptions);

  const controls = document.querySelectorAll('.leaflet-control-layers.leaflet-control-layers-expanded.leaflet-control');
  controls[0].remove();
  controls[1].style.marginRight = '5rem';
  controls.forEach(control => {
    control.style.marginRight = '5rem';
  });
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutationRecord) => {
      const { target } = mutationRecord;
      const currentRotateStyle = target.style.transform.split(' ').find(item => item.includes('rotate'));
      const currentRotateDegree = parseFloat(/\(([^)]+)\)/.exec(currentRotateStyle)[1]);
      target.lastElementChild.style.transform = `rotate(${360 - Math.abs(currentRotateDegree)}deg)`;
    });
  })

  const target = document.querySelector('.leaflet-marker-icon.marker-label.leaflet-zoom-animated.leaflet-interactive:nth-child(3)');
  target.lastElementChild.style.transform = 'rotate(48.14deg)';
  target.lastElementChild.style.marginLeft = '11rem';
  observer.observe(target, { attributes: true, attributeFilter: ['style'] });

  // target.addEventListener('click', function targetFunc () {   
  //       sidebar.toggle(); 
  // }, false); 

  // PLAYBACK FINISH

}

// custom Tabs
var d = document,
  tabs = d.querySelector('.sidebar_tabs'),
  tab = d.querySelectorAll('.sidebar__li'),
  contents = d.querySelectorAll('.tabs__content');
if (tabs) {
  tabs.addEventListener('click', function (e) {
    if (e.target && e.target.nodeName === 'LI') {
      // change tabs
      for (var i = 0; i < tab.length; i++) {
        tab[i].classList.remove('active');
      }
      e.target.classList.toggle('active');


      // change content
      for (i = 0; i < contents.length; i++) {
        contents[i].classList.remove('active');
      }

      var tabId = '#' + e.target.dataset.tabId;
      d.querySelector(tabId).classList.toggle('active');
    }
  });
}
var d = document,
  tabs = d.querySelector('.tabs'),
  tab = d.querySelectorAll('li'),
  contents = d.querySelectorAll('.tabs__content');
if (tabs) {
  tabs.addEventListener('click', function (e) {
    if (e.target && e.target.nodeName === 'LI') {
      // change tabs
      for (var i = 0; i < tab.length; i++) {
        tab[i].classList.remove('open');
      }
      e.target.classList.toggle('open');


      // change content
      for (i = 0; i < contents.length; i++) {
        contents[i].classList.remove('open');
      }

      var tabId = '#' + e.target.dataset.tabId;
      d.querySelector(tabId).classList.toggle('open');
    }
  });
}
//end  custom Tabs

// custom sortTable 
function sortTable() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.querySelector(".custom_table");
  switching = true;
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[0];
      y = rows[i + 1].getElementsByTagName("TD")[0];
      //check if the two rows should switch place:
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        //if so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}
// end custom sortTable 


// custom-select 
// var x, i, j, l, ll, selElmnt, a, b, c;
// /* Look for any elements with the class "custom-select": */
// x = document.getElementsByClassName("custom-select");
// l = x.length;
// for (i = 0; i < l; i++) {
//   selElmnt = x[i].getElementsByTagName("select")[0];
//   ll = selElmnt.length;
//   /* For each element, create a new DIV that will act as the selected item: */
//   a = document.createElement("DIV");
//   a.setAttribute("class", "select-selected");
//   a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
//   x[i].appendChild(a);
//   /* For each element, create a new DIV that will contain the option list: */
//   b = document.createElement("DIV");
//   b.setAttribute("class", "select-items select-hide");
//   for (j = 1; j < ll; j++) {
//     /* For each option in the original select element,
//     create a new DIV that will act as an option item: */
//     c = document.createElement("DIV");
//     c.innerHTML = selElmnt.options[j].innerHTML;
//     c.addEventListener("click", function(e) {
//         /* When an item is clicked, update the original select box,
//         and the selected item: */
//         var y, i, k, s, h, sl, yl;
//         s = this.parentNode.parentNode.getElementsByTagName("select")[0];
//         sl = s.length;
//         h = this.parentNode.previousSibling;
//         for (i = 0; i < sl; i++) {
//           if (s.options[i].innerHTML == this.innerHTML) {
//             s.selectedIndex = i;
//             h.innerHTML = this.innerHTML;
//             y = this.parentNode.getElementsByClassName("same-as-selected");
//             yl = y.length;
//             for (k = 0; k < yl; k++) {
//               y[k].removeAttribute("class");
//             }
//             this.setAttribute("class", "same-as-selected");
//             break;
//           }
//         }
//         h.click();
//     });
//     b.appendChild(c);
//   }
//   x[i].appendChild(b);
//   a.addEventListener("click", function(e) {
//     /* When the select box is clicked, close any other select boxes,
//     and open/close the current select box: */
//     e.stopPropagation();
//     closeAllSelect(this);
//     this.nextSibling.classList.toggle("select-hide");
//     this.classList.toggle("select-arrow-active");
//   });
// }

// function closeAllSelect(elmnt) {
//   /* A function that will close all select boxes in the document,
//   except the current select box: */
//   var x, y, i, xl, yl, arrNo = [];
//   x = document.getElementsByClassName("select-items");
//   y = document.getElementsByClassName("select-selected");
//   xl = x.length;
//   yl = y.length;
//   for (i = 0; i < yl; i++) {
//     if (elmnt == y[i]) {
//       arrNo.push(i)
//     } else {
//       y[i].classList.remove("select-arrow-active");
//     }
//   }
//   for (i = 0; i < xl; i++) {
//     if (arrNo.indexOf(i)) {
//       x[i].classList.add("select-hide");
//     }
//   }
// }

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
// document.addEventListener("click", closeAllSelect);
// end custom Select

// hover link right panel
function lonkHoverActive(elem) {
  var a = document.getElementsByClassName("left_panel__link")
  for (i = 0; i < a.length; i++) {
    a[i].classList.remove('active')
  }
  elem.classList.toggle('active');
}



