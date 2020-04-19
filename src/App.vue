<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&family=Handlee&display=swap');
#app {
  font-family: 'Gloria Hallelujah', cursive;
  font-family: 'Handlee', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>