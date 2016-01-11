function retrieveSheetData(sheetUrl, queryString) {
  var queryUrl = sheetUrl + '/gviz/tq?&' + queryString;
  var query = new google.visualization.Query(queryUrl);
  query.send(handleSampleDataQueryResponse);
}

function handleSampleDataQueryResponse(response) {
  if (response.isError()) {
    alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    return;
  }

  var data = response.getDataTable();
  var options = {
	width: 700,
	height: 400,
	sankey: {
		link: { color: { fill: '#0099ff', fillOpacity: 0.8 } },
		node: { colors: [ '#FF00FF' ],
	        label: { color: '#003300' } 
	    },
	}
  };
  var chart = new google.visualization.Sankey(document.getElementById('chart_div'));
  chart.draw(data, options);
}