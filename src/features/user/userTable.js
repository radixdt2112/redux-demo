import React, { useEffect, useState } from 'react'
import {
    Table,
    TableContainer,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,

    Button
} from '@mui/material';
import { red, green } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { getUsers, setUserData } from './userSlice';
import { useDispatch } from 'react-redux';


const UserTable = ({ state, handleEditData, setUserDialog }) => {
    const [list, setList] = useState(state);

    const dispatch = useDispatch();
    useEffect(() => {
        setList(state);
    }, [state]);



    const handleDelete = (id) => {
        let users = getUsers();
        if (users) {
            users.splice(users.findIndex(a => a.id === id), 1);
            dispatch(setUserData(users));
            localStorage.setItem("Users", JSON.stringify(users));
        }
    }

    const handleEdit = (id) => {
        setUserDialog(true);
        let users = getUsers();
        let editData = users.find(i => i.id == id);
        handleEditData(editData);
        // console.log(editData);
    }

    if (list.length > 0) {
        return <div><TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>No.</TableCell>

                        <TableCell align="center">First Name</TableCell>
                        <TableCell align="center">Last Name</TableCell>
                        <TableCell align="center">Qualification</TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {list.map((row, index) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center">{index + 1}</TableCell>
                            <TableCell align="center" scope="row">
                                {row.firstName}
                            </TableCell>
                            <TableCell align="center">{row.lastName}</TableCell>
                            <TableCell align="center">{row.Qualification}</TableCell>
                            <TableCell align="center">
                                {/* <Button variant="outlined" color="error" >
                                Delete
                               </Button> */}
                                <EditIcon sx={{ mx: 2, color: green[600] }} style={{ cursor: 'pointer' }} onClick={() => handleEdit(row.id)} />
                                <DeleteIcon sx={{ color: red[600] }} onClick={() => handleDelete(row.id)} style={{ cursor: 'pointer' }} />
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    }
    else {
        return <TableRow>
            <TableCell
                align="center"
                colSpan={4}
                style={{
                    fontSize: '17px',
                    fontWeight: 'bold',
                }}
            >
                No records found
            </TableCell>
        </TableRow>
    }


}

export default UserTable
