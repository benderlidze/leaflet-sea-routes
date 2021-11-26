// Layer map
var map = L.map('mapid').setView([53.5, 9.9], 2);
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

 
var markerIconOne = L.divIcon(
  {
  html: `
  <div class='marker__image'><img src='img/marker-icon-3.png' alt=''></div>
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
const convertedCoords = coords.map(({ lon, lat }) => [lon, lat]);

const curvePath = [];
for (let i = 1; i < convertedCoords.length; i++) {
    const [lon, lat] = convertedCoords[i];
    curvePath.push('L', [lat, lon]);
}

const startPoint = convertedCoords[0];
L.curve([
    'M', [startPoint[1], startPoint[0]],
    ...curvePath
]).addTo(map);

L.marker([startPoint[1], startPoint[0]], { icon: markerIconOne }).addTo(map);


// custom scroll

jQuery(function ($) {
    $.fn.hScroll = function (amount) {
        amount = amount || 120;
        $(this).bind("DOMMouseScroll mousewheel", function (event) {
            var oEvent = event.originalEvent, 
                direction = oEvent.detail ? oEvent.detail * -amount : oEvent.wheelDelta, 
                position = $(this).scrollLeft();
            position += direction > 0 ? -amount : amount;
            $(this).scrollLeft(position);
            event.preventDefault();
        })
    };
});

$(document).ready(function() {
    $('.content_vessel_notification_box').hScroll(60); // You can pass (optionally) scrolling amount
});

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
var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);
// end custom Select
 
// hover link right panel
function lonkHoverActive(elem) {
    var a = document.getElementsByClassName("left_panel__link")
    for (i = 0; i < a.length; i++) {
        a[i].classList.remove('active')
    }
    elem.classList.toggle('active');
}
  

am4core.ready(function() {

// Themes begin
am4core.useTheme(am4themes_animated);
am4core.addLicense("ch-custom-attribution");
// Themes end

// Create chart instance
var chart = am4core.create("chartdiv", am4charts.XYChart);

// Add data
chart.data = [
  {date:new Date(2019,5,12), value1:50, value2:48, previousDate:new Date(2019, 5, 5)},
  {date:new Date(2019,5,13), value1:53, value2:51, previousDate:new Date(2019, 5, 6)},
  {date:new Date(2019,5,14), value1:56, value2:58, previousDate:new Date(2019, 5, 7)},
  {date:new Date(2019,5,15), value1:52, value2:53, previousDate:new Date(2019, 5, 8)},
  {date:new Date(2019,5,16), value1:48, value2:44, previousDate:new Date(2019, 5, 9)},
  {date:new Date(2019,5,17), value1:47, value2:42, previousDate:new Date(2019, 5, 10)},
  {date:new Date(2019,5,18), value1:59, value2:55, previousDate:new Date(2019, 5, 11)}
]

// Create axes
var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
dateAxis.renderer.minGridDistance = 50;
dateAxis.renderer.labels.template.fill = am4core.color("#fff"); 

var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.renderer.labels.template.fill = am4core.color("#fff");
valueAxis.renderer.grid.template.stroke = am4core.color("#A0CA92");
valueAxis.renderer.grid.template.strokeOpacity = 1; 

// Create series
var series = chart.series.push(new am4charts.LineSeries());
series.name = "Power";
series.dataFields.valueY = "value1";
series.dataFields.dateX = "date";
series.stroke = am4core.color("#EEFF88");  
series.strokeWidth = 2;
series.minBulletDistance = 10;
series.tooltipText = "[bold]{date.formatDate()}:[/] {value1}\n[bold]{previousDate.formatDate()}:[/] {value2}";
series.tooltip.pointerOrientation = "vertical";

// Create series
var series2 = chart.series.push(new am4charts.LineSeries());
series2.name = "Torque";
series2.dataFields.valueY = "value2";
series2.dataFields.dateX = "date";
series2.strokeWidth = 2;
series2.strokeDasharray = "3,4";
series2.stroke = series.stroke;
series2.stroke = am4core.color("#629FFF"); 

// Add cursor
chart.cursor = new am4charts.XYCursor();
chart.cursor.xAxis = dateAxis;

chart.legend = new am4charts.Legend();
chart.legend.position = "top";
chart.legend.labels.template.text = "[bold {color}]{name}[/]";
 



// -----------------------------




var chart1 = am4core.create("chartdiv1", am4charts.XYChart);

chart1.data = [{
 "country": "Oily bilge water",
 "visits": 2025
}, {
 "country": "Heavy fuel oil",
 "visits": 1882
}, {
 "country": "Diesel oil",
 "visits": 1809
}, {
 "country": "Natural gas",
 "visits": 1322
}, {
 "country": "Fuel 5",
 "visits": 1122
}, {
 "country": "Fuel 6",
 "visits": 1114
}, {
 "country": "Fuel 7",
 "visits": 984
} ];

chart1.padding(40, 40, 40, 40);

var categoryAxis = chart1.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.dataFields.category = "country";
categoryAxis.renderer.minGridDistance = 60;
categoryAxis.renderer.inversed = true;
categoryAxis.renderer.grid.template.disabled = true;
categoryAxis.renderer.labels.template.fill = am4core.color("#fff");

var valueAxis = chart1.yAxes.push(new am4charts.ValueAxis());
valueAxis.renderer.labels.template.fill = am4core.color("#fff");
valueAxis.renderer.grid.template.stroke = am4core.color("#A0CA92");
valueAxis.renderer.grid.template.strokeOpacity = 1; 
valueAxis.min = 0;
valueAxis.extraMax = 0.1;
//valueAxis.rangeChangeEasing = am4core.ease.linear;
//valueAxis.rangeChangeDuration = 1500;

var series = chart1.series.push(new am4charts.ColumnSeries());
series.dataFields.categoryX = "country";
series.dataFields.valueY = "visits";
series.name = "FOC Boiler";
series.tooltipText = "{valueY.value}"; 
series.stroke = am4core.color("#629FFF");  
series.columns.template.strokeOpacity = 1;
series.columns.template.column.cornerRadiusTopRight = 0;
series.columns.template.column.cornerRadiusTopLeft = 0; 
//series.interpolationDuration = 1500;
//series.interpolationEasing = am4core.ease.linear; 
chart1.zoomOutButton.disabled = true;

 
chart1.legend = new am4charts.Legend();
chart1.legend.position = "top";
chart1.legend.labels.template.text = "[bold {color}]{name}[/]";
 

 


// -----------------------------


 
 
/**
 * Chart design taken from Samsung health app
 */

var chart2 = am4core.create("chartdiv2", am4charts.XYChart);
chart2.hiddenState.properties.opacity = 0; // this creates initial fade-in

chart2.data = [ {
    "date": "2018-01-06",
    "steps": 7561
}, {
    "date": "2018-01-07",
    "steps": 1287
}, {
    "date": "2018-01-08",
    "steps": 3298
}, {
    "date": "2018-01-09",
    "steps": 5697
}, {
    "date": "2018-01-10",
    "steps": 4878
}, {
    "date": "2018-01-11",
    "steps": 8788
}, {
    "date": "2018-01-12",
    "steps": 9560
} ];

chart2.dateFormatter.inputDateFormat = "YYYY-MM-dd";
chart2.zoomOutButton.disabled = true;

var dateAxis = chart2.xAxes.push(new am4charts.DateAxis());
dateAxis.renderer.grid.template.strokeOpacity = 0; 
dateAxis.renderer.minGridDistance = 10;
dateAxis.dateFormats.setKey("day", "d");
dateAxis.tooltip.hiddenState.properties.opacity = 1;
dateAxis.tooltip.hiddenState.properties.visible = true; 
dateAxis.renderer.labels.template.fill = am4core.color("#fff");
dateAxis.renderer.grid.template.stroke = am4core.color("#A0CA92");


dateAxis.tooltip.adapter.add("x", function (x, target) {
    return am4core.utils.spritePointToSvg({ x: chart2.plotContainer.pixelX, y: 0 }, chart2.plotContainer).x + chart2.plotContainer.pixelWidth / 2;
})

var valueAxis = chart2.yAxes.push(new am4charts.ValueAxis());
valueAxis.renderer.labels.template.fill = am4core.color("#fff");
valueAxis.renderer.grid.template.stroke = am4core.color("#A0CA92");
valueAxis.renderer.inside = true;
valueAxis.renderer.labels.template.fillOpacity = 1;
valueAxis.renderer.grid.template.strokeOpacity = 1;
valueAxis.min = 0;
valueAxis.cursorTooltipEnabled = false;

// goal guides
var axisRange = valueAxis.axisRanges.create();
axisRange.value = 6000;
axisRange.grid.strokeOpacity = 0.1; 
axisRange.label.align = "right";
axisRange.label.verticalCenter = "bottom";
axisRange.label.fillOpacity = 0.8;

valueAxis.renderer.gridContainer.zIndex = 1;

var axisRange2 = valueAxis.axisRanges.create();
axisRange2.value = 12000;
axisRange2.grid.strokeOpacity = 0.1;
axisRange2.label.text = "2x goal";
axisRange2.label.align = "right";
axisRange2.label.verticalCenter = "bottom";
axisRange2.label.fillOpacity = 0.8;
valueAxis.renderer.labels.template.fill = am4core.color("#fff");

var series = chart2.series.push(new am4charts.ColumnSeries);
series.dataFields.valueY = "steps";
series.dataFields.dateX = "date";
series.name = "FOC Boiler";
series.tooltipText = "{valueY.value}";
series.tooltip.pointerOrientation = "vertical";
series.tooltip.hiddenState.properties.opacity = 1;
series.tooltip.hiddenState.properties.visible = true;
series.tooltip.adapter.add("x", function (x, target) {
    return am4core.utils.spritePointToSvg({ x: chart2.plotContainer.pixelX, y: 0 }, chart2.plotContainer).x + chart2.plotContainer.pixelWidth / 2;
})

var columnTemplate = series.columns.template;
columnTemplate.width = 30;
columnTemplate.column.cornerRadiusTopLeft = 20;
columnTemplate.column.cornerRadiusTopRight = 20;
columnTemplate.strokeOpacity = 0;

columnTemplate.adapter.add("fill", function (fill, target) {
    var dataItem = target.dataItem;
    if (dataItem.valueY > 6000) {
        return chart2.colors.getIndex(0);
    }
    else {
        return am4core.color("#EEFF88");
    }
})

var cursor = new am4charts.XYCursor();
cursor.behavior = "panX";
chart2.cursor = cursor;
cursor.lineX.disabled = true;

chart2.events.on("datavalidated", function () {
    dateAxis.zoomToDates(new Date(2018, 0, 21), new Date(2018, 1, 1), false, true);
});
 

cursor.events.on("cursorpositionchanged", updateTooltip);
dateAxis.events.on("datarangechanged", updateTooltip);

function updateTooltip() {
    dateAxis.showTooltipAtPosition(0.5);
    series.showTooltipAtPosition(0.5, 0);
    series.tooltip.validate(); // otherwise will show other columns values for a second
}

 
chart2.legend = new am4charts.Legend();
chart2.legend.position = "top";
chart2.legend.labels.template.text = "[bold {color}]{name}[/]";



// -----------------------------


var chart3 = am4core.create("chartdiv3", am4charts.XYChart);

var data = [];
var value = 50;
for(var i = 0; i < 300; i++){
  var date = new Date();
  date.setHours(0,0,0,0);
  date.setDate(i);
  value -= Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
  data.push({date:date, value: value});
}

chart3.data = data;

// Create axes
var dateAxis = chart3.xAxes.push(new am4charts.DateAxis());
dateAxis.renderer.minGridDistance = 60;
dateAxis.renderer.labels.template.fill = am4core.color("#fff");

var valueAxis = chart3.yAxes.push(new am4charts.ValueAxis());
valueAxis.renderer.labels.template.fill = am4core.color("#fff");
valueAxis.renderer.grid.template.stroke = am4core.color("#A0CA92");
valueAxis.renderer.grid.template.strokeOpacity = 1; 

// Create series
var series = chart3.series.push(new am4charts.LineSeries());
series.dataFields.valueY = "value";
series.dataFields.dateX = "date";
series.tooltipText = "{value}"
series.stroke = am4core.color("#629FFF"); 
series.name = "Power/speed"; 

series.tooltip.pointerOrientation = "vertical";

chart3.cursor = new am4charts.XYCursor();
chart3.cursor.snapToSeries = series;
chart3.cursor.xAxis = dateAxis;

//chart.scrollbarY = new am4core.Scrollbar();
// chart3.scrollbarX = new am4core.Scrollbar();


chart3.legend = new am4charts.Legend();
chart3.legend.position = "top";
chart3.legend.labels.template.text = "[bold {color}]{name}[/]";

// -----------------------------


var chart4 = am4core.create("chartdiv4", am4charts.XYChart);

var data = [];
var value = 50;
for(var i = 0; i < 300; i++){
  var date = new Date();
  date.setHours(0,0,0,0);
  date.setDate(i);
  value -= Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
  data.push({date:date, value: value});
}

chart4.data = data;

// Create axes
var dateAxis = chart4.xAxes.push(new am4charts.DateAxis());
dateAxis.renderer.minGridDistance = 60;
dateAxis.renderer.labels.template.fill = am4core.color("#fff");

var valueAxis = chart4.yAxes.push(new am4charts.ValueAxis());
valueAxis.renderer.labels.template.fill = am4core.color("#fff");
valueAxis.renderer.grid.template.stroke = am4core.color("#A0CA92");
valueAxis.renderer.grid.template.strokeOpacity = 1; 

// Create series
var series = chart4.series.push(new am4charts.LineSeries());
series.dataFields.valueY = "value";
series.dataFields.dateX = "date";
series.tooltipText = "{value}"
series.stroke = am4core.color("#629FFF");  
series.name = "Power/speed"; 

series.tooltip.pointerOrientation = "vertical";

chart4.cursor = new am4charts.XYCursor();
chart4.cursor.snapToSeries = series;
chart4.cursor.xAxis = dateAxis;

//chart.scrollbarY = new am4core.Scrollbar();
// chart4.scrollbarX = new am4core.Scrollbar();


chart4.legend = new am4charts.Legend();
chart4.legend.position = "top";
chart4.legend.labels.template.text = "[bold {color}]{name}[/]";

// -----------------------------


var chart5 = am4core.create("chartdiv5", am4charts.XYChart);

var data = [];
var value = 50;
for(var i = 0; i < 300; i++){
  var date = new Date();
  date.setHours(0,0,0,0);
  date.setDate(i);
  value -= Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
  data.push({date:date, value: value});
}

chart5.data = data;

// Create axes
var dateAxis = chart5.xAxes.push(new am4charts.DateAxis());
dateAxis.renderer.minGridDistance = 60;
dateAxis.renderer.labels.template.fill = am4core.color("#fff");

var valueAxis = chart5.yAxes.push(new am4charts.ValueAxis());
valueAxis.renderer.labels.template.fill = am4core.color("#fff");
valueAxis.renderer.grid.template.stroke = am4core.color("#A0CA92");
valueAxis.renderer.grid.template.strokeOpacity = 1; 

// Create series
var series = chart5.series.push(new am4charts.LineSeries());
series.dataFields.valueY = "value";
series.dataFields.dateX = "date";
series.tooltipText = "{value}"
series.stroke = am4core.color("#EEFF88");  
series.name = "SFOC/Engine load"; 

series.tooltip.pointerOrientation = "vertical";

chart5.cursor = new am4charts.XYCursor();
chart5.cursor.snapToSeries = series;
chart5.cursor.xAxis = dateAxis;

//chart.scrollbarY = new am4core.Scrollbar();
// chart5.scrollbarX = new am4core.Scrollbar();


chart5.legend = new am4charts.Legend();
chart5.legend.position = "top";
chart5.legend.labels.template.text = "[bold {color}]{name}[/]";

// -----------------------------


var chart6 = am4core.create("chartdiv6", am4charts.XYChart);

var data = [];
var value = 50;
for(var i = 0; i < 300; i++){
  var date = new Date();
  date.setHours(0,0,0,0);
  date.setDate(i);
  value -= Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
  data.push({date:date, value: value});
}

chart6.data = data;

// Create axes
var dateAxis = chart6.xAxes.push(new am4charts.DateAxis());
dateAxis.renderer.minGridDistance = 60;
dateAxis.renderer.labels.template.fill = am4core.color("#fff");

var valueAxis = chart6.yAxes.push(new am4charts.ValueAxis());
valueAxis.renderer.labels.template.fill = am4core.color("#fff");
valueAxis.renderer.grid.template.stroke = am4core.color("#A0CA92");
valueAxis.renderer.grid.template.strokeOpacity = 1; 

// Create series
var series = chart6.series.push(new am4charts.LineSeries());
series.dataFields.valueY = "value";
series.dataFields.dateX = "date";
series.tooltipText = "{value}"
series.stroke = am4core.color("#EEFF88");  
series.name = "SFOC/Engine load"; 

series.tooltip.pointerOrientation = "vertical";

chart6.cursor = new am4charts.XYCursor();
chart6.cursor.snapToSeries = series;
chart6.cursor.xAxis = dateAxis;

//chart.scrollbarY = new am4core.Scrollbar();
// chart6.scrollbarX = new am4core.Scrollbar();


chart6.legend = new am4charts.Legend();
chart6.legend.position = "top";
chart6.legend.labels.template.text = "[bold {color}]{name}[/]";

// -----------------------------


var chart7 = am4core.create("chartdiv7", am4charts.XYChart);

var data = [];
var value = 50;
for(var i = 0; i < 300; i++){
  var date = new Date();
  date.setHours(0,0,0,0);
  date.setDate(i);
  value -= Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
  data.push({date:date, value: value});
}

chart7.data = data;

// Create axes
var dateAxis = chart7.xAxes.push(new am4charts.DateAxis());
dateAxis.renderer.minGridDistance = 60;
dateAxis.renderer.labels.template.fill = am4core.color("#fff");

var valueAxis = chart7.yAxes.push(new am4charts.ValueAxis());
valueAxis.renderer.labels.template.fill = am4core.color("#fff");
valueAxis.renderer.grid.template.stroke = am4core.color("#A0CA92");
valueAxis.renderer.grid.template.strokeOpacity = 1; 

// Create series
var series = chart7.series.push(new am4charts.LineSeries());
series.dataFields.valueY = "value";
series.dataFields.dateX = "date";
series.tooltipText = "{value}"
series.stroke = am4core.color("#EEFF88");  
series.name = "SFOC/AE load"; 

series.tooltip.pointerOrientation = "vertical";

chart7.cursor = new am4charts.XYCursor();
chart7.cursor.snapToSeries = series;
chart7.cursor.xAxis = dateAxis;

//chart.scrollbarY = new am4core.Scrollbar();
// chart7.scrollbarX = new am4core.Scrollbar();


chart7.legend = new am4charts.Legend();
chart7.legend.position = "top";
chart7.legend.labels.template.text = "[bold {color}]{name}[/]";

 

// -----------------------------



// Create chart
var chart9 = am4core.create("chartdiv9", am4charts.XYChart);
chart9.paddingRight = 20;

var data =  [{
        "year": "1950",
        "value": -0.307
    }, {
        "year": "1951",
        "value": -0.168
    }, {
        "year": "1952",
        "value": -0.073
    }, {
        "year": "1953",
        "value": -0.027
    }, {
        "year": "1954",
        "value": -0.251
    }, {
        "year": "1955",
        "value": -0.281
    }, {
        "year": "1956",
        "value": -0.348
    }, {
        "year": "1957",
        "value": -0.074
    }, {
        "year": "1958",
        "value": -0.011
    }, {
        "year": "1959",
        "value": -0.074
    }, {
        "year": "1960",
        "value": -0.124
    }, {
        "year": "1961",
        "value": -0.024
    }, {
        "year": "1962",
        "value": -0.022
    }, {
        "year": "1963",
        "value": 0
    }, {
        "year": "1964",
        "value": -0.296
    }, {
        "year": "1965",
        "value": -0.217
    }, {
        "year": "1966",
        "value": -0.147
    }, {
        "year": "1967",
        "value": -0.15
    }, {
        "year": "1968",
        "value": -0.16
    }, {
        "year": "1969",
        "value": -0.011
    }, {
        "year": "1970",
        "value": -0.068
    }, {
        "year": "1971",
        "value": -0.19
    }, {
        "year": "1972",
        "value": -0.056
    }, {
        "year": "1973",
        "value": 0.077
    }, {
        "year": "1974",
        "value": -0.213
    }, {
        "year": "1975",
        "value": -0.17
    }, {
        "year": "1976",
        "value": -0.254
    }, {
        "year": "1977",
        "value": 0.019
    }, {
        "year": "1978",
        "value": -0.063
    }, {
        "year": "1979",
        "value": 0.05
    }, {
        "year": "1980",
        "value": 0.077
    }, {
        "year": "1981",
        "value": 0.12
    }, {
        "year": "1982",
        "value": 0.011
    }, {
        "year": "1983",
        "value": 0.177
    }, {
        "year": "1984",
        "value": -0.021
    }, {
        "year": "1985",
        "value": -0.037
    }, {
        "year": "1986",
        "value": 0.03
    }, {
        "year": "1987",
        "value": 0.179
    }, {
        "year": "1988",
        "value": 0.18
    }, {
        "year": "1989",
        "value": 0.104
    }, {
        "year": "1990",
        "value": 0.255
    }, {
        "year": "1991",
        "value": 0.21
    }, {
        "year": "1992",
        "value": 0.065
    }, {
        "year": "1993",
        "value": 0.11
    }, {
        "year": "1994",
        "value": 0.172
    }, {
        "year": "1995",
        "value": 0.269
    }, {
        "year": "1996",
        "value": 0.141
    }, {
        "year": "1997",
        "value": 0.353
    }, {
        "year": "1998",
        "value": 0.548
    }, {
        "year": "1999",
        "value": 0.298
    }, {
        "year": "2000",
        "value": 0.267
    }, {
        "year": "2001",
        "value": 0.411
    }, {
        "year": "2002",
        "value": 0.462
    }, {
        "year": "2003",
        "value": 0.47
    }, {
        "year": "2004",
        "value": 0.445
    }, {
        "year": "2005",
        "value": 0.47
    }];

chart9.data = data;
chart9.dateFormatter.inputDateFormat = "yyyy";

var dateAxis = chart9.xAxes.push(new am4charts.DateAxis());
dateAxis.renderer.minGridDistance = 50;
dateAxis.baseInterval = {timeUnit:"year", count:1};
dateAxis.renderer.labels.template.fill = am4core.color("#fff");

var valueAxis = chart9.yAxes.push(new am4charts.ValueAxis());
valueAxis.tooltip.disabled = true;
valueAxis.renderer.labels.template.fill = am4core.color("#fff");
valueAxis.renderer.grid.template.strokeOpacity = 1; 
valueAxis.renderer.grid.template.stroke = am4core.color("#A0CA92");

var series = chart9.series.push(new am4charts.StepLineSeries());
series.dataFields.dateX = "year";
series.dataFields.valueY = "value";
series.tooltipText = "{valueY.value}";
series.strokeWidth = 3; 
series.stroke = am4core.color("#EEFF88");  
series.name = "SFOC/AE load"; 

chart9.cursor = new am4charts.XYCursor();
chart9.cursor.xAxis = dateAxis;
chart9.cursor.fullWidthLineX = true;
chart9.cursor.lineX.strokeWidth = 0;
chart9.cursor.lineX.fill = chart9.colors.getIndex(2);
chart9.cursor.lineX.fillOpacity = 0.1;

// chart9.scrollbarX = new am4core.Scrollbar();

// Add a legend
chart9.legend = new am4charts.Legend();
chart9.legend.position = "top";
chart9.legend.labels.template.text = "[bold {color}]{name}[/]";

 




// -----------------------------




// Create chart instance
var chartdivBoiler = am4core.create("chartdivBoiler", am4charts.XYChart3D);
 

// Add data
chartdivBoiler.data = [{
  "category": "Boiler load",
  "value1": 30,
  "value2": 70
}, {
  "category": "Fuel consumption",
  "value1": 30,
  "value2": 70
}, ];

// Create axes
var categoryAxis = chartdivBoiler.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "category";
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.renderer.grid.template.strokeOpacity = 0;
categoryAxis.renderer.labels.template.fill = am4core.color("#fff");

var valueAxis = chartdivBoiler.yAxes.push(new am4charts.ValueAxis());
valueAxis.renderer.labels.template.fill = am4core.color("#fff");
valueAxis.renderer.grid.template.stroke = am4core.color("#A0CA92");
valueAxis.renderer.grid.template.strokeOpacity = 0;
valueAxis.min = -10;
valueAxis.max = 110;
valueAxis.strictMinMax = true;
valueAxis.renderer.baseGrid.disabled = true; 

// Create series
var series1 = chartdivBoiler.series.push(new am4charts.ConeSeries());
series1.dataFields.valueY = "value1";
series1.dataFields.categoryX = "category";
series1.columns.template.width = am4core.percent(80);
series1.columns.template.fillOpacity = 0.9;
series1.columns.template.strokeOpacity = 1;
series1.columns.template.strokeWidth = 2;
series1.name = "Boiler load"; 

var series2 = chartdivBoiler.series.push(new am4charts.ConeSeries());
series2.dataFields.valueY = "value2";
series2.dataFields.categoryX = "category";
series2.stacked = true;
series2.columns.template.width = am4core.percent(80);
series2.columns.template.fill = am4core.color("#EEFF88");
series2.columns.template.fillOpacity = 0.1;
series2.columns.template.stroke = am4core.color("#EEFF88");
series2.columns.template.strokeOpacity = 0.2;
series2.columns.template.strokeWidth = 2;
series2.name = "Fuel consumption";  

// Add a legend
chartdivBoiler.legend = new am4charts.Legend();
chartdivBoiler.legend.position = "top";
chartdivBoiler.legend.labels.template.text = "[bold {color}]{name}[/]";

 




// -----------------------------






var chartEcho = am4core.create("chartEcho", am4charts.XYChart);

chartEcho.data = [{
  "year": "1994",
  "cars": 1587,
  "motorcycles": 650,
  "bicycles": 121
}, {
  "year": "1995",
  "cars": 1567,
  "motorcycles": 683,
  "bicycles": 146
}, {
  "year": "1996",
  "cars": 1617,
  "motorcycles": 691,
  "bicycles": 138
}, {
  "year": "1997",
  "cars": 1630,
  "motorcycles": 642,
  "bicycles": 127
}, {
  "year": "1998",
  "cars": 1660,
  "motorcycles": 699,
  "bicycles": 105
}, {
  "year": "1999",
  "cars": 1683,
  "motorcycles": 721,
  "bicycles": 109
}, {
  "year": "2000",
  "cars": 1691,
  "motorcycles": 737,
  "bicycles": 112
}, {
  "year": "2001",
  "cars": 1298,
  "motorcycles": 680,
  "bicycles": 101
}, {
  "year": "2002",
  "cars": 1275,
  "motorcycles": 664,
  "bicycles": 97
}, {
  "year": "2003",
  "cars": 1246,
  "motorcycles": 648,
  "bicycles": 93
}, {
  "year": "2004",
  "cars": 1318,
  "motorcycles": 697,
  "bicycles": 111
}, {
  "year": "2005",
  "cars": 1213,
  "motorcycles": 633,
  "bicycles": 87
}, {
  "year": "2006",
  "cars": 1199,
  "motorcycles": 621,
  "bicycles": 79
}, {
  "year": "2007",
  "cars": 1110,
  "motorcycles": 210,
  "bicycles": 81
}, {
  "year": "2008",
  "cars": 1165,
  "motorcycles": 232,
  "bicycles": 75
}, {
  "year": "2009",
  "cars": 1145,
  "motorcycles": 219,
  "bicycles": 88
}, {
  "year": "2010",
  "cars": 1163,
  "motorcycles": 201,
  "bicycles": 82
}, {
  "year": "2011",
  "cars": 1180,
  "motorcycles": 285,
  "bicycles": 87
}, {
  "year": "2012",
  "cars": 1159,
  "motorcycles": 277,
  "bicycles": 71
}];

chartEcho.dateFormatter.inputDateFormat = "yyyy";
var dateAxis = chartEcho.xAxes.push(new am4charts.DateAxis());
dateAxis.renderer.minGridDistance = 60;
dateAxis.startLocation = 0.5;
dateAxis.endLocation = 0.5;
dateAxis.baseInterval = {
  timeUnit: "year",
  count: 1
}
dateAxis.renderer.labels.template.fill = am4core.color("#fff");

var valueAxis = chartEcho.yAxes.push(new am4charts.ValueAxis());
valueAxis.tooltip.disabled = true;
valueAxis.renderer.labels.template.fill = am4core.color("#fff"); 
valueAxis.renderer.grid.template.strokeOpacity = 1; 
valueAxis.renderer.grid.template.stroke = am4core.color("#A0CA92");

var series = chartEcho.series.push(new am4charts.LineSeries());
series.dataFields.dateX = "year"; 
series.dataFields.valueY = "cars";
series.tooltipHTML = "";
series.tooltipText = "[#000]{valueY.value}[/]";
series.tooltip.background.fill = am4core.color("#FFF");
series.tooltip.getStrokeFromObject = true;
series.tooltip.background.strokeWidth = 3;
series.tooltip.getFillFromObject = false;
series.fillOpacity = 0.6;
series.strokeWidth = 2;
series.stacked = true;
series.name = "84.6 m"; 

var series2 = chartEcho.series.push(new am4charts.LineSeries()); 
series2.dataFields.dateX = "year";
series2.dataFields.valueY = "motorcycles";
series2.tooltipHTML = "";
series2.tooltipText = "[#000]{valueY.value}[/]";
series2.tooltip.background.fill = am4core.color("#FFF");
series2.tooltip.getFillFromObject = false;
series2.tooltip.getStrokeFromObject = true;
series2.tooltip.background.strokeWidth = 3;
series2.sequencedInterpolation = true;
series2.fillOpacity = 0.6;
series2.stacked = true;
series2.strokeWidth = 2;

var series3 = chartEcho.series.push(new am4charts.LineSeries()); 
series3.dataFields.dateX = "year";
series3.dataFields.valueY = "bicycles";
series3.tooltipHTML = "";
series3.tooltipText = "[#000]{valueY.value}[/]";
series3.tooltip.background.fill = am4core.color("#FFF");
series3.tooltip.getFillFromObject = false;
series3.tooltip.getStrokeFromObject = true;
series3.tooltip.background.strokeWidth = 3;
series3.sequencedInterpolation = true;
series3.fillOpacity = 0.6;
series3.defaultState.transitionDuration = 1000;
series3.stacked = true;
series3.strokeWidth = 2;

chartEcho.cursor = new am4charts.XYCursor();
chartEcho.cursor.xAxis = dateAxis;
// chartEcho.scrollbarX = new am4core.Scrollbar();
 

// Add a legend
chartEcho.legend = new am4charts.Legend();
chartEcho.legend.position = "top";
chartEcho.legend.labels.template.text = "[bold {color}]{name}[/]";

 





// -----------------------------







// Create chart instance
var chartdiv8 = am4core.create("chartdiv8", am4charts.XYChart);

// Enable chart cursor
chartdiv8.cursor = new am4charts.XYCursor();
chartdiv8.cursor.lineX.disabled = true;
chartdiv8.cursor.lineY.disabled = true;

// Enable scrollbar
// chartdiv8.scrollbarX = new am4core.Scrollbar();

// Add data
chartdiv8.data = [{
      "date": "2012-01-01",
      "value": 8
  }, {
      "date": "2012-01-02",
      "value": 10
  }, {
      "date": "2012-01-03",
      "value": 12
  }, {
      "date": "2012-01-04",
      "value": 14
  }, {
      "date": "2012-01-05",
      "value": 11
  }, {
      "date": "2012-01-06",
      "value": 6
  }, {
      "date": "2012-01-07",
      "value": 7
  }, {
      "date": "2012-01-08",
      "value": 9
  }, {
      "date": "2012-01-09",
      "value": 13
  }, {
      "date": "2012-01-10",
      "value": 15
  }, {
      "date": "2012-01-11",
      "value": 19
  }, {
      "date": "2012-01-12",
      "value": 21
  }, {
      "date": "2012-01-13",
      "value": 22
  }, {
      "date": "2012-01-14",
      "value": 20
  }, {
      "date": "2012-01-15",
      "value": 18
  }, {
      "date": "2012-01-16",
      "value": 14
  }, {
      "date": "2012-01-17",
      "value": 16,
      "opacity": 0
  }, {
      "date": "2012-01-18",
      "value": 18
  }, {
      "date": "2012-01-19",
      "value": 17
  }, {
      "date": "2012-01-20",
      "value": 15
  }, {
      "date": "2012-01-21",
      "value": 12
  }, {
      "date": "2012-01-22",
      "value": 10
  }, {
      "date": "2012-01-23",
      "value": 8
  }];

// Create axes
var dateAxis = chartdiv8.xAxes.push(new am4charts.DateAxis());
dateAxis.renderer.grid.template.location = 0.5;
dateAxis.dateFormatter.inputDateFormat = "yyyy-MM-dd";
dateAxis.renderer.minGridDistance = 40;
dateAxis.tooltipDateFormat = "MMM dd, yyyy";
dateAxis.dateFormats.setKey("day", "dd");
dateAxis.renderer.labels.template.fill = am4core.color("#fff");

var valueAxis = chartdiv8.yAxes.push(new am4charts.ValueAxis());
valueAxis.renderer.labels.template.fill = am4core.color("#fff");
valueAxis.renderer.grid.template.stroke = am4core.color("#A0CA92");
valueAxis.renderer.grid.template.strokeOpacity = 1;  

// Create series
var series = chartdiv8.series.push(new am4charts.LineSeries());
series.tooltipText = "{date}\n[bold font-size: 17px]value: {valueY}[/]";
series.dataFields.valueY = "value";
series.dataFields.dateX = "date";
series.strokeDasharray = 3;
series.strokeWidth = 2
series.strokeOpacity = 0.3;
series.strokeDasharray = "3,3"

var bullet = series.bullets.push(new am4charts.CircleBullet());
bullet.strokeWidth = 2;
bullet.stroke = am4core.color("#fff");
bullet.setStateOnChildren = true;
bullet.propertyFields.fillOpacity = "opacity";
bullet.propertyFields.strokeOpacity = "opacity"; 

var hoverState = bullet.states.create("hover");
hoverState.properties.scale = 1.7;

function createTrendLine(data) {
  var trend = chartdiv8.series.push(new am4charts.LineSeries());
  trend.dataFields.valueY = "value";
  trend.dataFields.dateX = "date";
  trend.strokeWidth = 2
  trend.stroke = trend.fill = am4core.color("#EEFF88");
  trend.data = data;
  trend.name = "Peak"; 

  var bullet = trend.bullets.push(new am4charts.CircleBullet());
  bullet.tooltipText = "{date}\n[bold font-size: 17px]value: {valueY}[/]";
  bullet.strokeWidth = 2;
  bullet.stroke = am4core.color("#fff")
  bullet.circle.fill = trend.stroke;
  bullet.name = "Peak"; 

  var hoverState = bullet.states.create("hover");
  hoverState.properties.scale = 1.7;

  return trend;
};

createTrendLine([
  { "date": "2012-01-02", "value": 10 },
  { "date": "2012-01-11", "value": 19 }
]);

var lastTrend = createTrendLine([
  { "date": "2012-01-17", "value": 16 },
  { "date": "2012-01-22", "value": 10 }
]);

  
// Add a legend
chartdiv8.legend = new am4charts.Legend();
chartdiv8.legend.position = "top";
chartdiv8.legend.labels.template.text = "[bold {color}]{name}[/]";

 





// -----------------------------








// Create chart instance
var chart10 = am4core.create("chartdiv10", am4charts.XYChart);

// Create daily series and related axes
var dateAxis1 = chart10.xAxes.push(new am4charts.DateAxis());
dateAxis1.renderer.grid.template.location = 0;
dateAxis1.renderer.minGridDistance = 40;
dateAxis1.renderer.labels.template.fill = am4core.color("#fff");

var valueAxis1 = chart10.yAxes.push(new am4charts.ValueAxis());
valueAxis1.renderer.labels.template.fill = am4core.color("#fff");
valueAxis1.renderer.grid.template.stroke = am4core.color("#A0CA92");
valueAxis1.renderer.grid.template.strokeOpacity = 1; 

var series1 = chart10.series.push(new am4charts.ColumnSeries());
series1.dataFields.valueY = "value";
series1.dataFields.dateX = "date";
series1.data = generateDailyData();
series1.xAxis = dateAxis1;
series1.yAxis = valueAxis1;
series1.tooltipText = "{dateX}: [bold]{valueY}[/]"; 
series1.stroke = am4core.color("#fff");  
series1.name = "Daily fuel consumption"; 

// Create hourly series and related axes
var dateAxis2 = chart10.xAxes.push(new am4charts.DateAxis());
dateAxis2.renderer.grid.template.location = 0;
dateAxis2.renderer.minGridDistance = 100;
dateAxis2.renderer.labels.template.disabled = true;
dateAxis2.renderer.grid.template.disabled = true;
dateAxis2.renderer.tooltip.disabled = true;
dateAxis2.renderer.labels.template.fill = am4core.color("#fff");
dateAxis2.stroke = am4core.color("#EEFF88");  

var valueAxis2 = chart10.yAxes.push(new am4charts.ValueAxis());
valueAxis2.renderer.opposite = true;
valueAxis2.renderer.grid.template.disabled = true; 
valueAxis2.renderer.tooltip.disabled = true; 
valueAxis2.renderer.grid.template.stroke = am4core.color("#A0CA92");
valueAxis2.renderer.labels.template.fill = am4core.color("#fff");


var series2 = chart10.series.push(new am4charts.LineSeries());
series2.dataFields.valueY = "value";
series2.dataFields.dateX = "date";
series2.data = generateHourlyData();
series2.xAxis = dateAxis2;
series2.yAxis = valueAxis2;
series2.strokeWidth = 3;
series2.tooltipText = "{dateX.formatDate('yyyy-MM-dd hh:00')}: [bold]{valueY}[/]"; 
series2.stroke = am4core.color("#EEFF88");   
series2.name = "Speed"; 
series2.columns.template.stroke = am4core.color("#EEFF88"); // red outline
series2.columns.template.fill = am4core.color("#EEFF88"); // green fill

// Add cursor
chart10.cursor = new am4charts.XYCursor();

function generateDailyData() {
    var firstDate = new Date();
    firstDate.setDate(firstDate.getDate() - 10);
    firstDate.setHours(0, 0, 0, 0);
    var data = [];
    for(var i = 0; i < 10; i++) {
      var newDate = new Date(firstDate);
      newDate.setDate(newDate.getDate() + i);
      data.push({
        date: newDate,
        value: Math.round(Math.random() * 12) + 1
      });
    }
  return data;
}

function generateHourlyData() {
    var firstDate = new Date();
    firstDate.setDate(firstDate.getDate() - 10);
    var data = [];
    for(var i = 0; i < 10 * 24; i++) {
        var newDate = new Date(firstDate);
      newDate.setHours(newDate.getHours() + i);

        if (i == 0) {
            var value = Math.round(Math.random() * 10) + 1;
        } else {
            var value = Math.round(data[data.length - 1].value / 100 * (90 + Math.round(Math.random() * 20)) * 100) / 100;
        }
      data.push({
        date: newDate,
        value: value
      });
    }
  return data;
}

// Add a legend
chart10.legend = new am4charts.Legend();
chart10.legend.position = "top";
chart10.legend.labels.template.text = "[bold {color}]{name}[/]";

 


}); // end am4core.ready()