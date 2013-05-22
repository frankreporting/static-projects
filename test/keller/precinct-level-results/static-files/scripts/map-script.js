var jqueryNoConflict = jQuery;
var map;

// begin main function
jqueryNoConflict(document).ready(function() {
    //google.maps.event.addDomListener(window, 'load', createMap);
    createMap();
});

// begin function
function createMap() {
    map = new google.maps.Map(document.getElementById('map_canvas'), {
        center: new google.maps.LatLng(34.01862413631862, -118.4208233779297),
        zoom: 11,
        scrollwheel: false,
        draggable: true,
        mapTypeControl: false,
        navigationControl: true,
        streetViewControl: false,
        panControl: false,
        scaleControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        navigationControlOptions: {
            style: google.maps.NavigationControlStyle.LARGE,
            position: google.maps.ControlPosition.LEFT_TOP}
    });

    var style = [
    {
      featureType: 'all',
      elementType: 'all',
      stylers: [
        { saturation: -99 },
        {"invert_lightness": true}
      ]
    },
    {
      featureType: 'road.local',
      elementType: 'all',
      stylers: [
        { visibility: 'off' }
      ]
    },
    {
      featureType: 'administrative.country',
      elementType: 'all',
      stylers: [
        { visibility: 'off' }
      ]
    },
    {
      featureType: 'administrative.province',
      elementType: 'all',
      stylers: [
        { visibility: 'off' }
      ]
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'all',
      stylers: [
        { visibility: 'off' }
      ]
    },
    {
      featureType: 'poi',
      elementType: 'all',
      stylers: [
        { visibility: 'off' }
      ]
    },
    {
      featureType: 'transit',
      elementType: 'all',
      stylers: [
        { visibility: 'off' }
      ]
    }
    ];
    var styledMapType = new google.maps.StyledMapType(style, {
        map: map,
        name: 'Styled Map'
    });

  map.mapTypes.set('map-style', styledMapType);
  map.setMapTypeId('map-style');

    google.maps.event.addDomListener(map, 'idle', function() {
      calculateCenter();
    });

    google.maps.event.addDomListener(window, 'resize', function() {
      map.setCenter(center);
    });

    jqueryNoConflict.get('static-files/data/la_city_general_election.kml', function(data) {

        var BLUES = ["#99D594", "#FC8D59"];

        var features = gmap.load_polygons({
            map: map,

            //required. all other params are optional
            data: data,

            data_type: "kml",

            getColor: function(data) {

                // runs in the scope of each feature. returns the color to set it to
                // has access to the data in this.fields
                var perc;

                if (data.winner === 'Eric Garcetti') {
                    perc = 0;
                } else {
                    perc = 1;
                }

                return BLUES[perc];
            },

            unselected_opts: {
                "fillOpacity": .7
            },
            highlighted_opts: {
                strokeWeight: 2.0,
                strokeColor: "#c2c2c2"
            },
            selected_opts: {
                strokeWeight: 2.0,
                strokeColor: "#ffffff"
            },

            highlightCallback: function(e) {
                console.log(this.fields);
                var totalVotes = this.fields.garcetti + this.fields.greuel;
                var styleGarcetti = this.fields.garcetti/totalVotes;
                var styleGreuel = this.fields.greuel/totalVotes;

                var percentOfVote = (this.fields.winner_percent*100).toFixed(0)

                jqueryNoConflict('#map_data').html(
                    '<p><strong>' + this.fields.winner + '</strong> won Los Angeles precinct ' + this.id +
                    '<br /> with ' + percentOfVote + '% of the vote</p>' +
                    '<ul class="chartlist">' +
                    '<li>' +
                    '<a href="#">Garcetti: ' + this.fields.garcetti + ' votes</a>' +
                    '<span class="index garcetti" style="width:' + styleGarcetti*100 + '%"></span>' +
                    '</li>' +
                    '<li>' +
                    '<a href="#">Greuel: ' + this.fields.greuel + ' votes</a>' +
                    '<span class="index greuel" style="width:' + styleGreuel*100 + '%"></span>' +
                    '</li>' +
                    '</ul>'
                );
            },

            selectCallback: function(e) {
                console.log(this.fields);
                var totalVotes = this.fields.city + this.fields.garcetti;
                var styleGarcetti = this.fields.city/totalVotes;
                var styleGreuel = this.fields.garcetti/totalVotes;
                jqueryNoConflict('#map_data').html(
                    '<p><strong>' + this.fields.greuel + '</strong> won Los Angeles precinct</p>' +
                    '<ul class="chartlist">' +
                    '<li>' +
                    '<a href="#">Garcetti: ' + this.fields.city + ' votes</a>' +
                    '<span class="index garcetti" style="width:' + styleGarcetti*100 + '%"></span>' +
                    '</li>' +
                    '<li>' +
                    '<a href="#">Greuel: ' + this.fields.garcetti + ' votes</a>' +
                    '<span class="index greuel" style="width:' + styleGreuel*100 + '%"></span>' +
                    '</li>' +
                    '</ul>'
                );
            }
        });
    });
}

// function to maintain center point of map
function calculateCenter(){
    center = map.getCenter();
};