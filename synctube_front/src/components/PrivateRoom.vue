<template>
  <div class="root">
    <h2>Private room</h2>
    <div class="container">
      <div
        class="item"
        v-bind:class="{
          light: !darkModeStatus,
          dark: darkModeStatus,
        }"
        @click="createNewRoom()"
      >
        <h3>Create a room</h3>
        <font-awesome-icon class="icon" icon="plus-circle" />
      </div>
      <div
        class="item"
        v-bind:class="{
          light: !darkModeStatus,
          dark: darkModeStatus,
        }"
        @click="inputOpen = !inputOpen"
      >
        <h3>Join a room</h3>
        <font-awesome-icon class="icon" icon="sign-in-alt" />
      </div>
    </div>
    <div
      :class="{
        hide: !inputOpen,
      }"
      class="input"
    >
      <form @submit.prevent="joinARoom()">
        <input
          type="text"
          :class="{ darkInput: darkModeStatus }"
          placeholder="ID of the room"
        />
        <button type="submit">Join</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    darkModeStatus: Boolean,
  },
  data() {
    return {
      inputOpen: false,
    };
  },
  methods: {
    generateRandomID() {
      return Math.random()
        .toString(36)
        .substr(2, 9);
    },
    createNewRoom() {
      console.log(this.generateRandomID());
    },
    joinARoom() {
      console.log("room joined");
    },
  },
};
</script>

<style scoped>
.root {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  max-width: 480px;
}
.container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100%;
}
.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 10px;
  min-width: 120px;
  min-height: 120px;
  transition: all ease 200ms;
}
.item:hover {
  transform: scale(1.05);
}
.light {
  box-shadow: 0 0 10px rgba(185, 185, 185, 0.521);
}
.dark {
  box-shadow: 0 0 10px rgba(49, 49, 49, 0.493);
}
.icon {
  font-size: 30px;
}
.input {
  margin: 20px 0;
  width: 80%;
  transition: all ease 200ms;
  opacity: 1;
}
.hide {
  opacity: 0;
}
.input form {
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 50px;
  align-items: center;
}
.input form input {
  border-radius: 10px;
  height: 20px;
  padding: 10px 5px;
  margin: 0 10px;
  outline: none;
  box-shadow: 0 0 10px rgba(185, 185, 185, 0.521);
  border: none;
  flex: 1;
}
.darkInput {
  background: transparent !important;
  color: white !important;
}
form button {
  outline: none;
  background: #ff0000;
  color: white;
  font-size: 13px;
  border: none;
  padding: 5px 15px;
  border-radius: 5px;
  transition: all ease 200ms;
  cursor: pointer;
}
form button:hover {
  box-shadow: 0 5px 5px rgba(43, 43, 43, 0.493);
}
</style>
