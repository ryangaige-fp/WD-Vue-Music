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

    <!-- my playlist -->
    <div class="col-12">
      <div class="row">
        <div class="from">
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
          <p>{{playlist.title}}</p>
        </div>
      </div>
    </div>

    <div class="col-12">
      <div class="container-fluid">
        <div class="row justify-content-between">
          <div class="col-4" v-for="song in songs">
            <div class="card-deck py-4">
              <div class="card text-white bg-dark" style="max-width: 40rem;">
                <div class="card-body">
                  <h4 class="card-title">{{song.artistName}}</h4>
                  <h4 class="card-title">{{song.trackName}}</h4>
                  <h4 class="card-title">{{song.collectionName}}</h4>
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
</style>