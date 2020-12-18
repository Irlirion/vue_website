<template>
  <div class="container" id="container">
    <b-row class="justify-content-center">
      <div id="mapContainer"></div>
    </b-row>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default {
  name: "Map",

  methods: {
    setupLeafletMap: function () {
      const mapDiv = L.map("mapContainer").setView([55.7904, 49.1213], 12);
      const greenIcon = L.icon({
        iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
        shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',

        iconSize:     [38, 95], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
      })

      const redIcon = L.icon({
        iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-red.png',
        shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',

        iconSize:     [38, 95], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
      })

      const yellowIcon = L.icon({
        iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-orange.png',
        shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',

        iconSize:     [38, 95], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
      })

      L.tileLayer(
          'https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg',
          {
            "attribution": null,
            "detectRetina": true,
            "maxNativeZoom": 18,
            "maxZoom": 17,
            "minZoom": 0,
            "noWrap": false,
            "opacity": 1,
            "subdomains": "abc",
            "tms": false
          }).addTo(mapDiv);
      L.marker(
          [55.79216, 49.12217],
          {
            icon: greenIcon,
          }
      ).addTo(mapDiv).bindPopup("Второе высотное здание КФУ");

      L.marker(
          [55.79165, 49.11833],
          {
            icon: redIcon,
          }
      ).addTo(mapDiv).bindPopup("Первое высотное здание КФУ");

      L.marker(
          [55.79088, 49.12191],
          {
            icon: yellowIcon,
          }
      ).addTo(mapDiv).bindPopup("Главное здание КФУ");
    },
  },
  mounted() {
    this.setupLeafletMap();
  },
};
</script>

<style scoped>
#mapContainer {
  width: 100vw;
  height: 80vh;
}
</style>
