mapboxgl.accessToken = 'pk.eyJ1Ijoic2hhZG93bSIsImEiOiJjamJjdXIzcGgxdWQ0MnJwZTFsYXIzbjNjIn0.OQm9we8GDRMDJ-dii6OhZg';

var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/light-v9",
    center: [-73.985130, 40.758896],
    zoom: 11
});

$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: 'sample_merged_1.csv',
        dataType: "text",
        success: function(csvData) {makeGeoJSON(csvData);}
     });
});

function makeGeoJSON(csvData) {
      csv2geojson.csv2geojson(csvData, {
        latfield: 'pickup_lat',
        lonfield: 'pickup_long',
        delimiter: ','
      },
        function(err, data) {
            map.on('load', function () {
                map.addLayer({
                    'id': 'PickUp',
                    'type': 'circle',
                    'source': {
                        'type': 'geojson',
                        'data': data
                    },
                    'layout': {
                        'visibility': 'visible'
                    },
                    'paint': {
                      'circle-color': '#009E1F', // rojo
                      "circle-radius": 1.5
                    }
                });
            });
        }
      );

      csv2geojson.csv2geojson(csvData, {
            latfield: 'dropoff_lat',
            lonfield: 'dropoff_long',
            delimiter: ','
        },
          function(err, data) {
              map.on('load', function () {
                  map.addLayer({
                      'id': 'DropOff',
                      'type': 'circle',
                      'source':
                        {
                          'type': 'geojson',
                          'data': data
                        },
                      'layout':
                        {
                          'visibility': 'visible'
                        },
                      'paint':
                        {
                        'circle-color': '#B42222', // verde
                        "circle-radius": 1.5
                        }
                  }
                );
              }
            )
          }
      );

      var toggleableLayerIds = ['PickUp','DropOff'];
      for (var i = 0; i < toggleableLayerIds.length; i++)
        {
            var id = toggleableLayerIds[i];
            var link = document.createElement('a');
            link.href = '#';
            link.className = 'active';
            link.textContent = id;
            var clickedLayer = this.textContent;
            link.onclick = function (e) {
              var clickedLayer = this.textContent;
              var visibility = map.getLayoutProperty(clickedLayer, 'visibility');
                if (visibility === 'visible')
                  {
                    map.setLayoutProperty(clickedLayer, 'visibility', 'none');
                  }
                else
                  {
                    map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
                  }
            };
            var layers = document.getElementById('menu');
            layers.appendChild(link);
        }
}
