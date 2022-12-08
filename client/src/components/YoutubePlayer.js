import React, { useContext, useEffect } from 'react';
import YouTube from 'react-youtube';
import { GlobalStoreContext } from '../store';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';

export default function YoutubePlayer(props) {
    // THIS EXAMPLE DEMONSTRATES HOW TO DYNAMICALLY MAKE A
    // YOUTUBE PLAYER AND EMBED IT IN YOUR SITE. IT ALSO
    // DEMONSTRATES HOW TO IMPLEMENT A PLAYLIST THAT MOVES
    // FROM ONE SONG TO THE NEXT

    // THIS HAS THE YOUTUBE IDS FOR THE SONGS IN OUR PLAYLIST
    const { playlist, listPlaying } = props;
    const store = useContext(GlobalStoreContext);
    let ytPlayer;

    // THIS IS THE INDEX OF THE SONG CURRENTLY IN USE IN THE PLAYLIST
    let currentSong = 0;

    const playerOptions = {
        height: '360',
        width: '600',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    // THIS FUNCTION LOADS THE CURRENT SONG INTO
    // THE PLAYER AND PLAYS IT
    function loadAndPlayCurrentSong(player) {
        let song = playlist[currentSong];
        player.loadVideoById(song);
        player.playVideo();
    }

    function play() {
        ytPlayer?.playVideo();
    }

    function pause() {
        ytPlayer?.pauseVideo();
    }

    // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    function incSong() {
        currentSong++;
        currentSong = currentSong % playlist.length;
        if(ytPlayer){
            loadAndPlayCurrentSong(ytPlayer);
        }
    }

    function decSong() {
        if(currentSong > 0){
            currentSong--;
            if(ytPlayer){
                loadAndPlayCurrentSong(ytPlayer);
            }
        }
    }

    function onPlayerReady(event) {
        ytPlayer = event.target;
        loadAndPlayCurrentSong(event.target);
        event.target.playVideo();
    }

    // THIS IS OUR EVENT HANDLER FOR WHEN THE YOUTUBE PLAYER'S STATE
    // CHANGES. NOTE THAT playerStatus WILL HAVE A DIFFERENT INTEGER
    // VALUE TO REPRESENT THE TYPE OF STATE CHANGE. A playerStatus
    // VALUE OF 0 MEANS THE SONG PLAYING HAS ENDED.
    function onPlayerStateChange(event) {
        ytPlayer = event.target;
        let playerStatus = event.data;
        let player = event.target;
        if (playerStatus === -1) {
            // VIDEO UNSTARTED
            console.log("-1 Video unstarted");
        } else if (playerStatus === 0) {
            // THE VIDEO HAS COMPLETED PLAYING
            console.log("0 Video ended");
            incSong();
            loadAndPlayCurrentSong(player);
        } else if (playerStatus === 1) {
            // THE VIDEO IS PLAYED
            console.log("1 Video played");
        } else if (playerStatus === 2) {
            // THE VIDEO IS PAUSED
            console.log("2 Video paused");
        } else if (playerStatus === 3) {
            // THE VIDEO IS BUFFERING
            console.log("3 Video buffering");
        } else if (playerStatus === 5) {
            // THE VIDEO HAS BEEN CUED
            console.log("5 Video cued");
        }
    }

    return (
        <div>
            <YouTube
                videoId={playlist[currentSong]}
                opts={playerOptions}
                onReady={onPlayerReady}
                onStateChange={onPlayerStateChange}
            />
            <Box id='song-info-box'>
                <Box>Playlist: {store.listPlaying?.name}</Box>
                <Box>Song #: {currentSong + 1}</Box>
                <Box>Title: {store.listPlaying?.songs[currentSong].title}</Box>
                <Box>Artist: {store.listPlaying?.songs[currentSong].artist}</Box>
                <div id="player-toolbar">
                    <IconButton onClick={decSong}>
                        <FastRewindIcon style={{fontSize: '24pt', color: 'black'}}/>
                    </IconButton>
                    <IconButton onClick={pause}>
                        <StopIcon style={{fontSize: '24pt', color: 'black'}}/>
                    </IconButton>
                    <IconButton onClick={play}>
                        <PlayArrowIcon style={{fontSize: '24pt', color: 'black'}}/>
                    </IconButton>
                    <IconButton onClick={incSong}>
                        <FastForwardIcon style={{fontSize: '24pt', color: 'black'}}/>
                    </IconButton>
                </div>
            </Box>
        </div>
    )
        
}