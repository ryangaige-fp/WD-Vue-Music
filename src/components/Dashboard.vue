<template>

  <div class="dashboard row justify-content-around ">

    <div class="parallax">
      <!-- search -->

      <div class="row ">
        <div class="col-2"></div>
        <div class="col-8">
          <h1 class="col-12 subtitle">Music is </h1>
          <h1 class="col-12 title"><span class="underline underlineWhite nothingYouCould">my balance</span></h1>
        </div>
      </div>
      <div class="row">
        <div class="col-2"></div>
        <div class="col-8">
          <form @submit.prevent="search(query); query = '';">
            <div class="form-group">
              <label for="name"></label>
              <input class="form-control" type="text" id="query" v-model="query" placeholder="search for tunes">
            </div>
            <button class="btn btn-info margin-bottom" type="submit">Search</button>
          </form>
        </div>
      </div>





      <div class="container-fluid">
        <div class="row">

          <div class="sticky">
            <div class="col">

              <!-- my playlist -->
              <div class="col-12">
                <div class="row justify-content-center">
                  <div class="form pb-4">
                    <form @submit.prevent="createPlaylist(); newPlaylist = {}">
                      <input type="text" name="title" id="title" v-model="newPlaylist.title" required>
                      <button type="submit">Create Playlist</button>
                    </form>
                  </div>
                </div>
              </div>

              <div class="container-fluid">
                <div class="row justify-content-center">
                  <div class="col-12">
                    <h3 class="currentPlay">Current Playlists</h3>
                  </div>
                  <div class="col-4 playlistTitle" v-for="playlist in myPlaylists">
                    <button class="btn btn-info btn-raised btn-sm " aria-pressed="true" @click="changeActivePlaylist(playlist)">{{playlist.title}}</button>
                  </div>
                </div>
              </div>

              <!-- active playlist -->
              <div class="col-12 ">
                <div class="container-fluid  ">
                  <div class="row justify-content-between">
                    <div class="col-6" v-for="song in Playlists">
                      <div class="card-deck py-4">
                        <div class="card text-white bg-dark" style="max-width: 40rem;">
                          <div class="card-body">
                            <h4 class="card-title">{{playlists.song.artistName}}</h4>
                            <h4 class="card-title">{{song.trackName}}</h4>
                            <h5 class="card-title">{{song.collectionName}}</h5>
                            <img :src=song.artworkUrl100>
                            <audio controls id="myTune">
                              <source :src=song.previewUrl type="audio/mpeg">
                            </audio>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>




            </div>
          </div>


          <div class="col-7">


            <!-- results -->
            <div class="main">
              <div class="col-12 ">
                <div class="container-fluid  ">
                  <div class="row justify-content-between">
                    <div class="col-4" v-for="song in songs">
                      <div class="card-deck py-4">
                        <div class="card text-white bg-dark cardStyle" style="max-width: 40rem;">
                          <div class="card-body">
                            <img :src=song.artworkUrl100>
                            <h5 class="card-title">{{song.artistName}}</h5>
                            <h5 class="card-title text-truncate">{{song.trackName}}</h5>
                            <h6 class="card-title overflowStyle text-truncate">{{song.collectionName}}</h6>

                            <audio class="audioSize" controls id="myTune">
                              <source :src=song.previewUrl type="audio/mpeg">
                            </audio>

                            <button class="btn btn-light mx-2 btn-sm" v-if="activePlaylist.id" @click="addToPlaylist(song)"><i
                                class="fas fa-plus">
                                Add to Playlist</i></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
      // this.$store.dispatch('getMyPlaylist')
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
      activePlaylist() {
        return this.$store.state.activePlaylist
      },
      mySongs() {
        return this.$store.state.mySongs
      }
    },
    methods: {
      search(query) {
        this.$store.dispatch('search', query)
      },
      createPlaylist() {
        this.newPlaylist.user = this.user.email
        this.$store.dispatch('createPlaylist', this.newPlaylist)
      },
      changeActivePlaylist(playlist) {
        this.$store.dispatch('changeActivePlaylist', playlist)
      },
      addToPlaylist(song) {
        this.$store.dispatch('addToPlaylist', song)
      }
    }
  }
</script>

<style scoped>
  .parallax {
    background-image: url("../assets/headphones.jpg");
    min-height: 500px;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%
  }

  .sticky {
    width: 35%;
    height: 150vh;
    background: rgba(63, 63, 63, 0.40);
    padding-top: 2rem;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    border-radius: 2rem;


  }

  .main {
    height: 100%
  }

  .songColumn {
    width: 100%
  }

  .jumboStyle {
    width: 85%
  }

  .margin-bottom {
    margin-bottom: 2rem;
  }

  .row {
    margin-left: 0px;
    margin-right: 0px;
  }

  .title {
    font-size: 7rem;
    color: white
  }

  .underline {
    border-bottom: 2px solid white;
    display: inline-block;
    line-height: .85
  }

  @import url('https://fonts.googleapis.com/css?family=Nothing+You+Could+Do');
  .nothingYouCould {
    font-family: 'Nothing You Could Do', cursive;
  }


  .subtitle {
    font-size: 6rem;
    color: white
  }

  .card {
    height: 24rem;
  }

  .playlistTitle {
    color: white
  }


  .currentPlay {
    color: white
  }

  .cardStyle {
    border-radius: 2rem;
    height: 20rem
  }

  .audioSize {
    width: 100%;
  }

  .overflowStyle {
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%
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