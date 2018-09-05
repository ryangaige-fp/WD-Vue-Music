<template>
  <div class="dashboard row justify-content-around ">
    <div class="col-12 ">
      <h1 class="col-12 title">Music</h1>
    </div>
    <div class="col-4 ">
      <form @submit.prevent="search(query); query = '';">
        <div class="form-group">
          <label for="name">Search</label>
          <input class="form-control" type="text" id="query" v-model="query">
        </div>
        <button class="btn btn-dark margin-bottom" type="submit">Search</button>
      </form>
    </div>

    <!-- my playlist -->
    <div class="sidenav">
      <div class="col-12">
        <div class="row">
          <div class="form pb-4">
            <form @submit.prevent="createPlaylist(); newPlaylist = {}">
              <input type="text" name="title" id="title" v-model="newPlaylist.title" required>
              <button type="submit">Create Playlist</button>
            </form>
          </div>
        </div>
      </div>

      <div class="container-fluid">
        <div class="row">
          <div class="col-4 playlistTitle" v-for="playlist in myPlaylists">
            <button class="btn btn-raised btn-sm">{{playlist.title}}</button>
          </div>
        </div>
      </div>
    </div>

    <div class="col-12 ">
      <div class="container ">
        <div class="row justify-content-between">
          <div class="col-4" v-for="song in songs">
            <div class="card-deck py-4">
              <div class="card text-white bg-dark" style="max-width: 40rem;">
                <div class="card-body">
                  <h4 class="card-title">{{song.artistName}}</h4>
                  <h4 class="card-title">{{song.trackName}}</h4>
                  <h5 class="card-title">{{song.collectionName}}</h5>
                  <img :src=song.artworkUrl100>
                  <audio controls id="myTune">
                    <source :src=song.previewUrl type="audio/mpeg">
                  </audio>

                  <button class="btn btn-light mx-2" @click="addToPlaylist(songs)"><i class="fas fa-plus"> Add to Playlist</i></button>
                </div>
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
        query: '',
        newPlaylist: {}
      }
    },

    mounted() {
      this.$store.dispatch('getPlaylists')
    },
    computed: {
      songs() {
        return this.$store.state.songs
      },
      user() {
        return this.$store.state.user
      },
      myPlaylists() {
        return this.$store.state.myPlaylists
      },
      addToPlaylist() {
        return this.$store.state.activePlaylist
      }
    },
    methods: {
      search(query) {
        this.$store.dispatch('search', query)
      },
      createPlaylist() {
        this.newPlaylist.user = this.user.email
        this.$store.dispatch('createPlaylist', this.newPlaylist)
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
    height: 20rem;
  }

  .playlistTitle {
    color: white
  }


  .sidenav {
    height: 100%;
    width: auto;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: blue;
    overflow-x: hidden;
    padding-top: 2rem;
  }

  /* .musicSyle {

    width: 75%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: 5rem;
    margin-left: 44rem;
    display: grid;
    grid-template-columns: repeat(16, 1fr);
    grid-gap: 1rem;
    grid-column-start: 6;
    grid-column-end: 16;

  } */
</style>