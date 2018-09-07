<template>
  <div id="app">
    <nav class="navbar navbar-light bg-light position: sticky-top">
      <button class="btn btn-outline-dark" @click="logout" v-if="user.email">Logout</button>
    </nav>
    <div>
      <!-- <img class="logo" src="./assets/logo.svg"> -->
    </div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    methods: {
      logout() {
        this.$store.dispatch("logout")
      }
    },
    computed: {
      user() {
        return this.$store.state.user
      }
    }
  }
</script>

<style>
  body {
    background-color: gray;

  }

  .logo {
    height: 200px;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2783df;

  }
</style>