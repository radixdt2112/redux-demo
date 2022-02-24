import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addUser, setUserData, getUsers } from './userSlice';
//import { UserModal } from './UserModal';
import { usersList } from "./userSlice";
import { nanoid } from '@reduxjs/toolkit'
import { TextField } from 'formik-mui';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,

    Grid,

} from '@mui/material';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import UserTable from './userTable';

const validationSchema = Yup.object({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
});

export const User = () => {

    const state = useSelector(usersList);
    // console.log(useSelector(state => state.users));
    const dispatch = useDispatch();

    const [userDialog, setUserDialog] = useState(false);
    const [editData, setEditData] = useState(false);
    const [editid, setEditId] = useState('');

    const handleClose = () => {
        setUserDialog(false);
    };
    const handleCreate = () => {
        setIntialValues({
            id: '',
            firstName: '',
            lastName: '',
            Qualification: ''
        });
        setUserDialog(true);
    };
    const [initialValues, setIntialValues] = useState({
        id: '',
        firstName: '',
        lastName: '',
        Qualification: ''
    });




    useEffect(() => {
        if (getUsers()) {
            dispatch(setUserData(getUsers()));
        }
    }, []);


    const handleSetData = (data) => {
        setEditId(data.id);
        setIntialValues(data);
        setEditData(true);
    }

    const handleSubmit = (values, resetForm) => {
        let userList = getUsers();
        if (editData) {
            if (userList) {
                let editData = userList.find(i => i.id == editid);
                editData = values;
                editData.id = editid;
                userList.splice(userList.findIndex(a => a.id === editid), 1);
                userList.push(editData);
                dispatch(setUserData(userList));
                localStorage.setItem("Users", JSON.stringify(userList));

                setUserDialog(false);

            }


        } else {
            values.id = nanoid();
            dispatch(addUser(values));
            if (!userList) {
                let array = [];
                array.push(values);
                console.log(array);
                localStorage.setItem("Users", JSON.stringify(array));
            } else {
                userList.push(values);
                localStorage.setItem("Users", JSON.stringify(userList));
            }
            setUserDialog(false);
        }

        resetForm();

    };

    return (
        <React.Fragment>
            <h1>
                Users
            </h1>
            <div style={{ display: 'flex', marginBottom: '25px' }}>
                <Button
                    variant="contained"
                    style={{ backgroundColor: '#01BB8B', color: 'white' }}
                    disableElevation
                    onClick={(e) => handleCreate(e)}
                >
                    Create User
                </Button>
            </div>

            <UserTable state={state.users} setUserDialog={setUserDialog} handleEditData={handleSetData} />

            {/* <UserModal
                showDialog={userDialog}
                handleClose={() => setUserDialog(false)}
            /> */}
            <Formik initialValues={initialValues} validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                    handleSubmit(values, resetForm);
                }}
                enableReinitialize>{({ values, resetForm, errors, touched, handleSubmit }) => {
                    return <Dialog
                        open={userDialog}
                        onClose={handleClose}
                        fullWidth={true}
                        maxWidth={'sm'}
                    >
                        <Form style={{ marginTop: '25px' }}>
                            <DialogTitle>Create  User</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Please provide  information to create a
                                    new user.
                                </DialogContentText>

                                <Grid container>
                                    <Grid item xs={12}>
                                        <Field
                                            id="firstName"
                                            margin="dense"
                                            variant="outlined"
                                            label="First Name"
                                            type="text"
                                            name="firstName"
                                            component={TextField}
                                            style={{ margin: "3px", padding: "5px", outline: "none" }}
                                            placeholder="First Name"
                                            fullWidth 
                                        />

                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field

                                            margin="dense"
                                            variant="outlined"
                                            label="Last Name"
                                            type="text"
                                            component={TextField}
                                            name="lastName"
                                            placeholder="Last Name"
                                            style={{ margin: "3px", padding: "5px", outline: "none" }}
                                            fullWidth
                                        />

                                    </Grid>
                                    {/* <Grid item xs={12}>
                                <Field
                                    component={TextField}
                                    margin="dense"
                                    variant="outlined"
                                    label="Email"
                                    type="text"
                                    name="email"
                                    placeholder="Email"
                                    fullWidth
                                />
                            </Grid> */}

                                    <Grid item xs={12}>
                                        <Field
                                            id="Qualification"
                                            margin="dense"
                                            variant="outlined"
                                            label="Qualification"
                                            type="text"
                                            name="Qualification"
                                            placeholder="Qualification"
                                            component={TextField}
                                            style={{ margin: "3px", padding: "5px", outline: "none" }}
                                            fullWidth

                                        />
                                    </Grid>
                                </Grid>

                            </DialogContent>
                            <DialogActions>
                                <Button
                                    onClick={() => {
                                        resetForm();
                                        handleClose();
                                    }}
                                    color="primary"
                                    autoFocus
                                >
                                    Close
                                </Button>
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={() => handleSubmit(values, resetForm)}
                                >
                                    Save
                                </Button>

                            </DialogActions>
                        </Form>
                    </Dialog>
                }}</Formik>


        </React.Fragment>
    )
}


