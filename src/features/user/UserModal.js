import React from 'react'
import { Formik, Field, Form } from 'formik';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,

} from '@mui/material';

export const UserModal = ({ handleClose, showDialog }) => {
    let initialValues = {
        id: '',
        firstName: '',
        lastName: '',
        Qualification: '',

    };
    return (
        <React.Fragment>

            <Formik initialValues={initialValues}>{({ values, resetForm }) => {
                <Dialog
                    open={showDialog}
                    onClose={handleClose}
                    fullWidth={true}
                    maxWidth={'lg'}
                >
                    <DialogTitle>Create External User</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please provide  information to create a
                            new user.
                        </DialogContentText>
                        <Form style={{ marginTop: '25px' }}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Field
                                        id="firstName"
                                        margin="dense"
                                        variant="outlined"
                                        label="First Name"
                                        type="text"
                                        name="firstName"
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
                                        name="lastName"
                                        placeholder="Last Name"
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
                                        id="qualification"
                                        margin="dense"
                                        variant="outlined"
                                        label="Qualification"
                                        type="number"
                                        name="qualification"
                                        placeholder="Qualification"
                                        fullWidth

                                    />
                                </Grid>
                            </Grid>
                        </Form>
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
                            color="primary"
                            onClick={() => handleSumbit(values, resetForm)}
                        >
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            }}</Formik>
        </React.Fragment>
    )
}
