import React from "react";
import LibrarySong from "./LibrarySong";

const Library =  ({songs, setCurrentSong, audioRef, isPlaying, setSongs, setLibraryStatus, libraryStatus}) =>{

  return (
    <div className= {`library ${libraryStatus ? 'libraryActive' : ' '}`}>
    <h2>Music</h2>
    <div className = "library-songs">
    {songs.map((song) => <LibrarySong song = {song} setCurrentSong = {setCurrentSong} audioRef = {audioRef} isPlaying = {isPlaying} songs = {songs} setSongs = {setSongs}/>)}
    </div>
    </div>
  );
}
export default Library;
