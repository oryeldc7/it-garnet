/* URL for AJAX Call */
/* See https://waterservices.usgs.gov/rest/IV-Service.html */
/* URL Generator: https://waterservices.usgs.gov/rest/IV-Test-Tool.html */

/*

PID's can be found at https://maps.waterdata.usgs.gov/mapper/

 	07055646 - Boxley
	07055660 - Ponca
	07055680 - Pruit
	07055780 - Carver 
	
	P7D means get the data for the last 7 days

	00065 - gauge height
*/
async function GetCarver() {
    var myURL =
      "https://waterservices.usgs.gov/nwis/iv/?format=json&indent=on&sites=07055780&period=P7D&parameterCd=00065&siteStatus=active";
    var msgObject = await fetch(myURL);
    var msgJSONText = await msgObject.text();
    var msg = JSON.parse(msgJSONText);
    document.getElementById("msg").innerHTML = msgJSONText;
  
    /* Site 1 */
    var dates = [];
    var values = [];
    /* fLen contains the length of the array (number of values) */
    fLen = msg.value.timeSeries[0].values[0].value.length;
    for (i = 0; i < fLen; i++) {
      values[i] = msg.value.timeSeries[0].values[0].value[i].value;
      dates[i] = msg.value.timeSeries[0].values[0].value[i].dateTime;
    }
    var sitename = msg.value.timeSeries[0].sourceInfo.siteName;
    var sitecode = msg.value.timeSeries[0].sourceInfo.siteCode[0].value;
    var siteDescription = msg.value.timeSeries[0].variable.variableDescription;
  
    /* Put your code here to display a graph of values and dates for Site 1*/
  
    var ctx = document.getElementById("chartjs-0");
  
    var myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: dates,
        datasets: [
          {
            label: "Water Level (feet)" + " on the " + sitename,
            data: values,
            fill: true,
            tension: 0.1,
            backgroundColor: "rgb(92, 159, 155, 0.3)",
            
          },
        ],
      },
      options: {
        responsive: false,
        maintainAspectRatio: true,
      },
    });   
  
  }
