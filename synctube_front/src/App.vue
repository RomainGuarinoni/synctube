<template>
  <div id="app">
    <div class="logo">
      <p>SYNCTUBE</p>
    </div>
    <div class="form">
      <input type="text" id="url" v-model="url" placeholder="URL vidéo" />
      <button @click="loadURL()">Load</button>
    </div>
    <div class="player">
      <youtube
        ref="youtube"
        @playing="playing"
        @paused="pause"
        @ready="ready"
      ></youtube>
    </div>
  </div>
</template>

<script>
import { getIdFromUrl } from "vue-youtube";
// eslint-disable-next-line no-unused-vars
export default {
  name: "App",
  data() {
    return {
      time: 0,
      url: "",
    };
  },
  computed: {
    player() {
      return this.$refs.youtube.player;
    },
  },
  methods: {
    ready() {
      console.log("la vidéo est prête");
    },
    getTime() {
      this.$refs.youtube.player.getCurrentTime().then((time) => {
        console.log("time : " + time);
        this.time = time;
      });
    },
    playing() {
      this.getTime();
    },
    pause() {
      console.log("pause");
    },
    loadURL() {
      console.log("option" + this.option);
      this.$refs.youtube.player.loadVideoById(getIdFromUrl(this.url));
    },
    seekTo() {
      this.$refs.youtube.player.seekTo(194);
    },
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
  justify-content: center;
  align-items: center;
  z-index: 2;
}
.form {
  z-index: 1;
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
.form button {
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
.form button:hover {
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
</style>