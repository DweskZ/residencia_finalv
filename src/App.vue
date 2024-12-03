<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
/* Resetear márgenes y paddings del navegador */
body, html {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow-x: hidden; /* Evita cualquier desbordamiento horizontal */
}

/* Aseguramos que el contenido ocupe toda la pantalla */
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

</style>
