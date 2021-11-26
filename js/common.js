// Layer map
var map = L.map('mapid').setView([50.80925310310907, -0.1361937699561519], 3);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidmVyc3N0YWNoaSIsImEiOiJja3Q1bjI1OG0wYTB1MndwaG0wZTI0eG0yIn0.KW23CHoSsSdBk52ntlTaRA', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/dark-v10',
    // tileSize: 256,
    zoomControl: false,
    accessToken: 'pk.eyJ1IjoidmVyc3N0YWNoaSIsImEiOiJja3Q1bjI1OG0wYTB1MndwaG0wZTI0eG0yIn0.KW23CHoSsSdBk52ntlTaRA',
    style: 'mapbox://styles/mapbox/dark-v10', 
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   maxZoom: 18, attribution: '[insert correct attribution here!]'  
}).addTo(map); 
  

map.options.maxZoom = 20;
map.options.minZoom = 3;
map.removeControl(map.zoomControl);  

function clickZoom(e) {
    map.setView(e.target.getLatLng(),5);
}



 var markers = [
    [ 23.135044427508504, -82.42811672821004, "MSC SEASIDE", "stay", "notification_warning","2"], 
    [ 42.33975833769053, -70.98629466906411, "BUNGA LOTUS", "anchor", "notification_status","1" ] 
 ];
 
 //Loop through the markers array
 for (var i=0; i<markers.length; i++) { 
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
  var markerLocation = new L.LatLng( lon, lat);
    marker = new L.marker(markerLocation, {icon: markerIcon}).addTo(map).on('click', clickZoom); 
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
zoomIn.addEventListener('click',function zoomInFunc() {
  map.setZoom(map.getZoom() + 1)
}, false); 

// // zoom out function
var zoomOut = document.getElementById('out');
zoomOut.addEventListener('click',function zoomInFunc() {
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
voyagePanelOpen.addEventListener('click', function voyagePanelOpenFucn () {
  document.querySelector(".voyage_panel").classList.toggle('active');  
  sidebar.hide(); 
  document.getElementById('weather_panel').classList.remove("weather_panel_open");
  document.getElementById('voyage_way_form').classList.remove("voyage_form_close");
  document.getElementById('voyage_way_result').classList.remove("voyage_form_open");
}, false);  

var notificationOpen = document.querySelector(".notification_link_open");
notificationOpen.addEventListener('click', function notificationOpenFucn () {
  document.querySelector(".notification_panel").classList.toggle('active');  
  sidebar.hide(); 
}, false);  

var allVesselTabOpen = document.querySelector(".all_vessel_tab_open");
allVesselTabOpen.addEventListener('click', function allVesselTabOpenFunc () {
  document.querySelector(".all_vessel_tab").classList.toggle('active'); 
  sidebar.hide(); 
}, false);  

var allVesselTabClose = document.querySelector(".all_vessel_tab_close");
allVesselTabClose.addEventListener('click', function allVesselTabCloseFunc () {
  document.querySelector(".all_vessel_tab").classList.toggle('active'); 
}, false);   

var allTabClose = document.querySelector(".voyage_link_map");
allTabClose.addEventListener('click', function allTabCloseFunc () {
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

var cloudsLayer = L.tileLayer('https://maps.openweathermap.org/maps/2.0/weather/CL/{z}/{x}/{y}?date='+time+'&palette=0:FFFFFF00;10:FDFDFF19;20:FCFBFF26;30:FAFAFF33;40:F9F8FF4C;50:F7F7FF66;60:F6F5FF8C;70:F4F4FFBF;80:E9E9DFCC;90:DEDEDED8;100:D2D2D2FF;200:D2D2D2FF &opacity=0.3&appid=faeeb9b8701d5f1c36c00e9f016cc027', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/dark-v10',
    // tileSize: 256,
    zoomControl: false,
  edgeBufferTiles: 5,
    accessToken: 'pk.eyJ1IjoidmVyc3N0YWNoaSIsImEiOiJja3Q1bjI1OG0wYTB1MndwaG0wZTI0eG0yIn0.KW23CHoSsSdBk52ntlTaRA',
    style: 'mapbox://styles/mapbox/dark-v10', 
});  
var windLayer = L.tileLayer('https://maps.openweathermap.org/maps/2.0/weather/WS10/{z}/{x}/{y}?date='+time+'&opacity=0.3&palette=1:FFFFFF;5:9EB2F6;15:557BFF;25:406AFF;50:2455FF;100:1343EC;200:11225E&appid=faeeb9b8701d5f1c36c00e9f016cc027', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/dark-v10',
    // tileSize: 256,
    zoomControl: false,
  edgeBufferTiles: 5,
    accessToken: 'pk.eyJ1IjoidmVyc3N0YWNoaSIsImEiOiJja3Q1bjI1OG0wYTB1MndwaG0wZTI0eG0yIn0.KW23CHoSsSdBk52ntlTaRA',
    style: 'mapbox://styles/mapbox/dark-v10', 
}); 
var tempLayer = L.tileLayer('https://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?date='+time+'&opacity=0.3&palette=-65:C322DB;-55:C322DB;-45:C322DB;-40:C322DB;-30:9765FF;-20:2698FD;-10:20C4E8;0:23DDDD;10:C2FF28;20:FFF028;25:FFC228;30:FC8014&appid=faeeb9b8701d5f1c36c00e9f016cc027', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/dark-v10',
    // tileSize: 256,
    zoomControl: false,
  edgeBufferTiles: 5,
    accessToken: 'pk.eyJ1IjoidmVyc3N0YWNoaSIsImEiOiJja3Q1bjI1OG0wYTB1MndwaG0wZTI0eG0yIn0.KW23CHoSsSdBk52ntlTaRA',
    style: 'mapbox://styles/mapbox/dark-v10', 
}); 
var rainLayer = L.tileLayer('https://maps.openweathermap.org/maps/2.0/weather/PAC0/{z}/{x}/{y}?date='+time+'&opacity=0.6&appid=faeeb9b8701d5f1c36c00e9f016cc027', {
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
weatherCloudsPanel.addEventListener('click', function weatherCloudsPanelFunc () {   
  if(weatherCloudsPanel.classList.contains('panel_open')){
    weatherCloudsPanel.classList.remove('panel_open')
    cloudsLayer.remove(map); 
  }
  else{
    weatherCloudsPanel.classList.add('panel_open')
    cloudsLayer.addTo(map);  
  }
}, false);

var weatherWindPanel = document.getElementById("weather_wind_panel");
weatherWindPanel.addEventListener('click', function weatherWindPanelFunc () {   
  if(weatherWindPanel.classList.contains('panel_open')){
    weatherWindPanel.classList.remove('panel_open')
    windLayer.remove(map); 
  }
  else{
    weatherWindPanel.classList.add('panel_open')
    windLayer.addTo(map);  
  }
}, false);

var weatherTempPanel = document.getElementById("weather_temp_panel");
weatherTempPanel.addEventListener('click', function weatherTempPanelFunc () {  
  if(weatherTempPanel.classList.contains('panel_open')){
    weatherTempPanel.classList.remove('panel_open')
    tempLayer.remove(map); 
  }
  else{
    weatherTempPanel.classList.add('panel_open')
    tempLayer.addTo(map);  
  }
}, false);

var weatherRainPanel = document.getElementById("weather_rain_panel");
weatherRainPanel.addEventListener('click', function weatherRainPanelFunc () {  
  if(weatherRainPanel.classList.contains('panel_open')){
    weatherRainPanel.classList.remove('panel_open')
    rainLayer.remove(map); 
  }
  else{
    weatherRainPanel.classList.add('panel_open')
    rainLayer.addTo(map);  
  }
}, false);
 
var removeAllPanel = document.getElementById("remove_all_panel");
removeAllPanel.addEventListener('click', function removeAllPanelFunc () {   
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
  if(this.value.length >= 3){ 
  var way_from_result = document.getElementById('way_from_result');
  // way_from.addEventListener('change', (event) => { 
  // function way_from_result() {
    const keyName = wayFromPort.value; 
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }; 
    fetch("https://demo2-2021-api.marine-digital.com/port/autocomplete?term="+keyName, requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log(result);
      var autComplResultArray=JSON.parse(result); 
      way_from_result.innerHTML = '';
      for(let i=0;i<autComplResultArray.length;++i){
        console.log(autComplResultArray[i].locode);
        // console.log(autComplResultArray[i].id); 
        let div = document.createElement('div');
        div.classList.add('result_item')
        var autComplRepeatArray = [];
        autComplRepeatArray.push(autComplResultArray[i].locode);
        // for(let j=0;j<autComplRepeatArray.length;++i){ 
          // if(autComplRepeatArray[j] != autComplResultArray[i].locode){
            console.log(autComplResultArray[i].locode);
            autComplRepeatArray.push(autComplResultArray[i].locode);
            div.innerHTML = autComplResultArray[i].locode;
            way_from_result.append(div);
          // }
        // }
        div.addEventListener('click', wayResultItemFunction, false);
        function wayResultItemFunction() {
            console.log( this.innerHTML );
            var wayFromPort = document.getElementById('way_from'); 
            wayFromPort.value = this.innerHTML;
            way_from_result.innerHTML = '';
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
  if(this.value.length >= 3){
  var way_to_result = document.getElementById('way_to_result');
// way_to.addEventListener('change', (event) => {
  const keyName = wayToPort.value; 
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  }; 
  fetch("https://demo2-2021-api.marine-digital.com/port/autocomplete?term="+keyName, requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log(result);
      var autComplResultArray=JSON.parse(result); 
      way_to_result.innerHTML = '';
      for(let i=0;i<autComplResultArray.length;++i){
        console.log(autComplResultArray[i].locode);
        console.log(autComplResultArray[i].id); 
        let div = document.createElement('div');
        div.classList.add('result_item')
        div.innerHTML = autComplResultArray[i].locode;
        way_to_result.append(div);
        div.addEventListener('click', wayResultItemFunction, false);
        function wayResultItemFunction() {
            console.log( this.innerHTML );
            var wayToPort = document.getElementById('way_to'); 
            wayToPort.value = this.innerHTML;
            way_to_result.innerHTML = '';
        }
      }  
    })
    .catch(error => console.log('error', error)); 

// });

  }
};
 
// set today date to input date
var path=[];
var wayLine;
const spinner = document.getElementById("spinner");
// document.getElementById('date').value = new Date().toISOString().slice(0, 10);
function waySearchFunc(){
  var wayFrom = document.getElementById('way_from').value;
  var wayTo = document.getElementById('way_to').value; 
  if(!wayFrom == 0 && !wayTo == 0 ){ 
    // console.log('test'); //[array with valid inputs]

    document.getElementById('voyage_way_form').classList.add("voyage_form_close");
    // document.getElementById('voyage_way_result').classList.add("voyage_form_open");
  document.querySelector(".voyage_panel").classList.remove('active'); 
    document.getElementById('voyage_form_back_link').classList.add("voyage_form_back_link_open"); 
    // document.getElementById('weather_panel').classList.add("weather_panel_open");
  } 
 
// .remove(mymap)
  // request
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  var way_from = document.getElementById('way_from').value;
  var way_to = document.getElementById('way_to').value;
  // var way_from = 'LVRIX';
  // var way_to = 'DOCAI';
  console.log(way_from); 
  console.log(way_to);  
  // urlencoded.append("port_from", way_from);
  // urlencoded.append("port_to", way_to);
  urlencoded.append("port_from", way_from);
  urlencoded.append("port_to", way_to);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };
  spinner.removeAttribute('hidden');
  fetch("https://demo2-2021-api.marine-digital.com/route/simple", requestOptions)
    .then(response => response.text())
    .then(result => {  
      // for (let i=0;i<result.path) {
      //     if (result.hasOwnProperty(r)) {
      //         path.push(r)
      //     }
      // }
      console.log(result);
      resultArray=JSON.parse(result);
      path=resultArray.path
      spinner.setAttribute('hidden', '');
      // console.log(path);
      wayLine = L.polyline(path, {color: '#3C87FC'});
      wayLine.addTo(map);
      // wayLine.removeFrom(map);
    // playBackFunc();
    })
    .catch(error => console.log('error', error));  
}


function waySearchSnipetFunc(){
  document.querySelector(".voyage_panel").classList.remove('active');  
    document.getElementById('weather_panel').classList.remove("weather_panel_open");
  sidebar.show(); 
} 


var voyageFormBackLink = document.getElementById("voyage_form_back_link");
voyageFormBackLink.addEventListener('click', function voyageFormBackLinkFunc () {  
    document.getElementById('voyage_way_form').classList.remove("voyage_form_close");
    document.getElementById('voyage_way_result').classList.remove("voyage_form_open");
    document.getElementById('voyage_form_back_link').classList.remove("voyage_form_back_link_open");
    document.getElementById('weather_panel').classList.remove("weather_panel_open");
}, false); 



// PLAYBACK START
function playBackFunc(){
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
        var refreshTime = apiInterval/1000;
  

  if($( "#weather_clouds_panel" ).hasClass( "panel_open" )){
      cloudsLayer.remove(map); 
      cloudsLayer = L.tileLayer('https://maps.openweathermap.org/maps/2.0/weather/CL/{z}/{x}/{y}?date='+refreshTime+'&palette=0:FFFFFF00;10:FDFDFF19;20:FCFBFF26;30:FAFAFF33;40:F9F8FF4C;50:F7F7FF66;60:F6F5FF8C;70:F4F4FFBF;80:E9E9DFCC;90:DEDEDED8;100:D2D2D2FF;200:D2D2D2FF &opacity=0.3&appid=faeeb9b8701d5f1c36c00e9f016cc027', {
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
  if($( "#weather_rain_panel" ).hasClass( "panel_open" )){ 
      rainLayer.remove(map);    
        rainLayer = L.tileLayer('https://maps.openweathermap.org/maps/2.0/weather/PAC0/{z}/{x}/{y}?date='+refreshTime+'&opacity=0.6&appid=faeeb9b8701d5f1c36c00e9f016cc027', {
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

  if($( "#weather_temp_panel" ).hasClass( "panel_open" )){ 
      tempLayer.remove(map);
      tempLayer = L.tileLayer('https://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?date='+refreshTime+'&opacity=0.3&palette=-65:C322DB;-55:C322DB;-45:C322DB;-40:C322DB;-30:9765FF;-20:2698FD;-10:20C4E8;0:23DDDD;10:C2FF28;20:FFF028;25:FFC228;30:FC8014&appid=faeeb9b8701d5f1c36c00e9f016cc027', {
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

  if($( "#weather_wind_panel" ).hasClass( "panel_open" )){ 
      windLayer.remove(map);
      windLayer = L.tileLayer('https://maps.openweathermap.org/maps/2.0/weather/WS10/{z}/{x}/{y}?date='+refreshTime+'&opacity=0.3&palette=1:FFFFFF;5:9EB2F6;15:557BFF;25:406AFF;50:2455FF;100:1343EC;200:11225E&appid=faeeb9b8701d5f1c36c00e9f016cc027', {
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
observer.observe(target, { attributes : true, attributeFilter : ['style'] });
  
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
  if(tabs){
    tabs.addEventListener('click', function(e) {
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
if(tabs){
  tabs.addEventListener('click', function(e) {
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
 
 

