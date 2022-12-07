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

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const [value, setValue] = React.useState("player");

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }

    function handleTabChange(event, newValue) {
        setValue(newValue);
    }

    function tabProps(index) {
        return {
            id: `tab-${index}`,
            'aria-controls': `tabpanel-${index}`,
            style: {bgcolor: '#C4C4C4', borderRadius: '10px 10px 0px 0px', border: '1px solid black'}
        }
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
                <VideoWindow/>
            </Box>
            <Statusbar handleCreateNewList={handleCreateNewList}/>
        </div>)
}

export default HomeScreen;