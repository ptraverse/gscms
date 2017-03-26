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
        title: 'Top 10 News Items of each day',
          hAxis: {title: 'Occurrences'},
          vAxis: {title: 'Date'},
        height: 400,
        bubble: {textStyle: {fontSize: 11}}
      };


  var data = response.getDataTable();
  var chart = new google.visualization.BubbleChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}
