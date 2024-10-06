import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allPosts: [],
    usersPosts: [],
}

const postSlice = createSlice({

    name: "post",

    initialState,

    reducers: {
        addpost: (state, action) => {
            state.allPosts = action.payload;
        },
        addUsersPost: (state, action) => {
            state.usersPosts = action.payload;
        },
        removepost: (state, action) => {
          state.allPosts = [];
          state.usersPosts = [];
        },
        
    }
}); 

export const { addpost,removepost,addUsersPost} = postSlice.actions;

export default postSlice.reducer;