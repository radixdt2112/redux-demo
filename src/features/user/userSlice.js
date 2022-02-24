import { createSlice } from '@reduxjs/toolkit';


export const getUsers = () => {
    const users = localStorage.getItem("Users");
    return users ? JSON.parse(users) : null;
}
const initialState = {
    users: []
};

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.users.push(action.payload);
        },
        removeUser: (state, action) => {

        },
        updateUser: (state, action) => {

        },
        
        setUserData : (state,action) => {
            state.users = action.payload;
        }

    }
})



export const usersList = state => state.users;
export const { addUser, removeUser, updateUser, deleteUser ,setUserData } = userSlice.actions;
export default userSlice.reducer;