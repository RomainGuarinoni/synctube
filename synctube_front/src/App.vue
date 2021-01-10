<template>
  <div id="app">
    <div class="logo">
      <p>SYNCTUBE</p>
    </div>
    <div class="form">
      <form v-on:submit.prevent>
        <input type="text" id="url" v-model="url" placeholder="URL vidéo" />
        <input id="button" type="submit" @click="loadURL(url)" value="Load" />
      </form>
    </div>
    <div class="player">
      <h1>{{ title }}</h1>
      <youtube
        ref="youtube"
        @playing="playing"
        @paused="pause"
        @error="error"
        @ready="ready"
        width="900px"
        height="450px"
      ></youtube>
      <div class="barBox">
        <p>Fast forward :</p>
        <input
          type="range"
          id="bar"
          min="0"
          :max="videoTime"
          v-model="forward"
          @change="seek"
        />
        <p>{{ forwardTime }}</p>
      </div>
    </div>
  </div>
  <!-- la thumbnail eest de 120 px par 90 px-->
</template>

<script>
import { getIdFromUrl } from "vue-youtube";
import axios from "axios";
import io from "socket.io-client";
// eslint-disable-next-line no-unused-vars
export default {
  name: "App",
  data() {
    return {
      time: 0,
      url: "",
      thumbnail: "",
      forward: 0,
      videoTime: 0,
      title: "",
      slave: false, // savoir qui prends le controle du boutons play/pause
      socket: io(),
    };
  },
  computed: {
    player() {
      return this.$refs.youtube.player;
    },
    forwardTime() {
      let min = Math.floor(this.forward / 60);
      let sec = this.forward % 60;
      let result = min + " min " + sec + " sec";
      return result;
    },
  },
  methods: {
    getTime() {
      this.$refs.youtube.player.getCurrentTime().then((time) => {
        this.time = time;
      });
    },
    playing() {
      console.log("playing right now");
      this.$refs.youtube.player.getDuration().then((res) => {
        this.videoTime = res;
      });
      if (!this.slave) {
        this.socket.emit("PLAYING", {});
      }
      this.slave = false;
    },
    pause() {
      this.getTime();
      console.log("time pause : " + this.time);
      this.socket.emit("PAUSE", {});
    },
    loadURL(id) {
      this.socket.emit("LOAD", {
        id: id,
      });
      axios
        .get(
          "https://www.googleapis.com/youtube/v3/videos?id=" +
            getIdFromUrl(id) +
            "&key=AIzaSyBlLC4WxoLFqESw9Xwf0zr8OY3-EYA5Dvk&part=snippet,contentDetails,statistics,status"
        )
        .then((res) => {
          this.title = res.data.items[0].snippet.title;
          console.log(id);
          this.socket.emit("HISTORY", {
            id: id,
            titre: res.data.items[0].snippet.title,
            img: res.data.items[0].snippet.thumbnails.default.url,
          });
        });
      this.$refs.youtube.player.cueVideoById(getIdFromUrl(id));
    },
    seek() {
      this.socket.emit("SEEK", {
        time: this.forward,
      });
      this.$refs.youtube.player.seekTo(this.forward);
    },
    error() {
      console.log("there is an error");
    },
    ready() {
      console.log("ready");
    },
  },
  mounted: function() {
    axios.get("/").then((data) => {
      console.log(data);
    });
    this.socket.on("LOAD_URL", (data) => {
      axios
        .get(
          "https://www.googleapis.com/youtube/v3/videos?id=" +
            getIdFromUrl(data.id) +
            "&key=AIzaSyBlLC4WxoLFqESw9Xwf0zr8OY3-EYA5Dvk&part=snippet,contentDetails,statistics,status"
        )
        .then((res) => {
          this.title = res.data.items[0].snippet.title;
        });
      this.$refs.youtube.player.cueVideoById(getIdFromUrl(data.id));
    });
    // eslint-disable-next-line no-unused-vars
    this.socket.on("PLAY", () => {
      console.log("need to play");
      this.slave = true;
      this.$refs.youtube.player.playVideo();
      console.log("should play now");
    });
    this.socket.on("PAUSE", () => {
      this.$refs.youtube.player.pauseVideo();
    });
    this.socket.on("SEEK", (data) => {
      console.log("seek to" + data.time);
      this.slave = true;
      this.$refs.youtube.player.seekTo(Number(data.time));
    });
  },
};
</script>

<style>
#app {
  margin: 0;
  padding: 0;
  font-family: "Oswald", sans-serif;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.player {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
}
.form {
  z-index: 2;
  width: 400px;
  padding: 60px 0;
  display: flex;
  justify-content: space-around;
  width: 700px;
  position: relative;
}
.form input {
  width: 500px;
  border: none;
  border-bottom: 1px solid rgb(46, 46, 46);
  height: 30px;
  text-align: center;
  outline: none;
}
#button {
  outline: none;
  background: #ff0000;
  color: white;
  font-size: 18px;
  position: absolute;
  right: 0px;
  border: none;
  width: 80px;
  height: 35px;
  border-radius: 5px;
  transition: all ease 200ms;
  cursor: pointer;
}
#button:hover {
  box-shadow: 0 5px 5px rgba(43, 43, 43, 0.493);
}
.logo {
  position: absolute;
  top: 40px;
  left: 50px;
  padding: 2px 20px;
  border-radius: 10px;
  border: none;
  color: white;
  background: #ff0000;
  font-size: 30px;
}
.logo p {
  margin: 0;
  padding: 0;
}
#bar {
  width: 800px;
  color: red;
}
.barBox {
  display: flex;
}
</style>
