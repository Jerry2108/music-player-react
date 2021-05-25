import React from "react";
const LibrarySong = ({song, setCurrentSong, audioRef, isPlaying, songs, setSongs}) =>{
  function handleChangeSong(){
    const newSongs = songs.map((tmpSong) =>{
      if(tmpSong.id == song.id){
        return ({
          ...tmpSong,
          active: true})
        }
      else{
        return({
          ...tmpSong,
            active:false})
        }
      })
    setSongs(newSongs);
    setCurrentSong(song);
    if (isPlaying){
      const promise = audioRef.current.play();
      if (promise !== undefined){
        promise.then(() =>{
          audioRef.current.play();
        })
      }
    }

  }
  return(
    <div onClick = {handleChangeSong} className = {`library-song ${song.active ? 'selected' : ""}`}>
    <img src = {song.cover}></img>
    <div className = "song-description">
    <h4>{song.name}</h4>
    <h4>{song.artist}</h4>
    </div>
    </div>
  );
};
export default LibrarySong;
