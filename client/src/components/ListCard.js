import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import SongCard from './SongCard'
import Box from '@mui/material/Box';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import EditToolbar from './EditToolbar';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, selected, published } = props;

    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleUnloadList(event, id) {
        console.log("handleUnloadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CLOSE THE CURRENT LIST
            store.closeCurrentList();
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }

    let height = '120px';
    let arrowButton = 
        <IconButton onClick={(event) => {
                handleLoadList(event, idNamePair._id)
            }} aria-label='expand'>
            <KeyboardDoubleArrowDownIcon style={{fontSize:'24pt'}} />
        </IconButton>;
    let songList = "";
    let editToolbar = "";

    if(props.selected) {
        height = '600px';
        arrowButton = 
            <IconButton onClick={(event) => {
                    handleUnloadList(event, idNamePair._id)
                }} aria-label='expand'>
                <KeyboardDoubleArrowUpIcon style={{fontSize:'24pt', bgcolor: '#FFFFF1'}} />
            </IconButton>;
        songList = 
            <List 
                id="playlist-cards" 
                sx={{overflow: 'scroll', height: '400px'}}
            >
            {store.currentList.songs.map((song, index) => (
                <SongCard
                    id={'playlist-song-' + (index)}
                    key={'playlist-song-' + (index)}
                    index={index}
                    song={song}
                />
            ))}
            <SongCard
                id='addSong'
                key='addSong'
                index={store.currentList.songs.length}  
                song={null}
            />
            </List>;
        editToolbar = <EditToolbar
                published = {published}
        />
    }

    let backgroundColor = '#FFFFF1';
    if(published) {
        backgroundColor = '#D4D4F5';
        if(selected) {
            backgroundColor = '#D4AF37';
        }
    }

    let cardElement =  
        <ListItem
            
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{borderRadius:"25px", p: "10px", marginTop: '15px', display: 'flex', flexDirection: 'column', paddingLeft: 4 }}
            style={{transform:"translate(1%,0%)", width: '98%', fontSize: '24pt', border: '2px solid #000000', height: height, backgroundColor: backgroundColor }}
            button
        >
            <Box sx={{ alignSelf: 'start' }}>{idNamePair.name}</Box>
            <Box sx={{ alignSelf: 'start', fontSize: '16pt' }}>By: {idNamePair.owner}</Box>
            <Box sx={{ alignSelf: 'stretch' }}>{songList}</Box>
            <Box sx={{ alignSelf: 'stretch' }}>
                {editToolbar}
                </Box>
            <Box sx={{ alignSelf: 'end' }}>{arrowButton}</Box>
        </ListItem>

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;