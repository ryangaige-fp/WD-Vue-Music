# WD-Vue-Music

### OverView
Vue Music is on the right track to be the newest coolest bestest Music App out there today! It is your job to make it so. The full feature set will include a way for users to search itunes for music, preview the music data as well as listen to the track, and then add that track to the users playlist. The playlist should allow a user to add to the list, or delete from the list, as well as play a song on the list.

You will be responsible for creating a firestore database to maintain the playlist. There should be a separate section of the page for looking at the playlist, this can be incorporated however you like, splitting up the dashboard, or navigating to a new "view". Think of how the UI/UX effect the experience when making this decision.

The Authentication for this project has been handled, but make sure to go over the login, register, authentication, and logout methods to see how they might be working. 

Before adding songs to your database think of what data might be useful to keep in the database. You should build song objects accordingly.

### Requirements

User can add songs to a playlist
User can remove songs from a playlist
User can Play song previews on the playlist
User can play song previews from the itunes search
Songs on the playlist are displayed as soon as the playlist loads
Playlist is persistent by using a firestore database

### Bonus Ideas

Make the playlist unique to the user(hint: playlist has a userId property so each user makes their own and each playlist has a subcollection of songs)
User can Order the songs on the playlist(hint: songs have an order property)
Users can make multiple playlists(hint: playlists have a userId property and the user can select which playlist to add a song to. )
Only one song plays at a time(hint: Make a single player component to pass data to.)
