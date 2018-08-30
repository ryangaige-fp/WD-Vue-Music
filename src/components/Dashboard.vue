<template>
  <div class="dashboard row justify-content-around">
    <div class="col-12">
      <h1 class="col-12 title">Music</h1>
    </div>
    <div class="col-4">
      <form @submit.prevent="search(query); query = '';">
        <div class="form-group">
          <label for="name">Search</label>
          <input class="form-control" type="text" id="query" v-model="query">
        </div>
        <button class="btn btn-dark margin-bottom" type="submit">Search</button>
      </form>
    </div>
    <div class="col-12">
      <div class="container-fluid">
        <div class="row justify-content-between">
          <div class="col-4" v-for="song in songs">
            <div class="card text-white bg-dark" style="max-width: 40rem;">
              <div class="card-body">
                <h3 class="card-title">{{song.artistName}}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Dashboard',
    data() {
      return {
        query: ''
      }
    },
    computed: {
      songs() {
        return this.$store.state.songs
      },
      user() {
        return this.$store.state.user
      }
    },
    methods: {
      search(query) {
        this.$store.dispatch('search', query)
      }
    }
  }
</script>

<style scoped>
  .margin-bottom {
    margin-bottom: 2rem;
  }

  .row {
    margin-left: 0px;
    margin-right: 0px;
  }

  .title {
    font-size: 4rem
  }

  .card {
    height: 14rem;
  }
</style>