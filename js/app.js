/*global document,console,$  */
(function () {
    "use strict";

    var player = document.getElementById("player"),
        hsPlayer = document.getElementById("hsPlayer"),
        progress = document.getElementById("seek-bar"),
        fillBar = document.getElementById("fill"),
        currentTime = document.getElementById("currentTime"),
        volumeSlider = document.getElementById("volume"),
        toggle = $("#toggle"),
        speaker = $("#speaker"),
        skipButtons = player.querySelectorAll('[data-skip]'),
        videoPreLoeader = document.querySelector(".video_preloader"),
        fullS = player.querySelector(".fullScreen");

    function playOrPause() {
        if (hsPlayer.paused) {
            hsPlayer.play();
            toggle.attr("src", "images/pause.svg");
        } else {
            hsPlayer.pause();
            toggle.attr("src", "images/play.svg");

        }
    }

    // toggle button
    hsPlayer.addEventListener("click", playOrPause);
    toggle.on("click", playOrPause);

    function totalTime(seconds) {
        var min = Math.floor(seconds / 60),
            sec = seconds % 60;
        min = (min < 10) ? "0" + min : min;
        sec = (sec < 10) ? "0" + sec : sec;
        currentTime.textContent += " / " + min + ":" + sec;
    }
      // convert decimal no intro intiger
    function convertTime(seconds) {
        var min = Math.floor(seconds / 60),
            sec = seconds % 60;
        min = (min < 10) ? "0" + min : min;
        sec = (sec < 10) ? "0" + sec : sec;
        currentTime.textContent = min + ":" + sec;
        totalTime(Math.round(hsPlayer.duration));

    }
    hsPlayer.addEventListener("timeupdate", function () {
        var postion = hsPlayer.currentTime / hsPlayer.duration;
        fillBar.style.width = postion * 100 + "%";
        convertTime(Math.round(hsPlayer.currentTime)); // convert decimal no intro intiger
        if (hsPlayer.ended) {
            toggle.attr("src", "images/replay.svg");

        }
    });
    // change volume  for video
    function changeVolume() {
        hsPlayer.volume = volumeSlider.value;
        if (volumeSlider.value == 0) {

            speaker.attr("src", "images/mute.svg");

        } else {

            speaker.attr("src", "images/speaker.svg");

        }
    }
    volumeSlider.onchange = function () {
        changeVolume();
    };
    speaker.on("click",function(){
        if(!hsPlayer.muted){
            hsPlayer.muted = true;
            speaker.attr("src", "images/mute.svg");
        } else{
            hsPlayer.muted = false;
            speaker.attr("src", "images/speaker.svg");
       }  
    });

    // skip time for video 
    function skip() {
        console.log(this.dataset.skip);
        hsPlayer.currentTime += parseFloat(this.dataset.skip);
    }
skipButtons.forEach(button => button.addEventListener("click" , skip));
  function scrub (e){
      var scrubTime = (e.offsetX / progress.offsetWidth) * hsPlayer.duration;
     hsPlayer.currentTime = scrubTime;
  }
  var mousDown = false; 

  progress.addEventListener("click",scrub);
  progress.addEventListener("mousemove", (e) => mousDown && scrub(e));
  progress.addEventListener("mousedown",() => mousDown = true );
  progress.addEventListener("mouseup",() => mousDown = false);
  hsPlayer.addEventListener("waiting",loader);
  hsPlayer.addEventListener("playing",loader);
   // loader play
   console.log(videoPreLoeader);
   function loader(event){
       switch (event.type){
            case "waiting":
            videoPreLoeader.style.display = "block";
            console.log("waiting");
            break;
            case "playing":
            videoPreLoeader.style.display = "none";
            console.log("playing");
            break;

       }
   }
   // fullScreen 
   fullS.addEventListener("click",fullScreen);
    function fullScreen(){

    if (hsPlayer.mozRequestFullScreen) {
        // This is how to go into fullscren mode in Firefox
        // Note the "moz" prefix, which is short for Mozilla.
        hsPlayer.mozRequestFullScreen();
      } else if (hsPlayer.webkitRequestFullScreen) {
        // This is how to go into fullscreen mode in Chrome and Safari
        // Both of those browsers are based on the Webkit project, hence the same prefix.
        hsPlayer.webkitRequestFullScreen();
     }
       /* if(!document.webkitFullscreenElement){
            hsPlayer.webkitRequestFullScreen();
        }else{
            document.exitFullscreen();
        }*/
    } 

}());