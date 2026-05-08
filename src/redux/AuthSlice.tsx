
import { tokenLib } from '@/libs/localStorageDb';
import { createSlice } from '@reduxjs/toolkit'


export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
      isLogin: false,
    },
    reducers: {
        makelogin: (state,action) => {
        console.log(action);
        state.isLogin=true;

      },
      logout: (state,action) => {
        tokenLib.removeToken();
        state.isLogin=false;
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { makelogin,logout } = counterSlice.actions
  
  export default counterSlice.reducer