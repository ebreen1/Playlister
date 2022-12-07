import { useContext } from 'react'
import AuthContext from '../auth'
import { GlobalStoreContext } from '../store'
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import HomeScreen from './HomeScreen';

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/



function Statusbar(props) {

    function clickHandler() {
        store.tryAcessingOtherAccountPlaylist();
    }

    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const { handleCreateNewList } = props;
    console.log("logged in: " +  auth.loggedIn);
    let text ="";
    if (auth.loggedIn){
        text = "Your Lists";
    return (
        <div
            id="playlister-statusbar"
            style={{backgroundColor:'#C4C4C4'}}
        >
            <IconButton onClick={handleCreateNewList} >
                <AddIcon style={{fontSize:'48pt'}} />
            </IconButton>
            {text}
        </div>
    );
    }
    return null;
}
/*<input type="button" 
onClick={clickHandler} 
value='clickyclicky' />*/

export default Statusbar;