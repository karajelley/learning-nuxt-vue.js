<template>
  <v-container>
    <!-- Address Input & Search Button -->
    <v-row align="center" justify="center">
      <v-col cols="12" md="8">
        <v-text-field
          v-model="address"
          label="Enter an address"
          @keyup.enter="geocodeAddress"
          outlined
          dense
          append-inner-icon="mdi-magnify"
          @click:append-inner="geocodeAddress"
        />
      </v-col>
      <v-col cols="12" md="4">
        <v-btn color='primary' variant='elevated' block @click="geocodeAddress">
          <v-icon left>mdi-map-search</v-icon>
          Search
        </v-btn>
      </v-col>
    </v-row>

    <!-- Map Container -->
    <v-card elevation="4">
      <v-container fluid>
        <LMap
          style="height: 350px"
          :zoom="zoom"
          :center="center"
          :use-global-leaflet="false"
          @ready="onMapReady"
          @locationfound="onLocationFound"
          @click="onMapClick"
        >
          <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors"
            layer-type="base"
            name="OpenStreetMap"
          />
          <LMarker v-if="markerPosition" :lat-lng="markerPosition" />
        </LMap>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import { ref } from 'vue';
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  setup() {
    const address = ref('');
    const zoom = ref(6);
    const center = ref([47.21322, -1.559482]);
    const markerPosition = ref(null);
    const mapRef = ref(null);

    const onMapReady = () => {
      const map = mapRef.value.mapObject;
      if (map) {
        map.locate();
      }
    };

    const onLocationFound = (e) => {
      center.value = [e.latlng.lat, e.latlng.lng];
      markerPosition.value = e.latlng;
    };

    const geocodeAddress = async () => {
      if (!address.value) return;

      const encodedAddress = encodeURIComponent(address.value);
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.length > 0) {
          const { lat, lon } = data[0];
          center.value = [parseFloat(lat), parseFloat(lon)];
          markerPosition.value = { lat: parseFloat(lat), lng: parseFloat(lon) };
        } else {
          alert('Address not found');
        }
      } catch (error) {
        console.error('Error geocoding address:', error);
      }
    };

    const onMapClick = async (e) => {
      const { lat, lng } = e.latlng;
      const address = await getAddressFromCoordinates(lat, lng);
      if (address) {
        markerPosition.value = { lat, lng };
        openPopup(lat, lng, address);
      }
    };

    const getAddressFromCoordinates = async (lat, lng) => {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data && data.address) {
          return `${data.address.road || ''}, ${data.address.city || ''}, ${data.address.country || ''}`;
        }
      } catch (error) {
        console.error('Error fetching address:', error);
      }
      return null;
    };

    const openPopup = (lat, lng, address) => {
      const map = mapRef.value.mapObject;
      const popupContent = `
        <div style="width: 200px; padding: 10px; border: 1px solid #ccc; background-color: #fff;">
          <h4>Address</h4>
          <p>${address}</p>
        </div>
      `;
      const popup = L.popup().setLatLng([lat, lng]).setContent(popupContent).openOn(map);
    };

    return {
      address,
      zoom,
      center,
      markerPosition,
      mapRef,
      onMapReady,
      onLocationFound,
      geocodeAddress,
      onMapClick,
    };
  },
};
</script>
