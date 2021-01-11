<template>
  <div class="box">
    <div id="left"></div>
    <div class="right">
      <h3>{{ titre }}</h3>
      <button class="load" @click="loadHistory">Load</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id", "titre", "img", "index"],
  methods: {
    loadHistory() {
      this.$emit("loadHistory", {
        id: this.id,
        titre: this.titre,
      });
    },
  },
  mounted: function() {
    console.log(this.index + " : " + this.img);
    document.getElementById("left").style.backgroundImage =
      "url(" + this.img + ")";
  },
};
</script>

<style scoped>
#left {
  width: 120px;
  height: 90px;
}
.right {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: relative;
}
.right h3 {
  font-weight: 100;
}
.box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: none;
  padding: 10px;
  box-shadow: 0px 0px 10px rgba(221, 221, 221, 0.726);
}
.load {
  outline: none;
  background: #ff0000;
  color: white;
  font-size: 13px;
  border: none;
  align-self: flex-end;
  margin-right: 10px;
  padding: 5px 15px;
  border-radius: 5px;
  transition: all ease 200ms;
  cursor: pointer;
}
.load:hover {
  box-shadow: 0 5px 5px rgba(43, 43, 43, 0.493);
}
</style>
