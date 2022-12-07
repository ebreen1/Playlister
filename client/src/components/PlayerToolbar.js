import IconButton from '@mui/material/IconButton';

import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function PlayerToolbar(props) {
    const { back, forward, stop, play } = props;

    return (
        <div id="player-toolbar">
            <IconButton onClick={back}>
                <FastRewindIcon/>
            </IconButton>
            <IconButton onClick={forward}>
                <FastForwardIcon/>
            </IconButton>
            <IconButton onClick={stop}>
                <StopIcon/>
            </IconButton>
            <IconButton onClick={play}>
                <PlayArrowIcon/>
            </IconButton>
        </div>
    )
}

export default PlayerToolbar;