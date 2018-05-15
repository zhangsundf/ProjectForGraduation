<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;

}
html,body{
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 100%;
}
.el-table__body-wrapper::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
.el-table__body-wrapper::-webkit-scrollbar-track {
  background-color: #f5f5f5;
  border-radius: 10px;
}
.el-table__body-wrapper::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 10px;
}

</style>
