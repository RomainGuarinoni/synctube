<template>
  <div id="root" @click="handleClick">
    <div
      class="slider"
      v-bind:class="{
        sliderActivated: on,
        darkBoxShadow: darkModeStatus,
      }"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    darkModeStatus: {
      type: Boolean,
    },
  },
  methods: {
    handleClick() {
      this.on = !this.on;
      const parent = document.getElementById("root");
      this.on
        ? (parent.style.background = "#ff0000")
        : (parent.style.background = "white");
      this.$emit("DARKMODE", { mode: this.on });
    },
  },
  mounted: function() {
    console.log(this.darkModeStatus);
    if (this.darkModeStatus) {
      this.on = true;
      document.getElementById("slideInput").checked = true;
      const parent = document.getElementById("root");
      parent.style.background = "#ff0000";
    }
  },
};
</script>

<style scoped>
#root {
  border: none;
  border: 2px solid red;
  border-radius: 30px;
  width: 55px;
  height: 25px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  z-index: 2;
  transition: all ease 200ms;
  cursor: pointer;
}
.slider {
  background: #ff0000;
  width: 20px;
  height: 20px;
  transition: all ease 200ms;
  border-radius: 50%;
  margin: 0 5px;
}
.sliderActivated {
  background: white !important;
  transform: translate(25px);
}
</style>
