import vue from "vue";
import vuex from "vuex";
import router from "../router";
import firebase from "firebase/app";
import "firebase/auth";
import db from "../utils/firebaseInit";
import axios from "axios";

vue.use(vuex);

let itunes = axios.create({
  baseURL: "https://itunes.apple.com/search?term=",
  timeout: 5000
});

let store = new vuex.Store({
  state: {
    user: {},
    songs: [],
    myPlaylists: [],
    activePlaylist: {},
    AddPlaylists: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setSongs(state, songs) {
      state.songs = songs;
    },
    setMyPlaylists(state, playlists) {
      state.myPlaylists = playlists;
    },
    setActivePlaylist(state, playlist) {
      state.activePlaylist = playlist;
    },
    setAddPlaylists(state, songs) {
      state.AddPlaylists = songs;
    }
  },
  actions: {
    search({ commit, dispatch }, query) {
      itunes
        .get("" + query)
        .then(res => {
          console.log("Itunes: ", res.data.results);
          commit("setSongs", res.data.results);
        })
        .catch(err => {
          console.error(err);
        });
    },

    createPlaylist({ commit, dispatch }, newPlaylist) {
      db.collection("playlists")
        .add(newPlaylist)
        .then(doc => {
          console.log("created this playlist with", doc.id);
          dispatch("getPlaylists");
        });
    },

    getPlaylists({ commit, dispatch }) {
      db.collection("playlists")
        .get()
        .then(querySnapShot => {
          let playlists = [];
          querySnapShot.forEach(doc => {
            if (doc.exists) {
              let playlist = doc.data();
              playlist.id = doc.id;
              playlists.push(playlist);
            }
          });
          commit("setMyPlaylists", playlists);
        });
    },

    getMyPlaylists({ state, commit, dispatch }) {
      db.collection("playlists")
        .where("user", "==", state.user.email)
        .get()
        .then(querySnapShot => {
          let playlists = [];
          querySnapShot.forEach(doc => {
            if (doc.exists) {
              let playlist = doc.data();
              playlist.id = doc.id;
              playlists.push(playlist);
            }
          });
          commit("setMyPlaylists", playlists);
        });
    },

    addToPlaylist({ state, commit, dispatch }, songs) {
      db.collection("playlists.id")
        .add(songs)
        .then(doc => {
          dispatch("getMyPlaylists");
        });
    },

    changeActivePlaylist({ commit, dispatch }, playlist) {
      commit("setActivePlaylist", playlist);
    },

    // USER AUTHENTICATION
    register({ commit, dispatch }, user) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          router.push("/dashboard");
          commit("setUser", res.user);
          firebase
            .auth()
            .currentUser.updateProfile({ displayName: user.displayName })
            .then(res => {
              console.log("Profile Updated");
            })
            .catch(err => {
              console.error(err);
            });
          firebase
            .auth()
            .currentUser.sendEmailVerification()
            .then(res => {
              console.log("Verification Email Sent");
            })
            .catch(err => {
              console.error(err);
            });
        })
        .catch(err => {
          console.error(err);
        });
    },
    login({ commit, dispatch }, user) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          router.push("/dashboard");
          commit("setUser", res.user);
        })
        .catch(err => {
          console.error(err);
        });
    },
    logout({ commit, dispatch }) {
      firebase
        .auth()
        .signOut()
        .then(res => {
          router.push("/login");
          commit("setUser", {});
        })
        .catch(err => {
          console.error(err);
        });
    },
    authenticate({ commit, dispatch }) {
      // you can change the default route here
      //if someone is signed in, it goes to dashboard, if not, go to auth
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          commit("setUser", user);
          router.push("/dashboard");
        } else {
          router.push("/login");
        }
      });
    }
  }
});

export default store;
