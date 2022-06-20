import { createSlice } from '@reduxjs/toolkit'

const initialState ={
   name:'',
   photo:''
}

export const activateSlice = createSlice({
  name: 'activate',
  initialState,
  reducers: {
    setName: (state,action) => {
      state.name = action.payload;
      
    },
    setPhoto :(state,action)=>{
       state.photo=action.payload;
      

    }
  
  },
})

// Action creators are generated for each case reducer function
export const {setName,setPhoto} = activateSlice.actions;

export default activateSlice.reducer;