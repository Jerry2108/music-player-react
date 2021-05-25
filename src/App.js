
import {React, useState,useRef} from "react";
import Nav from "./Components/Nav";
import Song from "./Components/Song";
import Player from "./Components/Player";
import Library from "./Components/Library";
import "./styles/app.scss";
import data from './utils';
function App() {
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInform, setSongInform] = useState({
    duration: null,
    currentTime: null,
    animationPercentage: 0
  });
  const audioRef = useRef(null);
  const handleTime = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animationPercentage = Math.round(roundedCurrent/roundedDuration*100);
    setSongInform({...songInform, currentTime: current, duration: duration, animationPercentage: animationPercentage});
  }
  const handleEnded = ()=>{
    let currentIndex = songs.findIndex((song)=>song.id === currentSong.id);
      if (currentIndex + 1 === songs.length){
        currentIndex = 0;
        setCurrentSong(songs[currentIndex]);
      }
      else{
          setCurrentSong(songs[currentIndex + 1]);
      }
  }
  return (
    <div className="App">
    <Nav setLibraryStatus = {setLibraryStatus} libraryStatus = {libraryStatus}/>
    <Song currentSong = {currentSong} />
    <Player isPlaying = {isPlaying} currentSong = {currentSong}
    setIsPlaying = {setIsPlaying} audioRef = {audioRef} setSongInform = {setSongInform} songInform = {songInform} songs ={songs} setCurrentSong = {setCurrentSong} setSongs = {setSongs}/>
    <Library songs = {songs} setCurrentSong = {setCurrentSong} audioRef = {audioRef} isPlaying = {isPlaying} setSongs = {setSongs} setLibraryStatus = {setLibraryStatus} libraryStatus = {libraryStatus} />
      <audio onTimeUpdate = {handleTime} onLoadedMetadata = {handleTime} ref = {audioRef} src = {currentSong.audio} onEnded = {handleEnded}></audio>
    </div>
  );
}

export default App;
