import React from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
} from '@mui/material';
import { getUsers, setUserData } from './userSlice';
import { useDispatch } from 'react-redux';
const ConfirmBoxModel = ({ setConfirmBox, confirmBox, selectId}) => {
    const dispatch = useDispatch();
    const handleDelete = (id)=>{
        let users = getUsers();
        if (users) {
                users.splice(users.findIndex(a => a.id === id), 1);
                dispatch(setUserData(users));
                localStorage.setItem("Users", JSON.stringify(users));
                
        }
        setConfirmBox(false);
    }
    return (
        <div>
            <Dialog
                open={confirmBox}
                onClose={() => { setConfirmBox(false); }}
                fullWidth={true}
                maxWidth={'sm'}
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Are you sure delete this user ?"}
                </DialogTitle>

                <DialogActions>
                    <Button  autoFocus onClick={() => handleDelete(selectId)}>
                        Yes
                    </Button>
                    <Button autoFocus onClick={() => { setConfirmBox(false); }}>
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    )
}

export default ConfirmBoxModel
