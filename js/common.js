
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

const r = { "points": [{ "properties": { "name": "Klaipeda", "port": "LTKLJ" }, "type": "Feature", "geometry": { "coordinates": [21.142501831054688, 55.676605224609375], "type": "Point" } }, { "properties": { "name": "Tokyo", "port": "JPTYO" }, "type": "Feature", "geometry": { "coordinates": [139.7632293701172, 35.61231994628906], "type": "Point" } }], "waypoints": [{ "properties": {}, "type": "Feature", "geometry": { "coordinates": [21.142501831054688, 55.676605224609375], "type": "Point" } }, { "properties": { "distance": 0.1236145774276045, "course": 270.8502549671122 }, "type": "Feature", "geometry": { "coordinates": [21.13885498046875, 55.6766357421875], "type": "Point" } }, { "properties": { "distance": 0.11166956917185167, "course": 353.6186757296955 }, "type": "Feature", "geometry": { "coordinates": [21.13848876953125, 55.67848205566406], "type": "Point" } }, { "properties": { "distance": 0.21570077667402646, "course": 346.83543897855515 }, "type": "Feature", "geometry": { "coordinates": [21.137039184570312, 55.681976318359375], "type": "Point" } }, { "properties": { "distance": 0.37188929413725474, "course": 335.17290297735804 }, "type": "Feature", "geometry": { "coordinates": [21.132431030273438, 55.687591552734375], "type": "Point" } }, { "properties": { "distance": 0.5510623328962936, "course": 335.562036870434 }, "type": "Feature", "geometry": { "coordinates": [21.125701904296875, 55.69593811035156], "type": "Point" } }, { "properties": { "distance": 0.647936548409906, "course": 335.14195854877175 }, "type": "Feature", "geometry": { "coordinates": [21.117660522460938, 55.705718994140625], "type": "Point" } }, { "properties": { "distance": 0.3865420527898962, "course": 335.01165969212093 }, "type": "Feature", "geometry": { "coordinates": [21.112838745117188, 55.7115478515625], "type": "Point" } }, { "properties": { "distance": 0.4779650185075063, "course": 337.36790683820647 }, "type": "Feature", "geometry": { "coordinates": [21.107406616210938, 55.71888732910156], "type": "Point" } }, { "properties": { "distance": 0.2274989778897494, "course": 312.63289926278856 }, "type": "Feature", "geometry": { "coordinates": [21.102462768554688, 55.72145080566406], "type": "Point" } }, { "properties": { "distance": 0.20582979474609558, "course": 308.9241831419987 }, "type": "Feature", "geometry": { "coordinates": [21.097732543945312, 55.723602294921875], "type": "Point" } }, { "properties": { "distance": 0.12291363812059869, "course": 310.4802951904983 }, "type": "Feature", "geometry": { "coordinates": [21.094970703125, 55.72492980957031], "type": "Point" } }, { "properties": { "distance": 0.2312517901108075, "course": 296.1191092961363 }, "type": "Feature", "geometry": { "coordinates": [21.088836669921875, 55.72662353515625], "type": "Point" } }, { "properties": { "distance": 0.19715747509921427, "course": 295.33952168582823 }, "type": "Feature", "geometry": { "coordinates": [21.083572387695312, 55.72802734375], "type": "Point" } }, { "properties": { "distance": 0.745300787294262, "course": 272.1862933850228 }, "type": "Feature", "geometry": { "coordinates": [21.061569213867188, 55.72850036621094], "type": "Point" } }, { "properties": { "distance": 2.271302514257074, "course": 274.0290734646079 }, "type": "Feature", "geometry": { "coordinates": [20.99462890625, 55.73115539550781], "type": "Point" } }, { "properties": { "distance": 1.8764709735928753, "course": 277.0751541050962 }, "type": "Feature", "geometry": { "coordinates": [20.939605712890625, 55.73500061035156], "type": "Point" } }, { "properties": { "distance": 10.385350520729403, "course": 274.4268558893444 }, "type": "Feature", "geometry": { "coordinates": [20.633590698242188, 55.74833679199219], "type": "Point" } }, { "properties": { "distance": 99.80171532986498, "course": 272.04764013053574 }, "type": "Feature", "geometry": { "coordinates": [17.68316650390625, 55.80766296386719], "type": "Point" } }, { "properties": { "distance": 72.51655661124767, "course": 258.470506951465 }, "type": "Feature", "geometry": { "coordinates": [15.586166381835938, 55.5665283203125], "type": "Point" } }, { "properties": { "distance": 15.642237004065084, "course": 247.27661783654213 }, "type": "Feature", "geometry": { "coordinates": [15.162200927734375, 55.46600341796875], "type": "Point" } }, { "properties": { "distance": 18.097171190034896, "course": 268.62057592539674 }, "type": "Feature", "geometry": { "coordinates": [14.631301879882812, 55.45875549316406], "type": "Point" } }, { "properties": { "distance": 1.7459875760744226, "course": 240.16783043108626 }, "type": "Feature", "geometry": { "coordinates": [14.586868286132812, 55.444305419921875], "type": "Point" } }, { "properties": { "distance": 5.416935004446892, "course": 217.27074718908347 }, "type": "Feature", "geometry": { "coordinates": [14.490737915039062, 55.372589111328125], "type": "Point" } }, { "properties": { "distance": 11.60206352140542, "course": 217.26717626472222 }, "type": "Feature", "geometry": { "coordinates": [14.285446166992188, 55.21897888183594], "type": "Point" } }, { "properties": { "distance": 9.906873712389782, "course": 271.4960109064482 }, "type": "Feature", "geometry": { "coordinates": [13.996597290039062, 55.22328186035156], "type": "Point" } }, { "properties": { "distance": 16.911960668465973, "course": 274.0334596409787 }, "type": "Feature", "geometry": { "coordinates": [13.504409790039062, 55.243072509765625], "type": "Point" } }, { "properties": { "distance": 14.442184358160679, "course": 273.4733973010166 }, "type": "Feature", "geometry": { "coordinates": [13.083648681640625, 55.25762939453125], "type": "Point" } }, { "properties": { "distance": 7.096300766773234, "course": 274.1802801543159 }, "type": "Feature", "geometry": { "coordinates": [12.87701416015625, 55.2662353515625], "type": "Point" } }, { "properties": { "distance": 7.682144223956595, "course": 289.9510091851332 }, "type": "Feature", "geometry": { "coordinates": [12.666046142578125, 55.309844970703125], "type": "Point" } }, { "properties": { "distance": 1.3779830325808924, "course": 358.6328912510699 }, "type": "Feature", "geometry": { "coordinates": [12.665084838867188, 55.332763671875], "type": "Point" } }, { "properties": { "distance": 0.7454553956726252, "course": 8.895889108537604 }, "type": "Feature", "geometry": { "coordinates": [12.66845703125, 55.34501647949219], "type": "Point" } }, { "properties": { "distance": 4.300955874750705, "course": 8.892997151714608 }, "type": "Feature", "geometry": { "coordinates": [12.68792724609375, 55.41571044921875], "type": "Point" } }, { "properties": { "distance": 5.3294166359825805, "course": 10.468104833534715 }, "type": "Feature", "geometry": { "coordinates": [12.716339111328125, 55.502899169921875], "type": "Point" } }, { "properties": { "distance": 2.0317805765544685, "course": 359.10679094972534 }, "type": "Feature", "geometry": { "coordinates": [12.715408325195312, 55.53669738769531], "type": "Point" } }, { "properties": { "distance": 0.9806656898397659, "course": 341.16930678223656 }, "type": "Feature", "geometry": { "coordinates": [12.706100463867188, 55.55213928222656], "type": "Point" } }, { "properties": { "distance": 4.651712559070437, "course": 355.47550124367916 }, "type": "Feature", "geometry": { "coordinates": [12.695297241210938, 55.62928771972656], "type": "Point" } }, { "properties": { "distance": 0.5378913175677124, "course": 7.07689358315701 }, "type": "Feature", "geometry": { "coordinates": [12.697250366210938, 55.63816833496094], "type": "Point" } }, { "properties": { "distance": 0.2320448317070198, "course": 0.12781453514676488 }, "type": "Feature", "geometry": { "coordinates": [12.697265625, 55.64202880859375], "type": "Point" } }, { "properties": { "distance": 0.9372385489129426, "course": 353.850637423585 }, "type": "Feature", "geometry": { "coordinates": [12.694305419921875, 55.65753173828125], "type": "Point" } }, { "properties": { "distance": 1.0742951700862624, "course": 353.16934175116705 }, "type": "Feature", "geometry": { "coordinates": [12.690536499023438, 55.67527770996094], "type": "Point" } }, { "properties": { "distance": 1.6802349480792518, "course": 356.22458495657844 }, "type": "Feature", "geometry": { "coordinates": [12.687271118164062, 55.70317077636719], "type": "Point" } }, { "properties": { "distance": 2.2613113331506405, "course": 3.8377356490607726 }, "type": "Feature", "geometry": { "coordinates": [12.691741943359375, 55.74070739746094], "type": "Point" } }, { "properties": { "distance": 1.0871881211831735, "course": 7.584793465628144 }, "type": "Feature", "geometry": { "coordinates": [12.69598388671875, 55.758636474609375], "type": "Point" } }, { "properties": { "distance": 0.9052601075866857, "course": 18.132080883146962 }, "type": "Feature", "geometry": { "coordinates": [12.704315185546875, 55.77294921875], "type": "Point" } }, { "properties": { "distance": 4.511983518032447, "course": 19.19360117867247 }, "type": "Feature", "geometry": { "coordinates": [12.74822998046875, 55.843841552734375], "type": "Point" } }, { "properties": { "distance": 0.6681680328461936, "course": 9.267852031956476 }, "type": "Feature", "geometry": { "coordinates": [12.751419067382812, 55.85481262207031], "type": "Point" } }, { "properties": { "distance": 0.4808458992226197, "course": 3.990024988507 }, "type": "Feature", "geometry": { "coordinates": [12.752410888671875, 55.86279296875], "type": "Point" } }, { "properties": { "distance": 1.0649372012338791, "course": 341.02245696145445 }, "type": "Feature", "geometry": { "coordinates": [12.742141723632812, 55.879547119140625], "type": "Point" } }, { "properties": { "distance": 1.8099902263345888, "course": 5.609104919530984 }, "type": "Feature", "geometry": { "coordinates": [12.747390747070312, 55.909515380859375], "type": "Point" } }, { "properties": { "distance": 0.3958340116096305, "course": 352.6134972489776 }, "type": "Feature", "geometry": { "coordinates": [12.745880126953125, 55.916046142578125], "type": "Point" } }, { "properties": { "distance": 2.0951261960345193, "course": 336.00960210208046 }, "type": "Feature", "geometry": { "coordinates": [12.7205810546875, 55.94789123535156], "type": "Point" } }, { "properties": { "distance": 2.240906184772839, "course": 335.2584730656041 }, "type": "Feature", "geometry": { "coordinates": [12.692703247070312, 55.98175048828125], "type": "Point" } }, { "properties": { "distance": 0.4709913093462926, "course": 343.3517432738017 }, "type": "Feature", "geometry": { "coordinates": [12.688690185546875, 55.9892578125], "type": "Point" } }, { "properties": { "distance": 1.6820299655124975, "course": 343.3454901884384 }, "type": "Feature", "geometry": { "coordinates": [12.674346923828125, 56.01606750488281], "type": "Point" } }, { "properties": { "distance": 1.2836515215222055, "course": 343.3647322735069 }, "type": "Feature", "geometry": { "coordinates": [12.663406372070312, 56.036529541015625], "type": "Point" } }, { "properties": { "distance": 0.3358818704911824, "course": 343.42619083779596 }, "type": "Feature", "geometry": { "coordinates": [12.660552978515625, 56.04188537597656], "type": "Point" } }, { "properties": { "distance": 0.503596057001601, "course": 343.3302342110889 }, "type": "Feature", "geometry": { "coordinates": [12.65625, 56.04991149902344], "type": "Point" } }, { "properties": { "distance": 0.4432393463391085, "course": 343.34754204858564 }, "type": "Feature", "geometry": { "coordinates": [12.6524658203125, 56.056976318359375], "type": "Point" } }, { "properties": { "distance": 5.811095856977571, "course": 314.53950546253816 }, "type": "Feature", "geometry": { "coordinates": [12.528945922851562, 56.124786376953125], "type": "Point" } }, { "properties": { "distance": 3.5180927181619075, "course": 312.9588494126262 }, "type": "Feature", "geometry": { "coordinates": [12.452056884765625, 56.1646728515625], "type": "Point" } }, { "properties": { "distance": 22.69720969573554, "course": 345.41031342811834 }, "type": "Feature", "geometry": { "coordinates": [12.280410766601562, 56.53010559082031], "type": "Point" } }, { "properties": { "distance": 24.18409349907521, "course": 346.1091456880695 }, "type": "Feature", "geometry": { "coordinates": [12.104354858398438, 56.920684814453125], "type": "Point" } }, { "properties": { "distance": 1.706018669512121, "course": 341.79688638326513 }, "type": "Feature", "geometry": { "coordinates": [12.088104248046875, 56.94764709472656], "type": "Point" } }, { "properties": { "distance": 18.109107815918964, "course": 339.9848415351579 }, "type": "Feature", "geometry": { "coordinates": [11.8983154296875, 57.23072814941406], "type": "Point" } }, { "properties": { "distance": 1.6081384988289562, "course": 316.36494705015184 }, "type": "Feature", "geometry": { "coordinates": [11.86419677734375, 57.250091552734375], "type": "Point" } }, { "properties": { "distance": 7.383714614780763, "course": 331.2778716218535 }, "type": "Feature", "geometry": { "coordinates": [11.754913330078125, 57.357818603515625], "type": "Point" } }, { "properties": { "distance": 10.145304585482746, "course": 336.7601458674328 }, "type": "Feature", "geometry": { "coordinates": [11.631179809570312, 57.512908935546875], "type": "Point" } }, { "properties": { "distance": 1.7292062156232464, "course": 351.99535724307117 }, "type": "Feature", "geometry": { "coordinates": [11.62371826171875, 57.54139709472656], "type": "Point" } }, { "properties": { "distance": 0.7494878146390985, "course": 319.3508522549561 }, "type": "Feature", "geometry": { "coordinates": [11.60858154296875, 57.55085754394531], "type": "Point" } }, { "properties": { "distance": 2.4724620232225516, "course": 339.0179303240842 }, "type": "Feature", "geometry": { "coordinates": [11.58111572265625, 57.589263916015625], "type": "Point" } }, { "properties": { "distance": 1.6074362205239598, "course": 294.1128567364434 }, "type": "Feature", "geometry": { "coordinates": [11.535568237304688, 57.600189208984375], "type": "Point" } }, { "properties": { "distance": 26.72811644943424, "course": 310.71972542337403 }, "type": "Feature", "geometry": { "coordinates": [10.904067993164062, 57.89027404785156], "type": "Point" } }, { "properties": { "distance": 65.49587751849472, "course": 269.0483798670542 }, "type": "Feature", "geometry": { "coordinates": [8.854904174804688, 57.87217712402344], "type": "Point" } }, { "properties": { "distance": 31.346677204246923, "course": 273.1498929509122 }, "type": "Feature", "geometry": { "coordinates": [7.8753662109375, 57.90083312988281], "type": "Point" } }, { "properties": { "distance": 2.5936725621275514, "course": 246.09339601321508 }, "type": "Feature", "geometry": { "coordinates": [7.8011474609375, 57.88334655761719], "type": "Point" } }, { "properties": { "distance": 2.9481466944487766, "course": 262.36626012336063 }, "type": "Feature", "geometry": { "coordinates": [7.709716796875, 57.8768310546875], "type": "Point" } }, { "properties": { "distance": 16.142771648716508, "course": 277.7123546765122 }, "type": "Feature", "geometry": { "coordinates": [7.2089691162109375, 57.912872314453125], "type": "Point" } }, { "properties": { "distance": 12.982812023321726, "course": 282.69591464797975 }, "type": "Feature", "geometry": { "coordinates": [6.812042236328125, 57.96034240722656], "type": "Point" } }, { "properties": { "distance": 0.9881124452719298, "course": 297.532140562869 }, "type": "Feature", "geometry": { "coordinates": [6.7845611572265625, 57.96794128417969], "type": "Point" } }, { "properties": { "distance": 0.9035487633288651, "course": 299.3591096913355 }, "type": "Feature", "geometry": { "coordinates": [6.759857177734375, 57.975311279296875], "type": "Point" } }, { "properties": { "distance": 3.76455866665889, "course": 297.9689919787007 }, "type": "Feature", "geometry": { "coordinates": [6.6555023193359375, 58.00468444824219], "type": "Point" } }, { "properties": { "distance": 40.95365614107519, "course": 305.3462593523649 }, "type": "Feature", "geometry": { "coordinates": [5.600799560546875, 58.39884948730469], "type": "Point" } }, { "properties": { "distance": 2.4462382059983816, "course": 320.29634199196056 }, "type": "Feature", "geometry": { "coordinates": [5.5511627197265625, 58.43016052246094], "type": "Point" } }, { "properties": { "distance": 2.345705392839887, "course": 327.66670182245645 }, "type": "Feature", "geometry": { "coordinates": [5.5112762451171875, 58.463134765625], "type": "Point" } }, { "properties": { "distance": 43.856161261051575, "course": 323.5870210593823 }, "type": "Feature", "geometry": { "coordinates": [4.6762237548828125, 59.05030822753906], "type": "Point" } }, { "properties": { "distance": 2.2356885362376673, "course": 332.440478697961 }, "type": "Feature", "geometry": { "coordinates": [4.6427459716796875, 59.083282470703125], "type": "Point" } }, { "properties": { "distance": 1.9627993816737026, "course": 335.09191820745065 }, "type": "Feature", "geometry": { "coordinates": [4.615966796875, 59.11289978027344], "type": "Point" } }, { "properties": { "distance": 69.60536971470947, "course": 349.0593462180252 }, "type": "Feature", "geometry": { "coordinates": [4.1805419921875, 60.24986267089844], "type": "Point" } }, { "properties": { "distance": 5.154539624198239, "course": 0.22230049042178432 }, "type": "Feature", "geometry": { "coordinates": [4.18121337890625, 60.33561706542969], "type": "Point" } }, { "properties": { "distance": 48.995384292110224, "course": 0.12212698947329449 }, "type": "Feature", "geometry": { "coordinates": [4.1847686767578125, 61.15074157714844], "type": "Point" } }, { "properties": { "distance": 44.994678894502115, "course": 0.1241670195042568 }, "type": "Feature", "geometry": { "coordinates": [4.18817138671875, 61.89930725097656], "type": "Point" } }, { "properties": { "distance": 5.286575206620417, "course": 359.9532463969934 }, "type": "Feature", "geometry": { "coordinates": [4.188018798828125, 61.98725891113281], "type": "Point" } }, { "properties": { "distance": 52.71665024162682, "course": 24.12045612470665 }, "type": "Feature", "geometry": { "coordinates": [4.9613494873046875, 62.7877197265625], "type": "Point" } }, { "properties": { "distance": 3.137435573761317, "course": 31.936152573915912 }, "type": "Feature", "geometry": { "coordinates": [5.0217742919921875, 62.83201599121094], "type": "Point" } }, { "properties": { "distance": 1.894430690125899, "course": 31.133965821277975 }, "type": "Feature", "geometry": { "coordinates": [5.0574798583984375, 62.85899353027344], "type": "Point" } }, { "properties": { "distance": 209.8238464996426, "course": 30.23266475806597 }, "type": "Feature", "geometry": { "coordinates": [9.125, 65.875], "type": "Point" } }, { "properties": { "distance": 107.10246693924532, "course": 32.86425860201999 }, "type": "Feature", "geometry": { "coordinates": [11.562759399414062, 67.37167358398438], "type": "Point" } }, { "properties": { "distance": 3.7950181986530556, "course": 14.274106990764222 }, "type": "Feature", "geometry": { "coordinates": [11.603271484375, 67.432861328125], "type": "Point" } }, { "properties": { "distance": 4.7991154661872235, "course": 28.325751573399344 }, "type": "Feature", "geometry": { "coordinates": [11.702133178710938, 67.50314331054688], "type": "Point" } }, { "properties": { "distance": 7.529073470596616, "course": 32.323112932870835 }, "type": "Feature", "geometry": { "coordinates": [11.8775634765625, 67.60899353027344], "type": "Point" } }, { "properties": { "distance": 1.269330460636533, "course": 32.12999672326598 }, "type": "Feature", "geometry": { "coordinates": [11.907058715820312, 67.62687683105469], "type": "Point" } }, { "properties": { "distance": 1.2472163859205225, "course": 32.09683484545992 }, "type": "Feature", "geometry": { "coordinates": [11.93603515625, 67.64445495605469], "type": "Point" } }, { "properties": { "distance": 134.87574303986068, "course": 32.55145013654055 }, "type": "Feature", "geometry": { "coordinates": [15.24560546875, 69.53585815429688], "type": "Point" } }, { "properties": { "distance": 4.007163813540771, "course": 46.218287139254926 }, "type": "Feature", "geometry": { "coordinates": [15.3834228515625, 69.58198547363281], "type": "Point" } }, { "properties": { "distance": 3.9839726696481255, "course": 48.13376625866272 }, "type": "Feature", "geometry": { "coordinates": [15.525054931640625, 69.626220703125], "type": "Point" } }, { "properties": { "distance": 99.63656989853921, "course": 46.767833221821554 }, "type": "Feature", "geometry": { "coordinates": [19.09033203125, 70.76162719726562], "type": "Point" } }, { "properties": { "distance": 5.002743914105573, "course": 49.891716573743324 }, "type": "Feature", "geometry": { "coordinates": [19.283782958984375, 70.81524658203125], "type": "Point" } }, { "properties": { "distance": 4.7713256687290855, "course": 63.687149533530054 }, "type": "Feature", "geometry": { "coordinates": [19.500503540039062, 70.85043334960938], "type": "Point" } }, { "properties": { "distance": 955.6802751835108, "course": 91.45278813307954 }, "type": "Feature", "geometry": { "coordinates": [76.10169982910156, 78.767578125], "type": "Point" } }, { "properties": { "distance": 208.53270963168808, "course": 101.75153502119483 }, "type": "Feature", "geometry": { "coordinates": [93.0194091796875, 78.06098937988281], "type": "Point" } }, { "properties": { "distance": 97.59992131944828, "course": 97.03818235448742 }, "type": "Feature", "geometry": { "coordinates": [100.74612426757812, 77.86203002929688], "type": "Point" } }, { "properties": { "distance": 38.361726093849995, "course": 97.10445425221789 }, "type": "Feature", "geometry": { "coordinates": [103.74848937988281, 77.78309631347656], "type": "Point" } }, { "properties": { "distance": 16.171321782876717, "course": 96.97129191752347 }, "type": "Feature", "geometry": { "coordinates": [105.00880432128906, 77.75044250488281], "type": "Point" } }, { "properties": { "distance": 48.468841480761796, "course": 112.76041933051802 }, "type": "Feature", "geometry": { "coordinates": [108.47021484375, 77.4384765625], "type": "Point" } }, { "properties": { "distance": 421.8973221297627, "course": 112.47306213035887 }, "type": "Feature", "geometry": { "coordinates": [135.5471954345703, 74.75546264648438], "type": "Point" } }, { "properties": { "distance": 60.98738119063671, "course": 112.47335155200334 }, "type": "Feature", "geometry": { "coordinates": [139.06942749023438, 74.36761474609375], "type": "Point" } }, { "properties": { "distance": 33.38516240308889, "course": 68.86783643427411 }, "type": "Feature", "geometry": { "coordinates": [141.00413513183594, 74.56785583496094], "type": "Point" } }, { "properties": { "distance": 92.49680769734192, "course": 99.99397692974227 }, "type": "Feature", "geometry": { "coordinates": [146.6519012451172, 74.30079650878906], "type": "Point" } }, { "properties": { "distance": 152.10198860965494, "course": 125.96061328127783 }, "type": "Feature", "geometry": { "coordinates": [153.8931121826172, 72.8148193359375], "type": "Point" } }, { "properties": { "distance": 198.50347029808805, "course": 126.05058450948964 }, "type": "Feature", "geometry": { "coordinates": [162.46939086914062, 70.87132263183594], "type": "Point" } }, { "properties": { "distance": 98.1325171260787, "course": 106.27775324163565 }, "type": "Feature", "geometry": { "coordinates": [167.19766235351562, 70.41371154785156], "type": "Point" } }, { "properties": { "distance": 27.993067591841548, "course": 106.27798415330568 }, "type": "Feature", "geometry": { "coordinates": [168.5269775390625, 70.28317260742188], "type": "Point" } }, { "properties": { "distance": 159.9255688091234, "course": 95.7263462117754 }, "type": "Feature", "geometry": { "coordinates": [176.32376098632812, 70.0177001953125], "type": "Point" } }, { "properties": { "distance": 88.15132760592543, "course": 119.38847489134284 }, "type": "Feature", "geometry": { "coordinates": [-179.99998474121094, 69.29801940917969], "type": "Point" } }, { "properties": { "distance": 13.569716030764825, "course": 121.35720286005834 }, "type": "Feature", "geometry": { "coordinates": [-179.45611572265625, 69.1805419921875], "type": "Point" } }, { "properties": { "distance": 158.61695196714152, "course": 113.53061175222726 }, "type": "Feature", "geometry": { "coordinates": [-172.80801391601562, 68.12699890136719], "type": "Point" } }, { "properties": { "distance": 133.3368702057387, "course": 142.85070217193652 }, "type": "Feature", "geometry": { "coordinates": [-169.34320068359375, 66.35887145996094], "type": "Point" } }, { "properties": { "distance": 30.189600936729097, "course": 180.0176244015306 }, "type": "Feature", "geometry": { "coordinates": [-169.3435821533203, 65.85661315917969], "type": "Point" } }, { "properties": { "distance": 117.7805928518284, "course": 213.29601839362806 }, "type": "Feature", "geometry": { "coordinates": [-171.89337158203125, 64.21878051757812], "type": "Point" } }, { "properties": { "distance": 26.05270093077972, "course": 231.71062462435955 }, "type": "Feature", "geometry": { "coordinates": [-172.67178344726562, 63.95021057128906], "type": "Point" } }, { "properties": { "distance": 45.01163473587416, "course": 248.29737957527954 }, "type": "Feature", "geometry": { "coordinates": [-174.24835205078125, 63.67329406738281], "type": "Point" } }, { "properties": { "distance": 1133.5577580965435, "course": 218.90197552338964 }, "type": "Feature", "geometry": { "coordinates": [158.54588317871094, 51.350494384765625], "type": "Point" } }, { "properties": { "distance": 77.33903348223379, "course": 219.70046395407383 }, "type": "Feature", "geometry": { "coordinates": [157.24386596679688, 50.36053466796875], "type": "Point" } }, { "properties": { "distance": 9.506232163475918, "course": 220.04165835670415 }, "type": "Feature", "geometry": { "coordinates": [157.08457946777344, 50.23945617675781], "type": "Point" } }, { "properties": { "distance": 53.96460018760822, "course": 223.1959193695116 }, "type": "Feature", "geometry": { "coordinates": [156.1302490234375, 49.58494567871094], "type": "Point" } }, { "properties": { "distance": 207.65867547384732, "course": 221.62613831054975 }, "type": "Feature", "geometry": { "coordinates": [152.67987060546875, 47.00251770019531], "type": "Point" } }, { "properties": { "distance": 863.3934304302505, "course": 213.85475699951724 }, "type": "Feature", "geometry": { "coordinates": [141.01962280273438, 35.57762145996094], "type": "Point" } }, { "properties": { "distance": 30.71716389628217, "course": 224.46733129310036 }, "type": "Feature", "geometry": { "coordinates": [140.58047485351562, 35.212921142578125], "type": "Point" } }, { "properties": { "distance": 13.565509847385108, "course": 235.95699679710157 }, "type": "Feature", "geometry": { "coordinates": [140.3517608642578, 35.086578369140625], "type": "Point" } }, { "properties": { "distance": 23.228383510503452, "course": 238.5924547068268 }, "type": "Feature", "geometry": { "coordinates": [139.94918823242188, 34.88519287109375], "type": "Point" } }, { "properties": { "distance": 1.5386666353706655, "course": 242.02305312538368 }, "type": "Feature", "geometry": { "coordinates": [139.921630859375, 34.87318420410156], "type": "Point" } }, { "properties": { "distance": 5.260482169785719, "course": 270.03995833689083 }, "type": "Feature", "geometry": { "coordinates": [139.81495666503906, 34.87324523925781], "type": "Point" } }, { "properties": { "distance": 1.4222120737516344, "course": 292.12422771100245 }, "type": "Feature", "geometry": { "coordinates": [139.78823852539062, 34.88215637207031], "type": "Point" } }, { "properties": { "distance": 5.421020829501602, "course": 327.73638241609774 }, "type": "Feature", "geometry": { "coordinates": [139.72952270507812, 34.95841979980469], "type": "Point" } }, { "properties": { "distance": 2.031244539372396, "course": 353.6272953723884 }, "type": "Feature", "geometry": { "coordinates": [139.72494506835938, 34.99200439453125], "type": "Point" } }, { "properties": { "distance": 5.989678767435623, "course": 13.580984069608258 }, "type": "Feature", "geometry": { "coordinates": [139.75352478027344, 35.0888671875], "type": "Point" } }, { "properties": { "distance": 3.952864075554189, "course": 13.6000336889072 }, "type": "Feature", "geometry": { "coordinates": [139.77243041992188, 35.15278625488281], "type": "Point" } }, { "properties": { "distance": 3.5892257583789835, "course": 7.259105443475248 }, "type": "Feature", "geometry": { "coordinates": [139.7816619873047, 35.21202087402344], "type": "Point" } }, { "properties": { "distance": 2.686514506500632, "course": 359.45676926171825 }, "type": "Feature", "geometry": { "coordinates": [139.78114318847656, 35.2567138671875], "type": "Point" } }, { "properties": { "distance": 4.139107888182883, "course": 324.2378664450256 }, "type": "Feature", "geometry": { "coordinates": [139.73184204101562, 35.312591552734375], "type": "Point" } }, { "properties": { "distance": 2.150420545253286, "course": 17.830742391097655 }, "type": "Feature", "geometry": { "coordinates": [139.74526977539062, 35.346649169921875], "type": "Point" } }, { "properties": { "distance": 3.899249501938297, "course": 20.887361521116404 }, "type": "Feature", "geometry": { "coordinates": [139.7736358642578, 35.407257080078125], "type": "Point" } }, { "properties": { "distance": 1.0464052750272677, "course": 46.177024678712215 }, "type": "Feature", "geometry": { "coordinates": [139.78904724121094, 35.4193115234375], "type": "Point" } }, { "properties": { "distance": 4.8151805577847115, "course": 46.63354834244807 }, "type": "Feature", "geometry": { "coordinates": [139.86053466796875, 35.47431945800781], "type": "Point" } }, { "properties": { "distance": 1.8980993342799735, "course": 25.494471701683434 }, "type": "Feature", "geometry": { "coordinates": [139.87722778320312, 35.50282287597656], "type": "Point" } }, { "properties": { "distance": 2.684727715210292, "course": 343.87341972340096 }, "type": "Feature", "geometry": { "coordinates": [139.8619842529297, 35.54573059082031], "type": "Point" } }, { "properties": { "distance": 1.0591504663247127, "course": 295.6014690037866 }, "type": "Feature", "geometry": { "coordinates": [139.8424530029297, 35.5533447265625], "type": "Point" } }, { "properties": { "distance": 0.780425058702714, "course": 301.37400760778775 }, "type": "Feature", "geometry": { "coordinates": [139.82882690429688, 35.56010437011719], "type": "Point" } }, { "properties": { "distance": 1.568699448875706, "course": 305.4911336992209 }, "type": "Feature", "geometry": { "coordinates": [139.80270385742188, 35.57525634765625], "type": "Point" } }, { "properties": { "distance": 1.414776498323463, "course": 318.3713975527005 }, "type": "Feature", "geometry": { "coordinates": [139.78347778320312, 35.59284973144531], "type": "Point" } }, { "properties": { "distance": 0.6484813067266687, "course": 328.83424813785183 }, "type": "Feature", "geometry": { "coordinates": [139.776611328125, 35.602081298828125], "type": "Point" } }, { "properties": { "distance": 0.7583688621250676, "course": 323.0740946952663 }, "type": "Feature", "geometry": { "coordinates": [139.7672882080078, 35.61216735839844], "type": "Point" } }, { "properties": { "distance": 0.19855173597110315, "course": 272.6476087786225 }, "type": "Feature", "geometry": { "coordinates": [139.7632293701172, 35.61231994628906], "type": "Point" } }], "totalDistance": 7220.008581129174 }


const geojsonGroup = new L.LayerGroup();
geojsonGroup.addTo(map);

addRoute(r)

function addRoute(data) {
  const path = data.waypoints

  const tCoords = getCoordinatesFromPoints(path)
  const coords = antimeridian(tCoords)
  const line = turf.lineString(coords)
  var [lat, lng, lat1, lng1] = turf.bbox(line);
  const bounds = new L.LatLngBounds([lng1, lat1], [lng, lat]);
  map.fitBounds(bounds)

  var myStyle = {
    "color": "white",
    "weight": 5,
    "opacity": 0.65
  };

  //clear everything
  geojsonGroup.eachLayer(i => i.remove())

  const geojson = L.geoJSON(line, {
    style: myStyle
  })

  geojsonGroup.addLayer(geojson);
  //geojsonGroup.removeLayer(layerPostalcodes);

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



