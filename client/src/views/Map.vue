<template>
  <l-map :zoom="zoom" :center="center" id="map">
    <l-control>
      <div class="p-3 rounded bg-white">
        <div>
          {{this.users.length}} user(s) online
        </div>
        <div v-if="this.errorStr">
          Sorry, but the following error
          occurred: {{errorStr}}
        </div>

        <div v-if="this.gettingLocation">
          <i>Getting your location...</i>
        </div>
      </div>
    </l-control>

    <l-marker v-for="(user, index) in this.users" :key="index" :lat-lng="user.location">
      <l-tooltip :options="{ permanent: true }">{{user.name}}</l-tooltip>
    </l-marker>

    <l-tile-layer :url="url" />
  </l-map>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LControl, LTileLayer, LMarker, LTooltip } from "vue2-leaflet";

export default {
  name: "Map",
  data() {
    return {
      userName: localStorage.userName,
      users: [],
      currentLocation: null,
      errorStr: null,
      gettingLocation: null,
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      zoom: 6,
      center: latLng(38.982473, 35.434058)
    };
  },
  methods: {
    enterWebSocket() {
      this.$socket.emit("new_user", this.userName, this.currentLocation);
      this.watchLocation();
    },
    updateLocation() {
      this.$socket.emit('new_location', this.currentLocation);
    },
    getLocation() {
      if (!("geolocation" in navigator)) {
        this.errorStr = "Geolocation is not available.";
        return;
      }

      this.gettingLocation = true;
      // get position
      navigator.geolocation.getCurrentPosition(
        pos => {
          this.gettingLocation = false;
          this.currentLocation = latLng(
            pos.coords.latitude,
            pos.coords.longitude
          );
          this.enterWebSocket();
        },
        err => {
          this.gettingLocation = false;
          this.errorStr = err.message;
        }
      );
    },
    watchLocation() {
      // watch position
      navigator.geolocation.watchPosition(
        pos => {
          this.gettingLocation = false;
          this.currentLocation = latLng(
            pos.coords.latitude,
            pos.coords.longitude
          );
          this.updateLocation();
        },
        err => {
          this.gettingLocation = false;
          this.errorStr = err.message;
        }
      );
    }
  },
  components: {
    LMap,
    LControl,
    LTileLayer,
    LMarker,
    LTooltip
  },
  sockets: {
    users(data) {
      this.users = data;
      console.log(this.users);
    }
  },
  beforeCreate() {
    if (!localStorage.userName) {
      this.$router.push("/");
    }
  },
  created() {
    this.getLocation();
  }
};
</script>

<style>
#map {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
