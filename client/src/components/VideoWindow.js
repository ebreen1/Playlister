import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import YoutubePlayer from './YoutubePlayer';
import IconButton from '@mui/material/IconButton';

import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';

import { Box, Tabs, Tab } from '@mui/material';

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/

const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const [value, setValue] = React.useState(0);

    function handleTabChange(event, newValue) {
        setValue(newValue);
    }

    function handleBack(){

    }

    function handleForward(){

    }

    function handleStop(){

    }

    function handlePlay(){

    }

    function tabProps(index) {
        return {
            id: `tab-${index}`,
            'aria-controls': `tabpanel-${index}`,
            style: {
                bgcolor: '#C4C4C4',
                borderRadius: '10px 10px 0px 0px',
                border: '1px solid black'
            }
        }
    }

    return (
        <div>
            <Tabs
                value={value}
                onChange={handleTabChange}
            >
                <Tab label="Player" {...tabProps(0)}/>
                <Tab label="Comments" {...tabProps(1)}/>
            </Tabs>
            <Box style={(value===0) ? {display: 'flex', flexDirection: 'column', alignSelf: 'stretch'} : {display: 'none'}}>
                <YoutubePlayer/>
                <Box id='song-info-box'>
                    <Box>Playlist: </Box>
                    <Box>Song #: </Box>
                    <Box>Title: </Box>
                    <Box>Artist: </Box>
                    <div id="player-toolbar">
                        <IconButton onClick={handleBack}>
                            <FastRewindIcon style={{fontSize: '24pt', color: 'black'}}/>
                        </IconButton>
                        <IconButton onClick={handleStop}>
                            <StopIcon style={{fontSize: '24pt', color: 'black'}}/>
                        </IconButton>
                        <IconButton onClick={handlePlay}>
                            <PlayArrowIcon style={{fontSize: '24pt', color: 'black'}}/>
                        </IconButton>
                        <IconButton onClick={handleForward}>
                            <FastForwardIcon style={{fontSize: '24pt', color: 'black'}}/>
                        </IconButton>
                    </div>
                </Box>
            </Box>

        </div>)
}

export default HomeScreen;