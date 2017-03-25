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

  var options = {
         title: 'Bitcoin News Frequency',
         curveType: 'function',
         legend: { position: 'bottom' }
       };



  var data = response.getDataTable();
  var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}
