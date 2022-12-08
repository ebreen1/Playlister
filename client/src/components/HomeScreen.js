import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal';
import MUIEditSongModal from './MUIEditSongModal';
import MUIRemoveSongModal from './MUIRemoveSongModal';
import Statusbar from './Statusbar';
import VideoWindow from './VideoWindow';

import { Typography, List, Box, Tabs, Tab } from '@mui/material';

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/

const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }

    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{width: '100%', bgcolor: '#C4C4C4FF', mb:"20px" }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={store.currentList !== null && pair._id === store.currentList._id}
                        published={pair.published}
                    />
                ))
                
            }
            </List>;
    }

    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }

    return (
        <div
            id="playlist-selector"
            style={{height: '70%'}}
        >
            
            <Box sx={{bgcolor:"#C4C4C4"}} id="list-selector-list">
                {
                    listCard
                }
                <MUIDeleteModal />
                {modalJSX}
            </Box>
            <Box sx={{bgcolor:"#C4C4C4"}} id="video-window">
                <VideoWindow
                    songs={store.playingList?.songs}
                />
            </Box>
            <Statusbar handleCreateNewList={handleCreateNewList}/>
        </div>)
}

export default HomeScreen;