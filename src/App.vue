<template>
  <div class="container">
    <Navigation />
    <router-view />
  </div>
</template>

<script setup>
import Navigation from '@/components/Navigation.vue';
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: grid;
  grid-template-columns: 20fr 60fr 20fr;
  grid-template-rows: auto;
}

.container {
  grid-column: 2;
  width: 66vw;
}
</style>
