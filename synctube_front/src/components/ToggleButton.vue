<template>
  <div
    id="root"
    @click="handleClick"
    v-bind:class="{
      dark: on,
      light: !on,
    }"
  >
    <div
      class="slider"
      v-bind:class="{
        sliderActivated: on,
        darkBoxShadow: !on,
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
  data() {
    return {
      on: this.darkModeStatus,
    };
  },
  methods: {
    handleClick() {
      this.on = !this.on;
      this.$emit("DARKMODE", { mode: this.on });
    },
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
.dark {
  background: #ff0000;
}
.light {
  background: white;
}
.sliderActivated {
  background: white !important;
  transform: translate(25px);
}
</style>
