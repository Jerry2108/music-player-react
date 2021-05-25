import {React, useState, useRef, useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faAngleLeft, faAngleRight, faPause} from "@fortawesome/free-solid-svg-icons";
const Player = ({currentSong, isPlaying, setIsPlaying, audioRef, setSongInform, songInform, songs, setCurrentSong,setSongs}) =>{
  /*audio ref is an object having "current property"*/

  useEffect(()=>{
    const newSongs = songs.map((tmpSong) =>{
      if(tmpSong.id == currentSong.id){
        return ({
          ...tmpSong,
          active: true})
        }
      else{
        return({
          ...tmpSong,
            active:false});
        }
      });
      setSongs(newSongs);}
  , [currentSong])
  const getTime = (time) =>{
    return (Math.floor(time/60) + ":" + ("0" + Math.floor(time % 60)).slice(-2));
  }
  const handlePlay = () => {
    if (isPlaying){
        audioRef.current.pause();
        setIsPlaying(false);
    }
    else{
      audioRef.current.play();
      setIsPlaying(true);
    }
  }

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInform({...songInform, currentTime: e.target.value});
  }
  const handleSkip= (direction) =>{
    let currentIndex = songs.findIndex((song)=>song.id === currentSong.id);
    if (direction === "skipForward"){
      if (currentIndex + 1 === songs.length){
        currentIndex = 0;
        setCurrentSong(songs[currentIndex]);
      }
      else{
          setCurrentSong(songs[currentIndex + 1]);
      }
    }
    else if (direction === "skipBackward"){
      if ((currentIndex - 1 )% songs.length ===  - 1){
        setCurrentSong(songs[songs.length - 1]);
      }
      else {
        setCurrentSong (songs[currentIndex-1]);
      }
    }
    setIsPlaying(true);
    playAudio(isPlaying, audioRef);

  }
  const animationStyles = {
    transform: `translateX(${songInform.animationPercentage}%)`
  }

  const playAudio = (isPlaying, audioRef)=>{
    if (isPlaying){
      console.log(isPlaying);
      const playPromise = audioRef.current.play();
    if (playPromise !== undefined){
      playPromise.then((audio)=>{
        audioRef.current.play();
      })
    }
  }}
  return(
    <div className = "player">
    <div className = "time-control">
    <p>{getTime(songInform.currentTime)}</p>
    <div className = "track" style = {{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}}>
    <input min = {0} max = {songInform.duration} value = {songInform.currentTime} onChange = {dragHandler} type = "range"/>
    <div className = "animation-track" style = {animationStyles}>
    </div>
    </div>
    <p>{getTime(songInform.duration)}</p>
    </div>
    <div className = "play-control">
    <FontAwesomeIcon onClick = {() => handleSkip("skipBackward")} className = "skip-back" size = "2x" icon = {faAngleLeft}/>
    <FontAwesomeIcon className = "play" size = "2x" icon = {isPlaying ? faPause:  faPlay} onClick = {handlePlay}/>
    <FontAwesomeIcon onClick = {() => handleSkip("skipForward")}className = "skip-forward" size = "2x" icon = {faAngleRight}/>
    </div>
    </div>
  );
}
export default Player;
