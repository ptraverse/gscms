function retrieveSheetData(sheetUrl, queryString) {
  var queryString = encodeURIComponent(queryString);

  var query = new google.visualization.Query(
      sheetUrl + queryString);
  query.send(handleSampleDataQueryResponse);
}

function handleSampleDataQueryResponse(response) {
  if (response.isError()) {
    alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    return;
  }

  var data = response.getDataTable();
  var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
  chart.draw(data, { height: 400 });
}