const music = document.querySelector("audio");
const img = document.querySelector("img");
const play = document.getElementById("play");

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const prev = document.getElementById("prev");
const next = document.getElementById("next");



  
    let progress =document.getElementById("progress");
    let total_duration=document.getElementById("duration");
    let current_time=document.getElementById("current_time");
    const progress_div=document.getElementById("progress_div");


play.classList.add("pulse");


// songs data
let list1 = [
  {
    name: "sound1",
    title: "Top Picks",
    artist: "sound1",
  },

  {
    name: "sound2",
    title: "Top Picks",
    artist: "sound2",
  },

  {
    name: "sound3",
    title: "Top Picks",
    artist: "sound3",
  },
];

let list2 = [
  {
    name: "sound4",
    title: "Your Persona..",
    artist: "loylist",
  },

  {
    name: "sound5",
    title: "Your Persona..",
    artist: "loylist2",
  },

  {
    name: "sound6",
    title: "Your Persona..",
    artist: "loylist3",
  },
];

let list3 = [
  {
    name: "sound7",
    title: "Top Charts",
    artist: "loylist",
  },

  {
    name: "sound8",
    title: "Top Charts",
    artist: "loylist2",
  },

  {
    name: "sound9",
    title: "Top Charts",
    artist: "loylist3",
  },
];

let all_song_list = [list1, list2, list3];
var songs;

let isPlaying = false;

// for play fun
const playMusic = () => {
  isPlaying = true;
  music.play();
  play.classList.replace("fa-play", "fa-pause");
  img.classList.add("anime");
  play.classList.remove("pulse");
};

// for pause
const pauseMusic = () => {
  isPlaying = false;
  music.pause();
  play.classList.replace("fa-pause", "fa-play");
  img.classList.remove("anime");
  play.classList.add("pulse");
};

play.addEventListener("click", () => {
  isPlaying ? pauseMusic() : playMusic();
});

// chaging the music data
const loadSong = (song) => {
  title.textContent = song.title;
  artist.textContent = song.artist;
  music.src = "music/" + song.name + ".mp3";
  img.src = "img/" + song.name + ".jpg";
};

let songIndex = 0;

const nextSong = () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playMusic();
};

const prevSong = () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playMusic();
};
next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);


var songs_name = document.getElementById("song_name");
const music_categorey = (id) => {
  console.log(all_song_list.length > id);
  if (all_song_list.length > id) {
    songs_name.innerHTML = ``; 
    songs = all_song_list[id];
    nextSong();
    for (var k = 0; k < songs.length; k++) {
      songs_name.innerHTML += `<li>${songs[k].name}</li>`;
    }

    return songs;
  } else {
    songs_name.innerHTML = `Oops no songs yet!!!`;
    alert("Song are not avilable try another categorey");
  }
};






  // ++++++++++++changes progress js works
  music.addEventListener('timeupdate',(event)=>{

  
    const{currentTime ,duration} =event.srcElement;


    let progress_time=(currentTime/duration)*100;
    progress.style.width=`${progress_time}% `;

    // music time update


    let min_duration =Math.floor(duration/60);
    let sec_duration = Math.floor(duration %60);

  
    let tot_duration = `${min_duration}:${sec_duration}`;
    if(duration){
      total_duration.textContent=`${tot_duration}`;
    }



    // music current time
    
    let min_currentTime =Math.floor(currentTime/60);
    let sec_currentTime = Math.floor(currentTime %60);

  
  

    if(sec_currentTime<10){
      sec_currentTime=`0${sec_currentTime}`;
    }
    let tot_currentTime = `${min_currentTime}:${sec_currentTime}`;
    current_time.textContent=`${tot_currentTime}`;

  });

// progress onclick funationality
progress_div.addEventListener('click',(event)=>{
  // console.log(event);
  
  
  const{duration} =music;
  let move_progrss =(event.offsetX/event.srcElement.clientWidth)*duration;  // when we click on progress bar any where at this click point we calcilate width or time and the  we assgin to the current time 
  // console.log(move_progrss);
  // console.log(duration);

  music.currentTime=move_progrss;

})


  // if music end then call next song
  music.addEventListener('ended',nextSong);