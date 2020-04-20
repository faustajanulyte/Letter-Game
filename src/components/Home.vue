/* eslint-disable */

<template>
  <div class="hello">
    <h1 class="font-weight-bold mb-4">Welcome to the Game of One Letter</h1>
    <div class="btn-group my-4">
      <form class="mx-4">
      <input
        v-model="startingValue"
        type="text"
        id="startingValue"
        class="form-control bg-dark text-light"
        required
      />
      </form>
      <button type="submit" class="btn-md btn-dark text-light rounded mr-4" @click="setCountdown()">Set time</button>
      <button type="button" class="btn-md btn-dark rounded" @click="picker">
        Generate letter
      </button>
    </div>
    <div class="text-light font-weight-bold h1 bg-dark rounded-circle mt-4 col-md- circle">
      <a class="pt-2 px-3" id="timer">{{ countDown }}</a>
    </div>
    <p>{{ this.message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      letters: [
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
      pickedLetters: [],
      message: "",
      connected: "",
      socket: null,
      startingValue: 120,
      countDown: null,
      loading: true,
      running: false,
    };
  },
  methods: {
    picker: function() {
      var alreadyPicked = true;
      var chosenLetter = this.letterGenerator();

      while (alreadyPicked == true) {
        var picked = false;
        this.pickedLetters.forEach((letter) => {
          if (letter == this.letters[chosenLetter]) {
            picked = true;
          }
        });
        if (!picked) {
          alreadyPicked = false;
        }
      }

      this.pickedLetters.push(this.letters[chosenLetter]);
      this.socket.send(this.letters[chosenLetter]);
      this.resetCountDown();
      this.running = true;
    },
    letterGenerator: function() {
      return Math.floor(Math.random() * this.letters.length);
    },

    connect() {
      this.socket = new WebSocket(process.env.VUE_APP_WS_URL);

      this.socket.self = this;

      this.socket.onopen = function(openEvent) {
        this.loading = false;
        console.log("ws::open : connection established " + this.status);
      };

      this.socket.onerror = function(errorEvent) {
        console.log("WebSocket ERROR: " + JSON.stringify(errorEvent, null, 4));
      };

      this.socket.onmessage = (messageEvent) => {
        this.message = messageEvent.data;
      };
    },

    setMessage: function(message) {
      this.message = message;
    },
    resetCountDown: function() {
      this.countDown = this.startingValue;
    },
    playSound: function() {
      var audio = new Audio(
        "https://fsb.zobj.net/download/by9sexxek1CTmS17DVzdT0qgLxPzkGx6FPq5-mFMTt4madDe53uk657OcrxnzKwfjzax57unDfFvsPNiEueLEKi7njpEujK86f_Alj4mjqxn1Pyj1gk2Wxdm30fw/?a=web&c=72&f=corona_virus.mp3&special=1587395135-BDAUSQyKS%2FtGhUWrAdZebM1eBoGyASqUkV1NRj6f4e8%3D"
      );
      audio.play();
    },
    setCountdown() {
      this.startingValue = 
      this.countDown = this.startingValue;
    },
  },
  mounted() {
    this.countDown = this.startingValue;
    this.connect();
    setInterval(() => {
      if (this.countDown == 0) {
        this.playSound();
        this.running = false;
        this.resetCountDown();
      }
      if (this.running == true) {
        this.countDown -= 1;
      }
    }, 1000);
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
  font-size: 230px;
  margin: 0px;
}
.circle {
  height: 100px;
  width: 100px;
  display: table;
  margin: 20px auto;
}
.circle a {
  vertical-align: middle;
  display: table-cell;
}
</style>
