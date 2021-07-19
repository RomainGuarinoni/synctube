<template>
  <div
    class="box"
    v-bind:class="{
      whiteBoxShadow: !darkModeStatus,
      darkBoxShadow: darkModeStatus,
    }"
  >
    <div id="left" :style="{ background: getImg(img) }"></div>
    <div class="right">
      <h3>{{ titre }}</h3>
      <div class="buttonHistory">
        <button
          class="load isStroke"
          v-bind:class="{
            darkDelete: darkModeStatus,
          }"
          @click="deleteHistory"
        >
          Delete
        </button>

        <button class="load" @click="loadHistory">Load</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id", "titre", "img", "index", "darkModeStatus", "_id"],
  methods: {
    loadHistory() {
      this.$emit("loadHistory", {
        id: this.id,
        titre: this.titre,
      });
    },
    deleteHistory() {
      this.$emit("deleteHistory", {
        _id: this._id,
      });
    },
    getImg(img) {
      let res = "url(" + img + ")";
      return res;
    },
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
.buttonHistory {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
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
}
.whiteBoxShadow {
  box-shadow: 0px 0px 10px rgba(221, 221, 221, 0.726);
}
.darkBoxShadow {
  box-shadow: 0px 0px 10px rgba(17, 17, 17, 0.726);
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
.isStroke {
  background: white;
  color: #ff0000;
  border: 2px solid #ff0000;
}
.darkDelete {
  background: transparent !important;
  color: white !important;
}
.load:hover {
  box-shadow: 0 5px 5px rgba(43, 43, 43, 0.493);
}
</style>
