/* eslint-disable */

<template>
  <div class="hello">
    <h1 class="font-weight-bold mb-4">Welcome to the Game of One Letter</h1>
    <button type="button" class="btn-lg btn-dark mt-4" @click="picker">
      Generate letter
    </button>
    <p>{{ this.message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "R",
        "S",
        "T",
        "U",
        "V",
        "Z",
      ],
      message: "",
      connected: "",
      socket: null,
    };
  },
  methods: {
    picker: function() {
      var chosenNumber = Math.floor(Math.random() * this.list.length);
      this.socket.send(this.list[chosenNumber]);
    },

    connect() {
      this.socket = new WebSocket("ws://192.168.1.220:8080/socket");

      this.socket.self = this;

      this.socket.onopen = function(openEvent) {
        this.status = "connected";
        console.log("ws::open : connection established " + this.status);
      };

      this.socket.onerror = function(errorEvent) {
        console.log("WebSocket ERROR: " + JSON.stringify(errorEvent, null, 4));
      };

      this.socket.onmessage = messageEvent => {
        this.message = messageEvent.data;
      };
    },

    setMessage: function(message) {
      this.message = message;
    }
  },
  mounted() {
    this.connect();
  },
};
</script>

<style>
body {
  width: 100%;
  height: 100%;
  background-image: url("~@/assets/lettersbackground.svg");
  background-size: 50%;
  margin: 0px;
}
p {
  font-size: 280px;
}
</style>
