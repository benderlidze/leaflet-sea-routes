const resultsDiv = document.getElementById("results");
const allRoutes = [];


var url = new URL(window.location.href);
const voyageId = url.searchParams.get("voyage");


const wayFromTo = {
  from: "",
  to: ""
}

// Layer map
var map = L.map('mapid', {

}).setView([50.80925310310907, -0.1361937699561519], 3);
// const tiles = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidmVyc3N0YWNoaSIsImEiOiJja3Q1bjI1OG0wYTB1MndwaG0wZTI0eG0yIn0.KW23CHoSsSdBk52ntlTaRA', {
//   attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//   zoomControl: false,
//   accessToken: 'pk.eyJ1IjoidmVyc3N0YWNoaSIsImEiOiJja3Q1bjI1OG0wYTB1MndwaG0wZTI0eG0yIn0.KW23CHoSsSdBk52ntlTaRA',
//   style: 'mapbox://styles/mapbox/dark-v10',
// })
// tiles.addTo(map);



var layer = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidmVyc3N0YWNoaSIsImEiOiJja3Q1bjI1OG0wYTB1MndwaG0wZTI0eG0yIn0.KW23CHoSsSdBk52ntlTaRA', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  useCache: true,
  crossOrigin: true
});
layer.addTo(map);


map.options.maxZoom = 20;
map.options.minZoom = 3;
map.removeControl(map.zoomControl);

function clickZoom(e) {
  map.setView(e.target.getLatLng(), 5);
}

fetch("conditional-areas.json")
  .then(i => i.json())
  .then(i => {
    console.log('i', i);
    const collection = turf.featureCollection(i)
    console.log('collection', collection);
    var freeBusLayer = L.geoJSON(collection).addTo(map);
  })

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
      .then(json => {
        console.log('json', json);
        //UNIQUE by locode
        const autComplResultArray = [...new Map(json.map(item => [item['locode'], item])).values()];

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
            wayFromTo.from = autComplResultArray[i].id

            const { lat, lon } = autComplResultArray[i];
            map.flyTo([lat, lon], 7)
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
      .then(response => response.json())
      .then(json => {
        console.log('json', json);
        //UNIQUE by locode
        const autComplResultArray = [...new Map(json.map(item => [item['locode'], item])).values()];

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
            wayFromTo.to = autComplResultArray[i].id

            const { lat, lon } = autComplResultArray[i];
            map.flyTo([lat, lon], 7)
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


  //shipowner=1&vessel=1&port_from=LVRIX-2471&port_to=NLRTM-1276&etd=2021-12-13T14%3A11%3A18.973Z&eta=2021-12-30T14%3A11%3A18.973Z
  var urlencoded = new URLSearchParams();
  urlencoded.append("shipowner", 1);
  urlencoded.append("vessel", 1);
  urlencoded.append("port_from", wayFromTo.from);
  urlencoded.append("port_to", wayFromTo.to);
  urlencoded.append("etd", new Date().toISOString());
  urlencoded.append("eta", new Date().toISOString());


  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };
  spinner.removeAttribute('hidden');
  fetch("https://demo2-2021-api.marine-digital.com/voyage/", requestOptions)
    .then(response => response.json())
    .then(resultArray => {

      if (resultArray && +resultArray.id > 0) {
        fetch("https://demo2-2021-api.marine-digital.com/route/voyage/" + resultArray.id)
          //fetch("https://demo2-2021-api.marine-digital.com/route/voyage/15")
          .then(resp => resp.json())
          .then(json => {
            spinner.setAttribute('hidden', '');
            buildRoutes(json)
          })
      }

    })
    .catch(error => console.log('error', error));
}



//TEST!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//fetch("test_data/test1.json")
fetch("https://demo2-2021-api.marine-digital.com/route/voyage/" + voyageId)
  .then(resp => resp.json())
  .then(json => {
    spinner.setAttribute('hidden', '');
    buildRoutes(json)
  })


function buildRoutes(data) {
  if (data.routes.length === 0) return;

  allRoutes.forEach(route => {
    map.removeLayer(route.route)
    map.removeLayer(route.snake)
  })
  allRoutes.length = 0;

  data.routes.forEach((routeData) => {
    addRoute(routeData, data.voyage)
  })
}



function addRoute(data, voyage) {
  console.log('data', data);
  let snakeLine;
  const geojsonGroup = new L.LayerGroup();
  geojsonGroup.addTo(map);

  if (snakeLine) snakeLine.remove();

  const path = (data.route_type === "basic") ? data.json.paths[0].points : data.json.routes[0].points
  if (path.length === 0) return;

  console.log('path', path);

  let snakeColor = "red"
  let pathColor = "gray"

  switch (data.route_type) {
    case "basic":
      snakeColor = "red"
      pathColor = "gray"
      break;
    case "cost":
      snakeColor = "green"
      pathColor = "green"
      break;
    case "fuel":
      snakeColor = "#f57100"
      pathColor = "#f57100"
      break;
    case "time":
      snakeColor = "orange"
      pathColor = "orange"
      break;
  }


  const tCoords = getCoordinatesFromPoints(path)
  const coords = antimeridian(tCoords)

  const line = turf.lineString(coords)
  var [lat, lng, lat1, lng1] = turf.bbox(line);
  const bounds = new L.LatLngBounds([lng1, lat1], [lng, lat]);
  map.fitBounds(bounds)

  var myStyle = {
    "color": pathColor,
    "weight": 15,
    "opacity": 0.25
  };
  //clear everything
  geojsonGroup.eachLayer(i => i.remove())

  const popupText = `
    <div>
      <div class="item">From: ${voyage.port_from}</div>
      <div class="item">To: ${voyage.port_to}</div>
      <div class="item">Total distance: ${data.distance}</div>
    </div>
  `
  const popup = L.popup({ offset: [0, -5] });
  popup.setContent(popupText);

  //1. snake line over main path 
  const pline = getCoordinatesFromPoints(path)
  const polyline = antimeridian(pline).map(i => i.reverse())
  snakeLine = L.polyline(polyline, {
    color: snakeColor,
    snakingSpeed: 200,
  })
  snakeLine.addTo(map).snakeIn()
  snakeLine.on("snakeend", ev => {
    snakeLine.snakeIn()
  });

  //2. maine line path
  const geojson = L.geoJSON(line, {
    style: myStyle,
  })
  geojson.eachLayer(function (layer) {

    layer.bindPopup(popup);
    layer.on('mouseover', function (e) {
      const segment = hightlightSegment(findClosestPoint(coords, e))
      const segmentData = path[segment.index + 1]?.properties
      setPopupContent(e, segmentData, popupText)
    });

    layer.on('mouseout', function (e) {
      e.target.closePopup();
      hightlightSegment()
    });

    layer.on('mousemove', function (e) {
      popup.setLatLng(e.latlng).openOn(map);
      const segment = hightlightSegment(findClosestPoint(coords, e))
      const segmentData = path[segment.index + 1]?.properties
      setPopupContent(e, segmentData, popupText)
    });
    layer.on('click', function (e) {
      const segment = hightlightSegment(findClosestPoint(coords, e))
      const segmentData = path[segment.index + 1]?.properties
      setPopupContent(e, segmentData, popupText, true)

    });
  });
  geojsonGroup.addLayer(geojson);

  allRoutes.push({
    type: data.route_type,
    route: geojsonGroup,
    snake: snakeLine,
    visible: true
  });

  resultsDiv.innerHTML += buildCard({
    routeId: data.route_type,
    type: data.route_type,
    color: pathColor
  })
}

function setPopupContent(e, data, popupText, showWeather) {
  var popup = e.target.getPopup();
  const weatherTable = showWeather ? buildWeatherTable(data) : "";
  popup.setContent(popupText + `
    <div><b>API Data</b></div>
    <div>Distance: ${data.distance}</div>
    <div>Bearing: ${data.course}</div>
    ${weatherTable}
  `);
  popup.setLatLng(e.latlng).openOn(map);
}

function buildWeatherTable(data) {
  if (!data || !data.weatherElements) return;

  const rows = data.weatherElements.map(weather => {
    return `<tr>
      <td>${weather.element}<td>
      <td>${weather.avg}<td>
      <td>${weather.max}<td>
      <td>${weather.min}<td>
    </tr>`
  }).join("")
  const table = `<table class="weatherData">
    <tr>
      <th>element</th>
      <th>avg</th>
      <th>max</th>
      <th>min</th>
    </tr>
    ${rows}
  </table>`;
  return table;
}

let hSegment;
function hightlightSegment(segment) {
  if (!segment) { hSegment.remove(); return; }
  if (hSegment) hSegment.remove();
  const line = turf.lineString(segment.coord)
  hSegment = L.geoJSON(line, {
    style: {
      "color": "blue",
      "weight": 12,
      "opacity": 1
    },
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

document.addEventListener("input", function (e) {
  console.log('e,this', e, this);
  if (e.target.classList.contains("toggleRoute")) {
    const routeType = e.target.getAttribute("data-route-id")
    console.log('routeType', routeType);
    toggleRoute(routeType)
  }
})

function toggleRoute(type) {
  const route = allRoutes.find(route => route.type === type);
  if (route && route.visible) {
    route.route.remove();
    route.snake.remove();
    route.visible = false;
  } else {
    route.route.addTo(map);
    route.snake.addTo(map)._snake();
    console.log('route.snake', route.snake);
    route.visible = true;
  }
}

function buildCard({ routeId, type, color }) {

  return `<div class="voyage_way__card ">
    <div class="voyage_way__card_header">
      <div class="voyage_way__card_header_item">
        <div class="voyage_way__card_header_label">ETA Forecast</div>
        <div class="voyage_way__card_header_text">07 Sep 2021, 07:15</div>
      </div>
      <div class="voyage_way__card_header_status" style="color:${color}">
        ${type} 
        <input type="checkbox" checked name="" id="" data-route-id="${routeId}" class="toggleRoute">
      </div>
    </div>
    <div class="voyage_way__card_body">
      <div class="voyage_way__card_body_item">
        <div class="voyage_way__card_body_label">Fuel saved        </div>
        <div class="voyage_way__card_body_text">        </div>
      </div>
      <div class="voyage_way__card_body_item">
        <div class="voyage_way__card_body_label">Total Savings
        </div>
        <div class="voyage_way__card_body_text">$13 000
        </div>
      </div>
      <div class="voyage_way__card_body_item">
        <div class="voyage_way__card_body_label">CO2 Emission control
        </div>
        <div class="voyage_way__card_body_text">120 MT
        </div>
      </div>
    </div>
    <div class="voyage_way__card_footer">
      <div class="voyage_way__card_time">
        <img src="img/time-ico.svg" alt="">~30 hours will be saved
      </div>
    </div>
  </div>`;
}


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




