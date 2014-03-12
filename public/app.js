(function (window) {
    var map = L.mapbox.map('map', app.mapbox.map, {
        tileLayer: {
            detectRetina: true
        }
    });

    map.setView([42.366, -71.075], screen.width >= 480 ? 14 : 13);
    map.scrollWheelZoom.disable();
    map.zoomControl.setPosition('bottomleft');
}(this));
