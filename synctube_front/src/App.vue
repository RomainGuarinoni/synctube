<template>
  <div id="app">
    <header class="header">
      <div class="logoBox headerWidth">
        <div class="logo" @click="goBackToGeneral()">
          <p>SYNCTUBE</p>
        </div>
        <p class="connect">connected : {{ connected }}</p>
      </div>
      <div class="form">
        <form v-on:submit.prevent>
          <input type="text" id="url" v-model="url" placeholder="URL vidéo" />
          <input id="button" type="submit" @click="loadURL(url)" value="Load" />
        </form>
      </div>
      <div class="headerWidth">
        <span>Night mode</span
        ><ToggleButton @DARKMODE="darkMode" :darkModeStatus="darkModeStatus" />
      </div>
    </header>

    <div class="player">
      <h1>{{ title }}</h1>
      <div class="playerBox">
        <youtube
          ref="youtube"
          @playing="playing"
          @paused="pause"
          :resize="true"
          :fitParent="true"
        ></youtube>
      </div>
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
      <div class="sideComponent">
        <PrivateRoom :darkModeStatus="darkModeStatus" />
        <div class="history">
          <h2>History</h2>
          <div class="historyScroll">
            <History
              v-for="(item, index) in historyTab"
              :key="index"
              :id="item.id"
              :_id="item._id"
              :titre="item.titre"
              :img="item.img"
              :index="index"
              :darkModeStatus="darkModeStatus"
              @loadHistory="loadHistory"
              @deleteHistory="deleteHistory"
            />
          </div>
          <button @click="loadMore">Load more</button>
        </div>
      </div>
    </div>
  </div>
  <!-- la thumbnail eest de 120 px par 90 px-->
</template>

<script>
import { getIdFromUrl } from "vue-youtube";
import axios from "axios";
import io from "socket.io-client";
import History from "./components/History";
import ToggleButton from "./components/ToggleButton";
import PrivateRoom from "./components/PrivateRoom.vue";
// eslint-disable-next-line no-unused-vars
export default {
  name: "App",
  components: {
    History,
    ToggleButton,
    PrivateRoom,
  },
  data() {
    return {
      time: 0,
      url: "",
      thumbnail: "",
      forward: 0,
      videoTime: 0,
      connected: 0,
      historyTab: [],
      title: "",
      slave: false, // savoir qui prends le controle du boutons play/pause
      socket: io(),
      darkModeStatus: false,
      roomID: "general",
    };
  },
  watch: {
    $route(to) {
      // react to route changes...
      this.roomID = to.query.roomID;
      this.historyTab = [];
      axios.get(`info/${this.roomID}`).then((data) => {
        this.historyTab = data.data;
      });
    },
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
    darkMode(status) {
      const parent = document.getElementById("app");
      const url = document.getElementById("url");
      localStorage.setItem("darkMode", status.mode);
      if (status.mode) {
        this.darkModeStatus = true;
        parent.style.background = "#121212";
        parent.style.color = "white";
        url.style.background = "#121212";
        url.style.color = "white";
        url.style.borderBottom = "1px solid white !important";
      } else {
        this.darkModeStatus = false;
        parent.style.background = "white";
        parent.style.color = "black";
        url.style.background = "white";
        url.style.color = "black";
        url.style.borderBottom = "1px solid rgb(46, 46, 46)";
      }
    },
    getTime() {
      this.$refs.youtube.player.getCurrentTime().then((time) => {
        this.time = time;
      });
    },
    playing() {
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
          if (this.historyTab.length == 0 || id !== this.historyTab[0].id) {
            this.socket.emit("HISTORY", {
              id: id,
              titre: res.data.items[0].snippet.title,
              img: res.data.items[0].snippet.thumbnails.default.url,
              date: new Date(Date.now()),
              roomID: this.roomID,
            });
            axios.get(`info/${this.roomID}`).then((history) => {
              this.historyTab = history.data;
            });
          }
        });

      this.$refs.youtube.player.cueVideoById(getIdFromUrl(id));
    },
    seek() {
      this.socket.emit("SEEK", {
        time: this.forward,
      });
      this.$refs.youtube.player.seekTo(this.forward);
    },
    loadMore() {
      axios.get(`/moreinfo/${this.roomID}`).then((history) => {
        this.historyTab = history.data;
      });
    },
    loadHistory(payload) {
      this.title = payload.titre;
      this.$refs.youtube.player.cueVideoById(getIdFromUrl(payload.id));
      this.socket.emit("LOAD", {
        id: payload.id,
      });
    },
    deleteHistory({ _id }) {
      this.socket.emit("DELETE_HISTORY", {
        _id: _id,
        roomID: this.roomID,
      });
      const index = this.historyTab.findIndex((video) => video._id == _id);
      this.historyTab.splice(index, 1);
    },
    goBackToGeneral() {
      this.$router.push({
        path: "/",
        query: { roomID: "general" },
      });
    },
  },
  created: function() {
    localStorage.getItem("darkMode") == "true"
      ? (this.darkModeStatus = true)
      : null;
  },
  mounted: function() {
    //set the initial roomID based on URL query
    this.$route.query.roomID
      ? (this.roomID = this.$route.query.roomID)
      : "general";

    //set initial darkmode status
    localStorage.getItem("darkMode") == "true"
      ? this.darkMode({ mode: true })
      : null;

    //get the history depnding on the roomID
    axios.get(`info/${this.roomID}`).then((history) => {
      this.historyTab = history.data;
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
      this.slave = true;
      this.$refs.youtube.player.playVideo();
    });
    this.socket.on("PAUSE", () => {
      this.$refs.youtube.player.pauseVideo();
    });
    this.socket.on("NEW_HISTORY", (data) => {
      this.historyTab = data.history;
    });
    this.socket.on("SEEK", (data) => {
      this.slave = true;
      this.$refs.youtube.player.seekTo(Number(data.time));
    });
    this.socket.on("connexion", (data) => {
      this.connected = data.number;
    });
    this.socket.on("disconnected", (data) => {
      this.connected = data.number;
    });
  },
};
</script>

<style>
.sideComponent {
  position: absolute;
  z-index: -1;
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  justify-content: space-between;
}
.history {
  max-width: 480px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 800px;
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
.playerBox {
  width: 80%;
  max-width: 800px;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100%;
}

@media all and (max-width: 1875px) {
  .history {
    position: static;
  }
  .player {
    position: static;
    width: 80%;
    max-width: 1000px;
  }
}
@media all and (max-width: 1253px) {
  .logoBox {
    z-index: 1;
    width: 100% !important;
    left: 0 !important;
    justify-content: space-between;
  }
  .connect {
    margin-right: 10px;
  }
  .logo {
    margin-left: 10px;
  }
}
::-webkit-scrollbar {
  width: 20px;
}
.historyScroll {
  overflow-y: scroll;
}
.history h2 {
  align-self: center;
}
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

.form {
  padding: 60px 0;
  display: flex;
  justify-content: center;
  position: relative;
}
@media all and (max-width: 933px) {
  #url {
    width: 400px !important;
  }
  .logo {
    font-size: 24px !important;
  }
}
#url {
  width: 500px;
  border: none;
  border-bottom: 1px solid rgb(46, 46, 46);
  height: 30px;
  text-align: center;
  outline: none;
  margin: 0 20px;
  position: relative;
  z-index: 3;
}
#button {
  outline: none;
  background: #ff0000;
  color: white;
  font-size: 18px;
  position: absolute;
  z-index: 2;
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
.history button {
  outline: none;
  background: #ff0000;
  color: white;
  font-size: 18px;
  right: 0px;
  border: none;
  padding: 10px;
  border-radius: 5px;
  transition: all ease 200ms;
  cursor: pointer;
}
.history button:hover {
  box-shadow: 0 5px 5px rgba(43, 43, 43, 0.493);
}
.logoBox {
  display: flex;
  align-items: center;
}
.connect {
  margin-left: 40px;
  font-size: 20px;
}
.logo {
  padding: 2px 20px;
  border-radius: 10px;
  border: none;
  color: white;
  background: #ff0000;
  font-size: 30px;
  cursor: pointer !important;
  position: relative;
  z-index: 5;
}
.logo p {
  margin: 0;
  padding: 0;
}
#bar {
  width: 100%;
  color: red;
}
.barBox {
  max-width: 900px;
  width: 100%;
  display: flex;
}
.headerWidth {
  min-width: 400px;
}
.headerWidth:last-of-type {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.headerWidth:last-of-type span {
  margin: 0 10px;
  font-weight: bold;
}
</style>
