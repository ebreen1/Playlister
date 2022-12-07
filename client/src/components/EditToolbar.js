import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import CloseIcon from '@mui/icons-material/HighlightOff';
import { Box } from '@mui/material';

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar(props) {
    const { store } = useContext(GlobalStoreContext);
    const { published } = props;
    

    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }

    function handlePublish() {
        store.publishPlaylist();
    }

    function handleDuplicate() {
        store.duplicatePlaylist();
    }

    async function handleDeleteList(event) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion();
    }

    let undoButton = <Button 
        disabled={!store.canUndo()}
        id='undo-button'
        onClick={handleUndo}
        variant="contained">
            Undo
    </Button>

    let redoButton = <Button 
        disabled={!store.canRedo()}
        id='redo-button'
        onClick={handleRedo}
        variant="contained">
            Redo
    </Button>

    let gap = <div style={{width: '40%'}}/>

    let publishButton = <Button 
        disabled={!store.canPublish()}
        id='publish-button'
        onClick={handlePublish}
        variant="contained">
            Publish
    </Button>

    if(published) {
        undoButton = "";
        redoButton = "";
        gap = <div style={{width: '72%'}}/>
        publishButton = "";
    }

    return (
        <div id="edit-toolbar">
            
            {undoButton}
            {redoButton}
            {gap}
            {publishButton}
            <Button 
                id='duplicate-button'
                onClick={handleDuplicate}
                variant="contained">
                    Duplicate
            </Button>
            <Button 
                disabled={!store.canDelete()}
                id='delete-button'
                onClick={(event) => handleDeleteList(event)}
                variant="contained">
                    Delete
            </Button>
        </div>
    )
}

export default EditToolbar;