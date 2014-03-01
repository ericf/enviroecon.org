(function (window) {
    var map = L.mapbox.map('map', 'ericf.hbcooh59', {
        tileLayer: {
            detectRetina: true
        }
    });

    map.setView([42.364, -71.075], screen.width >= 480 ? 14 : 13);
    map.scrollWheelZoom.disable();
    map.zoomControl.setPosition('bottomleft');
}(this));
