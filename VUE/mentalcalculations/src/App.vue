<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

  export default {
    name: "App"
  }
</script>

<style>
  body {
    background-color: silver;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /*margin-top: 60px;*/
    position: relative;
    width: 600px;
    height: 750px;
    margin: auto auto;
    overflow: hidden;
    background-color: white;   
  }
</style>
